import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router'; // Supports Expo Router
import { Channel, MessageList, MessageInput, useChatContext } from 'stream-chat-react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the chevron

const GroupChannelScreen = () => {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const { params } = useRoute<any>(); // Get params from navigation
  const searchParams = useLocalSearchParams(); // Get params from router

  // Consolidate channelId from both sources
  const channelId = params?.channelId ?? searchParams?.channelId;
  const validChannelId = Array.isArray(channelId) ? channelId[0] : channelId;

  const [channelName, setChannelName] = useState<string | null>(null);

  if (!validChannelId) {
    return <Text>Error: channelId is missing!</Text>; // Handle missing channelId
  }

  const channel = client.channel('messaging', validChannelId);

  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        await channel.watch(); // Ensure channel is watched for updates
        setChannelName(channel.data?.name || 'Group Chat'); // Default if no name
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };

    fetchChannelInfo();
  }, [channelId]);

  useEffect(() => {
    navigation.setOptions({
      title: channelName || 'Group Chat', // Set header title to group chat name
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}>
          <Icon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [channelName]);

  if (!channel) {
    return <Text>Loading channel...</Text>;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default GroupChannelScreen;
