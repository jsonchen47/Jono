import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Link } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Text } from '@ui-kitten/components';

const sampleProjects = [
  {
    id: 1,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
  },
  {
    id: 2,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
  },
];

function ProjectsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>Projects!</Text> */}
      {/* <Ionicons name="checkmark-circle" size={32} /> */}

      {sampleProjects.map((project) => (
        <View key={project.id} >
          {/* Image */}
          <Image 
            style={{width: 50, height: 50}}
            source={project.image} 
          />
          {/* Text */}
          <Text>{project.title}</Text>
        </View>
      ))}
        {/* <Card>
          <Text>
            The Maldives, officially the Republic of Maldives, is a small country in South Asia,
            located in the Arabian Sea of the Indian Ocean.
            It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
          </Text>
        </Card> */}
    </View>
  );
}

function PeopleScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>People!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function ExploreScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="People" component={PeopleScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
});
