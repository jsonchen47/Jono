import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TabLayout() {

  const router = useRouter(); 

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
        name="saved" 
        options={{ 
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen 
        name="newProject" 
        options={{ 
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
          // href: '/newProject'
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            router.push("/(tabs)/newProject") // <-- Here you put the name where the chat component is declared 
          },
        })}
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="(profile)" 
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
