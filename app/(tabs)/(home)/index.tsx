import { Image, View, Pressable, Text, SafeAreaView, ImageBackground, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { listProjects } from '@/src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ProjectsScreen from '../../../src/screens/ProjectsScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fetchProjectsByCategory = async (category: any) => {
  try {
    const projectData = await API.graphql(graphqlOperation(listProjects, {
      filter: {
        categories: {
          contains: category,  // Checks if the category array contains the given string  
        }
      }
    }));
    const castedProjectData = projectData as GraphQLResult<any>
    return castedProjectData.data.listProjects.items;
    
  } catch (err) {
    console.log('Error fetching projects', err);
  }
};

const ProjectsScreenByCategory = ({ category }: any) => {
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    // console.log(category)
    const getProjects = async () => {
      const result = await fetchProjectsByCategory(category);
      // console.log(result)
      setProjects(result);
    };
    getProjects();
  }, []);

  return (
    <View>
      {/* <ProjectsScreen projects = {projects} category = "" /> */}
    </View>
    
  );
};


const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView>
    <View style={styles.searchBarContainer}>
      {/* <Text>hi</Text> */}
      <Searchbar
        style={styles.searchBar}
        placeholder="Assemble the perfect team"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
    </SafeAreaView>
  )
}

const index = () => {

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
      <Tabs.Container 
        pagerProps={{ scrollEnabled: false }}
        headerHeight={50}
        minHeaderHeight={50}
        renderHeader={Header}  
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            scrollEnabled={true} // Enable scrollable tabs
            tabStyle={{ height: 70 }} // Customize the width of each tab
          />
        )}
        >

        {/* ALL PROJECTS */}
        <Tabs.Tab 
          name="All Projects" 
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="star" size={22} />
              <Text style={styles.tabLabelText}>All</Text>
            </View>
          ) })}
          >
          <Tabs.ScrollView>
            <View>
              <ProjectsScreen category = ""/>
              {/* <ProjectsScreen projects = {projects } category = ""/> */}
            </View>
            
          </Tabs.ScrollView>
        </Tabs.Tab>

        {/* HEALTH PROJECTS */}
        <Tabs.Tab 
          name="Health"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="user-doctor" size={22} />
              <Text style={styles.tabLabelText}>Health</Text>
            </View>
          ) })}
        >
          {/* <View></View> */}
          <Tabs.ScrollView>
            <ProjectsScreen category = 'health'/>
            {/* <ProjectsScreenByCategory category = 'health'/> */}
            {/* <ProjectsScreen projects = {projects} category = ""/> */}
          </Tabs.ScrollView>
        </Tabs.Tab>

        {/* FINANCE PROJECTS */}
        <Tabs.Tab 
          name="Finance"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="money-check-dollar" size={22} />
              <Text style={styles.tabLabelText}>Finance</Text>
            </View>
          ) })}
        >
          <Tabs.ScrollView>
          {/* <View></View> */}
          {/* <ProjectsScreen projects={projects} category = ""/> */}
          </Tabs.ScrollView>
        </Tabs.Tab>

        <Tabs.Tab 
          name="Tech"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="gear" size={22} />
              <Text style={styles.tabLabelText}>Tech</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Politics"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="globe" size={22} />
              <Text style={styles.tabLabelText}>Politics</Text>
            </View>
          ) })}
        >
          <View></View>
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
          <View></View>
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
          <View></View>
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
          <View></View>
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
    paddingLeft: 7, 
    paddingRight: 7,
  }, 
  tabLabelText: {
    paddingTop: 5, 
    paddingBottom: 0, 
    fontSize: 12,
  }, 
  searchBarContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBar: {
    backgroundColor: '#E8E8E8',
    height: 50,
  },
  // Pager View
  pagerViewOuterContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  pagerViewContainer: {
    width: '100%', 
    height: windowHeight/2.2,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
  },
   // Large projects
   largeProjectContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeProjectImageBackground: {
    width: '90%',
    height: '100%',
  },
  largeProjectImage: {
    // padding: 30,
    width: '100%',
    height: '100%', 
    borderRadius: 15,
  }, 
  largeProjectTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 25, 
    width: windowWidth/1.1,
    height: '100%',
  },
  largeProjectAuthor: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
  }, 
  largeProjectTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    flexShrink: 1,
    paddingTop: 10,
  }, 
  largeProjectGradient: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    width: '100%', 
    height: '100%',
    borderRadius: 15, // Match the border radius of the image
  },
  // Browse Projects
  browseProjectsHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, 
  }, 
  browseProjectsHeaderText: {
    fontWeight: 'bold', 
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectsSubtitleText: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
  },
  browseProjectsOuterContainer: {
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectsContainer: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  browseProjectsGridItemContainer: {
    width: '100%',
    height: '100%',
  },
  browseProjectsGridItem: {
    width: '48%', // Two items per row with spacing
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  browseProjectsImage: {
    width: '100%', 
    height: windowHeight/5, 
    borderRadius: 15,
    backgroundColor: 'green'
  },
  browseProjectsLinearGradient: {
    position: 'absolute',
    height: '100%', 
    width: '100%', 
    borderRadius: 15,
    justifyContent: 'flex-end',
    // backgroundColor: 'red'
  },
  browseProjectsTextContainer: {
    padding: 10, 
  },
  browseProjectsTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: 'bold',
    fontSize: 15, 
    color: 'white'
  }, 
  browseProjectAuthor: {
    fontSize: 15, 
    color: 'lightgray',
    paddingTop: 5,
  },
  projectsScreenContainer: {
    width: "100%", 
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  indicator: {
    position: 'absolute',
    height: '100%',
    // backgroundColor: 'green',
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 25,
  },
})

