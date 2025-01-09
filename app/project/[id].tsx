import { View } from 'react-native'
import React, { useState, useCallback } from 'react';
import ProjectScreen from '@/src/screens/ProjectScreen'
import { useLocalSearchParams } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { generateClient } from 'aws-amplify/api';
import { getProject } from '@/src/graphql/queries';
import { useFocusEffect } from '@react-navigation/native';

const client = generateClient();

const ProjectDetails = () => {
  const { projectID } = useLocalSearchParams();
  const [project, setProject] = useState<any>(null);

  const fetchProject = async (projectID: any) => {
    try {
      const result = await client.graphql({
        query: getProject,
        variables: { id: projectID }
      }) as GraphQLResult<any>;
      setProject(result.data?.getProject);
      console.log(result.data?.getProject);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (projectID) {
        fetchProject(projectID);
      }
    }, [projectID])
  );

  return (
    <View style={{flex: 1}}>
      <ProjectScreen project={project} />
    </View>
  )
}

export default ProjectDetails
