import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';




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
            Press me
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        </View>
      </View>
      <Icon name="rocket"></Icon>
  <Text>hello</Text>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
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
  }
});
