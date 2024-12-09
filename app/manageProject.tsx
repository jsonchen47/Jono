import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getProject } from '@/src/graphql/queries';
import ManageProjectScreen from '@/src/screens/ManageProjectScreen';

const manageProject = () => {

const { projectId } = useLocalSearchParams();
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
    fetchProject(projectId);
  }, [projectId]);
  return (
    <View style={{flex: 1}}>
      {/* <Text>manageProject</Text> */}
      <ManageProjectScreen project={project}/>
    </View>
  )
}

export default manageProject