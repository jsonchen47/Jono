import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import { generateClient } from 'aws-amplify/api';
import { listUserProjects, getProject } from '@/src/graphql/queries';
import { deleteProject, deleteUserProject } from '@/src/graphql/mutations';
import { useProgress } from '@/src/contexts/ProgressContext';
import { remove } from 'aws-amplify/storage';
import { useRefresh } from '@/src/contexts/RefreshContext';

const client = generateClient();


// Get the UserProjects
const fetchProjectLinks = async (projectId: string) => {
  const response = await client.graphql({
    query: listUserProjects,
    variables: {
      filter: { projectId: { eq: projectId } }
    }
  });
  return response.data.listUserProjects.items;
};

// Delete the UserProjects
const deleteProjectLinks = async (links: any[]) => {
  try {
    for (const link of links) {
      await client.graphql({
        query: deleteUserProject,
        variables: { input: { id: link.id } }
      });
    }
    console.log('All associated UserProject links deleted successfully');
  } catch (error) {
    console.error('Error deleting UserProject links:', error);
  }
};

// Get the project to get its image
const fetchProject = async (projectId: string) => {
  const response = await client.graphql({
    query: getProject,
    variables: { id: projectId }
  });
  return response.data.getProject;
};

// Delete the project after deleting the user projects
const deleteProjectById = async (projectId: string) => {
  try {
    // Delete the image
    const project = await fetchProject(projectId);
    const imageKey = project?.image?.split('jonoa48aa29b26b146de8c05923d59de88cec85f4-dev.s3.us-west-1.amazonaws.com/public/')[1];

    console.log(`Attempting to delete image with key: ${imageKey}`);

    if (imageKey) {
      const deleteResult = await remove({ key: imageKey, options: { accessLevel: 'guest' } });

      console.log('Image deletion result:', deleteResult);
      console.log('Image deleted from S3 successfully');
    }

    const links = await fetchProjectLinks(projectId);
    await deleteProjectLinks(links);
    await client.graphql({
      query: deleteProject,
      variables: { input: { id: projectId } }
    });
    
    console.log('Project deleted successfully');

  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

const DeleteProjectConfirmationScreen = () => {
  const router = useRouter();
  const { projectId } = useLocalSearchParams();
  const { setDeleted } = useProgress();
  const { setShouldRefresh } = useRefresh();

  return (
    <View style={styles.overlay}>
      <View style={styles.centeredCard}>
        <Text style={styles.title}>Delete Project?</Text>
        <Text style={styles.warningText}>Are you sure? This action cannot be undone.</Text>
        <View style={styles.divider}/>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            deleteProjectById(projectId as string);
            router.replace('/(tabs)/(home)');
            setDeleted(true);
            // setTimeout(() => {
            //   setShouldRefresh(true);
            // }, 1000); // 1 second delay
          }}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <View style={styles.divider}/>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DeleteProjectConfirmationScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredCard: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginTop: 20, 
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  warningText: {
    width: '70%',
    marginBottom: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15, 
  }, 
  deleteButtonText: {
    color: 'red', 
    fontWeight: 'bold', 
    fontSize: 15,
  }, 
  cancelButtonText: {
    fontSize: 15,
  }, 
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#D3D3D3',
  },
});
