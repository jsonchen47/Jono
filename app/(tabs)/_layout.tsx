import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function TabLayout() {

  const router = useRouter(); 

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'black', // Color of the highlighted (active) tab
      tabBarInactiveTintColor: 'dimgray', // Color of the inactive tabs
    }}
    >
      <Tabs.Screen 
        name="(home)" 
        options={{ 
            title: 'Explore',
            headerTitleAlign: 'left',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
            headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="saved" 
        options={{ 
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
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
            <Ionicons name="chatbubble-outline" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="(profile)" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

    </Tabs>
  );
}
