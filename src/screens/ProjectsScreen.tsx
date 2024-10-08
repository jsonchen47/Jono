import { View, Text, Image, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import { PageIndicator } from 'react-native-page-indicator';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from '../graphql/queries'
import LargeProjectCard from '../components/LargeProjectCard';
import SmallProjectCard from '../components/SmallProjectCard';
import ProjectGrid from '../components/ProjectsGrid';
import { listProjects } from '@/src/graphql/queries';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ProjectsScreen = ({category}: any) => {

  const router = useRouter(); 
  const [users, setUsers] = useState<any>("");
  const [currentPage, setCurrentPage] = React.useState(0);
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {

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

    const fetchAllProjects = async () => {
      try {
        const projectData = await API.graphql(graphqlOperation(listProjects));
        const castedProjectData = projectData as GraphQLResult<any>
        setProjects(castedProjectData.data.listProjects.items);
        console.log(castedProjectData.data.listProjects.items)
      } catch (err) {
        setError(err);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    const getCategoryProjects = async () => {
      // const result = await fetchProjectsByCategory(category);

      const projectData = await API.graphql(graphqlOperation(listProjects, {
        filter: {
          categories: {
            contains: category,  // Checks if the category array contains the given string  
          }
        }
      }));
      const castedProjectData = projectData as GraphQLResult<any>
      const result = castedProjectData.data.listProjects.items;

      // console.log(result)
      setProjects(result);
    };

    if (category != "") {
      getCategoryProjects();
    }
    else {
      fetchAllProjects();
    }
    console.log(projects)
    
  }, []);

  return (
    <View style={styles.projectsScreenContainer}>

      {/* PAGER PROJECT CARDS */}
      <View style={styles.pagerViewOuterContainer}> 
        <PagerView 
          style={styles.pagerViewContainer} 
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position)
          }
          }
          >
          {projects?.map((project: any, index: any) => (
            <View
              style={styles.largeProjectContainer}
              key={project.id}
              >
              <LargeProjectCard project = {project}/>
              <PageIndicator 
                  style={styles.indicator}
                  current={currentPage}
                  count={projects.length} // Adjust based on your number of pages
                  color='white'
              />
            </View>
          ))}
        </PagerView>
      </View>

      {/* BROWSE PROJECTS TEXT */}
      <View style={styles.browseProjectsHeaderContainer}>
        <Text style={styles.browseProjectsHeaderText}>
          Browse all projects
        </Text>
        <Text style={styles.browseProjectsSubtitleText}>
          Explore a world of ideas
        </Text>
      </View>

      {/* BROWSE PROJECT CARDS */}
      <ProjectGrid projects = {projects}/>
    </View>
  )
}

export default ProjectsScreen

const styles = StyleSheet.create({
  projectsScreenContainer: {
    width: "100%", 
    justifyContent: 'center',
    alignItems: 'center',
  },
    // Pager View
  pagerViewOuterContainer: {
    width: '100%',
    height:  windowHeight/2.2, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    // backgroundColor: 'red'
  }, 
  pagerViewContainer: {
    width: '100%', 
    height: '100%',
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
    height: '100%',
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
    padding: 20
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
  indicator: {
    position: 'absolute',
    height: '100%',
    alignItems: 'flex-end',
    padding: 25,
  },
  // Browse Projects Text
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
  // Browse Projects
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
})