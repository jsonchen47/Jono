import { Image, View, Text, SafeAreaView, ImageBackground, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'
import { TabView, TabBar, SceneRendererProps, NavigationState, Route, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { Scene, Event } from 'react-native-tab-view/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Searchbar } from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { PageIndicator } from 'react-native-page-indicator';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

// The projects in the large paging view 
function PagerProjects() {
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <View style={styles.pagerViewOuterContainer}>
      <PagerView 
        style={styles.pagerViewContainer} 
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
        {sampleProjects.map((project, index) => (
          <View
            style={styles.largeProjectContainer}
            key={project.id}
            >
            <ImageBackground 
              style={styles.largeProjectImageBackground} 
              imageStyle={styles.largeProjectImage}
              source={project.image}
              >
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} // Darker at the top, lighter at the bottom
                style={styles.largeProjectGradient}
                >
                <View>
                  <View style={styles.largeProjectTextContainer}>
                    <Text style={styles.largeProjectAuthor}>{project.author}</Text>
                    <Text style={styles.largeProjectTitle}>{project.title}</Text>
                  </View>
                  
                </View>
              </LinearGradient>
            </ImageBackground>
            <PageIndicator 
                    style={styles.indicator}
                    current={currentPage}
                    count={7} // Adjust based on your number of pages
                    color='white'
                  />
          </View>
        ))}
      </PagerView>
    </View>
    // <Text>hi</Text>
  );
}

function NewProjectsScreen() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.projectsScreenContainer}>
      {/* Main projects */}
      <PagerProjects/>
      {/* Browse projects text */}
      <View style={styles.browseProjectsHeaderContainer}>
        <Text style={styles.browseProjectsHeaderText}>
          Browse all projects
        </Text>
        <Text style={styles.browseProjectsSubtitleText}>
          Explore a world of ideas
        </Text>
      </View>
      {/* Browse projects cards */}
      <View style={styles.browseProjectsOuterContainer}>
        <View style={styles.browseProjectsContainer}>
        {sampleProjects.map((project, index) => (
          <View key={index} style={styles.browseProjectsGridItem}>
            <Image style={styles.browseProjectsImage} source={project.image}/>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']} 
              style={styles.browseProjectsLinearGradient}
            >
            <View style={styles.browseProjectsTextContainer}>
              <Text style={styles.browseProjectsTitle}>{project.title}</Text>
              <Text style={styles.browseProjectAuthor}>{project.author}</Text>
            </View>
            </LinearGradient>
          </View>
        ))}
        </View>
      </View>
      </View>
    </View>
  );
}

const index = () => {
 
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      {/* <View style={styles.tabsContainer}> */}
      <Tabs.Container 
        
        // headerContainerStyle={styles.headerContainer}
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
        <Tabs.Tab 
          name="My Projects" 
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="star" size={22} />
              <Text style={styles.tabLabelText}>All</Text>
            </View>
          ) })}
          >
          <Tabs.ScrollView>
          {/* <ProjectsScreen/> */}
          <NewProjectsScreen/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab 
          name="Health"
          label={(() => { return (
            <View style={styles.tabLabelContainer}>
              <Icon name="user-doctor" size={22} />
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
              <Icon name="money-check-dollar" size={22} />
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
      {/* </View> */}
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
  },
  browseProjectsLinearGradient: {
    position: 'absolute',
    height: '100%', 
    width: '100%', 
    borderRadius: 15,
    justifyContent: 'flex-end',
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

