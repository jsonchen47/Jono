import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createGroupChannelMembersFragment } from '@sendbird/uikit-react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const GroupChannelMembersFragment = createGroupChannelMembersFragment();

const GroupChannelMembersScreen = () => {
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

  if (!channel) return null; // Render a loading state if the channel isn't fetched yet

  return (
    <GroupChannelMembersFragment
      channel={channel}
      onPressHeaderLeft={() => navigation.goBack()}
      onPressHeaderRight={() => {
        // Navigate to a screen to add new members
        navigation.navigate('GroupChannelInvite', { channelUrl: channel.url });
    }}
    />
  );
};

export default GroupChannelMembersScreen;
