import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Link } from 'expo-router';
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Text } from '@ui-kitten/components';
import { tSImportEqualsDeclaration } from '@babel/types';

// const av = new Animated.Value(0);
// av.addListener(() => {return});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type IconName = 
  | 'checkmark-circle'
  | 'book-outline'
  | 'leaf-outline'
  | 'medkit-outline'
  | 'cash-outline'
  | 'body-outline'
  | 'cog-outline'
  | 'globe-outline'
  // Add other icon names here
  ;

interface Category {
  id: number;
  name: string;
  icon: IconName;
}

const sampleCategories: Category[] = [
  {
    id: 1, 
    icon: "medkit-outline",
    name: 'Health',
  },
  {
    id: 2, 
    icon: "book-outline",
    name: 'Education',
  }, 
  {
    id: 3, 
    icon: "leaf-outline",
    name: 'Environment',
  },
  {
    id: 4, 
    icon: "cash-outline",
    name: 'Finance',
  },
  {
    id: 5, 
    icon: "body-outline",
    name: 'Social Justice',
  },
  {
    id: 6, 
    icon: "cog-outline",
    name: 'Technology',
  },
  {
    id: 7, 
    icon: "globe-outline",
    name: 'Politics',
  },
]

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
      <ScrollView horizontal={true}>
        <Ionicons name="checkmark-circle" size={32} />
        <Ionicons name="checkmark-circle" size={32} />
      </ScrollView>

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
    <View style={styles.container}>
      <ScrollView>
        <ScrollView horizontal={true}>
          {/* <Ionicons name="checkmark-circle" size={32} />
          <Ionicons name="checkmark-circle" size={32} /> */}
          {sampleCategories.map((category) => (
          <View style={styles.categories} key={category.id} >
            {/* Image */}
            <Ionicons name={category.icon} size={32} style={styles.icon} />
            
            {/* Text */}
            <Text style={styles.categoryLabel}>{category.name}</Text>
          </View>
          ))}
        </ScrollView>
        {/* Newly added projects */}
        <Text style={styles.headerText}>Newly Added</Text>
        <ScrollView horizontal>
        {sampleProjects.map((project) => (
        <View key={project.id} style={styles.largeProjectsView} >
          {/* Image */}
          <Image 
            style={styles.largeProjectsImages}
            source={project.image} 
          />
          {/* Text */}
          <Text>{project.title}</Text>
        </View>
        ))}
        </ScrollView>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  categories: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 12,
  },
  headerText: {
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  largeProjectsView: {
    padding: 15,
  },
  largeProjectsImages: {
    width: windowWidth/2, 
    height: windowHeight/5,
    paddingBottom: 15,
  }
});
