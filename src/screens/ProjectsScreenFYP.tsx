// ProjectsScreen.js
import { View, Text, StyleSheet, Dimensions, PanResponder } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listProjects } from '@/src/graphql/queries';
import ProjectsGridNew from '../components/ProjectsGridNew';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import Carousel from 'react-native-reanimated-carousel';
import LargeProjectCard from '../components/LargeProjectCard';
import { PageIndicator } from 'react-native-page-indicator';
import { TouchableWithoutFeedback } from 'react-native';
import LargeProjectCardsFlatList from '../components/LargeProjectCardsFlatList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProjectsScreenFYP = ({ category }: any) => {
    
  const [currentPage, setCurrentPage] = React.useState(0);
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<any>(false);

  const fetchProjects = async (nextToken = null) => {
    setLoading(true);
    try {
        // If there is a category, filter. Otherwise, don't filter. 
        var result 
        if (category != "") {
             result = await API.graphql(graphqlOperation(listProjects, {
                filter: {
                  categories: {
                     contains: category 
                    },
                },
                limit: 8,
                nextToken,
              }));
        }
        else {
             result = await API.graphql(graphqlOperation(listProjects, {
                limit: 8,
                nextToken,
              }));
        }
      const castedResult = result as GraphQLResult<any>
      const fetchedProjects = castedResult?.data.listProjects.items;
      // console.log(fetchedProjects[0].city)
      // Ensure no duplicate projects
      setProjects((prevProjects: any) => {
        const newProjects = fetchedProjects.filter((newProject: any) => 
            !prevProjects.some((existingProject: any) => existingProject.id === newProject.id)
        );
        return [...prevProjects, ...newProjects];  // Add only new projects
    });
      setNextToken(castedResult?.data.listProjects.nextToken);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => { 
    fetchProjects();
  }, [category]);

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  return (
    <View style={styles.projectsScreenContainer}>
      <LargeProjectCardsFlatList
          projects={projects} // Pass remaining projects after first 4
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
        />
    </View>
  );
};

export default ProjectsScreenFYP;

const styles = StyleSheet.create({
  projectsScreenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
});
