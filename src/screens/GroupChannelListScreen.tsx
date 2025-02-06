import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChannelList } from 'stream-chat-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useChatContext } from 'stream-chat-react-native';

const ChannelListScreen = () => {
  const navigation = useNavigation<any>();
  const { client } = useChatContext();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the authenticated user ID from Stream Chat client
    if (client?.user?.id) {
      setUserId(client.user.id);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [client]);

  // Set up header with the pen icon
  useEffect(() => {
    navigation.setOptions({
      title: 'Messages',
      headerStyle: { backgroundColor: 'white' },
      headerTintColor: 'black',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('GroupChannelCreate')} style={styles.iconContainer}>
          <Icon name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View>
        </View>
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChannelList
        filters={{
          type: 'messaging', // Adjust this if needed (e.g., 'team', 'commerce')
          members: { $in: [userId] }, // Ensures the user is a member
        }}
        onSelect={(channel) => navigation.navigate('GroupChannel', { channelId: channel.id })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  iconContainer: { 
    marginRight: 15 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChannelListScreen;
