// ProjectsScreen.js
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listProjects } from '@/src/graphql/queries';
import ProjectsGridNew from '../components/ProjectsGridNew';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import Carousel from 'react-native-reanimated-carousel';
import LargeProjectCard from '../components/LargeProjectCard';
import { PageIndicator } from 'react-native-page-indicator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProjectsScreenNew = ({ category }: any) => {
    const [currentPage, setCurrentPage] = React.useState(0);
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<any>(false);

  const fetchProjects = async (nextToken = null) => {
    setLoading(true);
    try {
        // If there is a category, filter. Otherwise, don't filter. 
        var result 
        if (category != "") {
             result = await API.graphql(graphqlOperation(listProjects, {
                filter: {
                  categories: {
                     contains: category 
                    },
                },
                limit: 8,
                nextToken,
              }));
        }
        else {
             result = await API.graphql(graphqlOperation(listProjects, {
                limit: 8,
                nextToken,
              }));
        }
      const castedResult = result as GraphQLResult<any>
      const fetchedProjects = castedResult?.data.listProjects.items;
      console.log(fetchedProjects)
      setProjects((prevProjects: any) => [...prevProjects, ...fetchedProjects]);
      setNextToken(castedResult?.data.listProjects.nextToken);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [category]);

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  // HEADER FOR PROJECTSGRID
  const listHeaderComponent = (
    <View>
        {/* PAGER PROJECT CARDS */}
      {projects.length > 0 ? (
        <View style={styles.pagerViewOuterContainer}>
          <Carousel
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            loop
            width={windowWidth}
            height={windowHeight / 2.5}
            autoPlay={false}
            data={projects.slice(0, 4)} // Display only the first 4 projects
            onSnapToItem={(index) => setCurrentPage(index)}
            scrollAnimationDuration={300}
            renderItem={({ item, index }: { item: any, index: any }) => (
              <View style={styles.page}>
                <LargeProjectCard project={item} />
              </View>
            )}
          />
          <PageIndicator
            style={styles.indicator}
            current={currentPage}
            count={Math.min(projects.length, 4)} // Adjust based on the number of projects
            color='white'
          />
        </View>
      ) : (
        <Text style={styles.noProjectsText}>No projects available</Text> // Show message if no projects
      )}
    

        {/* BROWSE PROJECTS TEXT */}
        <View style={styles.browseProjectsHeaderContainer}>
        <Text style={styles.browseProjectsHeaderText}>Browse all projects</Text>
        <Text style={styles.browseProjectsSubtitleText}>Explore a world of ideas</Text>
        </View>
    </View>
  );

  return (
    <View style={styles.projectsScreenContainer}>
      <ProjectsGridNew
         projects={projects.length > 4 ? projects.slice(4) : []} // Pass remaining projects after first 4
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
          listHeaderComponent={listHeaderComponent}
        />
    </View>
  );
};

export default ProjectsScreenNew;

const styles = StyleSheet.create({
  projectsScreenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
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
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    marginTop: 5,
  },
   // Pager View
   pagerViewOuterContainer: {
    width: '100%',
    height:  windowHeight/2.5, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    
    // backgroundColor: 'red'
  }, 
  pagerViewContainer: {
    width: '100%', 
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
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
  noProjectsText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    paddingTop: 20,
  },
});
