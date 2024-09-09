import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Link, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Text } from '@ui-kitten/components';
import { tSImportEqualsDeclaration } from '@babel/types';
import { FlatGrid } from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';



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
    title: 'Renewable energy powered robot to clean oceans',
    image: require('../../../assets/images/solar.png'),
    author: 'Barack Obama',
    description: "",
  },
  {
    id: 2,
    title: 'Wave-powered method to desalinate water',
    image: require('../../../assets/images/cleanocean.jpg'),
    author: 'Jennifer Lawrence',
    description: '',
  },
  {
    id: 3,
    title: 'App that automatically translates to pinyin',
    image: require('../../../assets/images/chinese.png'),
    author: 'Steve Carrel',
    description: '',
  },
  {
    id: 4,
    title: 'Advertising to help the homeless',
    image: require('../../../assets/images/homeless.png'),
    author: 'Ryan Reynolds',
    description: '',
  },
  {
    id: 5,
    title: 'Genetically modified camel',
    image: require('../../../assets/images/camel.png'),
    author: 'Pablo Picasso',
    description: '',
  },
  {
    id: 6,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
  },
  {
    id: 7,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
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
        style={styles.linearGradientBrowse}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}>
      </LinearGradient>
    </View>
    <View style={styles.overImageTextViewBrowse}>
      <Text style={styles.browseProjectsText}>{title}</Text>  
      <Text style={styles.browseAuthorText}>
          {author}
      </Text>
    </View>
  </View>
);

// To test the FlatGrid
export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.headerStyle}>
        {/* Categories */}
        <ScrollView horizontal={true}>
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
            // <Link href="/details">
            <Link href={{
              pathname: `/project/[id]`,
              params: { 
                title: project.title, 
                author: project.author, 
                description: project.description,
                image: project.image 
              }
            }}>
              <View key={project.id} style={styles.largeProjectsView} >
                {/* Image */}
                <Image 
                style={styles.largeProjectsImages}
                source={project.image} 
                />
                {/* Background gradient */}
                <View style={styles.linearGradientView}>
                  <LinearGradient 
                    style={styles.linearGradient}
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}>
                  </LinearGradient>
                  {/* Text */}
                  <View style={styles.overImageTextView}>
                    <Text style={styles.projectDescriptionText}>{project.title}</Text>
                    <Text style={styles.newlyAddedAuthorText}>
                      {project.author}
                    </Text>
                  </View>
                </View>
              </View>
            </Link>
             
          ))}
        </ScrollView>
        {/* Browse */}
        <Text style={styles.headerText}>Browse</Text>
        <FlatGrid
          itemDimension={windowWidth/2.2}
          data={sampleProjects}
            renderItem={({item}) => (
            <View>
              <Item title={item.title} image={item.image} author={item.author}/>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 10,
  },
  largeProjectsImages: {
    width: windowWidth/1.5, 
    height: windowHeight/3,
    paddingBottom: 15,
    borderRadius: 5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectImages: {
    width: windowWidth/2.2, 
    height: windowHeight/5,
    borderRadius: 5, 
  },
  columnWrapper: {
    justifyContent: 'space-between', // Ensure equal spacing between columns
  },
  flatListContent: {
    paddingHorizontal: (windowWidth-2*(windowWidth/2.5))/3, // Padding on the left and right
  },
  headerStyle: {
    paddingHorizontal: 0,
  },
  overImageTextView: {
    top: 30,  // Set to top of the image
    left: 30, // Set to the left side
    right: 30, // Set to the right side
    bottom: 15, // Set to the bottom side, so it covers the image
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  projectDescriptionText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    justifyContent: 'flex-end',
  },
  newlyAddedAuthorText: {
    // fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    justifyContent: 'flex-end',
    paddingTop: 5,
  },
  linearGradient: {
    width: windowWidth/1.5, 
    height: windowHeight/3/1.5,
    borderRadius: 5, 
  },
  linearGradientView: {
    top: 0,  // Set to top of the image
    left: 0, // Set to the left side
    right: 0, // Set to the right side
    bottom: 0, // Set to the bottom side, so it covers the image
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }, 
  browseProjectsText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    justifyContent: 'flex-end',
  }, 
  overImageTextViewBrowse: {
    top: 15,  // Set to top of the image
    left: 15, // Set to the left side
    right: 15, // Set to the right side
    bottom: 15, // Set to the bottom side, so it covers the image
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  linearGradientBrowse: {
    width: windowWidth/2.2, 
    height: windowHeight/5/1.5,
    borderRadius: 5, 
  },
  browseAuthorText: {
    fontSize: 10,
    color: 'white',
    justifyContent: 'flex-end',
    paddingTop: 5,
  }
});



