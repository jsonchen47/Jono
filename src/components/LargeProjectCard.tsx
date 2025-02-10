import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import { getUser, getProject } from '../graphql/queries';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';
import HeartButton from './HeartButton';
import * as Location from 'expo-location';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { getCurrentUser } from 'aws-amplify/auth';

const windowWidth = Dimensions.get('window').width;
const client = generateClient();

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



const LargeProjectCard = ({ project }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState(project);

  const { updatedProjectID, updated } = useProjectUpdateContext();

  const fetchUser = async (ownerID: any) => {
    try {
      const result = await client.graphql({
        query: getUser,
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
      console.log('fetched project', result.data?.getProject)
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

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
  
  
  useEffect(() => {
    if (project?.ownerIDs?.[0]) {
      fetchUser(project.ownerIDs[0]);
    }
  }, [project?.ownerIDs]);

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
        handlePress()
        // router.push({
        //   pathname: '/project/[id]',
        //   params: { id: currentProject.id, projectID: currentProject.id },
        // })
      }
      style={styles.cardContainer}
    >
      <View style={styles.cardContent}>
        <TouchableOpacity
          style={styles.authorContainer}
          onPress={() =>
            router.push({
              pathname: '/otherProfile',
              params: { id: user.id },
            })
          }
        >
          <Image source={{ uri: user?.image }} style={styles.authorImage} />
          <View>
            <Text style={styles.authorName}>{user?.name}</Text>
            <Text style={styles.location}>{currentProject.city}</Text>
          </View>
        </TouchableOpacity>
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={styles.image}
          source={{ uri: currentProject.image }}
        >
          <View style={styles.heartButtonContainer}>
            <HeartButton projectID={currentProject.id} />
          </View>
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {currentProject.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {currentProject.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default LargeProjectCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '87%',
    alignSelf: 'center',
  },
  cardContent: {
    width: '100%',
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  heartButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  detailsContainer: {
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
