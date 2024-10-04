import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem, Button as Button2 } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Chip, Button as Button3 } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { FlatGrid } from 'react-native-super-grid';
import { Tabs } from 'react-native-collapsible-tab-view'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ProjectsScreen from '../../../src/screens/ProjectsScreen';
import {listProjects} from '../../../src/backend/queries'
import ProjectsGrid from '@/src/components/ProjectsGrid';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const sampleProjects = [
  {
    id: 1,
    title: 'Renewable energy powered robot to clean oceans',
    image: require('../../../assets/images/solar.png'),
    author: 'Barack Obama',
    description: 'This robot will be powered by solar power as well as the mechanical movement of the waves. I am looking for some engineers who are interested in working with me on the project.',
    skills: ['Engineering', 'Coding', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 2,
    title: 'Wave-powered method to desalinate water',
    image: require('../../../assets/images/cleanocean.jpg'),
    author: 'Jennifer Lawrence',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 3,
    title: 'App that automatically translates to pinyin',
    image: require('../../../assets/images/chinese.png'),
    author: 'Steve Carrel',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 4,
    title: 'Advertising to help the homeless',
    image: require('../../../assets/images/homeless.png'),
    author: 'Ryan Reynolds',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 5,
    title: 'Genetically modified camel',
    image: require('../../../assets/images/camel.png'),
    author: 'Pablo Picasso',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 6,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 7,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
];

type ItemProps = {
  title: string
  image: any
  author: string
};

const Item = ({title, image, author, }: ItemProps) => (
  <View style={styles.browseProjectsView}>
    <Image style={styles.browseProjectImages} source={image} />
    <View style={styles.linearGradientView}>
      <LinearGradient 
        style={styles.browseLinearGradient}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}>
      </LinearGradient>
    </View>
    <View style={styles.browseOverImageTextView}>
      <Text style={styles.browseProjectsText}>{title}</Text>  
      <Text style={styles.browseAuthorText}>
          {author}
      </Text>
    </View>
  </View>
);

const color = ['red', '#66CCFF', '#FFCC00', '#1C9379', '#8A7BA7'];

const randomColor = () => {
  let col = color[Math.floor(Math.random() * color.length)];
  return col;
};

const Tab = createMaterialTopTabNavigator();

const user = 
{
  id: 1,
  name: "Barack Obama",
  username: '@obamamama',
  bio: 'I’m a painter, musician, and part-time president',
  image: require('../../../assets/images/obama.jpeg'),
  email: "john.doe@example.com",
  numProjects: 7,
  numTeams: 7, 
  numConnections: 322,
  skills: ["React", "JavaScript", "Node.js"],
  resources: ["Laptop", "Online Tutorials"]
};

const Header = () => {
  return (
    <SafeAreaView pointerEvents='box-none'>
    <View pointerEvents='box-none' style={styles.container}>
        {/* Top content */}
        <View pointerEvents='box-none' style={styles.topContent}>
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={{fontWeight: '500'}}>{user.username}</Text>
            {/* Stats */}
            <View style={styles.allStatsContainer}>
              <View style={styles.statContainer}>
                <Text style={styles.statNumber}>{user.numProjects}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.statContainer}>
                <Text style={styles.statNumber}>{user.numTeams}</Text>
                <Text style={styles.statLabel}>Teams</Text>
              </View>
              {/* Connections */}
              <Link
                href={{
                  pathname: '/connections',
                }}>
                <View style={styles.statContainer}>
                  <Text style={styles.statNumber}>{user.numConnections}</Text>
                  <Text style={styles.statLabel}>Connections</Text>
                </View>
              </Link>
              
            </View>
          </View>
          {/* Profile picture */}
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={user.image}/>
          </View>
        </View>
        {/* Bio */}
        <Text style={styles.bio}>{user.bio}</Text>
        {/* Buttons */}
        <View style={styles.allButtonsContainer}>
          <View style={styles.buttonContainer}>
            <Button3   
              style={styles.button} 
              mode="outlined" 
              onPress={() => console.log('Pressed')} 
              textColor="black"
              contentStyle={{ paddingVertical: 0, paddingHorizontal: 8 }}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Button3>

          </View>
          <View style={{padding: 5}}></View>
          <View style={styles.buttonContainer}>
            <Button3  
              style={styles.button} 
              mode="outlined" 
              onPress={() => console.log('Pressed')} 
              textColor="black"
            >
              <Text style={styles.buttonText}>Share Profile</Text>
            </Button3>
          </View>
        </View>
        
      </View>
      </SafeAreaView>
  );
}

