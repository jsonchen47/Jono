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
import React, { useEffect, useState } from 'react'; 
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
import { ProgressBar, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons'; // Import vector icons
import { useRouter } from 'expo-router';
import { ProjectUpdateProvider } from '@/src/contexts/ProjectUpdateContext';
import { FilterProvider } from '@/src/contexts/FilterContext';
import { NotificationProvider } from '@/src/contexts/NotificationContext';
import { useConnection } from '@sendbird/uikit-react-native';

// SENDBIRD IMPORTS
import {
  createExpoClipboardService,
  createExpoFileService,
  createExpoMediaService,
  createExpoNotificationService,
  createExpoPlayerService,
  createExpoRecorderService,
  SendbirdUIKitContainerProps
} from "@sendbird/uikit-react-native";

import * as ExpoClipboard from 'expo-clipboard';
import * as ExpoDocumentPicker from 'expo-document-picker';
import * as ExpoFS from 'expo-file-system';
import * as ExpoImagePicker from 'expo-image-picker';
import * as ExpoMediaLibrary from 'expo-media-library';
import * as ExpoNotifications from 'expo-notifications';
import * as ExpoAV from 'expo-av';
import * as ExpoVideoThumbnail from 'expo-video-thumbnails';
import * as ExpoImageManipulator from 'expo-image-manipulator';

import { SendbirdUIKitContainer } from '@sendbird/uikit-react-native';
import { MMKV } from 'react-native-mmkv';

// SENDBIRD PLATFORM SERVICES
const platformServices: SendbirdUIKitContainerProps['platformServices'] = {
  clipboard: createExpoClipboardService(ExpoClipboard),
  notification: createExpoNotificationService(ExpoNotifications),
  file: createExpoFileService({
    fsModule: ExpoFS,
    imagePickerModule: ExpoImagePicker,
    mediaLibraryModule: ExpoMediaLibrary,
    documentPickerModule: ExpoDocumentPicker,
  }),
  media: createExpoMediaService({
    avModule: ExpoAV,
    thumbnailModule: ExpoVideoThumbnail,
    imageManipulator: ExpoImageManipulator,
    fsModule: ExpoFS,
  }),
  player: createExpoPlayerService({
    avModule: ExpoAV,
  }),
  recorder: createExpoRecorderService({
    avModule: ExpoAV,
  }),
};

// https://github.com/mrousavy/react-native-mmkv
const mmkv = new MMKV();

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

Amplify.configure({ ...awsconfig, Analytics: {disabled: true}});

// Define the prop types for ProgressBarComponent
interface ProgressBarComponentProps {
  snackbarVisible: boolean;
  setSnackbarVisible: React.Dispatch<React.SetStateAction<boolean>>; // Type for state updater function
}

function ProgressBarComponent({ snackbarVisible, setSnackbarVisible }: ProgressBarComponentProps) {
  const { isVisible, progress, hideProgressBar } = useProgress();

  useEffect(() => {
    if (progress >= 1) { // Adjust based on your actual completion condition
      setSnackbarVisible(true); // Show Snackbar
    }
  }, [progress]);

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

function SnackBarComponent({ snackbarVisible, setSnackbarVisible }: ProgressBarComponentProps) {
  const router = useRouter();
  const { isVisible, progress, hideProgressBar, projectId } = useProgress();
  return (
    <Snackbar
        style={styles.snackBar}
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)} // Dismiss Snackbar
        duration={5000} // Optional duration for the Snackbar
        action={{
          label: 'View',
          onPress: () => {
            // Do something
            if (projectId) {
              // Navigate only if projectId is valid
              router.push({
                pathname: '/project/[id]',
                params: { id: projectId, projectID: projectId },
              });
            } else {
              // Handle the case when projectId is null (e.g., show an alert or log an error)
              console.error("Project ID is null, cannot navigate.");
              // Optionally, show an alert or feedback to the user
            }
          },
        }}
      >
        Project uploaded successfully!
    </Snackbar>
  )
}


function RootLayout() {
  const [snackbarVisible, setSnackbarVisible] = useState<any>(false); // Snackbar visibility state

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
    <SendbirdUIKitContainer
      appId={'01E73A75-F4D1-4564-957C-FA30C79A0FCE'}
      chatOptions={{ localCacheStorage: mmkv }}
      platformServices={platformServices}
    >
        <GestureHandlerRootView>
          <ProgressProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <PaperProvider>
            <NotificationProvider>
              <ProjectUpdateProvider>
              
                  <FilterProvider>
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
                        name="otherProfile"
                        options={{
                          // headerShown: false,
                          title: 'Profile',
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
                        name="filter"
                        options={{
                          presentation: 'modal',
                          title: 'Filter',
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
                        <Stack.Screen
                        name="manageProject"
                        options={{
                          title: 'Manage Project',
                          headerShown: false,
                          // presentation: 'fullScreenModal',
                        }}
                        />
                        {/* <Stack.Screen
                        name="map"
                        options={{
                          title: 'Map',
                          presentation: 'fullScreenModal',
                        }}
                        /> */}
                      </Stack>
                      {/* <SafeAreaView> */}
                      <ProgressBarComponent 
                        snackbarVisible={snackbarVisible} 
                        setSnackbarVisible={setSnackbarVisible} 
                      />
                      {/* Snackbar Component */}
                      
                      <SnackBarComponent
                      snackbarVisible={snackbarVisible} 
                      setSnackbarVisible={setSnackbarVisible} 
                      />
                      {/* </SafeAreaView> */}
                      </View>
                    </FilterProvider>
                  
                </ProjectUpdateProvider>
                </NotificationProvider>
            </PaperProvider>
          </ApplicationProvider>
          </ProgressProvider>
        </GestureHandlerRootView>
      </SendbirdUIKitContainer>
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
  snackBar: {
    bottom: 50, // Adjust based on your bottom tab navigator height
  },
});

export default withAuthenticator(RootLayout); 

// export default RootLayout; 
