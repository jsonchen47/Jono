import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import { getUser, getProject } from '../graphql/queries';
import { getUserWithoutConnections } from '../backend/queries';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';
import HeartButton from './HeartButton';

const client = generateClient();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SmallProjectCard = ({ project }: any) => {
  const { updatedProjectID, updated } = useProjectUpdateContext();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState(project);

  const fetchUser = async (ownerID: any) => {
    try {
      const result = await client.graphql({
        query: getUserWithoutConnections,
        variables: { id: ownerID }
      }) as GraphQLResult<any>;
      setUser(result.data?.getUser);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchProject = async (projectID: string) => {
    try {
      const result = await client.graphql({
        query: getProject,
        variables: { id: projectID }
      }) as GraphQLResult<any>;
      setCurrentProject(result.data?.getProject);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  useEffect(() => {
    console.log('Owner IDs changed:', currentProject.id);
    if (project.ownerIDs?.[0]) {
      fetchUser(project.ownerIDs[0]);
    }
  }, [currentProject.ownerIDs]);

  useEffect(() => {
    if (updated && updatedProjectID === currentProject.id) {
      console.log(`Project ${currentProject.id} was recently updated.`);
      fetchProject(updatedProjectID);
    }
  }, [updated, updatedProjectID, currentProject.id]);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/project/[id]',
          params: { id: currentProject.id, projectID: currentProject.id },
        })
      }
      style={{ width: '100%' }}
    >
      <Image style={styles.browseProjectsImage} source={{ uri: currentProject.image }} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.3 }}
        style={styles.browseProjectsLinearGradient}
      >
        <View style={styles.browseProjectsHeartContainer}>
          <HeartButton projectID={project.id} user={user}/>
        </View>
        <View style={styles.browseProjectsTextContainer}>
          <Text style={styles.browseProjectsTitle}>{currentProject?.title}</Text>
          <Text style={styles.browseProjectAuthor}>{user?.name}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default SmallProjectCard;

const styles = StyleSheet.create({
  browseProjectsImage: {
    width: '100%',
    height: windowHeight / 5,
    borderRadius: 15,
  },
  browseProjectsLinearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  browseProjectsHeartContainer: {
    padding: 10,
    alignItems: 'flex-end'
  },
  browseProjectsTextContainer: {
    padding: 10,
  },
  browseProjectsTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: '600',
    fontSize: 15,
    color: 'white',
  },
  browseProjectAuthor: {
    fontSize: 13,
    color: 'lightgray',
    paddingTop: 5,
  },
});

