import { View, Text, SafeAreaView, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import { TabView, TabBar, SceneRendererProps, NavigationState, Route, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { Scene, Event } from 'react-native-tab-view/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/FontAwesome6';



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
  return (
    <View>
      <Text>hi</Text>
    </View>
  )
}
// Screen that can be filtered and used for all screens
function ProjectsScreen() {
  return (
    <View >
      <Text>Projects!</Text>
    </View>
  );
}

const index = () => {
 

  return (
    <SafeAreaView>
      <Tabs.Container 
        renderHeader={Header}  
        
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            scrollEnabled={true} // Enable scrollable tabs
            tabStyle={{ width: 120 }} // Customize the width of each tab
            
          />
        )}

        >
        <Tabs.Tab 
          name="My Projects" 
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="atom" size={25} />
              <Text style={{paddingTop: 5}}>philantropy</Text>
            </View>
          ) })}
          >
          <Tabs.ScrollView>
            <ProjectsScreen/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Teams">
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab name="Teams2">
          <View></View>
        </Tabs.Tab>
        <Tabs.Tab name="Teams3">
          <View></View>
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  tabLabelContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
  }
})
