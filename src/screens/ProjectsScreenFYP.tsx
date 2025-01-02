import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { searchProjects } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useFilter } from '@/src/contexts/FilterContext';
import LargeProjectCardsFlatList from '../components/LargeProjectCardsFlatList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
      const { sortBy, distance } = filter;

      // Define filter conditions
      let filterConditions: any = {};

      // Add category filter
      if (category) {
        filterConditions = {
          ...filterConditions,
          categories: { eq: category },
        };
      }

      // Add distance filter
      if (distance !== '100+') {
        const parsedDistance = parseFloat(distance as string);

        if (isNaN(parsedDistance)) {
          throw new Error('Invalid distance value');
        }

        // Define the center coordinates (replace with actual user values)
        const centerLatitude = 33.158092; // Replace with user's latitude
        const centerLongitude = -117.350594; // Replace with user's longitude

        // Calculate bounding box
        const latAdjustment = parsedDistance / 69; // Approx adjustment for latitude
        const lonAdjustment =
          parsedDistance / (69 * Math.cos((centerLatitude * Math.PI) / 180)); // Longitude adjustment

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

      // Add sorting criteria
      const sortCriteria: any = [
        {
          field: 'createdAt',
          direction: sortBy === 'newest' ? 'desc' : 'asc',
        },
      ];

      const result = await API.graphql(
        graphqlOperation(searchProjects, {
          filter: filterConditions,
          limit: 8,
          nextToken,
          sort: sortCriteria,
        })
      );

      const castedResult = result as GraphQLResult<any>;
      const fetchedProjects = castedResult?.data.searchProjects.items;

      setProjects((prevProjects) =>
        reset ? fetchedProjects : [...prevProjects, ...fetchedProjects]
      );

      setNextToken(castedResult?.data.searchProjects.nextToken);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  // Load more projects for pagination
  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  // Set the filter apply handler to fetch projects with a reset
  useEffect(() => {
    setOnFilterApply(() => () => fetchProjects(null, true));
  }, []);

  // Fetch projects initially and when the filter or category changes
  useEffect(() => {
    fetchProjects(null, true);
  }, [filter, category]);

  return (
    <View style={styles.projectsScreenContainer}>
      <LargeProjectCardsFlatList
        projects={projects}
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
