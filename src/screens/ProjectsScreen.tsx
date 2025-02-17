import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, ActivityIndicator } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { useFilter } from '@/src/contexts/FilterContext';
import ProjectsGridNew from '../components/ProjectsGridNew';
import { searchProjects } from '@/src/graphql/queries';
import { useFocusEffect } from '@react-navigation/native';
import { useRefresh } from '../contexts/RefreshContext';

const windowWidth = Dimensions.get('window').width;

const client = generateClient();

const ProjectsScreen = ({ category }: any) => {
  const { filter, setOnFilterApply } = useFilter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
    const { shouldRefresh, setShouldRefresh } = useRefresh();
  

  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={require('../../assets/images/dj.png')} // Ensure this path matches your image location
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No projects yet!</Text>
      <Text style={styles.emptySubText}>Post a project to populate the space.</Text>
    </View>
  );

  const fetchProjects = async (nextToken = null, reset = false) => {
    if (reset) {
      setProjects([]);
      setNextToken(null);
    }

    setLoading(true);
    try {
      const authUser = await getCurrentUser();
      const authUserID = authUser.userId;

      const { sortBy, distance } = filter;

      let filterConditions: any = {};

      if (category) {
        filterConditions = {
          ...filterConditions,
          categories: { regexp: `.*${category}.*` },
        };
      }

      if (distance !== '100+') {
        const parsedDistance = parseFloat(distance as string);

        if (isNaN(parsedDistance)) {
          throw new Error('Invalid distance value');
        }

        const centerLatitude = 33.158092;
        const centerLongitude = -117.350594;

        const latAdjustment = parsedDistance / 69;
        const lonAdjustment =
          parsedDistance / (69 * Math.cos((centerLatitude * Math.PI) / 180));

        filterConditions = {
          ...filterConditions,
          and: [
            {
              latitude: {
                gte: centerLatitude - latAdjustment,
                lte: centerLatitude + latAdjustment,
              },
            },
            {
              longitude: {
                gte: centerLongitude - lonAdjustment,
                lte: centerLongitude + lonAdjustment,
              },
            },
          ],
        };
      }

      const sortCriteria: any = [
        {
          field: 'createdAt',
          direction: sortBy === 'newest' ? 'desc' : 'asc',
        },
      ];

      const result = await client.graphql({
        query: searchProjects,
        variables: {
          filter: filterConditions,
          limit: 8,
          nextToken,
          sort: sortCriteria,
        }
      });

      const fetchedProjects = result.data?.searchProjects?.items || [];

      setProjects((prevProjects) =>
        reset ? fetchedProjects : [...prevProjects, ...fetchedProjects]
      );

      setNextToken(result.data?.searchProjects?.nextToken);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  useEffect(() => {
    setOnFilterApply(() => () => fetchProjects(null, true));
  }, []);

  useEffect(() => {
    fetchProjects(null, true);
  }, [filter, category]);

  // // Whenever the page comes back into view, refresh the data
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchProjects(null, true);
  //   }, [filter, category])
  // );

  // Whenever there is an update, refresh the data
  useFocusEffect(
      useCallback(() => {
        if (shouldRefresh) {
          const fetchData = async () => {
            setLoading(true);
    
            // Add a 1-second delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
    
            await fetchProjects(null, true); // Ensure this is awaited if it's async
            setLoading(false);
          };
    
          fetchData();
          setShouldRefresh(false); // Reset the flag after refreshing
        }
      }, [shouldRefresh])
    );

  return (
    <View style={styles.projectsScreenContainer}>
      <ProjectsGridNew
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
          loading={loading}
          noProjectsComponent={<EmptyState/>}

        />
      {/* {loading && projects.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#003B7B" />
        </View>
      ) : projects.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Image
            source={require('../../assets/images/dj.png')} // Ensure this path matches your image location
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No projects yet!</Text>
          <Text style={styles.emptySubText}>Post a project to populate the space.</Text>
        </View>
      ) : (
        <ProjectsGridNew
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
          loading={loading}
          noProjectsComponent={<EmptyState/>}

        />
      )} */}
    </View>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  projectsScreenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100, 
  },
  emptyImage: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
