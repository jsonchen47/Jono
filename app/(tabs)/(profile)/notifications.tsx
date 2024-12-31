import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { List, Button } from 'react-native-paper';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listConnections } from '@/src/graphql/queries';
import { updateConnection, deleteConnection } from '@/src/graphql/mutations';
import moment from 'moment';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const authUserID = authUser.attributes.sub;

        // Fetch connection requests with status 'requested'
        const result = await API.graphql(
          graphqlOperation(listConnections, {
            filter: {
              connectedUserID: { eq: authUserID },
              status: { eq: 'requested' },
            },
          })
        );
        const castedResult = result as GraphQLResult<any>
        const fetchedNotifications = castedResult?.data?.listConnections?.items || [];
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleApprove = async (connectionId: any) => {
    try {
      // Update the connection status to 'approved'
      await API.graphql(
        graphqlOperation(updateConnection, {
          input: { id: connectionId, status: 'approved' },
        })
      );

      // Update the local state
      setNotifications((prev: any) =>
        prev.map((item: any) =>
          item.id === connectionId ? { ...item, status: 'approved' } : item
        )
      );
    } catch (error) {
      console.error('Error approving connection:', error);
    }
  };

  const handleRemove = async (connectionId: any) => {
    try {
      // Delete the connection
      await API.graphql(graphqlOperation(deleteConnection, { input: { id: connectionId } }));

      // Update the local state
      setNotifications((prev: any) => prev.filter((item: any) => item.id !== connectionId));
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  const renderItem = ({ item }: any) => {
    const isApproved = item.status === 'approved';

    return (
      <List.Item
      style={{paddingRight: 0}}
        title={`${item.user.username}`}
        description={
          isApproved
            ? `${item.user.username} has connected with you.`
            : `${item.user.username} requested to connect with you.`
        }
        left={() => (
          <Image
            source={{ uri: item.user.image }}
            style={styles.profileImage}
          />
        )}
        right={() => (
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => (isApproved ? handleRemove(item.id) : handleApprove(item.id))}
              style={isApproved ? styles.removeButton : styles.approveButton}
            >
              <Text style={isApproved ? styles.buttonText : styles.buttonText}>
                {isApproved ? 'Remove' : 'Approve'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        descriptionNumberOfLines={2}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading notifications...</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default NotificationsPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // Ensure children are arranged horizontally
    justifyContent: 'flex-end', // Push the button to the right
  },
  approveButton: {
    backgroundColor: '#1ABFFB',
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  removeButton: {
    backgroundColor: 'lightgray',
    marginLeft: 5,
    borderRadius: 10,
    alignSelf: 'center'
    
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  buttonText: {
    color: 'white',
  }
});
