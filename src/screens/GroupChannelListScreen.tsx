import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createGroupChannelListFragment } from '@sendbird/uikit-react-native';

const GroupChannelListFragment = createGroupChannelListFragment();

const GroupChannelListScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <GroupChannelListFragment
    channelListQueryParams={{
      includeEmpty: true, // Include empty channels
    }}
      onPressCreateChannel={(channelType) => {
        navigation.navigate('GroupChannelCreate', { channelType });
      }}
      onPressChannel={(channel) => {
        navigation.navigate('GroupChannel', { channelUrl: channel.url });
      }}
    />
  );
};

export default GroupChannelListScreen;
