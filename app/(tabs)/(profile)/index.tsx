import { Link } from 'expo-router';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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

const windowWidth = Dimensions.get('window').width;

const color = ['red', '#66CCFF', '#FFCC00', '#1C9379', '#8A7BA7'];

const randomColor = () => {
  return color[Math.floor(Math.random() * color.length)];
};

export default function ProfileScreen() {
  const [projects, setProjects] = useState<any>([]);
  const [teams, setTeams] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [projectsNextToken, setProjectsNextToken] = useState<any>(null);
  const [teamsNextToken, setTeamsNextToken] = useState<any>(null);
  const [isFetchingMoreProjects, setIsFetchingMoreProjects] = useState(false);
  const [isFetchingMoreTeams, setIsFetchingMoreTeams] = useState(false);

  const navigation = useNavigation();

  const fetchUserAndProjects = async (nextToken = null, fetchMore = false) => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub;

      const userResult = await API.graphql(
        graphqlOperation(getUser, { id: userID })
      );
      const castedUserResult = userResult as GraphQLResult<any>;
      setUser(castedUserResult.data?.getUser);

      const projectsData = await API.graphql(
        graphqlOperation(listProjects, {
          filter: { ownerIDs: { contains: userID } },
          nextToken: nextToken,
        })
      );
      const castedProjectsData = projectsData as GraphQLResult<any>;
      const fetchedProjects = castedProjectsData.data.listProjects.items;
      const newNextToken = castedProjectsData.data.listProjects.nextToken;

      setProjects(fetchMore ? [...projects, ...fetchedProjects] : fetchedProjects);
      setProjectsNextToken(newNextToken);

      const teamsData = await API.graphql(
        graphqlOperation(listTeamsByUser, { id: userID, nextToken })
      );
      const castedTeamsData = teamsData as GraphQLResult<any>;
      const rawTeams = castedTeamsData?.data?.getUser?.Projects?.items;
      const filteredTeams = rawTeams.filter((item: any) => {
        return !item.project.ownerIDs.includes(userID);
      });
      const transformedTeams = filteredTeams.map((item: any) => item.project);
      setTeams(fetchMore ? [...teams, ...transformedTeams] : transformedTeams);
      setTeamsNextToken(newNextToken);
      
    } catch (err) {
      setError(err);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
      setIsFetchingMoreProjects(false);
      setIsFetchingMoreTeams(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({ 
      title: '', 
      headerRight: () => 
      <Link href={{ pathname: '/settings' }}>
        <Icon name='gear' style={styles.icon} />
      </Link>
    });
    fetchUserAndProjects();
  }, []);

  const loadMoreProjects = async () => {
    if (projectsNextToken && !isFetchingMoreProjects) {
      setIsFetchingMoreProjects(true);
      await fetchUserAndProjects(projectsNextToken, true);
    }
  };

  const loadMoreTeams = async () => {
    if (teamsNextToken && !isFetchingMoreTeams) {
      setIsFetchingMoreTeams(true);
      await fetchUserAndProjects(teamsNextToken, true);
    }
  };

  

  function AboutTab() {
    return (
      <View style={styles.aboutContainer}>
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

  function ProjectsTab() {
    return (
      <View style={styles.tabScreen}>
        <ProjectsGridForProfile 
          projects={projects} 
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMoreProjects}
        />
      </View>
    );
  }

  function TeamsTab() {
    return (
      <View style={styles.tabScreen}>
        <ProjectsGridForProfile 
          projects={teams} 
          loadMoreProjects={loadMoreTeams}
          isFetchingMore={isFetchingMoreTeams}
        />
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
        {/* <Tabs.ScrollView> */}
          <ProjectsTab />
        {/* </Tabs.ScrollView> */}
      </Tabs.Tab>
      <Tabs.Tab name="Teams">
        {/* <Tabs.ScrollView> */}
          <TeamsTab />
        {/* </Tabs.ScrollView> */}
      </Tabs.Tab>
    </Tabs.Container>
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
    paddingHorizontal: 10,
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
    fontSize: 23,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 23,
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
