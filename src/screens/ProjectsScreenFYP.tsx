import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, ActivityIndicator, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { searchProjects } from '@/src/graphql/queries';
import { useFilter } from '@/src/contexts/FilterContext';
import LargeProjectCardsFlatList from '../components/LargeProjectCardsFlatList';
import { useFocusEffect } from '@react-navigation/native';
import { useRefresh } from '../contexts/RefreshContext';
import * as Location from 'expo-location';


const windowWidth = Dimensions.get('window').width;

const client = generateClient();

const ProjectsScreenFYP = ({ category }: any) => {
  const { filter, setOnFilterApply } = useFilter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { shouldRefresh, setShouldRefresh } = useRefresh();
  const [userLocation, setUserLocation] = useState<any>(null);

  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={require('../../assets/images/dj.png')} // Ensure the image path is correct
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No projects yet!</Text>
      <Text style={styles.emptySubText}>Post a project to populate the space.</Text>
    </View>
  );

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to filter projects by distance.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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

  const fetchProjects = async (nextToken = null, reset = false) => {
    if (reset) {
      setProjects([]);
      setNextToken(null);
    }
  
    setLoading(true);
    try {
      const authUser = await getCurrentUser();

      // ✅ Exit early if the user is not authenticated
      if (!authUser) {
        console.warn('User is not authenticated.');
        setLoading(false);
        return;
      }

      const { distance, sortBy } = filter;
      
  
      let filterConditions: any = {};
      if (category) {
        filterConditions.categories = { eq: category };
      }
  
      if (distance !== '100+') {
        if (!userLocation) {
          console.warn('User location is not available yet.');
          return; // Exit early until location is available
        }

        const { latitude: centerLatitude, longitude: centerLongitude } = userLocation;


        const parsedDistance = parseFloat(distance as string);
        const latAdjustment = parsedDistance / 69;
        const lonAdjustment = parsedDistance / (69 * Math.cos((centerLatitude * Math.PI) / 180));
        filterConditions.and = [
          { latitude: { gte: centerLatitude - latAdjustment, lte: centerLatitude + latAdjustment } },
          { longitude: { gte: centerLongitude - lonAdjustment, lte: centerLongitude + lonAdjustment } },
        ];
      }
  
      // ✅ Use sortCriteria as 'any' to bypass TypeScript's strict checks
      const sortCriteria: any = [
        {
          field: 'createdAt',
          direction: sortBy === 'newest' ? 'desc' : 'asc',
        },
      ];
  
      // Dual Fetch: Premium and Non-Premium projects
      const [premiumResult, nonPremiumResult] = await Promise.all([
        client.graphql({
          query: searchProjects,
          variables: {
            filter: { ...filterConditions, isFeatured: { eq: true } },
            limit: 8,
            nextToken,
            sort: sortCriteria, // ✅ Apply sortCriteria here
          },
        }),
        client.graphql({
          query: searchProjects,
          variables: {
            filter: { ...filterConditions, isFeatured: { eq: false } },
            limit: 8,
            nextToken,
            sort: sortCriteria, // ✅ Apply sortCriteria here
          },
        }),
      ]);
  
      const premiumProjects = premiumResult.data?.searchProjects?.items || [];
      console.log('premiumProjects:', premiumProjects);
      const nonPremiumProjects = nonPremiumResult.data?.searchProjects?.items || [];
      console.log('nonPremiumProjects:', nonPremiumProjects);
  
      // Interleave 2 premium projects with 1 non-premium project
      const mixedProjects: any[] = [];
      let pIndex = 0,
        npIndex = 0;
  
      while (pIndex < premiumProjects.length || npIndex < nonPremiumProjects.length) {
        for (let i = 0; i < 2 && pIndex < premiumProjects.length; i++) {
          mixedProjects.push(premiumProjects[pIndex++]);
        }
        if (npIndex < nonPremiumProjects.length) {
          mixedProjects.push(nonPremiumProjects[npIndex++]);
        }
      }
  
      // setProjects((prev) => (reset ? mixedProjects : [...prev, ...mixedProjects]));
      setProjects((prev) => {
        const newProjects = reset ? mixedProjects : [...prev, ...mixedProjects];
      
        // Ensure unique projects based on id
        const uniqueProjects = Array.from(new Map(newProjects.map(p => [p.id, p])).values());
      
        return uniqueProjects;
      });
      
      setNextToken(premiumResult.data?.searchProjects?.nextToken || nonPremiumResult.data?.searchProjects?.nextToken);
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
// }, [filter, category, userLocation]);

  

  // Reload the view each time it comes into view
  useFocusEffect(
    useCallback(() => {
      fetchProjects(null, true);
    }, [filter, category])
  );

  return (
    <View style={styles.projectsScreenContainer}>
       <LargeProjectCardsFlatList
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
            source={require('../../assets/images/dj.png')} // Ensure the image path is correct
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
          loading={loading}
          noProjectsComponent={<EmptyState/>}
        />
      )} */}
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
    fontSize: 21,
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
