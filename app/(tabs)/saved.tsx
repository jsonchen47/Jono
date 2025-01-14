import { Link } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { generateClient } from 'aws-amplify/api'; // Import generateClient
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser, listProjects } from '../../src/graphql/queries';
import ProjectsGridNew from '@/src/components/ProjectsGridNew';
import Emoji from 'react-native-emoji';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth'; // Updated imports
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

export default function SavedScreen() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const navigation = useNavigation();
  
  const client = generateClient(); // Create a GraphQL client instance

  const fetchProjects = async (nextToken = null, reset = false) => {
    setLoading(true);
    try {
      const authUser = await getCurrentUser();
      const userID = authUser.userId;

      const userResult = await client.graphql({
        query: getUser,
        variables: { id: userID },
      }) as GraphQLResult<any>;

      const fetchedUser = userResult.data?.getUser;
      setUser(fetchedUser);

      if (reset) {
        setProjects([]);
        setNextToken(null);
      }

      if (fetchedUser?.savedProjectsIDs?.length > 0) {
        const filter = {
          or: fetchedUser.savedProjectsIDs.map((savedProjectID: any) => ({
            id: { eq: savedProjectID },
          })),
        };

        const savedProjectsData = await client.graphql({
          query: listProjects,
          variables: { filter: filter, limit: 8, nextToken },
        }) as GraphQLResult<any>;

        const fetchedProjects = savedProjectsData.data?.listProjects?.items;
        setProjects((prevProjects: any[]) =>
          reset ? fetchedProjects : [...prevProjects, ...fetchedProjects]
        );
        setNextToken(savedProjectsData.data.listProjects.nextToken);
      } else {
        setProjects([]);
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProjects(null, true); // Refresh the list when the screen is focused
    }, [])
  );

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1ABFFB" />
          <Text style={styles.loadingText}>Loading saved projects...</Text>
        </View>
      ) : (
        <ProjectsGridNew
          projects={projects}
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
          listHeaderComponent={
            <View style={styles.savedHeader}>
              <Text style={styles.savedText}>Saved</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  savedHeader: {
    paddingHorizontal: windowWidth * 0.1,
    marginBottom: 20,
  },
  savedText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
});
