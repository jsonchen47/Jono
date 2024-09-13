import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '../src/navigation'
import ChatScreen from './ChatScreen'
import { View, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem } from 'react-native';


export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PaperProvider>
          <Stack>
            <Stack.Screen 
              name="(tabs)" 
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
            name="ChatScreen"
            /> */}
          </Stack>
          {/* <View>
            <Text>hi</Text>
          </View> */}
      </PaperProvider>
     </ApplicationProvider>
  );
}

