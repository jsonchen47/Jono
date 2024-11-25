// ProjectsScreen.js
import { View, Text, StyleSheet, Dimensions, PanResponder } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listProjects } from '@/src/graphql/queries';
import ProjectsGridNew from '../components/ProjectsGridNew';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import Carousel from 'react-native-reanimated-carousel';
import LargeProjectCard from '../components/LargeProjectCard';
import { PageIndicator } from 'react-native-page-indicator';
import { TouchableWithoutFeedback } from 'react-native';
import LargeProjectCardsFlatList from '../components/LargeProjectCardsFlatList';
import ProjectsGridForProfile from '../components/ProjectsGridForProfile';
import { listTeamsByUser } from '@/src/backend/queries';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface ProfileProjectsScreenProps {
  userID: string; // or any other type that matches the type of userID
}

const ProfileTeamsScreen: React.FC<ProfileProjectsScreenProps> = ({ userID }) => {
    
  const [currentPage, setCurrentPage] = React.useState(0);
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<any>(false);

  const fetchProjects = async (nextToken = null) => {
    setLoading(true);
    try {
      // Fetch the teams (4 projects at a time)
      const teamsData = await API.graphql(
        graphqlOperation(listTeamsByUser, { id: userID, nextToken, limit: 4 })
      );
      const castedTeamsData = teamsData as GraphQLResult<any>;
      
      // Get the raw teams data
      const rawTeams = castedTeamsData?.data?.getUser?.Projects?.items || [];
      const nextTokenFromResponse = castedTeamsData?.data?.getUser?.Projects?.nextToken;
  
      // Filter the teams based on the ownerIDs and userID
      const filteredTeams = rawTeams.filter((item: any) => {
        return !item.project.ownerIDs.includes(userID);
      });
  
      // Map to get the actual projects
      const fetchedProjects = filteredTeams.map((item: any) => item.project);
  
      console.log(fetchedProjects);
  
      // Ensure no duplicate projects
      setProjects((prevProjects: any) => {
        const newProjects = fetchedProjects.filter((newProject: any) => 
          !prevProjects.some((existingProject: any) => existingProject.id === newProject.id)
        );
        return [...prevProjects, ...newProjects];  // Add only new projects
      });
  
      // Check if we've reached the desired number of projects (4)
      if (fetchedProjects.length + projects.length >= 4) {
        setNextToken(null);  // Stop pagination once we have enough projects
      } else {
        // Otherwise, continue fetching more projects
        setNextToken(nextTokenFromResponse);
      }
  
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };
  

  useEffect(() => {
    fetchProjects();
  }, [userID]);

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  return (
    <View style={styles.projectsScreenContainer}>
      <ProjectsGridForProfile
          projects={projects} // Pass remaining projects after first 4
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
        />
    </View>
  );
};

export default ProfileTeamsScreen;

const styles = StyleSheet.create({
  projectsScreenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  browseProjectsHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  browseProjectsHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectsSubtitleText: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    marginTop: 5,
  },
   // Pager View
   pagerViewOuterContainer: {
    width: '100%',
    height:  windowWidth*0.85, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    
    // backgroundColor: 'red'
  }, 
  pagerViewContainer: {
    width: '100%', 
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  }, 
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
  },
   // Large projects
   largeProjectContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeProjectImageBackground: {
    width: '90%',
    height: '100%',
  },
  largeProjectImage: {
    // padding: 30,
    width: '100%',
    height: '100%', 
    borderRadius: 15,
    padding: 20
  }, 
  largeProjectTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 25, 
    width: windowWidth/1.1,
    height: '100%',
  },
  largeProjectAuthor: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
  }, 
  largeProjectTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    flexShrink: 1,
    paddingTop: 10,
  }, 
  largeProjectGradient: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    width: '100%', 
    height: '100%',
    borderRadius: 15, // Match the border radius of the image
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    alignItems: 'flex-end',
    padding: 25,
  },
  noProjectsText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    paddingTop: 20,
  },
});
