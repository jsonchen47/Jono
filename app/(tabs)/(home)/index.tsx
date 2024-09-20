import { View, Text, SafeAreaView, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import { TabView, TabBar, SceneRendererProps, NavigationState, Route, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { Scene, Event } from 'react-native-tab-view/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Searchbar } from 'react-native-paper';
import PagerView from 'react-native-pager-view';



const sampleProjects = [
  {
    id: 1,
    title: 'Renewable energy powered robot to clean oceans',
    image: require('../../../assets/images/solar.png'),
    author: 'Barack Obama',
    description: 'This robot will be powered by solar power as well as the mechanical movement of the waves. I am looking for some engineers who are interested in working with me on the project.',
    skills: ['Engineering', 'Coding', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 2,
    title: 'Wave-powered method to desalinate water',
    image: require('../../../assets/images/cleanocean.jpg'),
    author: 'Jennifer Lawrence',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 3,
    title: 'App that automatically translates to pinyin',
    image: require('../../../assets/images/chinese.png'),
    author: 'Steve Carrel',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 4,
    title: 'Advertising to help the homeless',
    image: require('../../../assets/images/homeless.png'),
    author: 'Ryan Reynolds',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 5,
    title: 'Genetically modified camel',
    image: require('../../../assets/images/camel.png'),
    author: 'Pablo Picasso',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 6,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
  {
    id: 7,
    title: 'John Doe',
    image: require('../../../assets/images/chair.png'),
    author: 'Engineer',
    description: '',
    skills: ['Engineering', 'Environmental Science'],
    resources: ['Solar Panels', 'Fabrication Facility'],
  },
];

const Header = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <View style={styles.searchBarContainer}>
      {/* <Text>hi</Text> */}
      <Searchbar
        style={styles.searchBar}
        placeholder="Assemble the perfect team"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  )
}
// Screen that can be filtered and used for all screens
function ProjectsScreen() {
  return (
    <View >
      <Text>Projects!</Text>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1">
          <Text>First page</Text>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
      </PagerView>
    </View>
  );
}

const index = () => {
 

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      {/* <View style={styles.tabsContainer}> */}

     
      <Tabs.Container 
        renderHeader={Header}  
        
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            scrollEnabled={true} // Enable scrollable tabs
            tabStyle={{ height: 70 }} // Customize the width of each tab
            
          />
        )}
        >
        <Tabs.Tab 
          name="My Projects" 
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="star" size={25} />
              <Text style={styles.tabLabelText}>All</Text>
            </View>
          ) })}
          >
          <Tabs.ScrollView>
            <ProjectsScreen/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Health"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="user-doctor" size={25} />
              <Text style={styles.tabLabelText}>Health</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Finance"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="money-check-dollar" size={25} />
              <Text style={styles.tabLabelText}>Finance</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Tech"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="gear" size={25} />
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
              <Icon name="globe" size={25} />
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
              <Icon name="book" size={25} />
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
              <Icon name="leaf" size={25} />
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
              <Icon name="scale-balanced" size={25} />
              <Text style={styles.tabLabelText}>Social Justice</Text>
            </View>
          ) })}
        >
          <View></View>
        </Tabs.Tab>
      </Tabs.Container>
      {/* </View> */}
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  tabsContainer: {
    // marginTop: 100, 
    // flex: 1,
  },
  safeAreaViewContainer: {
    // flex: 1,
  },
  tabLabelContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingLeft: 10, 
    paddingRight: 10,
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
  pagerView: {

  }
})
