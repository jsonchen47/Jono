import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../../src/graphql/queries'
import ProjectsGrid from '@/src/components/ProjectsGrid';
import Emoji from 'react-native-emoji';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        const fetchedUser = castedUserResult.data?.getUser;
        setUser(fetchedUser);

        console.log(user?.savedProjectsIDs)

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
            variables: { filter: filter },
          });
  
          const castedSavedProjectsData = savedProjectsData as GraphQLResult<any>;
          setProjects(castedSavedProjectsData?.data?.listProjects?.items);
        } else {
          setProjects([]); // No saved projects
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
    <ScrollView style={styles.container}>
      <ProjectsGrid projects = {projects}/>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: windowWidth*0.05
  },
});
