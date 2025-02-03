import React from 'react';
import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router'; // Supports Expo Router
import { Channel, MessageList, MessageInput, useChatContext } from 'stream-chat-react-native';

const GroupChannelScreen = () => {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const { params } = useRoute<any>(); // Get params from navigation
  const searchParams = useLocalSearchParams(); // Get params from router

  // Consolidate channelId from both sources
  const channelId = params?.channelId ?? searchParams?.channelId;
  const validChannelId = Array.isArray(channelId) ? channelId[0] : channelId;

  if (!validChannelId) {
    return <Text>Error: channelId is missing!</Text>; // Handle missing channelId
  }

  const channel = client.channel('messaging', validChannelId);

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
