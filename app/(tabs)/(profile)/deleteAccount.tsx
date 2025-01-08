import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { deleteUser } from '@/src/graphql/mutations';
import { listProjects } from '@/src/graphql/queries';
import { deleteProject } from '@/src/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';

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
                  const authUser = await Auth.currentAuthenticatedUser();
                  const userID = authUser.attributes.sub;
      
                  // 1. Delete all projects associated with the user
                //   const projectResults = await API.graphql(
                //     graphqlOperation(listProjects, { filter: { ownerID: { eq: userID } } })
                //   );
                    const projectResults = await API.graphql(
                    graphqlOperation(listProjects, { filter: { ownerIDs: { contains: userID } } })
                  );
                  
      
                  const castedProjectResults = projectResults as GraphQLResult<any>;
                  const projects = castedProjectResults?.data?.listProjects?.items || [];
      
                  if (projects.length > 0) {
                    for (const project of projects) {
                      if (project?.id) {
                        await API.graphql(
                          graphqlOperation(deleteProject, { input: { id: project.id } })
                        );
                      }
                    }
                  }
      
                  // 2. Delete the user from the database (User model)
                  await API.graphql(
                    graphqlOperation(deleteUser, { input: { id: userID } })
                  );
      
                  // 3. Delete the user's Sendbird account
                  const sendbirdAppId = '01E73A75-F4D1-4564-957C-FA30C79A0FCE';
                  const sendbirdAccessToken = 'YOUR_SENDBIRD_ACCESS_TOKEN'; // Replace with your Sendbird API token
      
                  await fetch(
                    `https://api-${sendbirdAppId}.sendbird.com/v3/users/${userID}`,
                    {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                        'Api-Token': sendbirdAccessToken,
                      },
                    }
                  );
      
                  // 4. Delete the user's Cognito account
                  await Auth.deleteUser();
      
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
