import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createGroupChannelSettingsFragment } from '@sendbird/uikit-react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const GroupChannelSettingsFragment = createGroupChannelSettingsFragment();

const GroupChannelSettingsScreen = () => {
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

  if (!channel) {
    return null; // Render a loading state if necessary
  }

  return (
    <GroupChannelSettingsFragment
      channel={channel}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
    //   onPressMenuModeration={() => {
    //     console.log('Moderation menu pressed');
    //   }}
    //   onPressMenuMembers={() => {
    //     console.log('Members menu pressed');
    //   }}
      onPressMenuLeaveChannel={() => {
        console.log('Leave channel menu pressed');
      }}
      onPressMenuModeration={() => {
        navigation.navigate('GroupChannelModeration', { channelUrl: channel.url });
      }}
      onPressMenuMembers={() => {
        navigation.navigate('GroupChannelMembers', { channelUrl: channel.url });
      }}
    />
  );
};

export default GroupChannelSettingsScreen;
