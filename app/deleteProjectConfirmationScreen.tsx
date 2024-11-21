import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listUserProjects } from '@/src/graphql/queries'; // Adjust the path as needed
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { deleteProject, deleteUserProject } from '@/src/graphql/mutations';
import { getProject } from '@/src/graphql/queries';
import { useProgress } from '@/src/contexts/ProgressContext';

// Get the UserProjects
const fetchProjectLinks = async (projectId: any) => {
  const response = await API.graphql(graphqlOperation(listUserProjects, {
    filter: { projectId: { eq: projectId } }
  }));
  const castedResponse = response as GraphQLResult<any>
  return castedResponse?.data.listUserProjects.items;
};

// Delete the UserProjects
const deleteProjectLinks = async (links: any) => {
  try {
    for (const link of links) {
      await API.graphql(graphqlOperation(deleteUserProject, { input: { id: link.id } }));
    }
    console.log('All associated UserProject links deleted successfully');
  } catch (error) {
    console.error('Error deleting UserProject links:', error);
  }
};

// Get the project to get its image
const fetchProject = async (projectId: any) => {
  const response = await API.graphql(graphqlOperation(getProject, { id: projectId }));
  const castedResponse = response as GraphQLResult<any> 
  return castedResponse?.data.getProject; // Adjust this line based on your query structure
};

// Delete the project after deleting the user projects
const deleteProjectById = async (projectId: any) => {
  try {
    // Delete the image
    const project = await fetchProject(projectId); // Fetch project to get the image URL
    const imageKey = project.image.split('jonoa48aa29b26b146de8c05923d59de88cec85f4-dev.s3.us-west-1.amazonaws.com/public/')[1]; // Extract key after ".com/"

    console.log(`Attempting to delete image with key: ${imageKey}`);

    if (imageKey) {
      // await Storage.remove(imageKey); // Delete image from S3
      const deleteResult = await Storage.remove(imageKey, { level: 'public' }); // Delete image from S3
      console.log('Image deletion result:', deleteResult); // Log result of deletion
      console.log('Image deleted from S3 successfully');
    }

    const links = await fetchProjectLinks(projectId);
    await deleteProjectLinks(links);
    await API.graphql(graphqlOperation(deleteProject, { input: { id: projectId } }));
    console.log('Project deleted successfully');

  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

const deleteProjectConfirmationScreen = () => {
  const router = useRouter();
  const { projectId } = useLocalSearchParams();
  const { setDeleted } = useProgress();

  return (
    <View style={styles.overlay}>
    <View style={styles.centeredCard}>
      <Text style={styles.title}>Delete Project?</Text>
      <Text style={styles.warningText}>Are you sure? This action cannot be undone.</Text>
      <View style={styles.divider}/>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          // Delete project
          deleteProjectById(projectId)
          router.replace('/(tabs)/(home)')
          // Set deleted to true so that it shows up on the snackbar at the bottom of the screen
          setDeleted(true)
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      <View style={styles.divider}/>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          router.back()
        }}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default deleteProjectConfirmationScreen

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  centeredCard: {
    width: '70%', // Adjust width as needed
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
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
    height: 1,            // Thickness of the line
    width: '100%',        // Full width of the screen
    backgroundColor: '#D3D3D3', // Light gray color
},
});