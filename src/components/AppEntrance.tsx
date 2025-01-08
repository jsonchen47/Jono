// AppEntrance.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { createUser } from '../graphql/mutations';
import { getUser } from '../graphql/queries';

// PROVIDER IMPORTS
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProgressProvider } from '@/src/contexts/ProgressContext';
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

const AppEntrance = () => {

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

        const newUser = {
          id: authUser.userId,
          name: userAttributes.name || 'New User',
          username: authUser.username,
          status: 'Hey, I am using Jono',
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
});

export default AppEntrance;
