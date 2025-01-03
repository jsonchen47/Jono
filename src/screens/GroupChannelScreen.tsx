import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSendbirdChat, createGroupChannelFragment } from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';

const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const { sdk } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);

  if (!channel) return null;

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
        navigation.navigate('GroupChannelSettings', { channelUrl: params.channelUrl });
      }}
    />
  );
};

export default GroupChannelScreen;
