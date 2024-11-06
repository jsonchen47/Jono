// ProjectsScreen.js
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listProjects } from '@/src/graphql/queries';
import ProjectsGridNew from '../components/ProjectsGridNew';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProjectsScreenNew = ({ category }: any) => {
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
                limit: 10,
                nextToken,
              }));
        }
        else {
             result = await API.graphql(graphqlOperation(listProjects, {
                limit: 10,
                nextToken,
              }));
        }
      
      const castedResult = result as GraphQLResult<any>
      const fetchedProjects = castedResult?.data.listProjects.items;
      console.log(fetchedProjects)
      setProjects((prevProjects: any) => [...prevProjects, ...fetchedProjects]);
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
      <View style={styles.browseProjectsHeaderContainer}>
        <Text style={styles.browseProjectsHeaderText}>Browse all projects</Text>
        <Text style={styles.browseProjectsSubtitleText}>Explore a world of ideas</Text>
      </View>
      <ProjectsGridNew
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
        />
    </View>
  );
};

export default ProjectsScreenNew;

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
    fontSize: 20,
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
});
