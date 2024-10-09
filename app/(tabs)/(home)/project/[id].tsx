import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import ProjectScreen from '@/src/screens/ProjectScreen'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from "aws-amplify";
import { getProject } from '@/src/graphql/queries';

const ProjectDetails = () => {
  const router = useRouter();
  const { projectID } = useLocalSearchParams();
  const [project, setProject] = useState<any>(null);

  // FETCH THE PROJECT 
  const fetchProject = async (projectID: any) => {
      const result = await API.graphql(
        graphqlOperation(getProject, { id: projectID })
      );
      const castedResult = result as GraphQLResult<any>
      setProject(castedResult.data?.getProject);
      console.log(castedResult.data?.getProject)
  };

  useEffect(() => {
    fetchProject(projectID);
  }, [projectID]);

  return (
    <View>
      <ProjectScreen project = { project }  />
    </View>
  )
}

export default ProjectDetails