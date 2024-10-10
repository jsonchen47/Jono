import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem, Button as Button2 } from 'react-native';
import { Chip, Button as Button3 } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../../../src/graphql/queries'
import { listTeamsByUser } from '@/src/backend/queries';
import { useRouter } from 'expo-router'; 
import ProjectsGrid from '@/src/components/ProjectsGrid';
import ProfileHeader from '@/src/components/ProfileHeader';
import Emoji from 'react-native-emoji';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const color = ['red', '#66CCFF', '#FFCC00', '#1C9379', '#8A7BA7'];

const randomColor = () => {
  let col = color[Math.floor(Math.random() * color.length)];
  return col;
};

export default function ProfileScreen() {

  const [projects, setProjects] = useState<any>([]);
  const [teams, setTeams] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const navigation = useNavigation();

  // FETCH THE USER AND CORRESPONDING PROJECTS
  const fetchUserAndProjects = async () => {
    try {
      // Fetch the Auth user
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub

      // Fetch the Auth user's User object
      const userResult = await API.graphql(
        graphqlOperation(getUser, { id: userID })
      );
      const castedUserResult = userResult as GraphQLResult<any>
      console.log(castedUserResult.data?.getUser)
      setUser(castedUserResult.data?.getUser);

      // Fetch the owned projects
      const projectsData = await API.graphql(graphqlOperation(listProjects, {
        filter: {
          ownerIDs: {
            contains: userID,  
          }
        }
      }));
      const castedProjectsData = projectsData as GraphQLResult<any>
      setProjects(castedProjectsData.data.listProjects.items)

      // Fetch the teams 
      const teamsData = await API.graphql(graphqlOperation(listTeamsByUser, {id: userID}))
      const castedTeamsData = teamsData as GraphQLResult<any>
      const rawTeams = castedTeamsData?.data?.getUser?.Projects?.items
      const filteredTeams = rawTeams.filter((item: any) => { // Filter out projects that have userID in the ownerIDs array
        return !item.project.ownerIDs.includes(userID); // Check if userID is not in the ownerIDs array
      });
      const transformedTeams = filteredTeams.map((item: any) => item.project); // Pull just the projects out and remove the "project" label
      setTeams(transformedTeams)

    } catch (err) {
      setError(err);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // SET TOP NAVIGATION BAR
    navigation.setOptions({ 
      title: '', 
      headerRight: () => 
      <Link
        href={{
          pathname: '/settings',
        }}>
        <Icon name='gear' style={styles.icon} ></Icon>
      </Link>
    });

    // FETCH THE USER AND PROJECTS
    fetchUserAndProjects();
  }, []);

  function AboutTab() {
    return (
        <View style={styles.aboutContainer}>
          {/* Skills */}
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
          {/* Resources */}
          <View style={styles.skillsAndResourcesTitleContainer}>
              <Emoji name="briefcase" style={styles.emoji} />
              <Text style={styles.subtitle}> Resources</Text>
          </View>
          <View style={styles.skillsAndResourcesChipsContainer}>
              {user?.resources?.map((resource: any, index: any) => (
                  <Chip key={index} style={styles.chip} textStyle={styles.chipText}>{resource}</Chip>
              ))}
          </View>
          {/* Links */}
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
        <View style={{paddingTop: windowWidth*0.05}}>
          <ProjectsGrid  projects = {projects}/>
        </View>
    );
  }

  function TeamsTab() {
    return (
      <View style={{paddingTop: windowWidth*0.05}}>
        <ProjectsGrid  projects = {teams}/>
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
          <AboutTab/>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Projects">
        <Tabs.ScrollView>
          <ProjectsTab/>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Teams">
        <Tabs.ScrollView>
          <TeamsTab/>
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    display:"flex",
    fontSize: 20,
    paddingRight: 10,
  },
  // About tab
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
    fontSize: 15
}, 
});
