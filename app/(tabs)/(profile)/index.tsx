import { Link } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'; // Updated imports
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser } from '../../../src/graphql/queries'; 
import ProjectsGridNew from '@/src/components/ProjectsGridNew';
import ProfileHeader from '@/src/components/ProfileHeader';
import Emoji from 'react-native-emoji';
import ProjectsGridForProfile from '@/src/components/ProjectsGridForProfile';
import ProfileScreen from '@/src/screens/ProfileScreen';
import { FontAwesome6 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { router, useRouter } from 'expo-router';
import { useNotifications } from '@/src/contexts/NotificationContext';
import { generateClient } from 'aws-amplify/api';
import { User } from '@sendbird/chat';

const windowWidth = Dimensions.get('window').width;

export default function ProfileIndex() {
  const { hasNotifications } = useNotifications();
  const router = useRouter(); 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };
    fetchData();
    
  }, []);

  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: () => (
        <View style={styles.headerTitleContainer}> 
          <Text style={styles.headerTitle}>
            {`@${user?.username}`}
          </Text>
        </View>
      ),
      headerRight: () => (
      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => {
            router.push('/(tabs)/(profile)/notifications');
          }}>
          <Fontisto name='bell' style={styles.icon}/>
          {hasNotifications && <View style={styles.notificationDot} />}
        </TouchableOpacity>
        <View style={styles.spacer}/>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => {
            router.push('/settings');
          }}>
          <FontAwesome6 name='bars' style={styles.icon}/>
        </TouchableOpacity>
      </View>
      ),
      headerLeft: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity style={styles.headerButton}>
            <Octicons name='info' style={styles.icon}/>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [user, hasNotifications]);

  const fetchUser = async () => {
    try {
      // Fetch the current authenticated user
      const currentUser = await getCurrentUser();
      const userID = currentUser.userId; // Assuming username is used as user ID

      // Fetch authentication session
      const session = await fetchAuthSession();

      // Use generateClient to perform GraphQL operations
      const client = generateClient();
      
      const userResult = await client.graphql({
        query: getUser,
        variables: { id: userID },
      }) as GraphQLResult<any>;

      console.log('USER RESULT')
      console.log(userResult)
      
      setUser(userResult.data?.getUser);
      
    } catch (err) {
      setError(err);
      console.error("Error fetching user:", err);
    }
  };

  return (
    <ProfileScreen/>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    backgroundColor: '#2B2B2B',
    borderRadius: 10, 
    marginBottom: 10, 
  },
  headerTitle: {
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontWeight: '500',
  },
  headerButtonsContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10,
  },
  headerButton: {
    backgroundColor: '#2B2B2B',
    borderRadius: 50,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    paddingHorizontal: 5,
  },
  icon: {
    fontSize: 15,
    color: 'white',
    borderRadius: 50,
  },
  notificationDot: {
    position: 'absolute', 
    top: 0, 
    right: 0, 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: 'red', 
    borderWidth: 1, 
    borderColor: 'white', 
  },
});
