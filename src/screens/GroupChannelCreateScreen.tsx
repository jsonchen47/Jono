import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createGroupChannelCreateFragment } from '@sendbird/uikit-react-native';

const GroupChannelCreateFragment = createGroupChannelCreateFragment();

const GroupChannelCreateScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async (channel) => {
        navigation.replace('GroupChannel', { channelUrl: channel.url });
      }}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
    />
  );
};

export default GroupChannelCreateScreen;
