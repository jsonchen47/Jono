import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '../src/navigation'
import ChatScreen from './ChatScreen'
import { View, StyleSheet, ScrollView, Image, Dimensions, SafeAreaView, ListRenderItem, TouchableOpacity} from 'react-native';
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
import 'react-native-get-random-values';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { ProgressProvider, useProgress } from '@/src/contexts/ProgressContext';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons'; // Import vector icons


// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

Amplify.configure({ ...awsconfig, Analytics: {disabled: true}});

function ProgressBarComponent() {
  const { isVisible, progress, hideProgressBar } = useProgress();

  if (!isVisible) return null; // Don't render if not visible

  return (
    <View style={styles.progressBarContainer}> 
      {/* <ProgressBar progress={progress} color="#4CDFFF" style={styles.progressBar} /> */}
      <ProgressBar progress={progress} color="royalblue" style={styles.progressBar} />
      <View style={styles.progressBarBottomContainer}>
        <Text style={styles.progressBarBottomText}>
          Your project uploading! 
        </Text>
        <TouchableOpacity
          onPress={() => {
            hideProgressBar()
            }}
        >
          <Icon name='x' style={styles.progressBarIcon}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RootLayout() {

useEffect(() => {
  
  const syncUser = async () => {
    // get Auth user
    const authUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });

    // query the database using Auth user id (sub)
    const result = await API.graphql(
      graphqlOperation(getUser, { id: authUser.attributes.sub })
    );

    // Type assertion to treat result as GraphQLResult
    const userData = result as GraphQLResult<any>;

    // If userData exists and has data, then exit the syncUser and don't add new user
    if (userData.data && userData.data.getUser) {
      return;
    }

    // Create a new user
    const newUser = {
      id: authUser.attributes.sub, 
      name: authUser.attributes.phone_number, 
      status: 'Hey, I am using Jono',
    }

    const newUserResponse = await API.graphql(
      graphqlOperation(createUser, {input: newUser})
    )
  };

  syncUser();
  
}, []);

  return (
    <ProgressProvider>
      <GestureHandlerRootView>
        <ApplicationProvider {...eva} theme={eva.light}>
          <PaperProvider>
            <View style={styles.container}>
            {/* Global Progress Bar */}
            
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
                  headerShown: false,
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
                    title: 'Group Info',
                    headerStyle: {
                      backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                  }}
                />
                <Stack.Screen
                // name="newProject/newProject1"
                name="newProject"
                options={{
                  animation: 'slide_from_bottom', 
                  // presentation: 'modal'
                  headerShown: false,
                }}
                />
                <Stack.Screen
                name="search"
                options={{
                  headerShown: false,
                  animation: 'fade', // Enables the fade animation
                }}
                />
                <Stack.Screen
                name="optionsScreen"
                options={{
                  presentation: 'modal',
                  title: 'Options',
                }}
                />
                <Stack.Screen
                name="deleteProjectConfirmationScreen"
                options={{
                  headerShown: false,
                  presentation: 'transparentModal',
                  title: 'Options',
                  animation: 'fade',
                }}
                />
                <Stack.Screen
                name="progressBar"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                  title: 'Options',
                  animation: 'fade',
                }}
                />
              </Stack>
              {/* <SafeAreaView> */}
              <ProgressBarComponent />
            {/* </SafeAreaView> */}
              </View>
          </PaperProvider>
        </ApplicationProvider>
      </GestureHandlerRootView>
     </ProgressProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  progressBarContainer: {
    position: 'absolute', // Position the progress bar absolutely
    bottom: 90, // Adjust based on your bottom tab navigator height
    left: 0,
    right: 0,
    zIndex: 10,
  }, 
  progressBar: {
    height: 4,
   
  },
  stackContainer: {
    flex: 1, // This will ensure the stack takes the remaining space
    marginBottom: 300, // Adjust based on the height of your tab navigator
  },
  progressBarBottomContainer: {
    backgroundColor: 'whitesmoke', 
    paddingVertical: 10, 
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 
  progressBarBottomText: {
    // paddingHorizontal: 0, 
    fontWeight: 'bold'
  },
  progressBarIcon: {
    fontSize: 20, 
  },
});

export default withAuthenticator(RootLayout); 

// export default RootLayout; 
