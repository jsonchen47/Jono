import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import ChatNavigator from '@/src/navigation/ChatNavigator'
import { useSendbirdChat } from '@sendbird/uikit-react-native';



const chat = () => {
  const { sdk } = useSendbirdChat();

  useEffect(() => {
    async function verifyChannel() {
      const query = sdk.groupChannel.createMyGroupChannelListQuery({
        includeEmpty: true, // Include empty channels
      });

      const channels = await query.next();
      console.log('Fetched channels:', channels);
    }
    if (sdk) {
      console.log('Sendbird SDK connection state:', sdk.connectionState);
      console.log('Current user:', sdk.currentUser);
    }
    verifyChannel()
  }, [sdk]);

  return (
    // <View>
      <ChatNavigator/>
  )
}

export default chat

