import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '../src/navigation'
import ChatScreen from './ChatScreen'
import { View, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem } from 'react-native';
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify"; 
// @ts-ignore
import {withAuthenticator} from "aws-amplify-react-native"; 
import awsconfig from "../src/aws-exports";
// import {Picker} from 'react-native';
import { useEffect } from 'react'; 
import {getUser} from '../src/graphql/queries'

Amplify.configure({ ...awsconfig, Analytics: {disabled: true}});

function RootLayout() {

useEffect(() => {
  
  const syncUser = async () => {
    // get Auth user
    const authUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
    console.log(authUser);

    // query the database using Auth user id (sub)
    const userData = await API.graphql(
      graphqlOperation(getUser, {id: authUser.attributes.sub})
      );
      console.log(userData)

    // if there are no users in db, create one 
  };

  syncUser();
  
}, []);

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
            <Stack.Screen
            name="chatScreen/[id]"
            />
          </Stack>
          {/* <View>
            <Text>hi</Text>
          </View> */}
      </PaperProvider>
     </ApplicationProvider>
  );
}

export default withAuthenticator(RootLayout); 

// export default RootLayout; 
