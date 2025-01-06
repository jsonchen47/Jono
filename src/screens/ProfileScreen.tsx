import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import Emoji from 'react-native-emoji';
import ProfileHeader from '@/src/components/ProfileHeader';
import ProfileProjectsScreen from './ProfileProjectsScreen';
import ProfileTeamsScreen from './ProfileTeamsScreen';
// import { useUser } from '@/path-to/UserContext';
import { useUser } from '../contexts/UserContext';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser, listProjects } from '@/src/graphql/queries';
import { listTeamsByUser } from '@/src/backend/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useFocusEffect } from '@react-navigation/native';


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


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (userID) {
          await fetchUser(userID);
          await fetchProjects(userID);
          await fetchTeams(userID);
        }
      };
      fetchData();
    }, [userID])
  );
  
  useEffect(() => {
    if (contextUser && !passedUserID) {
      setUserData(contextUser); // Sync with context if it's the authenticated user
    }
  }, [contextUser, passedUserID]);
  

  useEffect(() => {
    const fetchData = async () => {
      let currentUserID = passedUserID;

      if (!currentUserID) {
        const authUser = await Auth.currentAuthenticatedUser();
        currentUserID = authUser.attributes.sub;
        setUserID(currentUserID);
      } else {
        setUserID(passedUserID);
      }

      // Fetch user data
      if (!contextUser || passedUserID) {
        await fetchUser(currentUserID);
      }

      // Fetch projects and teams
      await fetchProjects(currentUserID);
      await fetchTeams(currentUserID);
    };

    fetchData();
  }, [passedUserID, contextUser]);

  const fetchUser = async (id: string) => {
    try {
      const userResult = await API.graphql(graphqlOperation(getUser, { id }));
      const castedUserResult = userResult as GraphQLResult<any>;
      const fetchedUser = castedUserResult.data?.getUser;

      if (!passedUserID) {
        setUser(fetchedUser); // Set user in context if this is the current user
      }
      setUserData(fetchedUser); // Update local user state
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const fetchProjects = async (id: string, nextToken: string | null = null, fetchMore = false) => {
    try {
      const projectsData = await API.graphql(
        graphqlOperation(listProjects, {
          filter: { ownerIDs: { contains: id } },
          nextToken: nextToken,
          limit: 10,
        })
      );

      const castedProjectsData = projectsData as GraphQLResult<any>;
      const fetchedProjects = castedProjectsData.data.listProjects.items;
      const newProjectsNextToken = castedProjectsData.data.listProjects.nextToken;

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
      const teamsData = await API.graphql(
        graphqlOperation(listTeamsByUser, {
          id,
          nextToken,
          limit: 10,
        })
      );

      const castedTeamsData = teamsData as GraphQLResult<any>;
      const rawTeams = castedTeamsData?.data?.getUser?.Projects?.items || [];
      const filteredTeams = rawTeams.filter((item: any) => !item.project.ownerIDs.includes(id));
      const transformedTeams = filteredTeams.map((item: any) => item.project);

      setTeams(fetchMore ? [...teams, ...transformedTeams] : transformedTeams);
      setTeamsNextToken(castedTeamsData?.data?.getUser?.Projects?.nextToken);
    } catch (err) {
      console.error('Error fetching teams:', err);
    } finally {
      setIsFetchingMoreTeams(false);
    }
  };

  function AboutTab() {
    return (
      <View style={styles.aboutContainer}>
        <Text style={styles.bioText} numberOfLines={4}>
          {user?.bio}
        </Text>
        <View style={styles.skillsAndResourcesTopPadding}></View>
        <View style={styles.skillsAndResourcesTitleContainer}>
          <Emoji name="rocket" style={styles.emoji} />
          <Text style={styles.subtitle}> Skills</Text>
        </View>
        <View style={styles.skillsAndResourcesChipsContainer}>
          {user?.skills?.map((skill: any, index: any) => (
            <Chip key={index} style={styles.chip} textStyle={styles.chipText}>
              {skill}
            </Chip>
          ))}
        </View>
        <View style={styles.skillsAndResourcesTitleContainer}>
          <Emoji name="briefcase" style={styles.emoji} />
          <Text style={styles.subtitle}> Resources</Text>
        </View>
        <View style={styles.skillsAndResourcesChipsContainer}>
          {user?.resources?.map((resource: any, index: any) => (
            <Chip key={index} style={styles.chip} textStyle={styles.chipText}>
              {resource}
            </Chip>
          ))}
        </View>
        <View style={styles.skillsAndResourcesTitleContainer}>
          <Emoji name="earth_americas" style={styles.emoji} />
          <Text style={styles.subtitle}> Links</Text>
        </View>
        <View style={styles.skillsAndResourcesChipsContainer}>
          {user?.links?.map((link: any, index: any) => (
            <Chip key={index} style={styles.chip} textStyle={styles.chipText}>
              {link}
            </Chip>
          ))}
        </View>
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
        <ProfileProjectsScreen
          userID={userID}
          
        />
      </Tabs.Tab>
      <Tabs.Tab name="Teams">
        <ProfileTeamsScreen
          userID={userID}
          
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  aboutContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bioText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#003B7B',
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
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  skillsAndResourcesChipsContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    alignSelf: 'flex-start',
    margin: 5,
    backgroundColor: 'black',
  },
  chipText: {
    color: 'white',
    fontSize: 13,
  },
});
