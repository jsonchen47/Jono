import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { deleteUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { deleteUser as deleteUserMutation } from '@/src/graphql/mutations';
import { listProjects } from '@/src/graphql/queries';
import { deleteProject } from '@/src/graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';
import { chatClient } from '@/src/backend/streamChat';

const client = generateClient();

export default function DeleteAccountScreen() {
    const handleDeleteAccount = async () => {
        Alert.alert(
          'Confirm Delete',
          'Are you sure you want to delete your account? This action cannot be undone.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  // Fetch the authenticated user
                  const authUser = await getCurrentUser();
                  const userID = authUser.userId;
      
                  // 1. Delete all projects associated with the user
                  const projectResults = await client.graphql({
                    query: listProjects,
                    variables: { filter: { ownerIDs: { contains: userID } } }
                  });
                  
                  const projects = projectResults.data?.listProjects?.items || [];
      
                  if (projects.length > 0) {
                    for (const project of projects) {
                      if (project?.id) {
                        await client.graphql({
                          query: deleteProject,
                          variables: { input: { id: project.id } }
                        });
                      }
                    }
                  }
      
                  // 2. Delete the user from the database (User model)
                  await client.graphql({
                    query: deleteUserMutation,
                    variables: { input: { id: userID } }
                  });
      
                  // 3. Delete the user's Sendbird account
                  // const sendbirdAppId = '01E73A75-F4D1-4564-957C-FA30C79A0FCE';
                  // const sendbirdAccessToken = '713275b4177f673fa53c09210d43437385c4e877'; // Replace with your Sendbird API token
      
                  // await fetch(
                  //   `https://api-${sendbirdAppId}.sendbird.com/v3/users/${userID}`,
                  //   {
                  //     method: 'DELETE',
                  //     headers: {
                  //       'Content-Type': 'application/json',
                  //       'Api-Token': sendbirdAccessToken,
                  //     },
                  //   }
                  // );
                  
                  const deleteStreamUser = async (userID: any) => {
                    try {
                      const response = await fetch('https://2b68q5wmd9.execute-api.us-west-1.amazonaws.com/default/deleteStreamChatUser', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'x-api-key': '6ara8tryfyf7',  // Add the API key here
                        },
                        body: JSON.stringify({ userId: userID }),
                      });
                  
                      if (response.ok) {
                        console.log(`Stream Chat account for ${userID} deleted.`);
                      } else {
                        console.error('Failed to delete Stream Chat user');
                      }
                    } catch (error) {
                      console.error('Error deleting Stream Chat user:', error);
                    }
                  };
                  
                  deleteStreamUser(userID)
      
                  // 4. Delete the user's Cognito account
                  await deleteUser();
      
                  // Notify the user and navigate away
                  Alert.alert('Account Deleted', 'Your account has been deleted.');
                } catch (error) {
                  console.error('Error deleting account:', error);
                  Alert.alert(
                    'Error',
                    'There was a problem deleting your account. Please try again later.'
                  );
                }
              },
            },
          ]
        );
      };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>
        Deleting your account is permanent and cannot be undone. This will also delete all your projects and account data.
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  warningText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
