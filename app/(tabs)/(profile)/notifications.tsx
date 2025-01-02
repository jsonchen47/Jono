import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import moment from 'moment';
import { useNotifications } from '@/src/contexts/NotificationContext';

const NotificationsPage = () => {
  const { notifications, markNotificationsAsRead } = useNotifications();

  useEffect(() => {
    const markAsRead = async () => {
      try {
        await markNotificationsAsRead(); // Mark notifications as read when page is viewed
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    };

    // markAsRead();
  }, []);

  const renderItem = ({ item }: any) => {
    const isApproved = item.status === 'approved';
    const daysAgo = moment(item.updatedAt).fromNow();

    return (
      <List.Item
        style={{ paddingRight: 0 }}
        title={
          isApproved
            ? `@${item.user.username} connected with you.`
            : `@${item.user.username} requested to connect with you`
        }
        titleStyle={styles.listItemTitle}
        titleNumberOfLines={2}
        description={daysAgo}
        descriptionStyle={styles.listItemDescription}
        left={() => (
          <Image source={{ uri: item.user.image }} style={styles.profileImage} />
        )}
        right={() => (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => console.log('Handle approve or remove here')}
              style={isApproved ? styles.removeButton : styles.approveButton}
            >
              <Text style={styles.buttonText}>
                {isApproved ? 'Unfollow' : 'Approve'}
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  buttonText: {
    color: 'white',
  },
  listItemTitle: {
    fontSize: 15,
  },
  listItemDescription: {
    fontSize: 12,
  },
});
