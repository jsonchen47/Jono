import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupChannelListScreen from '../screens/GroupChannelListScreen';
import GroupChannelCreateScreen from '../screens/GroupChannelCreateScreen';
import GroupChannelScreen from '../screens/GroupChannelScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupChannelList"
        component={GroupChannelListScreen}
        options={{ title: 'Channels' }}
      />
      <Stack.Screen
        name="GroupChannelCreate"
        component={GroupChannelCreateScreen}
        options={{ title: 'Create Channel' }}
      />
      <Stack.Screen
        name="GroupChannel"
        component={GroupChannelScreen}
        options={{ title: 'Chat' }}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
