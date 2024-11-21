import React, {useEffect, useState} from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ProjectsScreen from '../../../src/screens/ProjectsScreen';
import { router, useRouter } from 'expo-router';
import ProjectsScreenFYP from '@/src/screens/ProjectsScreenFYP';
import { RouterStore } from 'expo-router/build/global-state/router-store';
import { useProgress } from '@/src/contexts/ProgressContext';
import { Snackbar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = () => {
  const router = useRouter(); 
  const { deleted, setDeleted } = useProgress();
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
          onPress={() => {
            console.log('Filter button pressed')
            setDeleted(true)
          }}
          >
          <FontAwesome6 name="sliders" size={15} style={{fontWeight: '100'}}/>
        </TouchableOpacity>
    </View>
  )
}

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
    <IconComponent name={icon} size={20} color={focused ? 'black' : 'dimgray'} /> 
    <Text style={[styles.tabLabel, { color: focused ? 'black' : 'dimgray' }]}>
      {label}
    </Text>
  </View>
);

function MyTabs() {
  return (

    <SafeAreaView style={styles.safeAreaView}>
      <Header/>
    
    <Tab.Navigator
      initialRouteName="For You"
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
        swipeEnabled: false, 
      }}
    >
      <Tab.Screen
        name="For You"
        children={() => <ProjectsScreenFYP category="" />}
        options={{
            tabBarLabel: ({ focused }) => <TabBarLabel label="For You" IconComponent={FontAwesome5} icon="home" focused={focused} />
        }} 
      />
      <Tab.Screen
        name="All"
        children={() => <ProjectsScreen category="" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="All" IconComponent={FontAwesome6} icon="star" focused={focused} />
      }} 
      />
      <Tab.Screen
        name="Health"
        children={() => <ProjectsScreen category="health" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Health" IconComponent={Fontisto} icon="heartbeat" focused={focused} />
      }} 
      />
      <Tab.Screen
        name="Finance"
        children={() => <ProjectsScreen category="finance" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Finance" IconComponent={FontAwesome6} icon="sack-dollar" focused={focused} />
      }} 
      />
      <Tab.Screen
        name="Tech"
        children={() => <ProjectsScreen category="tech" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Tech" IconComponent={MaterialCommunityIcons} icon="robot-industrial" focused={focused} />
      }} 
      />
      <Tab.Screen
        name="Politics"
        children={() => <ProjectsScreen category="politics" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Politics" IconComponent={Entypo} icon="globe" focused={focused} />
      }} 
      />
       <Tab.Screen
        name="Education"
        children={() => <ProjectsScreen category="education" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Education" IconComponent={FontAwesome6} icon="book" focused={focused} />
        }} 
      />
       <Tab.Screen
        name="Environment"
        children={() => <ProjectsScreen category="environment" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Education" IconComponent={FontAwesome6} icon="leaf" focused={focused} />
        }} 
      />
       <Tab.Screen
        name="Social Justice"
        children={() => <ProjectsScreen category="social justice" />}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel label="Home" IconComponent={FontAwesome6} icon="scale-balanced" focused={focused} />
      }} 
      />
    </Tab.Navigator>
    {/* <View>  */}
      <TouchableOpacity 
        style={styles.mapButton}
        onPress={() => 
          router.push('/map')
        } 
      >
        <Text style={styles.mapButtonText}>
          Map
        </Text>
        <Ionicons name='map' style={styles.mapIcon}/>
      </TouchableOpacity>
    {/* </View> */}
    </SafeAreaView>
  );
}

// Main app 
export default function App() {
  const router = useRouter();
  const { progress, setProgress, deleted, setDeleted } = useProgress();
  const [snackbarVisible, setSnackbarVisible] = useState<any>(false); // Snackbar visibility state

  // Check if a project just was uploaded 
  useEffect(() => {
    if (progress >= 1) { 
      router.replace('/'); // Reload the current route when the progress of uploading a project is done
      setProgress(0)
    }
  }, [progress >= 1]);  

  // Check if a project was just deleted 
  useEffect(() => {
    if (deleted == true) { 
      setSnackbarVisible(true)
      setDeleted(false)
    }
  }, [deleted == true]);  

  return (
    <View style={{flex: 1}}>
    <SafeAreaView style={{flex: 1}}>
      <MyTabs />
      
    </SafeAreaView>
    <Snackbar
        style={styles.snackBar}
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)} // Dismiss Snackbar
        duration={3000} // Optional duration for the Snackbar
      >
        Project Deleted
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    // alignItems: 'center',
  },
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
    backgroundColor: '#E8E8E8',
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
    // fontWeight: '300'
  },
  filterButtonContainer: {
    width: windowWidth*0.87,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center', 
    alignItems: 'flex-end',
  },
  mapButtonContainer: {
    
    alignItems: 'center', 
  },
  mapButton: {
    backgroundColor: '#4CDFFF',
    borderRadius: 25, 
    padding: 12, 
    alignSelf: "center",
    position: 'absolute', 
    bottom: 15, 
    flexDirection: 'row',
    alignItems: 'center', 
  },
  mapButtonText: {
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 5, 
    marginRight: 5, 
  }, 
  mapIcon: {
    fontSize: 17,
    fontWeight: '500',
    marginRight: 5,
  },
  snackBar: {
    bottom: -30, // Adjust based on your bottom tab navigator height
    // position: 'absolute'
  },
})
