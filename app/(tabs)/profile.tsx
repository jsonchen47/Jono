import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function ProfileScreen() {
  const user = 
{
  id: 1,
  name: "Barack Obama",
  username: '@obamamama',
  bio: 'I’m a painter, musician, and part-time president',
  image: require('../../assets/images/obama.jpeg'),
  email: "john.doe@example.com",
  projects: 47,
  teams: 47, 
  connections: 322,
  skills: ["React", "JavaScript", "Node.js"],
  resources: ["Laptop", "Online Tutorials"]
};

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={{fontWeight: '500'}}>{user.username}</Text>
          {/* Stats */}
          <View style={styles.allStatsContainer}>
            <View style={styles.stat}>
              <Text>{user.projects}</Text>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={user.image}/>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imageContainer: {
    // padding: 30,
    // justifyContent: 'flex-end',
  },
  topContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
    width: windowWidth,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
    // padding: 10,
  },
  allStatsContainer: {
    flexDirection: 'row',
  },
  stat: {
    padding: 30,
  }
});
