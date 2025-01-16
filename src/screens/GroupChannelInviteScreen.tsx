import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createGroupChannelInviteFragment } from '@sendbird/uikit-react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const GroupChannelInviteFragment = createGroupChannelInviteFragment();

const GroupChannelInviteScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
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
    <GroupChannelInviteFragment
      channel={channel}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
      onInviteMembers={(updatedChannel) => {
        console.log('Members invited successfully:', updatedChannel);
        navigation.goBack(); // Go back to the previous screen
      }}
    />
  );
};

export default GroupChannelInviteScreen;
