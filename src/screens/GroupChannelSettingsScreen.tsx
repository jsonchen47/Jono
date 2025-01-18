import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
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

  const handleLeaveChannel = async () => {
    if (!channel) return;

    // Alert.alert(
    //   'Leave Channel',
    //   'Are you sure you want to leave this channel?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Leave',
    //       style: 'destructive',
    //       onPress: async () => {
    //         try {
    //           await channel.leave();
    //           navigation.navigate('GroupChannelList'); // Navigate back to the channel list
    //         } catch (error) {
    //           console.error('Failed to leave channel:', error);
    //         }
    //       },
    //     },
    //   ]
    // );
    console.log('left channel')
  };

  if (!channel) {
    return null; // Render a loading state if necessary
  }

  return (
    <GroupChannelSettingsFragment
      channel={channel}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
      onPressMenuLeaveChannel={handleLeaveChannel}
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
