import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ProjectsScreen from '../../../src/screens/ProjectsScreen';
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function FeedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed!</Text>
    </View>
  );
}

const Header = () => {
  const router = useRouter(); 
  return (
    <View style={styles.searchBarContainer}>
        <TouchableOpacity style={styles.searchButton}
          onPress={() => 
            router.push('/search')
          } 
        >
          <Ionicons name='search' style={styles.searchButtonIcon}/>
          <Text style={styles.searchButtonText}>Assemble the perfect team</Text>
        </TouchableOpacity>
          <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => 
            console.log('Filter button pressed')
          } 
          >
          <FontAwesome6 name="sliders" size={18} />
        </TouchableOpacity>
    </View>
  )
}

const ScrollableProjectsScreen = ({ category }: any) => {
    return (
      <ScrollView>
        <ProjectsScreen category = {category}/>
      </ScrollView>
    );
  };

const Tab = createMaterialTopTabNavigator();

interface tabBarLabelProps {
    label: any, 
    IconComponent: any, 
    icon: any, 
    focused: boolean, 
  }

// Custom tab bar label component
const TabBarLabel = ({ label, IconComponent, icon, focused }: tabBarLabelProps) => (
  <View style={styles.tabLabelContainer}>
    <IconComponent name={icon} size={17} color={focused ? 'black' : 'gray'} /> 
    <Text style={[styles.tabLabel, { color: focused ? 'black' : 'gray' }]}>
      {label}
    </Text>
  </View>
);

function MyTabs() {
  return (

    <SafeAreaView style={{flex: 1}}>
      <Header/>
    
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white' },
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 'auto' },
        tabBarIndicatorStyle: { 
          backgroundColor: 'black', // Set the indicator color here
          height: 2, // Optional: set the indicator height
          width: 0.5, 
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        // component={ScrollableProjectsScreen }
        children={() => <ScrollableProjectsScreen category="" />}
        options={{
            tabBarLabel: ({ focused }) => <TabBarLabel label="Home" IconComponent={FontAwesome6} icon="star" focused={focused} />
        }} 
      />
      <Tab.Screen
        name="Health"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Health" IconComponent={Fontisto} icon="heartbeat" focused={focused} />
      }} 
      />
      <Tab.Screen
        name="Finance"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Finance" IconComponent={FontAwesome6} icon="sack-dollar" focused={focused} />
      }} 
      />
      <Tab.Screen
        name="Tech"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Tech" IconComponent={MaterialCommunityIcons} icon="robot-industrial" focused={focused} />
      }} 
      />
      <Tab.Screen
        name="Politics"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Politics" IconComponent={Entypo} icon="globe" focused={focused} />
      }} 
      />
       <Tab.Screen
        name="Education"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Education" IconComponent={FontAwesome6} icon="book" focused={focused} />
        }} 
      />
       <Tab.Screen
        name="Environment"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Education" IconComponent={FontAwesome6} icon="leaf" focused={focused} />
        }} 
      />
       <Tab.Screen
        name="Social Justice"
        component={FeedScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Home" IconComponent={FontAwesome6} icon="scale-balanced" focused={focused} />
      }} 
      />
    </Tab.Navigator>
    </SafeAreaView>
  );
}
export default function App() {
  return (
      
      <SafeAreaView style={{flex: 1}}>
      <MyTabs />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabLabelContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  tabLabel: {
    // marginLeft: 7, // Space between icon and label
    marginTop: 3, 
    fontSize: 12,
  },
   // Search Bar
   searchBarContainer: {
    marginHorizontal: windowWidth*0.05, 
    marginTop: 10, 
    marginBottom: 2, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: 'lightgray',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10, 
    borderRadius: 30, // This gives the rounded corners
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchButtonIcon: {
    fontSize: 20,
    paddingRight: 10,
  }, 
  searchButtonText: {
    color: '#4C4C4C',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  filterButton: {
    height: 35, 
    width: 35, 
    borderRadius: 20, 
    backgroundColor: 'white', 
    position: 'absolute',
    right: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  filterButtonContainer: {
    width: windowWidth*0.87,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'flex-end',
  }
})
