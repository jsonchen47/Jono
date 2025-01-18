import React, {useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createGroupChannelMutedMembersFragment } from '@sendbird/uikit-react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
const GroupChannelMutedMembersFragment = createGroupChannelMutedMembersFragment();

const MutedMembersScreen = () => {
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
    return null;
  }

  return (
    <GroupChannelMutedMembersFragment
      channel={channel}
      onPressHeaderLeft={() => navigation.goBack()}
    />
  );
};

export default MutedMembersScreen;
