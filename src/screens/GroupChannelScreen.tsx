import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router'; // Use LocalSearchParams
import { useSendbirdChat, createGroupChannelFragment } from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';

const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { channelUrl } = useLocalSearchParams(); // Get search parameters
  const { sdk } = useSendbirdChat();

  // Ensure channelUrl is a string
  const validChannelUrl = Array.isArray(channelUrl) ? channelUrl[0] : channelUrl;

  if (!validChannelUrl) {
    return <Text>Error: channelUrl is missing!</Text>; // Handle missing channelUrl
  }

  const { channel } = useGroupChannel(sdk, validChannelUrl);

  if (!channel) {
    return <Text>Loading channel...</Text>;
  }

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => {
        navigation.navigate('GroupChannelList');
      }}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
      onPressHeaderRight={() => {
        navigation.navigate('GroupChannelSettings', { channelUrl: validChannelUrl });
      }}
    />
  );
};

export default GroupChannelScreen;
