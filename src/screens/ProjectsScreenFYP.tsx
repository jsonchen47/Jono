import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { searchProjects } from '@/src/graphql/queries';
import { useFilter } from '@/src/contexts/FilterContext';
import LargeProjectCardsFlatList from '../components/LargeProjectCardsFlatList';

const windowWidth = Dimensions.get('window').width;

const client = generateClient();

const ProjectsScreenFYP = ({ category }: any) => {
  const { filter, setOnFilterApply } = useFilter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchProjects = async (nextToken = null, reset = false) => {
    if (reset) {
      setProjects([]);
      setNextToken(null);
    }

    setLoading(true);
    try {
      const authUser = await getCurrentUser();
      const authUserID = authUser.userId;

      let filterConditions: any = {};

      if (category) {
        filterConditions = {
          ...filterConditions,
          categories: { eq: category },
        };
      }

      const { distance } = filter;
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
          direction: filter.sortBy === 'newest' ? 'desc' : 'asc',
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

  return (
    <View style={styles.projectsScreenContainer}>
      {loading && projects.length === 0 ? (
        <Text style={styles.loadingText}>Loading projects...</Text>
      ) : projects.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Image
            source={require('../../assets/images/person_reading.png')} // Ensure the image path is correct
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No projects yet!</Text>
          <Text style={styles.emptySubText}>Post a project to populate the space.</Text>
        </View>
      ) : (
        <LargeProjectCardsFlatList
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
        />
      )}
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
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
