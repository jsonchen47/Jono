import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { listProjects } from '@/src/graphql/queries';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const map = () => {
    const router = useRouter(); 
    const navigation = useNavigation();
    const [region, setRegion] = useState<{
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    } | null>(null); // Start with null
    const [projects, setProjects] = useState<any>([]);
    const [selectedProject, setSelectedProject] = useState<any>(null); // State for selected project

    const mapRef = useRef<MapView>(null);

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

    const centerMapOnLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }, 500); // Smooth animation over 1 second
          }
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    // Handle Marker Press
    const handleMarkerPress = (project: any) => {
      setSelectedProject(project); // Show the card with project info
  };

  // Handle Map Press (dismiss card)
  const handleMapPress = () => {
      // setSelectedProject(null); // Dismiss the card when map is pressed
  };

    return (
      <View style={styles.container}>
        {region ? (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region} // Pass region only when it's not undefined
            // onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            onRegionChangeComplete={(newRegion) => {
              // Update the region for fetching data, but don't pass it back to the MapView
              setRegion(newRegion);
            }}
            showsPointsOfInterest={false}
            onPress={handleMapPress} // Dismiss the card on map press
          >
        {projects.map((project: any) => (
          <Marker
            key={project.id}
            coordinate={{
              latitude: project.latitude,
              longitude: project.longitude,
            }}
            title={project.title}
            pinColor='blue'
            description={project.description}
            onPress={() => {
              handleMarkerPress(project)
              console.log({project})
            }
            } // Show card when marker is pressed
            
          />
        ))}
          </MapView>
          ) : (
            <Text>Loading...</Text> // Show loading indicator while region is being fetched
        )}
        <TouchableOpacity style={styles.centerButton} onPress={centerMapOnLocation}>
          <MaterialCommunityIcons name="navigation-variant" size={24} color="#015E98" />
        </TouchableOpacity>
        {/* Display the card if a project is selected */}
        {selectedProject && (
          <View style={styles.card}>
              <Text style={styles.cardTitle}>{selectedProject.title}</Text>
              <Text style={styles.cardDescription}>{selectedProject.description}</Text>
          </View>
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
    centerButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 45,
      height: 45,
      borderRadius: 10,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // For shadow on Android
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    card: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      elevation: 5,
  },
  cardTitle: {
      fontWeight: 'bold',
      fontSize: 18,
  },
  cardDescription: {
      fontSize: 14,
      color: '#666',
  },
  });