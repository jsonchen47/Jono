import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createGroupChannelOperatorsFragment } from '@sendbird/uikit-react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const GroupChannelOperatorsFragment = createGroupChannelOperatorsFragment();

const OperatorsScreen = () => {
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

  if (!channel) {
    return null; // Render a loading indicator if desired
  }

  return (
    <GroupChannelOperatorsFragment
      channel={channel}
      onPressHeaderLeft={() => navigation.goBack()}
      onPressHeaderRight={() => {
        // Define your action here, e.g., navigate to a settings screen
        console.log('Header right button pressed');
      }}
    />
  );
};

export default OperatorsScreen;
