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

const client = generateClient();

export default function TabLayout() {
  const { hasNotifications } = useNotifications();
  const router = useRouter(); 
  const handleCenterTabPress = () => {
    router.push('/newProject/newProject1'); // Replace with your desired screen
    console.log('tabs button pressed');
  };
  
  const { connect } = useConnection();

  // Connect user to Sendbird 
  useEffect(() => {
    const connectUser = async () => {
      try {
        // Get Auth user
        const authUser = await getCurrentUser();
        
        // Query the database using Auth user id (sub)
        const result = await client.graphql({
          query: getUser,
          variables: { id: authUser.userId }
        });

        const userData = result.data?.getUser;
        const userID = userData?.id;
        const username = userData?.name;

        console.log(userID);
        console.log(username);

        if (userID && username) {
          connect(userID, { nickname: username });
        }
      } catch (error) {
        console.error('Error connecting user to Sendbird:', error);
      }
    };

    connectUser();
  }, [connect]);

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
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'white',
          }
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
