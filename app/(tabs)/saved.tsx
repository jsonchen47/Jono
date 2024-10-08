import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../../src/graphql/queries'
import ProjectsGrid from '@/src/components/ProjectsGrid';


export default function SavedScreen() {
  const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<any>(null);


  // FETCH PROJECTS BASED ON FILTERING BY USER'S SAVED PROJECTS
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch the Auth user
        const authUser = await Auth.currentAuthenticatedUser();
        const userID = authUser.attributes.sub

        // Fetch the Auth user's User object
        const userResult = await API.graphql(
          graphqlOperation(getUser, { id: userID })
        );
        const castedUserResult = userResult as GraphQLResult<any>
        setUser(castedUserResult.data?.getUser);

        // Fetch the saved projects by ID
        if (user?.savedProjectsIDs && user?.savedProjectsIDs.length > 0) {  // Check if savedProjectsIDs exist
          console.log( user?.savedProjectsIDs)
          const savedProjectsData = await API.graphql(graphqlOperation(listProjects, { // Fetch the projects saved by the user
            filter: {
              categories: {
                in: user?.savedProjectsIDs, // Use 'in' to filter projects based on savedProjectsIDs
              }
            }
          }));

          
          // const castedSavedProjectsData = savedProjectsData as GraphQLResult<any>;
          // console.log(castedSavedProjectsData?.data)
          // setProjects(castedSavedProjectsData?.data?.listProjects?.items);

          
        } else {
          // If no saved projects, set an empty array or handle accordingly
          setProjects([]);
        }

      } catch (err) {
        setError(err);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <View style={styles.container}>
      <ProjectsGrid projects = {projects}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
  },
});
