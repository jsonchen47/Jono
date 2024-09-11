import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const color = ['red', '#66CCFF', '#FFCC00', '#1C9379', '#8A7BA7'];

const randomColor = () => {
  let col = color[Math.floor(Math.random() * color.length)];
  return col;
};

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const user = 
{
  id: 1,
  name: "Barack Obama",
  username: '@obamamama',
  bio: 'I’m a painter, musician, and part-time president',
  image: require('../../assets/images/obama.jpeg'),
  email: "john.doe@example.com",
  numProjects: 47,
  numTeams: 47, 
  numConnections: 322,
  skills: ["React", "JavaScript", "Node.js"],
  resources: ["Laptop", "Online Tutorials"]
};

  return (
    // <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        {/* Top content */}
        <View style={styles.topContent}>
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
              <View style={styles.statContainer}>
                <Text style={styles.statNumber}>{user.numConnections}</Text>
                <Text style={styles.statLabel}>Connections</Text>
              </View>
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
            <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
              Edit
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              Share
            </Button>
          </View>
        </View>
        {/* Skills */}
        <View style={styles.subtitleContainer}>
            {/* <Ionicons name={'extension-puzzle-outline'} size={32} style={styles.icon} /> */}
            <Icon name='atom' style={styles.icon}></Icon>
            <Text style={styles.subTitle}>Skills </Text>
          </View>
          <View style={styles.allChipsContainer}>
            {user.skills.map((skill: string, index: number) => (
              <View style={styles.singleChipContainer}>
                <Chip 
                  key={index}
                  textStyle={{ color:'white',fontSize: 14 }}
                  style={{ backgroundColor: randomColor() }} >
                    {skill}
                </Chip>
              </View>
            ))}
          </View>
          {/* Resources */}
          <View style={styles.subtitleContainer}>
            <Icon name='suitcase' style={styles.icon}></Icon>
            <Text style={styles.subTitle}>Resources </Text>
          </View>
          <View style={styles.allChipsContainer}>
            {user.resources.map((resource: string, index: number) => (
              <View style={styles.singleChipContainer}>
                <Chip 
                  key={index}
                  textStyle={{ color:'white',fontSize: 14 }}
                  style={{ backgroundColor: randomColor() }} >
                    {resource}
                </Chip>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.subTitle}>Projects</Text>
          </View>
      </View>
        <Tab.Navigator>
          <Tab.Screen name="Owned" component={HomeScreen} />
          <Tab.Screen name="Joined" component={SettingsScreen} />
        </Tab.Navigator>
    </ScrollView>
    
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 30,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imageContainer: {
    // padding: 30,
    // justifyContent: 'flex-end',
    // flexShrink: 1,  
  },
  topContent: {
    flexDirection: 'row',
    // padding: 30,
    justifyContent: 'space-between',
    width: '100%',
    // width: windowWidth,
    // flexBasis: 'auto',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
    // padding: 10,
  },
  allStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
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
    paddingTop: 20,
  },
  allButtonsContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    // alignSelf: 'stretch',
    // width: '50%'
  },
  button: {
    // alignSelf: 'stretch',
    // width: '100%'
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
    paddingBottom: 10,
  },
  singleChipContainer: {
    paddingRight: 10,
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
  }
});