function JoinedScreen() {
  return (
    <View >
      <Text>Join!</Text>
    </View>
  );
}

export default function ProfileScreen() {

  const navigation = useNavigation();
  useEffect(() => {
    // Set the header title to the user's name
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
  }, [navigation]);

  function ProjectsTab() {
    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState<any>(true);
    const [error, setError] = useState<any>(null);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const projectData = await API.graphql(graphqlOperation(listProjects));
          const castedProjectData = projectData as GraphQLResult<any>
          setProjects(castedProjectData.data.listProjects.items);
        } catch (err) {
          setError(err);
          console.error("Error fetching projects:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }, []);

    if (loading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error fetching projects: {error.message}</Text>;
    }
    return (

      
        <ScrollView>
          
           
              <ProjectsGrid projects = {projects}/>

            
        </ScrollView>
    );
  }


  return (
    // <View style={styles.flatListContainer}>
    <Tabs.Container 
      renderHeader={Header}
    >
      <Tabs.Tab name="About">
        <View>
        </View>
      </Tabs.Tab>
      <Tabs.Tab name="Projects">
        {/* <Tabs.ScrollView> */}
          <ProjectsTab/>
        {/* </Tabs.ScrollView> */}
      </Tabs.Tab>
      <Tabs.Tab name="Teams">
        <View></View>
      </Tabs.Tab>
      
      
    </Tabs.Container>
    // </View>

    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 25,
    paddingRight: 25, 
    paddingTop: 25,
    paddingBottom: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageContainer: {
 
  },
  topContent: {
    flexDirection: 'row',
    // padding: 30,
    justifyContent: 'space-between',
    width: '100%',
 
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
    // padding: 10,
  },
  allStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10
  },
  statContainer: {
    paddingRight: 10,
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 17,
    fontWeight: '700',
    
  }, 
  statLabel: {

  },
  bio: {
    paddingTop: 10,
  },
  allButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    // paddingLeft: 5,
    // paddingRight: 5,
    // alignSelf: 'stretch',
    // width: '50%'
  },
  button: {
    alignSelf: 'stretch',
    width: '100%',
    borderRadius: 10,
    height: 45,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonText: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 15,
  },
  allChipsContainer: {
    // margin: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
  },
  singleChipContainer: {
    paddingRight: 10,
  },
  chip: {
    color:'white',
    fontSize: 12,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    display:"flex",
    fontSize: 20,
    paddingRight: 10,
  },
  subtitleContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Browse styles
  linearGradientView: {
    top: 0,  // Set to top of the image
    left: 0, // Set to the left side
    right: 0, // Set to the right side
    bottom: 0, // Set to the bottom side, so it covers the image
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }, 
  flatListContent: {
    paddingHorizontal: (windowWidth-2*(windowWidth/2.5))/3, // Padding on the left and right
  },
  browseProjectsView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  browseProjectImages: {
    width: windowWidth/2.1, 
    height: windowHeight/5,
    borderRadius: 15, 
  },
  browseProjectsText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    justifyContent: 'flex-end',
  }, 
  browseOverImageTextView: {
    top: 15,  // Set to top of the image
    left: 15, // Set to the left side
    right: 15, // Set to the right side
    bottom: 15, // Set to the bottom side, so it covers the image
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  browseLinearGradient: {
    width: windowWidth/2.2, 
    height: windowHeight/5/1.5,
    borderRadius: 15, 
  },
  browseAuthorText: {
    fontSize: 10,
    color: 'white',
    justifyContent: 'flex-end',
    paddingTop: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: windowWidth / 2.2, // Control the size of each grid item
    height: 150, // Fixed height for each grid item
    backgroundColor: '#dcdcdc',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  projectsHeader: {
    paddingTop: 40, 
    fontSize: 20,
    fontWeight: 'bold'
  },
  flatListContainer: {
    // paddingHorizontal: 5,
  }, 
  flatListColumnWrapper: {
    justifyContent: 'space-between', // Evenly space out the columns
  },
});
