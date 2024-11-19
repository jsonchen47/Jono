import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { listProjects } from '@/src/graphql/queries';

const map = () => {
    const router = useRouter(); 
    const navigation = useNavigation();
    const [region, setRegion] = useState({
      latitude: 37.7749, // Default to San Francisco or another fallback
      longitude: -122.4194,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    const [projects, setProjects] = useState([]);

    // Set the header 
    useEffect(() => {
        navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity 
                onPress={() => router.back()} 
                style={{ marginLeft: 10 }}>
            <FontAwesome6 name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
        ),
        headerTitle: 'Map',
        });
    }, [navigation]);

    // Request permission and then obtain current location
    useEffect(() => {
      // Ask for location permission if on Android
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          .then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getCurrentLocation();
            } else {
              console.log('Location permission denied');
            }
          });
      } else {
        getCurrentLocation();
      }
    }, []);

    // Call helper functions to fetch the projects in that region
    useEffect(() => {
      if (region) {
        fetchProjectsWithinRegion(region).then((projects) => setProjects(projects));
      }
    }, [region]);
    

    // Helper function to calculate the region
    const calculateBounds = (region: any) => {
      const minLat = region.latitude - region.latitudeDelta / 2;
      const maxLat = region.latitude + region.latitudeDelta / 2;
      const minLng = region.longitude - region.longitudeDelta / 2;
      const maxLng = region.longitude + region.longitudeDelta / 2;
    
      return { minLat, maxLat, minLng, maxLng };
    };

    // Helper function to fetch the project data from AWS
  const fetchProjectsWithinRegion = async (region: any) => {
    const { minLat, maxLat, minLng, maxLng } = calculateBounds(region);

    try {
      const response = await API.graphql(
        graphqlOperation(listProjects, {
          filter: {
            latitude: { between: [minLat, maxLat] },
            longitude: { between: [minLng, maxLng] }
          }
        })
      );
      const castedResponse = response as GraphQLResult<any>
      console.log(castedResponse.data.listProjects.items)
      console.log("yes")
      return castedResponse.data.listProjects.items;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };
    
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    return (
        <View style={styles.container}>
          {region ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={region} // Pass region only when it's not undefined
              // onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
              onRegionChangeComplete={(newRegion) => {
                // Update the region for fetching data, but don't pass it back to the MapView
                setRegion(newRegion);
              }}
            >
          {projects.map((project: any) => (
            <Marker
              key={project.id}
              coordinate={{
                latitude: project.latitude,
                longitude: project.longitude,
              }}
              title={project.title}
              description={project.description}
            />
          ))}
            </MapView>
            ) : (
              <Text>Loading...</Text> // Show loading indicator while region is being fetched
          )}
      </View>
    )
}

export default map

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });