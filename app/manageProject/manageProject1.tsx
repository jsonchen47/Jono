import { View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { generateClient } from 'aws-amplify/api';
import { getProject } from '@/src/graphql/queries';
import ManageProjectScreen from '@/src/screens/ManageProjectScreen';

const client = generateClient();

const ManageProject1 = () => {
    const router = useRouter(); 
    const { projectId } = useLocalSearchParams();
    const [project, setProject] = useState<any>(null);

    // FETCH THE PROJECT 
    const fetchProject = async (projectID: string) => {
        try {
            const result = await client.graphql({
                query: getProject,
                variables: { id: projectID }
            });
            setProject(result.data?.getProject);
            console.log(result.data?.getProject);
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchProject(projectId as string);
        }
    }, [projectId]);

    return (
        <View style={{flex: 1}}>
            <ManageProjectScreen project={project}/>
        </View>
    )
}

export default ManageProject1;
