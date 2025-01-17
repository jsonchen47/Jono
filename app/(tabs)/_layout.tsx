import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotifications } from '@/src/contexts/NotificationContext';
import { useConnection } from '@sendbird/uikit-react-native';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { getUser } from '@/src/graphql/queries';
import SendbirdChat from '@sendbird/chat'; // Ensure you have the correct Sendbird import for your SDK


const client = generateClient();

export default function TabLayout() {
  const { hasNotifications } = useNotifications();
  const router = useRouter();
  const { connect } = useConnection(); // Use the hook at the top level

  const handleCenterTabPress = () => {
    router.push('/newProject/newProject1'); // Replace with your desired screen
    console.log('tabs button pressed');
  };

  // Connect user to Sendbird 
  useEffect(() => {
    const connectUser = async () => {
      try {
        // Get Authenticated User ID from Amplify Auth
        const authUser = await getCurrentUser();
        const userID = authUser.userId;
    
        // Query the database using the user ID from Auth
        const result = await client.graphql({
          query: getUser,
          variables: { id: userID },
        });
    
        const userData = result.data?.getUser;
    
        if (userData) {
          const username = userData.name; // Updated name from GraphQL
          const profileImage = userData.image; // Updated profile image from GraphQL
    
          console.log('User ID:', userID);
          console.log('Username:', username);
          console.log('Profile Image:', profileImage);
    
          // Step 1: Connect to Sendbird with the user ID and nickname
          await connect(userID, { nickname: username || 'User' });
    
          // Step 2: Update the user's profile image
          const sb = SendbirdChat.instance; // Use instance to access the SendbirdChat singleton
          await sb.updateCurrentUserInfo({
            nickname: username || 'User',
            profileUrl: profileImage || '', // Set profile image
          });
    
          console.log('Sendbird profile updated successfully.');
        } else {
          console.warn('No user data found in the database.');
        }
      } catch (error) {
        console.error('Error connecting user to Sendbird:', error);
      }
    };

    connectUser();
    
  }, [connect]); // Dependency array includes `connect`

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
