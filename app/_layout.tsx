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
import { GraphQLResult } from '@aws-amplify/api-graphql';
import {createUser} from '../src/graphql/mutations';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


Amplify.configure({ ...awsconfig, Analytics: {disabled: true}});

function RootLayout() {

useEffect(() => {
  
  const syncUser = async () => {
    // get Auth user
    const authUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
    // console.log(authUser);

    // query the database using Auth user id (sub)
    const result = await API.graphql(
      graphqlOperation(getUser, { id: authUser.attributes.sub })
    );

    // Type assertion to treat result as GraphQLResult
    const userData = result as GraphQLResult<any>;

    // If userData exists and has data, then exit the syncUser and don't add new user
    if (userData.data && userData.data.getUser) {
      // console.log("User already exists in DB");
      return;
    }

    // Create a new user
    const newUser = {
      id: authUser.attributes.sub, 
      name: authUser.attributes.phone_number, 
      status: 'Hey, I am using Jono',
    }
    // console.log(newUser);

    const newUserResponse = await API.graphql(
      graphqlOperation(createUser, {input: newUser})
    )
  };

  syncUser();
  
}, []);

  return (
    <GestureHandlerRootView>
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
               <Stack.Screen
              name="project/[id]"
              options={{
                title: 'Project',
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: 'black',
      
              }}
              />
              <Stack.Screen
                name="groupInfoScreen"
                options={{
                  // Hide the header for this route
                  // headerShown: false,
                  title: 'Group Info',
                  headerStyle: {
                    backgroundColor: 'white',
                  },
                  headerTintColor: 'black',
                  // tabBarVisible: false // Hide tab bar for Project page
                }}
              />
              <Stack.Screen
              name="newProject"
              />
            </Stack>
            {/* <View>
              <Text>hi</Text>
            </View> */}
        </PaperProvider>
      </ApplicationProvider>
     </GestureHandlerRootView>
  );
}

export default withAuthenticator(RootLayout); 

// export default RootLayout; 
