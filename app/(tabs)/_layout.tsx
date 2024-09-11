import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="(home)" 
        options={{ 
            title: 'Explore',
            headerTitleAlign: 'left',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

    </Tabs>
  );
}
