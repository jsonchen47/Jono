import { View, Text, Image, Pressable, StyleSheet, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import { getUser, getProject } from '../graphql/queries';
import { getUserWithoutConnections } from '../backend/queries';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';
import HeartButton from './HeartButton';
import * as Location from 'expo-location';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const SmallProjectCard = ({ project }: any) => {
  const { updatedProjectID, updated } = useProjectUpdateContext();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState(project);

  const handlePress = async () => {
      try {
        // Fetch full project details if Users are missing
        await fetchProject(project?.id);
        console.log('fetched');
    
        const location = await Location.getCurrentPositionAsync({});
        const distance = haversineDistance(
          location?.coords?.latitude,
          location?.coords?.longitude,
          currentProject?.latitude,
          currentProject?.longitude
        );
    
        const currentUser = await getCurrentUser();
        const userItems = currentProject?.Users?.items || [];
        const isInProject = userItems.some((item: any) => item?.userId === currentUser?.userId);
    
        const customerInfo = await Purchases.getCustomerInfo();
        const isPremium = !!customerInfo?.entitlements?.active?.['premium'];
    
        console.log('currentuserid:', currentUser?.userId);
        console.log('currentproject:', currentProject);
        console.log('currentprojectusers:', currentProject?.Users?.items);
        console.log('currentprojectuserid:', currentProject?.Users?.items?.[0]?.id);
        console.log('isInProject:', isInProject);
    
        if (isInProject || distance <= 100 || isPremium) {
          router.push({ pathname: '/project/[id]', params: { id: currentProject?.id, projectID: currentProject?.id } });
        } else {
          const offerings = await Purchases.getOfferings();
          if (offerings?.current) {
            const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
              offering: offerings?.current,
              requiredEntitlementIdentifier: 'premium',
            });
    
            if (paywallResult === RevenueCatUI.PAYWALL_RESULT?.PURCHASED) {
              router.push({ pathname: '/project/[id]', params: { id: currentProject?.id, projectID: currentProject?.id } });
            } else {
              console.log('Paywall dismissed without purchase');
            }
          } else {
            console.error('No offerings configured in RevenueCat.');
            Alert.alert('No available offerings found.');
          }
        }
      } catch (error) {
        console.error('Error handling project card press:', error);
      }
    };

  const fetchUser = async (ownerID: any) => {
    try {
      const result = await client.graphql({
        query: getUserWithoutConnections,
        variables: { id: ownerID }
      }) as GraphQLResult<any>;
      setUser(result.data?.getUser);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchProject = async (projectID: string) => {
    try {
      const result = await client.graphql({
        query: getProject,
        variables: { id: projectID }
      }) as GraphQLResult<any>;
      setCurrentProject(result.data?.getProject);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  useEffect(() => {
    // fetchProject(project?.id);
    console.log('Owner IDs changed:', currentProject.id);
    if (project.ownerIDs?.[0]) {
      fetchUser(project.ownerIDs[0]);
    }
  }, [currentProject.ownerIDs]);

  useEffect(() => {
    fetchProject(project?.id);
    if (updated && updatedProjectID === currentProject.id) {
      console.log(`Project ${currentProject.id} was recently updated.`);
      fetchProject(updatedProjectID);
    }
  }, [updated, updatedProjectID, currentProject.id]);

  return (
    <Pressable
      onPress={() =>
        // router.push({
        //   pathname: '/project/[id]',
        //   params: { id: currentProject.id, projectID: currentProject.id },
        // })
        handlePress()
      }
      style={{ width: '100%' }}
    >
      <Image style={styles.browseProjectsImage} source={{ uri: currentProject.image }} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.3 }}
        style={styles.browseProjectsLinearGradient}
      >
        <View style={styles.browseProjectsHeartContainer}>
          <HeartButton projectID={project.id}/>
        </View>
        <View style={styles.browseProjectsTextContainer}>
          <Text style={styles.browseProjectsTitle} numberOfLines={3}>{currentProject?.title}</Text>
          <Text style={styles.browseProjectAuthor}>{user?.name}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default SmallProjectCard;

const styles = StyleSheet.create({
  browseProjectsImage: {
    width: '100%',
    height: windowHeight / 5,
    borderRadius: 15,
  },
  browseProjectsLinearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  browseProjectsHeartContainer: {
    padding: 10,
    alignItems: 'flex-end'
  },
  browseProjectsTextContainer: {
    padding: 10,
  },
  browseProjectsTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: '600',
    fontSize: 15,
    color: 'white',
  },
  browseProjectAuthor: {
    fontSize: 13,
    color: 'lightgray',
    paddingTop: 5,
  },
});

