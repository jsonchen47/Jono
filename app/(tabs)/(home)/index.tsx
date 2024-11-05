import { Image, View, Pressable, Button, Keyboard, Text, SafeAreaView, TouchableOpacity, ImageBackground, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/Entypo';
import { Searchbar } from 'react-native-paper';
import { listProjects } from '@/src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ProjectsScreen from '../../../src/screens/ProjectsScreen';
import { useRouter } from 'expo-router';
import { useProgress } from '@/src/contexts/ProgressContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const index = () => {
  const { hideProgressBar, showProgressBar, updateProgress, isVisible, setProjectId } = useProgress();

  const Header = () => {
    const router = useRouter(); 
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
      <View style={styles.searchBarContainer}>
          <TouchableOpacity style={styles.searchButton}
            onPress={() => 
              router.push('/search')
            } 
          >
            <Icon2 name='search' style={styles.searchButtonIcon}/>
            <Text style={styles.searchButtonText}>Assemble the perfect team</Text>
          </TouchableOpacity>
            <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => 
              // router.push('/progressBar')
              handleSubmit()
            } 
            >
            <Icon name="sliders" size={18} />
          </TouchableOpacity>
      </View>
    )
  }
  
  const handleSubmit = async () => {
    
    
    showProgressBar();
    updateProgress(0); // Reset progress
  
    // Simulate an async operation
    for (let i = 0; i <= 100; i += 10) {
      updateProgress(i / 100); // Update progress value
      await new Promise((resolve) => setTimeout(resolve, 10)); // Simulate delay
    }
    setProjectId('11adcbc5-7bdd-4df6-86ee-0deb44e78115')
  
    // Hide progress bar after operation
    hideProgressBar();
    // Dismiss form or navigate as needed
  };

  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await API.graphql(graphqlOperation(listProjects));
        const castedProjectData = projectData as GraphQLResult<any>
        setProjects(castedProjectData.data.listProjects.items);
        // console.log(castedProjectData.data.listProjects.items)
      } catch (err) {
        setError(err);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching projects: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <Header/>
      <Tabs.Container 
        pagerProps={{ scrollEnabled: false }}
        // headerHeight={50}
        // minHeaderHeight={50}
        // renderHeader={Header}  
        renderTabBar={props => (
          <MaterialTabBar
            {...props}  
            activeColor='red' // Color for the selected tab
            inactiveColor='green' // Color for the unselected tabs
            scrollEnabled={true} // Enable scrollable tabs
            tabStyle={{ height: 70 }} // Customize the width of each tab
            indicatorStyle={{ backgroundColor: 'black', height: 2 }}
            
          />
        )}
        >

        {/* ALL PROJECTS */}
        <Tabs.Tab 
          name="All Projects" 
          label={() => { 
            return (
            <View style={styles.tabLabelContainer}>
              <Icon name="star" size={22} />
              <Text style={styles.tabLabelText}>All</Text>
            </View>
            )
          }}
          >
          <Tabs.ScrollView>
            <ProjectsScreen category = ""/>
          </Tabs.ScrollView>
        </Tabs.Tab>

        {/* HEALTH PROJECTS */}
        <Tabs.Tab 
          name="Health"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon3 name="heartbeat" size={22} />
              <Text style={styles.tabLabelText}>Health</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
            <ProjectsScreen category = 'health'/>
          </Tabs.ScrollView>
        </Tabs.Tab>

        {/* FINANCE PROJECTS */}
        <Tabs.Tab 
          name="Finance"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="sack-dollar" size={22} />
              <Text style={styles.tabLabelText}>Finance</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
            <ProjectsScreen category = 'finance'/>
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab 
          name="Tech"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon4 name="robot-industrial" size={22} />
              <Text style={styles.tabLabelText}>Tech</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
            <ProjectsScreen category = 'tech'/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Politics"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon5 name="globe" size={22} />
              <Text style={styles.tabLabelText}>Politics</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
            <ProjectsScreen category = 'politics'/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Education"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="book" size={22} />
              <Text style={styles.tabLabelText}>Education</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
            <ProjectsScreen category = 'education'/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Environment"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="leaf" size={22} />
              <Text style={styles.tabLabelText}>Environment</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
            <ProjectsScreen category = 'environment'/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Justice"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="scale-balanced" size={22} />
              <Text style={styles.tabLabelText}>Social Justice</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
            <ProjectsScreen category = 'social justice'/>
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  tabsContainer: {
  },
  safeAreaViewContainer: {
    flex: 1,
  },
  tabLabelContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    marginHorizontal: 10,
  }, 
  tabLabelText: {
    paddingTop: 5, 
    paddingBottom: 0, 
    fontSize: 12,
  }, 
  // Search Bar
  searchBarContainer: {
    marginHorizontal: windowWidth*0.05, 
    paddingVertical: 10, 
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

