import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import moment from 'moment';
import { useNotifications } from '@/src/contexts/NotificationContext';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { updateConnection, deleteConnection, deleteJoinRequest, createUserProject, updateJoinRequest } from '@/src/graphql/mutations';
// import { useSendbirdChat } from '@sendbird/uikit-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // For the chevron icon
import { useNavigation } from '@react-navigation/native';
import { chatClient } from '@/src/backend/streamChat';
import { useRouter } from 'expo-router';

const client = generateClient();

const NotificationsPage = () => {
  const { notifications, markNotificationsAsRead, fetchNotifications } = useNotifications();
  // const { sdk } = useSendbirdChat();
  const navigation = useNavigation();
  const router = useRouter(); 

  useEffect(() => {

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome6 name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
      ),
    });

    const markAsRead = async () => {
      try {
        await markNotificationsAsRead();
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    };

    markAsRead();
  }, [navigation]);

  const handleApprove = async (notification: any) => {
    try {
      if (notification.type === 'connectionRequest') {
        await client.graphql({
          query: updateConnection,
          variables: {
            input: {
              id: notification.id,
              status: 'approved',
              viewed: false
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

        // await client.graphql({
        //   query: deleteJoinRequest,
        //   variables: {
        //     input: { id: notification.id },
        //   },
        // });
        await client.graphql({
          query: updateJoinRequest, // Use the update mutation instead of delete
          variables: {
            input: {
              id: notification.id, // The ID of the join request
              status: 'approved',  // Set the status to 'approved'
              viewed: false
            },
          },
        });
        
        
        // ADD THE STREAM CHAT METHOD HERE TO ADD USER TO GROUP CHAT
        // Add user to group chat 
        if (notification.project.groupChatID) {
          // const channel = await sdk.groupChannel.getChannel(notification.project.groupChatID);
          // console.log('got the channel at least')
          // await channel.inviteWithUserIds([notification.userID]);
          // console.log(`User ${notification.userID} added to group chat ${notification.project.groupChatID}.`);

          // Fetch the channel
          const channel = chatClient.channel('messaging', notification.project.groupChatID);

          // Ensure the channel exists
          await channel.watch();

          console.log('Fetched the channel successfully.');

          // Add the user to the group chat
          await channel.addMembers([notification.userID]);
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

    // let title = '';
    // if (item.type === 'connectionRequest') {
    //   title = isApproved
    //     ? `@${item.connectedUser.name} connected with you.`
    //     : `@${item.user.name} requested to connect with you.`;
    // } else if (item.type === 'joinRequest') {
    //   title = `@${item.user.name} requested to join ${item.projectTitle}.`;
    // }
    let title = '';

    if (item.type === 'connectionRequest') {
      title = item.status === 'approved'
      // Your request to connect has been approved by someone else
        ? `${item.connectedUser.name} connected with you.`
        // Someone else has requested to connect 
        : `${item.user.name} requested to connect with you.`;

    } else if (item.type === 'joinRequest') {
      if (item.status === 'approved') {
        // For a join request you sent that got approved 
        title = `Your request to join "${item.project.title}" has been approved.`;
      } else {
        // For pending join requests for one of your projects
        title = `${item.user.name} requested to join ${item.projectTitle}.`;
      }
    }


    return (
      <List.Item
        style={{ paddingRight: 0 }}
        // title={title}
        title={() => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/otherProfile', params: { id: item.user.id } })}
          >
            <Text style={styles.listItemTitle}>{title}</Text>
          </TouchableOpacity>
        )}
        titleStyle={styles.listItemTitle}
        titleNumberOfLines={2}
        description={daysAgo}
        descriptionStyle={styles.listItemDescription}
        // left={() => (
        //   <Image source={{ uri: item.user.image }} style={styles.profileImage} />
        // )}
        left={() => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/otherProfile', params: { id: item.user.id } })}
          >
            <Image source={{ uri: item.user.image }} style={styles.profileImage} />
          </TouchableOpacity>
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
  backButton: {
    paddingHorizontal: 15,
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
