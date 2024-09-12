import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Entypo} from '@expo/vector-icons'

import ChatScreen from '../screens/ChatScreen'
import ChatsScreen from '../screens/ChatsScreen'
import TabLayout from '../../app/(tabs)/_layout'

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
        {/* <Stack.Screen name="Tabs" component={TabLayout}/> */}
      <Stack.Screen name="Chats" component={ChatsScreen}
        options={{
            headerRight: () => (
                <Entypo
              name="new-message"
              size={18}
              color={'royalblue'}
              style={{ marginRight: 15 }}
            />
            ),
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen}
        options={{
            presentation: 'modal'
        }}
      />
    </Stack.Navigator>
  )
}

export default Navigator