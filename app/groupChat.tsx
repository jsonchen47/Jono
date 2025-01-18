import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupChannelScreen from '@/src/screens/GroupChannelScreen';
import GroupChannelSettingsScreen from '@/src/screens/GroupChannelSettingsScreen';
import GroupChannelModerationScreen from '@/src/screens/GroupChannelModerationScreen';
import GroupChannelMembersScreen from '@/src/screens/GroupChannelMembersScreen';
import GroupChannelInviteScreen from '@/src/screens/GroupChannelInviteScreen';
import OperatorsScreen from '@/src/screens/GroupChannelOperatorsScreen';
import MutedMembersScreen from '@/src/screens/GroupChannelMutedMembersScreen';
import BannedUsersScreen from '@/src/screens/GroupChannelBannedMembersScreen';
const Stack = createStackNavigator();

const GroupChatNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupChannel"
        component={GroupChannelScreen}
        options={{
          title: 'Chat',
          headerShown: false, // Show the header for navigation
        }}
      />
      <Stack.Screen
        name="GroupChannelSettings"
        component={GroupChannelSettingsScreen}
        options={{
          title: 'Settings',
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
      <Stack.Screen 
        name="Operators" 
        component={OperatorsScreen}
        options={{ 
          title: 'Operators',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="MutedMembers" 
        component={MutedMembersScreen} 
        options={{ 
          title: 'Muted Members',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="BannedUsers" 
        component={BannedUsersScreen} 
        options={{ 
          title: 'Banned Members',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default GroupChatNavigator;
