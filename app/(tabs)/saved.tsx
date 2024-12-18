import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../../src/graphql/queries'
// import ProjectsGrid from '@/src/components/ProjectsGrid';
import ProjectsGridNew from '@/src/components/ProjectsGridNew';
import Emoji from 'react-native-emoji';
import ProjectsGrid from '@/src/components/ProjectsGrid';
import { useNavigation } from '@react-navigation/native';
import SampleComponent from '@/src/components/SampleComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SavedScreen() {
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<any>(false);
  const navigation = useNavigation();


  // SET THE HEADER
  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: () => (
        <Text></Text>
      ),
      headerStyle: {
        backgroundColor: 'white', // Change the background color of the header
      },
    });
  }, );



  // FETCH PROJECTS BASED ON FILTERING BY USER'S SAVED PROJECTS
  const fetchProjects = async (nextToken = null) => {
    setLoading(true);
    try {
      // Fetch the Auth user
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub

      // Fetch the Auth user's User object
      const userResult = await API.graphql(
        graphqlOperation(getUser, { id: userID })
      );
      const castedUserResult = userResult as GraphQLResult<any>
      const fetchedUser = castedUserResult.data?.getUser;
      setUser(fetchedUser);

      if (fetchedUser?.savedProjectsIDs?.length > 0) {
        // Create a filter that can do an "in" filtration
        const filter = {
          or: fetchedUser.savedProjectsIDs.map((savedProjectID: any) => ({
            id: { eq: savedProjectID },
          })),
        };

        // Fetch saved projects by filtering for those in the savedProjectsIDs list
        const savedProjectsData = await API.graphql({
          query: listProjects,
          variables: { filter: filter, limit: 8, nextToken },
          
        });

        const castedSavedProjectsData = savedProjectsData as GraphQLResult<any>;
        const fetchedProjects = castedSavedProjectsData?.data?.listProjects?.items

        // Avoid appending the same projects again if it's already fetched
        setProjects((prevProjects: any) => {
          const newProjects = fetchedProjects.filter(
            (newProject: any) => !prevProjects.some((existingProject: any) => existingProject.id === newProject.id)
          );
          return [...prevProjects, ...newProjects];
        });
        setNextToken(castedSavedProjectsData?.data.listProjects.nextToken);
      } else {
        setProjects([]); // No saved projects
      }
      
    } catch (err) {
      setError(err);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {

    fetchProjects();
  }, []);

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.savedContainer}>
        <Text style={styles.savedText}>Saved</Text>
      </View>
      
      <ProjectsGridNew
         projects={projects} // Pass remaining projects after first 4
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: windowWidth*0.05, 
    flex: 1,
  },
  savedContainer: {
    marginHorizontal: windowWidth*0.1,
    marginTop: 20
  },
  savedText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  sampleComponent: {
    // fontWeight: 'bold', 
    // backgroundColor: 'red'
  }
});
