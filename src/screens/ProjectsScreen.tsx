import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useFilter } from '@/src/contexts/FilterContext';
import ProjectsGridNew from '../components/ProjectsGridNew';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { searchProjects } from '@/src/graphql/queries';

const ProjectsScreen = ({ category }: any) => {
  const { filter, setOnFilterApply } = useFilter();
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Fetch projects with the option to reset the list
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
  
      if (distance !== '100+') {
        const parsedDistance = parseFloat(distance as string);
  
        if (isNaN(parsedDistance)) {
          throw new Error('Invalid distance value');
        }
  
        // Define the center coordinates (replace with actual values from the user or dynamically)
        const centerLatitude = 33.158092; // Replace with actual latitude
        const centerLongitude = -117.350594; // Replace with actual longitude
  
        // Calculate bounding box
        const latAdjustment = parsedDistance / 69; // Approximate adjustment for latitude
        const lonAdjustment =
          parsedDistance / (69 * Math.cos((centerLatitude * Math.PI) / 180)); // Adjustment for longitude
  
        filterConditions = {
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
  
      setProjects((prevProjects: any) =>
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
      fetchProjects(nextToken, false); // Append projects
    }
  };

  // Set the filter apply handler to fetch projects with a reset
  useEffect(() => {
    setOnFilterApply(() => () => fetchProjects(null, true)); // Full refresh on filter change
  }, []);

  // Fetch projects initially and when the filter or category changes
  useEffect(() => {
    fetchProjects(null, true); // Reset the list on filter/category change
  }, [filter, category]);

  return (
    <View style={styles.projectsScreenContainer}>
      {loading && projects.length === 0 ? (
        <Text style={styles.loadingText}>Loading projects...</Text>
      ) : (
        <ProjectsGridNew
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
        />
      )}
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
});
