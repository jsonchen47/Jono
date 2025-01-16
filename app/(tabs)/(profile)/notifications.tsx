import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import moment from 'moment';
import { useNotifications } from '@/src/contexts/NotificationContext';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { updateConnection, deleteConnection, deleteJoinRequest, createUserProject } from '@/src/graphql/mutations';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const client = generateClient();

const NotificationsPage = () => {
  const { notifications, markNotificationsAsRead, fetchNotifications } = useNotifications();
  const { sdk } = useSendbirdChat();

  useEffect(() => {
    const markAsRead = async () => {
      try {
        await markNotificationsAsRead();
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    };

    markAsRead();
  }, []);

  const handleApprove = async (notification: any) => {
    try {
      if (notification.type === 'connectionRequest') {
        await client.graphql({
          query: updateConnection,
          variables: {
            input: {
              id: notification.id,
              status: 'approved',
            },
          },
        });
      } else if (notification.type === 'joinRequest') {
        await client.graphql({
          query: createUserProject,
          variables: {
            input: {
              userId: notification.userID,
              projectId: notification.projectID,
            },
          },
        });

        await client.graphql({
          query: deleteJoinRequest,
          variables: {
            input: { id: notification.id },
          },
        });
        
        // Add user to group chat 
        if (notification.project.groupChatID) {
          const channel = await sdk.groupChannel.getChannel(notification.project.groupChatID);
          console.log('got the channel at least')
          await channel.inviteWithUserIds([notification.userID]);
          console.log(`User ${notification.userID} added to group chat ${notification.project.groupChatID}.`);
        }
        
      }

      await fetchNotifications(); // Refresh notifications list
    } catch (error) {
      console.error('Error approving notification:', error);
    }
  };

  const handleDelete = async (notification: any) => {
    try {
      if (notification.type === 'connectionRequest') {
        await client.graphql({
          query: deleteConnection,
          variables: {
            input: { id: notification.id },
          },
        });
      } else if (notification.type === 'joinRequest') {
        await client.graphql({
          query: deleteJoinRequest,
          variables: {
            input: { id: notification.id },
          },
        });
      }

      await fetchNotifications(); // Refresh notifications list
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const renderItem = ({ item }: any) => {
    const isApproved = item.status === 'approved';
    const daysAgo = moment(item.updatedAt).fromNow();

    let title = '';
    if (item.type === 'connectionRequest') {
      title = isApproved
        ? `@${item.user.username} connected with you.`
        : `@${item.user.username} requested to connect with you.`;
    } else if (item.type === 'joinRequest') {
      title = `@${item.user.username} requested to join ${item.projectTitle}.`;
    }

    return (
      <List.Item
        style={{ paddingRight: 0 }}
        title={title}
        titleStyle={styles.listItemTitle}
        titleNumberOfLines={2}
        description={daysAgo}
        descriptionStyle={styles.listItemDescription}
        left={() => (
          <Image source={{ uri: item.user.image }} style={styles.profileImage} />
        )}
        right={() => (
          <View style={styles.buttonContainer}>
            {!isApproved && (
              <View>
                <TouchableOpacity
                  onPress={() => handleApprove(item)}
                  style={styles.approveButton}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => handleDelete(item)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            )}
            
          </View>
        )}
        descriptionNumberOfLines={2}
      />
    );
  };

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.loadingText}>No notifications available.</Text>
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
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  approveButton: {
    backgroundColor: '#1ABFFB',
    marginVertical: 2,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginHorizontal: 5, 
  },
  deleteButton: {
    backgroundColor: '#EFD6D6',
    marginVertical: 2,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginHorizontal: 5, 
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  listItemTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  listItemDescription: {
    fontSize: 12,
  },
  deleteButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  }
});
