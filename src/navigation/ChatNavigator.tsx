import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupChannelListScreen from '../screens/GroupChannelListScreen';
import GroupChannelCreateScreen from '../screens/GroupChannelCreateScreen';
import GroupChannelScreen from '../screens/GroupChannelScreen';
import GroupChannelSettingsScreen from '../screens/GroupChannelSettingsScreen';
import GroupChannelModerationScreen from '../screens/GroupChannelModerationScreen';
import GroupChannelMembersScreen from '../screens/GroupChannelMembersScreen';
import GroupChannelInviteScreen from '../screens/GroupChannelInviteScreen';

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
      <Stack.Screen
        name="GroupChannelSettings"
        component={GroupChannelSettingsScreen}
        options={{
           title: 'Channel Settings',
           headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupChannelModeration"
        component={GroupChannelModerationScreen}
        options={{ 
          title: 'Moderation',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupChannelMembers"
        component={GroupChannelMembersScreen}
        options={{ 
          title: 'Members',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupChannelInvite"
        component={GroupChannelInviteScreen}
        options={{ 
          title: 'Invite Members',
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};

export default ChatNavigator;
