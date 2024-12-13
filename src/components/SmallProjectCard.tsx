import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser, getProject } from '../graphql/queries';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SmallProjectCard = ({ project }: any) => {
  const { updatedProjectID } = useProjectUpdateContext();  // Get the most recently updated project ID
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentProject, setCurrentProject] = useState(project);  // Store the current project

  // FETCH THE PROJECT OWNER
  const fetchUser = async (ownerID: any) => {
    const result = await API.graphql(graphqlOperation(getUser, { id: ownerID }));
    const castedResult = result as GraphQLResult<any>;
    setUser(castedResult.data?.getUser);
  };

  // FETCH THE PROJECT (REFETCH WHEN THE UPDATED PROJECT ID CHANGES)
  const fetchProject = async (projectID: string) => {
    const result = await API.graphql(
      graphqlOperation(getProject, { id: projectID })
    );
    const castedResult = result as GraphQLResult<any>;
    setCurrentProject(castedResult.data?.getProject);  // Assuming getProject returns a single project
  };

  // Run on component mount or when project changes
  useEffect(() => {
    if (project.ownerIDs?.[0]) {
      fetchUser(project.ownerIDs[0]);
    }
  }, [project.ownerIDs]);

  // Run when updatedProjectID changes, refetch project if necessary
  useEffect(() => {
    if (updatedProjectID === project.id) {
      fetchProject(project.id);  // Refetch the project if it was updated
    }
  }, [updatedProjectID, project.id]);

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
      {/* Icon */}
      <View style={styles.iconLargeContainer}>
        <View style={styles.iconSmallContainer}>
          <Icon name="heart" size={27} style={styles.iconFill} />
          <Icon name="heart-outline" size={30} style={styles.iconOutline} />
        </View>
      </View>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.3 }}
        style={styles.browseProjectsLinearGradient}
      >
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
    justifyContent: 'flex-end',
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
  iconOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    position: 'absolute',
    padding: 12,
  },
  iconFill: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    position: 'absolute',
    padding: 12,
    opacity: 0.7,
  },
  iconSmallContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  iconLargeContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

