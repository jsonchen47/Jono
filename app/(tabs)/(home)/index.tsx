import React, {useEffect, useState, useCallback} from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator, MaterialTopTabBar} from '@react-navigation/material-top-tabs';
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
import { useRefresh } from '@/src/contexts/RefreshContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HapticFeedback from "react-native-haptic-feedback"
import { useNavigation, useNavigationState } from "@react-navigation/native";

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
          style={styles.filterButtonContainer}
          onPress={() => {
            // console.log('Filter button pressed')
            // setDeleted(true)
            router.push('/filter')
          }}
          >
            <View style={styles.filterButton}>
              <FontAwesome6 name="sliders" size={15} style={{fontWeight: '100'}}/>
            </View>
          
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const insets = useSafeAreaInsets(); // Get safe area insets
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);

  // Uncomment to add haptic feedback on swipe
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("state", () => {
  //     HapticFeedback.trigger("impactMedium", options);
  //   });

  //   return unsubscribe;
  // }, [navigation, navigationState]);

  return (

    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
     <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
        style={[styles.headerContainer, { paddingTop: insets.top }]}
      >
        <Header />
    </View>
    
    <Tab.Navigator
      style={{paddingTop: headerHeight/2}}
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
        // swipeEnabled: false, 
        lazy: true, // Enables lazy loading
        // lazyPreloadDistance: 0, // Preload the next tab when swiping close to it (set 0 for no preloading)
        
      }}
    >
      <Tab.Screen
        name="For You"
        children={() => <ProjectsScreenFYP category="" />}
        options={{
            tabBarLabel: ({ focused }: any) => <TabBarLabel label="For You" IconComponent={FontAwesome5} icon="home" focused={focused} />
        }} 
        listeners={{
          tabPress: () => {
            HapticFeedback.trigger("impactMedium", options);
          },
        }}
      />
      <Tab.Screen
        name="All"
        children={() => <ProjectsScreen category="" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="All" IconComponent={FontAwesome6} icon="star" focused={focused} />
        }} 
        listeners={{
          tabPress: () => {
            HapticFeedback.trigger("impactMedium", options);
        },
        }}
      />
      <Tab.Screen
        name="Health"
        children={() => <ProjectsScreen category="health" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="Health" IconComponent={Fontisto} icon="heartbeat" focused={focused} />
      }} 
      listeners={{
        tabPress: () => {
          HapticFeedback.trigger("impactMedium", options);
        },
      }}
      />
      <Tab.Screen
        name="Finance"
        children={() => <ProjectsScreen category="finance" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="Finance" IconComponent={FontAwesome6} icon="sack-dollar" focused={focused} />
      }} 
      listeners={{
        tabPress: () => {
          HapticFeedback.trigger("impactMedium", options);
        },
      }}
      />
      <Tab.Screen
        name="Tech"
        children={() => <ProjectsScreen category="tech" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="Tech" IconComponent={MaterialCommunityIcons} icon="robot-industrial" focused={focused} />
      }} 
      listeners={{
        tabPress: () => {
          HapticFeedback.trigger("impactMedium", options);
        },
      }}
      />
      <Tab.Screen
        name="Politics"
        children={() => <ProjectsScreen category="politics" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="Politics" IconComponent={Entypo} icon="globe" focused={focused} />
      }} 
      listeners={{
        tabPress: () => {
          HapticFeedback.trigger("impactMedium", options);
        },
      }}
      />
       <Tab.Screen
        name="Education"
        children={() => <ProjectsScreen category="education" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="Education" IconComponent={FontAwesome6} icon="book" focused={focused} />
        }} 
        listeners={{
          tabPress: () => {
            HapticFeedback.trigger("impactMedium", options);
          },
        }}
      />
       <Tab.Screen
        name="Environment"
        children={() => <ProjectsScreen category="environment" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="Environment" IconComponent={FontAwesome6} icon="leaf" focused={focused} />
        }} 
        listeners={{
          tabPress: () => {
            HapticFeedback.trigger("impactMedium", options);
          },
        }}
      />
       <Tab.Screen
        name="Social Justice"
        children={() => <ProjectsScreen category="social justice" />}
        options={{
          tabBarLabel: ({ focused }: any) => <TabBarLabel label="Home" IconComponent={FontAwesome6} icon="scale-balanced" focused={focused} />
      }} 
      listeners={{
        tabPress: () => {
          HapticFeedback.trigger("impactMedium", options);
        },
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
        {/* <Text style={styles.mapButtonText}>
          Map
        </Text> */}
        <Ionicons name='map' style={styles.mapIcon}/>
      </TouchableOpacity>
    {/* </View> */}
    </SafeAreaView>
  );
}

