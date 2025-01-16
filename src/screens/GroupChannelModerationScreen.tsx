import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createGroupChannelModerationFragment } from '@sendbird/uikit-react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const GroupChannelModerationFragment = createGroupChannelModerationFragment();

const GroupChannelModerationScreen = () => {
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();
  const { sdk } = useSendbirdChat();
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      if (sdk && params.channelUrl) {
        const fetchedChannel = await sdk.groupChannel.getChannel(params.channelUrl);
        setChannel(fetchedChannel);
      }
    };

    fetchChannel();
  }, [sdk, params.channelUrl]);

  if (!channel) return null; // Render a loading state if channel isn't fetched yet

  return (
    <GroupChannelModerationFragment
      channel={channel}
      onPressHeaderLeft={() => navigation.goBack()}
      onPressMenuMutedMembers={() => {
        navigation.navigate('MutedMembers', { channelUrl: channel.url });
      }}
      onPressMenuBannedUsers={() => {
        navigation.navigate('BannedUsers', { channelUrl: channel.url });
      }}
      onPressMenuOperators={() => {
        navigation.navigate('OperatorsList', { channelUrl: channel.url });
      }}
    />
  );
};

export default GroupChannelModerationScreen;
