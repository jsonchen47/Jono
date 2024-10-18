import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function TabLayout() {

  const router = useRouter(); 
  const handleCenterTabPress = () => {
    router.push('/newProject'); // Replace '/newScreen' with the path to your desired screen
    console.log('tabs button pressed')
  };

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'black', // Color of the highlighted (active) tab
      tabBarInactiveTintColor: 'gray', // Color of the inactive tabs
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
        name="center" 
        options={{ 
          tabBarIcon: () => null,
          title: 'Create',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="add-circle-outline" color={'blue'} size={32} />
          // ),
          tabBarButton: (props) => (
            <TouchableOpacity style={styles.centerTab} {...props} onPress={handleCenterTabPress}>
               <Ionicons name="add-circle-outline" size={28} color="gray" />
               <Text style={styles.centerTabText}>New Project</Text>
              {/* <Text style={styles.centerTabText}>+</Text> */}
            </TouchableOpacity>
          ),
          // href: '/newProject'
        }}

        // listeners={() => ({
        //   tabPress: (e) => {
        //     e.preventDefault()
        //     router.push("/(tabs)/newProject") // <-- Here you put the name where the chat component is declared 
        //   },
        // })}
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

const styles = StyleSheet.create({
  centerTab: {
    position: 'absolute',
    bottom: 20, // Move it up slightly to float above the tab bar
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Adds the shadow for Android
  },
  centerTabText: {
    fontSize: 10,
    marginTop: 4,
    color: 'gray'
    // backgroundColor: 'red'
    // color: '#fff',
  },
});