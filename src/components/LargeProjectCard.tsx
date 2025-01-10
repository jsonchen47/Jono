import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import { getUser, getProject } from '../graphql/queries';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';
import HeartButton from './HeartButton';

const windowWidth = Dimensions.get('window').width;
const client = generateClient();

const LargeProjectCard = ({ project }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState(project);

  const { updatedProjectID, updated } = useProjectUpdateContext();

  const fetchUser = async (ownerID: any) => {
    try {
      const result = await client.graphql({
        query: getUser,
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
    if (project?.ownerIDs?.[0]) {
      fetchUser(project.ownerIDs[0]);
    }
  }, [project?.ownerIDs]);

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
      style={styles.cardContainer}
    >
      <View style={styles.cardContent}>
        <TouchableOpacity
          style={styles.authorContainer}
          onPress={() =>
            router.push({
              pathname: '/otherProfile',
              params: { id: user.id },
            })
          }
        >
          <Image source={{ uri: user?.image }} style={styles.authorImage} />
          <View>
            <Text style={styles.authorName}>{user?.name}</Text>
            <Text style={styles.location}>{currentProject.city}</Text>
          </View>
        </TouchableOpacity>
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={styles.image}
          source={{ uri: currentProject.image }}
        >
          <View style={styles.heartButtonContainer}>
            <HeartButton projectID={currentProject.id} />
          </View>
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {currentProject.title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {currentProject.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default LargeProjectCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '87%',
    alignSelf: 'center',
  },
  cardContent: {
    width: '100%',
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  heartButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  detailsContainer: {
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
