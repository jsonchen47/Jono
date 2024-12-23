import { Link } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../graphql/queries';
import { listTeamsByUser } from '@/src/backend/queries';
import ProjectsGridNew from '@/src/components/ProjectsGridNew';
import ProfileHeader from '@/src/components/ProfileHeader';
import Emoji from 'react-native-emoji';
import ProjectsGridForProfile from '@/src/components/ProjectsGridForProfile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileProjectsScreen from './ProfileProjectsScreen';
import ProfileTeamsScreen from './ProfileTeamsScreen';

export default function ProfileScreen() {
  const [projects, setProjects] = useState<any>([]);
  const [teams, setTeams] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [userID, setUserID] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [projectsNextToken, setProjectsNextToken] = useState<any>(null);
  const [teamsNextToken, setTeamsNextToken] = useState<any>(null);
  const [isFetchingMoreProjects, setIsFetchingMoreProjects] = useState(false);
  const [isFetchingMoreTeams, setIsFetchingMoreTeams] = useState(false);

  const navigation = useNavigation();

  const fetchUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub;
      setUserID(userID)
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

  const fetchProjects = async (nextToken = null, fetchMore = false) => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub;
      const projectsData = await API.graphql(
        graphqlOperation(listProjects, {
          filter: { ownerIDs: { contains: userID } },
          nextToken: nextToken,
          limit: 10
        })
      );
      const castedProjectsData = projectsData as GraphQLResult<any>;
      const fetchedProjects = castedProjectsData.data.listProjects.items;
      const newProjectsNextToken = castedProjectsData.data.listProjects.nextToken;

      setProjects(fetchMore ? [...projects, ...fetchedProjects] : fetchedProjects);
      // setProjects((prevProjects: any) => fetchMore ? [...prevProjects, ...fetchedProjects] : fetchedProjects);

      setProjectsNextToken(newProjectsNextToken);
    } catch (err) {
      setError(err);
      console.error("Error fetching projects:", err);
    } finally {
      setIsFetchingMoreProjects(false);
    }
  };

  const fetchTeams = async (nextToken = null, fetchMore = false) => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub;
      const teamsData = await API.graphql(
        graphqlOperation(listTeamsByUser, { id: userID, nextToken, limit: 4 })
      );
      const castedTeamsData = teamsData as GraphQLResult<any>;
      const rawTeams = castedTeamsData?.data?.getUser?.Projects?.items;
      const filteredTeams = rawTeams.filter((item: any) => {
        return !item.project.ownerIDs.includes(userID);
      });
      const transformedTeams = filteredTeams.map((item: any) => item.project);

      setTeams(fetchMore ? [...teams, ...transformedTeams] : transformedTeams);
      setTeamsNextToken(castedTeamsData.data.getUser?.Projects?.nextToken);
    } catch (err) {
      setError(err);
      console.error("Error fetching teams:", err);
    } finally {
      setIsFetchingMoreTeams(false);
    }
  };

  useEffect(() => {
    // Fetch all data on component mount
    const fetchData = async () => {
      setLoading(true);
      await fetchUser();
      await fetchProjects();
      await fetchTeams();
      setLoading(false);
    };
    fetchData();
  }, []);

  const loadMoreProjects = async () => {
    if (projectsNextToken && !isFetchingMoreProjects) {
      setIsFetchingMoreProjects(true);
      await fetchProjects(projectsNextToken, true);
    }
  };

  const loadMoreTeams = async () => {
    if (teamsNextToken && !isFetchingMoreTeams) {
      setIsFetchingMoreTeams(true);
      await fetchTeams(teamsNextToken, true);
    }
  };

  function AboutTab() {
    return (
      <View style={styles.aboutContainer}>
        <View>
          <Text style={styles.bioText} numberOfLines={4}>
            {user?.bio}
          </Text>
        </View>
        <View style={styles.skillsAndResourcesTopPadding}></View>
        <View style={styles.skillsAndResourcesTitleContainer}>
          <Emoji name="rocket" style={styles.emoji} />
          <Text style={styles.subtitle}> Skills</Text>
        </View>
        <View style={styles.skillsAndResourcesChipsContainer}>
          {user?.skills?.map((skill: any, index: any) => (
            <Chip key={index} style={styles.chip} textStyle={styles.chipText}>{skill}</Chip>
          ))}
        </View>
        <View style={styles.skillsAndResourcesTitleContainer}>
          <Emoji name="briefcase" style={styles.emoji} />
          <Text style={styles.subtitle}> Resources</Text>
        </View>
        <View style={styles.skillsAndResourcesChipsContainer}>
          {user?.resources?.map((resource: any, index: any) => (
            <Chip key={index} style={styles.chip} textStyle={styles.chipText}>{resource}</Chip>
          ))}
        </View>
        <View style={styles.skillsAndResourcesTitleContainer}>
          <Emoji name="earth_americas" style={styles.emoji} />
          <Text style={styles.subtitle}> Links</Text>
        </View>
        <View style={styles.skillsAndResourcesChipsContainer}>
          {user?.links?.map((link: any, index: any) => (
            <Chip key={index} style={styles.chip} textStyle={styles.chipText}>{link}</Chip>
          ))}
        </View>
      </View>
    );
  }

  return (
    <Tabs.Container 
      renderHeader={() => <ProfileHeader user={user} />}
      renderTabBar={props => (
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
        <ProfileProjectsScreen userID={userID}/>
      </Tabs.Tab>
      <Tabs.Tab name="Teams">
        <ProfileTeamsScreen userID={userID}/>
      </Tabs.Tab>
    </Tabs.Container>
    // <SafeAreaView style={{flex: 1}}>
    //   <Tab.Navigator>
    //     <Tab.Screen
    //       name="About"
    //       component={AboutTab}
    //     />
    //     <Tab.Screen
    //       name="Projects"
    //       children={() => <ProfileProjectsScreen category="" />}
    //     />
    //     <Tab.Screen
    //       name="Teams"
    //       component={TeamsTab}
    //     />
    //   </Tab.Navigator>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    display: "flex",
    fontSize: 20,
    paddingRight: 10,
  },
  aboutContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bioText: {
    fontSize: 21, 
    fontWeight: 'bold',
    color: '#003B7B'
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
