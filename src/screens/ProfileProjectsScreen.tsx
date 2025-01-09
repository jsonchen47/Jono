import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { useFilter } from '@/src/contexts/FilterContext';
import ProjectsGridForProfile from '../components/ProjectsGridForProfile';
import { searchProjects } from '@/src/graphql/queries'; // Your GraphQL queries
import { GraphQLResult } from '@aws-amplify/api-graphql';

const windowWidth = Dimensions.get('window').width;

const client = generateClient();

interface ProfileProjectsScreenProps {
  userID: string; // or any other type that matches the type of userID
}

const ProfileProjectsScreen: React.FC<ProfileProjectsScreenProps> = ({ userID }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchProjects = async (nextToken = null) => {
    setLoading(true);
    try {
      const result = await client.graphql({
        query: searchProjects,
        variables: {
          filter: { ownerIDs: { match: userID } },
          nextToken: nextToken,
          limit: 10
        }
      });

      const castedResult = result as GraphQLResult<any>;
      const fetchedProjects = castedResult?.data?.searchProjects?.items || [];
      
      // Ensure no duplicate projects
      setProjects((prevProjects: any) => {
        const newProjects = fetchedProjects.filter((newProject: any) => 
            !prevProjects.some((existingProject: any) => existingProject.id === newProject.id)
        );
        return [...prevProjects, ...newProjects]; // Add only new projects
      });
      
      setNextToken(castedResult?.data?.searchProjects?.nextToken);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userID]);

  const loadMoreProjects = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
      fetchProjects(nextToken); // Append projects
    }
  };

  return (
    <View style={styles.projectsScreenContainer}>
      {loading && projects.length === 0 ? (
        <Text style={styles.loadingText}>Loading projects...</Text>
      ) : (
        <ProjectsGridForProfile
          projects={projects} // Pass remaining projects after first 4
          loadMoreProjects={loadMoreProjects}
          isFetchingMore={isFetchingMore}
        />
      )}
    </View>
  );
};

export default ProfileProjectsScreen;

const styles = StyleSheet.create({
  projectsScreenContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
