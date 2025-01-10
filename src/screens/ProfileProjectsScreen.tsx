import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ProjectsGridForProfile from '../components/ProjectsGridForProfile';
import { searchProjects } from '@/src/graphql/queries';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';

const windowWidth = Dimensions.get('window').width;

const client = generateClient();

interface ProfileProjectsScreenProps {
  userID: string;
}

const ProfileProjectsScreen: React.FC<ProfileProjectsScreenProps> = ({ userID }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // To prevent flickering
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchProjects = async (nextToken = null) => {
    setLoading(true);
    try {
      const result = await client.graphql({
        query: searchProjects,
        variables: {
          filter: { ownerIDs: { match: userID } },
          nextToken,
          limit: 10,
        },
      });

      const castedResult = result as GraphQLResult<any>;
      const fetchedProjects = castedResult?.data?.searchProjects?.items || [];

      // Ensure no duplicate projects
      setProjects((prevProjects: any) => {
        const newProjects = fetchedProjects.filter(
          (newProject: any) =>
            !prevProjects.some(
              (existingProject: any) => existingProject.id === newProject.id
            )
        );
        return [...prevProjects, ...newProjects];
      });

      setNextToken(castedResult?.data?.searchProjects?.nextToken);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setDataLoaded(true), 300); // Ensure rendering after loading settles
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
      {!loading && projects.length === 0 && dataLoaded ? (
        <Tabs.ScrollView>
          <View style={styles.noProjectsContainer}>
            <Image
              source={require('../../assets/images/dj.png')} // Replace with your placeholder image path
              style={styles.noProjectsImage}
            />
            <Text style={styles.noProjectsText}>
              No projects yet! Post a project to populate the space.
            </Text>
          </View>
        </Tabs.ScrollView>
      ) : (
        <ProjectsGridForProfile
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
        />
      )}
    </View>
  );
};

export default ProfileProjectsScreen;

const styles = StyleSheet.create({
  projectsScreenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  noProjectsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30, 
  },
  noProjectsImage: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    marginBottom: 20,
  },
  noProjectsText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'gray',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
