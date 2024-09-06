import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Link } from 'expo-router';
import { View, StyleSheet, Image, ScrollView, Animated, Dimensions, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Text } from '@ui-kitten/components';
import { tSImportEqualsDeclaration } from '@babel/types';
import { FlatGrid } from 'react-native-super-grid';


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
  {
    id: 3,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
  },
  {
    id: 4,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
  },
  {
    id: 5,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
  },
  {
    id: 6,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
  },
  {
    id: 7,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
  },
];

type ItemProps = {
  title: string
  image: any
};

const Item = ({title, image}: ItemProps) => (
  <View style={styles.browseProjectsView}>
    <Text>{title}</Text>
    <Image style={styles.browseProjectImages} source={image} />
  </View>
);

// // To test the flatlist
// export default function ExploreScreen() {
//   return (
//     <View style={styles.container}>
        
//       <FlatList
      
//         columnWrapperStyle={styles.columnWrapper} 
//         horizontal={false}
//         numColumns={2}
//         data={sampleProjects}
//         renderItem={({item}) => (
//           <View>
//             <Item title={item.title} image={item.image}/>
//           </View>
//         )}
//         keyExtractor={item => item.id.toString()}
//         // contentContainerStyle={styles.flatListContent} 
//         ListHeaderComponentStyle={styles.headerStyle}
//         ListHeaderComponent={
//           <View style={styles.headerStyle}>
//             <ScrollView horizontal={true}>
//               {/* <Ionicons name="checkmark-circle" size={32} />
//               <Ionicons name="checkmark-circle" size={32} /> */}
//               {sampleCategories.map((category) => (
//               <View style={styles.categories} key={category.id} >
//                 {/* Image */}
//                 <Ionicons name={category.icon} size={32} style={styles.icon} />
//                 {/* Text */}
//                 <Text style={styles.categoryLabel}>{category.name}</Text>
//                 </View>
//               ))}
//             </ScrollView>
//             {/* Newly added projects */}
//             <Text style={styles.headerText}>Newly Added</Text>
//             <ScrollView horizontal>
//               {sampleProjects.map((project) => (
//                 <View key={project.id} style={styles.largeProjectsView} >
//                   {/* Image */}
//                   <Image 
//                   style={styles.largeProjectsImages}
//                   source={project.image} 
//                   />
//                   {/* Text */}
//                   <Text>{project.title}</Text>
//                 </View>
//               ))}
//             </ScrollView>
//             {/* Browse */}
//             <Text style={styles.headerText}>Browse</Text>
//           </View>
//         }
//       />
      
//     </View>
//   );
// }


// To test the simplegrid

// To test the flatlist
export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.headerStyle}>
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
        {/* Browse */}
        <Text style={styles.headerText}>Browse</Text>
        <FlatGrid
          itemDimension={windowWidth/2.5}
          data={sampleProjects}
            renderItem={({item}) => (
            <View>
              <Item title={item.title} image={item.image}/>
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
    padding: 15,
  },
  largeProjectsImages: {
    width: windowWidth/1.5, 
    height: windowHeight/3,
    paddingBottom: 15,
    borderRadius: 5, 
  },
  browseProjectsView: {
    // width: windowWidth/2, 
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectImages: {
    width: windowWidth/2.5, 
    height: windowHeight/7,
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
  }
});