// Main app 
export default function App() {
  const { setShouldRefresh } = useRefresh();
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
    {/* <SafeAreaView style={{flex: 1}}> */}
      <MyTabs />
      
    {/* </SafeAreaView> */}
    <Snackbar
        style={styles.snackBar}
        visible={snackbarVisible}
        onDismiss={() => {
          {setSnackbarVisible(false)}
          setShouldRefresh(true);
        }
        } // Dismiss Snackbar
        duration={3000} // Optional duration for the Snackbar
      >
        Project Deleted
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute', // Ensures it floats above the tabs
    top: 0,
    width: '100%',
    zIndex: 100, // Ensures it appears above everything
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Shadow falls below the search bar
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10, // For Android shadow
  },
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
  //  searchBarContainer: {
  //   marginHorizontal: windowWidth*0.05, 
  //   marginTop: 10, 
  //   marginBottom: 2, 
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // searchButton: {
  //   backgroundColor: '#E8E8E8',
  //   paddingVertical: 15,
  //   paddingHorizontal: 20,
  //   marginHorizontal: 10, 
  //   borderRadius: 30, // This gives the rounded corners
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   width: '100%',
  // },
  searchBarContainer: {
    position: 'relative', // Ensures the button stays visible
    marginHorizontal: windowWidth * 0.05,
    marginTop: 10,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
    //     zIndex: 99, // Ensures it's above the tabs (iOS)

},

// searchButton: {
//     backgroundColor: 'white',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 }, // Stronger shadow
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 10, // High elevation ensures it appears above other elements (Android)
//     zIndex: 99, // Ensures it's above the tabs (iOS)
//     position: 'absolute', // Allows overlapping
//     top: -50, // Adjust to lift it above the tabs
// },

  searchButton: {
    backgroundColor: 'white', // Changed to pure white for a clean look
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10, 
    borderRadius: 30, // Keeps the rounded look
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000', // Adds a soft shadow
    shadowOffset: { width: 0, height: 0 }, // Creates depth
    shadowOpacity: 0.1, // Subtle shadow opacity
    shadowRadius: 7, // Softens the edges
    elevation: 3, // Android shadow effect
    // borderColor: 'black',
    // borderWidth: 2,
},
  searchButtonIcon: {
    fontSize: 20,
    paddingRight: 10,
  }, 
  searchButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  filterButton: {
    height: 35, 
    width: 35, 
    borderRadius: 20, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    // fontWeight: '300'
  },
  filterButtonContainer: {
    // width: windowWidth*0.87,
    // height: '100%',
    // position: 'absolute',
    // justifyContent: 'center', 
    // alignItems: 'flex-end',
    // backgroundColor: 'green',
    position: 'absolute',
    right: 0,
    padding: 10,

  },
  mapButtonContainer: {
    
    alignItems: 'center', 
  },
  mapButton: {
    backgroundColor: '#4CDFFF',
    borderRadius: 100, 
    alignSelf: "center",
    position: 'absolute', 
    bottom: 15, 
    right: 15,
    // flexDirection: 'row',
    alignItems: 'center', 
    shadowColor: '#000', // Black shadow
    shadowOffset: { width: 0, height: 2 }, // Offset the shadow
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blurring effect
    // Shadow for Android
    elevation: 5, // Elevation determines the shadow depth
  },
  mapButtonText: {
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 5, 
    marginRight: 5, 
  }, 
  mapIcon: {
    fontSize: 25,
    fontWeight: '500',
    // marginTop: 5,
    margin: 17,
  },
  snackBar: {
    bottom: -30, // Adjust based on your bottom tab navigator height
    // position: 'absolute'
  },
})
