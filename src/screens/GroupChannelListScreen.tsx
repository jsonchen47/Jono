import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createGroupChannelListFragment } from '@sendbird/uikit-react-native';
import { ChannelList } from 'stream-chat-react-native';


const GroupChannelListFragment = createGroupChannelListFragment({
  // Header: (props) => {
  //   const { HeaderComponent } = useHeaderStyle();
  //   return (
  //     <HeaderComponent
  //       title={'Custom title'}
  //       titleAlign={'center'}
  //       left={'Back'}
  //       onPressLeft={props.onPressHeaderLeft}
  //       right={'Info'}
  //       onPressRight={props.onPressHeaderRight}
  //     />
  //   );
  // },
});

const GroupChannelListScreen = () => {
  const navigation = useNavigation<any>();
  // return (
  //   <GroupChannelListFragment
  //   channelListQueryParams={{
  //     includeEmpty: true, // Include empty channels
  //   }}
  //     onPressCreateChannel={(channelType) => {
  //       navigation.navigate('GroupChannelCreate', { channelType });
  //     }}
  //     onPressChannel={(channel) => {
  //       navigation.navigate('GroupChannel', { channelUrl: channel.url });
  //     }}
      
  //   />
  // );
  return <ChannelList />;
};

export default GroupChannelListScreen;
