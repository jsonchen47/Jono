import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '../src/navigation'
import ChatScreen from './ChatScreen'
import { View, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem } from 'react-native';
import { Amplify } from "aws-amplify"; 
// @ts-ignore
import {withAuthenticator} from "aws-amplify-react-native"; 
import awsconfig from "../src/aws-exports";



Amplify.configure(awsconfig);

function RootLayout() {
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

export default withAuthenticator(RootLayout); 
