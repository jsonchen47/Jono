import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Chip } from 'react-native-paper';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import Emoji from 'react-native-emoji';
import ProfileHeader from '@/src/components/ProfileHeader';
import ProfileProjectsScreen from './ProfileProjectsScreen';
import ProfileTeamsScreen from './ProfileTeamsScreen';
import { useUser } from '../contexts/UserContext';
import { generateClient } from '@aws-amplify/api';
import { getUser } from '@/src/graphql/queries';
import { listTeamsByUser } from '@/src/backend/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
import { useFocusEffect } from '@react-navigation/native';
import { listProjects } from '@/src/graphql/queries';
import { useRefresh } from '../contexts/RefreshContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface ProfileScreenProps {
  passedUserID?: any;
}

export default function ProfileScreen({ passedUserID }: ProfileScreenProps) {
  const { user: contextUser, setUser } = useUser();
  const [userID, setUserID] = useState<any>(null);
  const [user, setUserData] = useState<any>(contextUser);
  const [projects, setProjects] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [projectsNextToken, setProjectsNextToken] = useState<any>(null);
  const [teamsNextToken, setTeamsNextToken] = useState<string | null>(null);
  const [isFetchingMoreProjects, setIsFetchingMoreProjects] = useState(false);
  const [isFetchingMoreTeams, setIsFetchingMoreTeams] = useState(false);
  const [loading, setLoading] = useState(true);
  const { shouldRefresh, setShouldRefresh } = useRefresh();


  const client = generateClient();

  // To reload the page every time its viewed
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const fetchData = async () => {
  //       if (userID) {
  //         setLoading(true);
  //         await fetchUser(userID);
  //         await fetchProjects(userID);
  //         await fetchTeams(userID);
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }, [userID])
  // );
  useFocusEffect(
    React.useCallback(() => {
      if (shouldRefresh) {
        // fetchData();
        const fetchData = async () => {
          if (userID) {
            setLoading(true);
            await fetchUser(userID);
            await fetchProjects(userID);
            await fetchTeams(userID);
            setLoading(false);
        }
        
        };
        fetchData();
        setShouldRefresh(false); // Reset the flag after refreshing
      }
    }, [shouldRefresh])
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (shouldRefresh) {
  //       fetchData();
  //       setShouldRefresh(false); // Reset the flag after refreshing
  //     }
  //   }, [shouldRefresh])
  // );

  useEffect(() => {
    if (contextUser && !passedUserID) {
      setUserData(contextUser);
    }
  }, [contextUser, passedUserID]);


  const fetchData = async () => {
    setLoading(true);
    let currentUserID = passedUserID;

    if (!currentUserID) {
      const authUser = await getCurrentUser();
      currentUserID = authUser.userId;
      setUserID(currentUserID);
    } else {
      setUserID(passedUserID);
    }

    if (!contextUser || passedUserID) {
      await fetchUser(currentUserID);
    }

    await fetchProjects(currentUserID);
    await fetchTeams(currentUserID);
    setLoading(false);
  };

  useEffect(() => {

    fetchData();
  }, [passedUserID, contextUser]);

  const fetchUser = async (id: string) => {
    try {
      const userResult = await client.graphql({
        query: getUser,
        variables: { id },
      }) as GraphQLResult<any>;

      const fetchedUser = userResult.data?.getUser;

      if (!passedUserID) {
        setUser(fetchedUser);
      }
      setUserData(fetchedUser);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const fetchProjects = async (id: string, nextToken: string | null = null, fetchMore = false) => {
    try {
      const projectsData = await client.graphql({
        query: listProjects,
        variables: {
          filter: { ownerIDs: { contains: id } },
          nextToken,
          limit: 10,
        },
      }) as GraphQLResult<any>;

      const fetchedProjects = projectsData.data.listProjects.items;
      const newProjectsNextToken = projectsData.data.listProjects.nextToken;

      setProjects(fetchMore ? [...projects, ...fetchedProjects] : fetchedProjects);
      setProjectsNextToken(newProjectsNextToken);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsFetchingMoreProjects(false);
    }
  };

  const fetchTeams = async (id: string, nextToken: string | null = null, fetchMore = false) => {
    try {
      const teamsData = await client.graphql({
        query: listTeamsByUser,
        variables: { id, nextToken, limit: 10 },
      }) as GraphQLResult<any>;

      const rawTeams = teamsData?.data?.getUser?.Projects?.items || [];
      const filteredTeams = rawTeams.filter((item: any) => !item.project.ownerIDs.includes(id));
      const transformedTeams = filteredTeams.map((item: any) => item.project);

      setTeams(fetchMore ? [...teams, ...transformedTeams] : transformedTeams);
      setTeamsNextToken(teamsData?.data?.getUser?.Projects?.nextToken);
    } catch (err) {
      console.error('Error fetching teams:', err);
    } finally {
      setIsFetchingMoreTeams(false);
    }
  };

  function AboutTab() {
    const hasContent =
      !!user?.bio ||
      (user?.skills?.length > 0) ||
      (user?.resources?.length > 0) ||
      (user?.links?.length > 0);

    if (!hasContent) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../assets/images/moon.png')}
            style={styles.placeholderImage}
          />
          <Text style={styles.placeholderText}>
            No bio set yet! Simply a person of mystery.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.aboutContainer}>
        {user?.bio && (
          <Text style={styles.bioText} numberOfLines={4}>
            {user.bio}
          </Text>
        )}
        {/* Skills, Resources, and Links */}
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003B7B" />
      </View>
    );
  }

  return (
    <Tabs.Container
      renderHeader={() => <ProfileHeader user={user} otherProfile={!!passedUserID} />}
      renderTabBar={(props) => (
        <MaterialTabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'black', height: 2 }}
        />
      )}
    >
      <Tabs.Tab name="About">
        <Tabs.ScrollView>
          <AboutTab />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Projects">
        <ProfileProjectsScreen userID={userID} />
      </Tabs.Tab>
      <Tabs.Tab name="Teams">
        <ProfileTeamsScreen userID={userID} />
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bioText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#003B7B',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align items towards the top
    alignItems: 'center',
    paddingTop: 50, // Add some padding from the top
    paddingHorizontal: 20,
  },
  placeholderImage: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    borderRadius: 60,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

