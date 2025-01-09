import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateClient } from 'aws-amplify/api'; // Import generateClient
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../../src/graphql/queries';
import ProjectsGridNew from '@/src/components/ProjectsGridNew';
import Emoji from 'react-native-emoji';
import { useNavigation } from '@react-navigation/native';
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth'; // Updated imports

const windowWidth = Dimensions.get('window').width;

export default function SavedScreen() {
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const navigation = useNavigation();
  
  const client = generateClient(); // Create a GraphQL client instance

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
  }, []);

  // FETCH PROJECTS BASED ON FILTERING BY USER'S SAVED PROJECTS
  const fetchProjects = async (nextToken = null) => {
    setLoading(true);
    try {
      // Fetch the Auth user
      const authUser = await getCurrentUser(); // Updated to getCurrentUser
      const userID = authUser.username; // Use username as ID

      // Fetch the Auth user's User object
      const userResult = await client.graphql({
        query: getUser,
        variables: { id: userID },
      }) as GraphQLResult<any>;

      const fetchedUser = userResult.data?.getUser;
      setUser(fetchedUser);

      if (fetchedUser?.savedProjectsIDs?.length > 0) {
        // Create a filter that can do an "in" filtration
        const filter = {
          or: fetchedUser.savedProjectsIDs.map((savedProjectID: any) => ({
            id: { eq: savedProjectID },
          })),
        };

        // Fetch saved projects by filtering for those in the savedProjectsIDs list
        const savedProjectsData = await client.graphql({
          query: listProjects,
          variables: { filter: filter, limit: 8, nextToken },
        }) as GraphQLResult<any>;

        const fetchedProjects = savedProjectsData.data?.listProjects?.items;

        // Avoid appending the same projects again if it's already fetched
        setProjects((prevProjects: any) => {
          const newProjects = fetchedProjects.filter(
            (newProject: any) => !prevProjects.some((existingProject: any) => existingProject.id === newProject.id)
          );
          return [...prevProjects, ...newProjects];
        });
        setNextToken(savedProjectsData.data.listProjects.nextToken);
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
         projects={projects} 
         loadMoreProjects={loadMoreProjects}
         isFetchingMore={isFetchingMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  savedContainer: {
    marginHorizontal: windowWidth * 0.1,
    marginTop: 20,
  },
  savedText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
});
