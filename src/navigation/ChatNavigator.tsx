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
        options={{ 
          title: 'Channels',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupChannelCreate"
        component={GroupChannelCreateScreen}
        options={{ 
          title: 'Create Channel',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupChannel"
        component={GroupChannelScreen}
        options={{ 
          title: 'Chat',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
