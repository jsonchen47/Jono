// AppEntrance.tsx
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { createUser } from '../graphql/mutations';
import { getUser } from '../graphql/queries';
import { uploadData } from 'aws-amplify/storage';
import config from '../../src/aws-exports';
import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';
import { ProgressProvider, useProgress } from '@/src/contexts/ProgressContext';
import { ProgressBar, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons'; // Import vector icons
import { useRouter } from 'expo-router';

// OTHER PROVIDER IMPORTS
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProjectUpdateProvider } from '@/src/contexts/ProjectUpdateContext';
import { FilterProvider } from '@/src/contexts/FilterContext';
import { NotificationProvider } from '@/src/contexts/NotificationContext';
import { UserProvider } from '@/src/contexts/UserContext';

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

const client = generateClient();

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

const mmkv = new MMKV();

// For uploading the default profile picture
const uploadDefaultProfilePicture = async (username: string) => {
  try {
    // Use the bundled asset directly
    const assetUri = require('../../assets/images/profile1.png'); // Path to your local image

    // Convert the asset to a blob
    const response = await fetch(Image.resolveAssetSource(assetUri).uri); // Resolve asset URI
    const blob = await response.blob();

    // Generate a unique file name
    const fileName = `${username}_default_profile_${Date.now()}.jpg`;

    // Upload the blob to S3
    const uploadResult = await uploadData({
      key: fileName,
      data: blob,
      options: {
        contentType: 'image/jpeg',
        accessLevel: 'guest',
      },
    }).result;

    // Generate the public URL
    const uploadedImageUrl = `https://${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/${fileName}`;
    return uploadedImageUrl;
  } catch (error) {
    console.error('Error uploading default profile picture:', error);
    return null;
  }
};


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


const AppEntrance = () => {
  const [snackbarVisible, setSnackbarVisible] = useState<any>(false); // Snackbar visibility state


  useEffect(() => {
    const syncUser = async () => {
      try {
        const authUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
    
        const userResult = await client.graphql({
          query: getUser,
          variables: { id: authUser.userId },
        });
    
        const userData = userResult.data?.getUser;
    
        if (userData) {
          console.log('User exists:', userData);
          return;
        }
    
        // Use the username to generate the file name
        const username = authUser.username || 'default_user';
        const defaultImage = await uploadDefaultProfilePicture(username);
    
        const newUser = {
          id: authUser.userId,
          name: userAttributes.name || 'New User',
          username: username,
          status: 'Hey, I am using Jono',
          image: defaultImage || null, // Set the default profile picture if available
        };
    
        await client.graphql({
          query: createUser,
          variables: { input: newUser },
        });
    
        console.log('New user created:', newUser);
      } catch (error) {
        console.error('Error syncing user:', error);
      }
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
          <NotificationProvider>
            <UserProvider>
              <ProjectUpdateProvider>
                <FilterProvider>
                  <View style={styles.container}>
                    <Stack>
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="chatScreen/[id]"
                        options={{
                          title: 'Chat',
                          headerStyle: { backgroundColor: 'white' },
                          headerTintColor: 'black',
                        }}
                      />
                      <Stack.Screen
                        name="project/[id]"
                        options={{
                          headerShown: false,
                          title: 'Project',
                          headerStyle: { backgroundColor: 'white' },
                          headerTintColor: 'black',
                        }}
                      />
                      <Stack.Screen
                        name="otherProfile"
                        options={{
                          title: 'Profile',
                          headerStyle: { backgroundColor: 'white' },
                          headerTintColor: 'black',
                        }}
                      />
                      <Stack.Screen
                        name="groupInfoScreen"
                        options={{
                          title: 'Group Info',
                          headerStyle: { backgroundColor: 'white' },
                          headerTintColor: 'black',
                        }}
                      />
                      <Stack.Screen
                        name="newProject"
                        options={{
                          animation: 'slide_from_bottom',
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="search"
                        options={{
                          headerShown: false,
                          animation: 'fade',
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
                        }}
                      />
                      <Stack.Screen
                        name="editProfile"
                        options={{
                          title: 'Edit Profile',
                          presentation: 'fullScreenModal',
                        }}
                      />
                    </Stack>
                    <ProgressBarComponent 
                        snackbarVisible={snackbarVisible} 
                        setSnackbarVisible={setSnackbarVisible} 
                      />
                      {/* Snackbar Component */}
                      
                      <SnackBarComponent
                      snackbarVisible={snackbarVisible} 
                      setSnackbarVisible={setSnackbarVisible} 
                      />
                  </View>
                </FilterProvider>
              </ProjectUpdateProvider>
            </UserProvider>
          </NotificationProvider>
        </ProgressProvider>
      </GestureHandlerRootView>
    </SendbirdUIKitContainer>
  );
};

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

export default AppEntrance;