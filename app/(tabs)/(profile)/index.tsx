import { Link } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../../../src/graphql/queries';
import { listTeamsByUser } from '@/src/backend/queries';
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

const windowWidth = Dimensions.get('window').width;

export default function ProfileIndex() {
  const router = useRouter(); 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch all data on component mount
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
      headerStyle: {
        // backgroundColor: '#00C0D1', // Change the background color of the header
      },
      headerRight: () => (
      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity style={styles.headerButton}>
          <Fontisto name='bell' style={styles.icon}/>
        </TouchableOpacity>
        <View style={styles.spacer}/>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => 
            router.push('/settings')
          } 
          >
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
  }, [user]);

  

  const fetchUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub;
      const userResult = await API.graphql(
        graphqlOperation(getUser, { id: userID })
      );
      const castedUserResult = userResult as GraphQLResult<any>;
      setUser(castedUserResult.data?.getUser);
    } catch (err) {
      setError(err);
      console.error("Error fetching user:", err);
    }
  };

  return (
    <ProfileScreen passedUserID={null}/>
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
    fontWeight: 500,
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
  aboutContainer: {
    paddingHorizontal: 7,
  },
  skillsAndResourcesTopPadding: {
    paddingTop: 5,
  },
  skillsAndResourcesTitleContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  skillsAndResourcesChipsContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    alignSelf: 'flex-start',
    margin: 5,
    backgroundColor: 'black'
  },
  chipText: {
    color: 'white',
    fontSize: 13
  },
  tabScreen: {
    // marginTop: windowWidth * 0.67,
    flex: 1, 
    width: '100%'
  }, 
  
});
