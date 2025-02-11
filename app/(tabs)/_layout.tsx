import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNotifications } from '@/src/contexts/NotificationContext';
import { useConnection } from '@sendbird/uikit-react-native';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { getUser } from '@/src/graphql/queries';
import SendbirdChat from '@sendbird/chat'; // Ensure you have the correct Sendbird import for your SDK
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { updateProject } from '@/src/graphql/mutations'; // Import your GraphQL operations
import { listProjects } from '@/src/backend/queries';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { GraphQLResult } from '@aws-amplify/api-graphql';


const chatClient = StreamChat.getInstance('6ara8tryfyf7');


const client = generateClient();

export default function TabLayout() {
  const { hasNotifications } = useNotifications();
  const router = useRouter();

  const handleCenterTabPress = () => {
    router.push('/newProject/newProject1');
  };
  

  useEffect(() => {
    
    const REVENUECAT_API_KEY =
    Platform.OS === 'ios'
      ? 'appl_UqBRgTSPvhuYXQgHiSORJTTAxVL'
      : 'goog_oAEGXDSpZwSoOveOnooDmfDNNma';

    const initializePurchases = () => {
      const apiKey = REVENUECAT_API_KEY; // Replace with your actual RevenueCat API key
      Purchases.configure({ apiKey });
      console.log('Purchases configured successfully');
    };
  
    initializePurchases();
  }, []);
  

  // useEffect(() => {
  //   const connectUser = async () => {
  //     try {
  //       const authUser = await getCurrentUser();
  //       const userID = authUser.userId;
  
  //       // Fetch the token from AWS API Gateway
  //       const response = await fetch(
  //         `https://bkcog8h7gc.execute-api.us-east-1.amazonaws.com/default/generateStreamToken?userId=${userID}`
  //       );
  //       console.log('response', response)
  //       const { token } = await response.json();
  
  //       console.log('token', token)

  //       // Connect user to Stream Chat
  //       await chatClient.connectUser(
  //         {
  //           id: userID,
  //           name: authUser.username,
  //         },
  //         token // ✅ Use the secure token
  //       );
  
  //       console.log("User connected:", chatClient.user);
  //     } catch (error) {
  //       console.error("Stream Chat connection error:", error);
  //     }
  //   };
  
  //   connectUser();
  // }, []);

  useEffect(() => {
    let isMounted = true;

    const updateProjectsForPremiumUser = async (userId: string, isPremium: boolean) => {
      try {
        // Fetch the user's projects
        const result = (await client.graphql({
          query: listProjects,
          variables: {
            filter: {
              ownerIDs: { contains: userId },
            },
          },
        })) as GraphQLResult<any>;
        
  
        const userProjects = result?.data?.listProjects.items;
  
        // Update each project with the isFeatured status
        await Promise.all(
          userProjects.map(async (project: any) => {
            if (project.isFeatured !== isPremium) { // Avoid unnecessary updates
              await client.graphql({
                query: updateProject,
                variables: {
                  input: {
                    id: project.id,
                    isFeatured: isPremium,
                  },
                },
              });
            }
          })
        );
  
        console.log('Projects updated successfully.');
      } catch (error) {
        console.error('Error updating projects:', error);
      }
    };
  

    const connectUser = async () => {
        try {
            const authUser = await getCurrentUser();
            const userID = authUser.userId;

            // Query the database using the user ID from Auth
            const result = await client.graphql({
              query: getUser,
              variables: { id: userID },
            });
        
            const userData = result.data?.getUser;

            // Check RevenueCat for premium status
            const customerInfo = await Purchases.getCustomerInfo();
            const isPremium = customerInfo.entitlements.active['premium'] !== undefined;

            // Update user's projects if premium status has changed
            await updateProjectsForPremiumUser(userID, isPremium);

            // Fetch the token from AWS API Gateway
            const response = await fetch(
                `https://bkcog8h7gc.execute-api.us-east-1.amazonaws.com/default/generateStreamToken?userId=${userID}`
            );
            const { token } = await response.json();

            // Connect user to Stream Chat
            await chatClient.connectUser(
                {
                    id: userID,
                    name: userData?.name,
                    image: userData?.image || "", // Provide default image fallback

                },
                token // ✅ Use the secure token
            );

            if (isMounted) {
                console.log("User connected:", chatClient.user);
            }
        } catch (error) {
            console.error("Stream Chat connection error:", error);
        }
    };

    connectUser();

    return () => {
        isMounted = false;
        chatClient.disconnectUser().then(() => {
            console.log("User disconnected from Stream Chat");
        }).catch(error => {
            console.error("Error disconnecting user:", error);
        });
    };
}, []);


  
  
  
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          marginBottom: 10,
          marginTop: 5,
        },
        tabBarStyle: {
          height: 90,
        },
      }}
    >
      <Tabs.Screen 
        name="(home)" 
        options={{ 
          title: 'Explore',
          headerTitleAlign: 'left',
          tabBarIcon: ({ color, size }) => (  
            <Ionicons name="search" color={color} size={size} style={{marginTop: 5}}/>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="saved" 
        options={{ 
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} style={{marginTop: 5}}/>
          ),
          // headerShadowVisible: false,
          // headerStyle: {
          //   backgroundColor: 'white',
          // }
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="center" 
        options={{ 
          tabBarButton: (props) => (
            <TouchableOpacity style={styles.centerTab} onPress={handleCenterTabPress}>
              <Ionicons name="add-circle-outline" size={28} color="gray" style={{marginTop: 5}}/>
              <Text style={styles.centerTabText}>New Project</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" color={color} size={size} style={{marginTop: 5}}/>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="(profile)" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="person-outline" color={color} size={size} style={{marginTop: 5}}/>
              {hasNotifications && <View style={styles.notificationDot} />}
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerTab: {
    position: 'absolute',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    transform: [{ translateX: -35 }],
    paddingTop: 2,
  },
  centerTabText: {
    fontSize: 10,
    marginTop: 4,
    color: 'gray',
    marginBottom: 10, 
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'white',
  },
});
