import { Stack } from 'expo-router';


export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="index" 
        options={{
          // Hide the header for this route
          // title: 'Explore',
          // headerShown: false,
          headerStyle: {
            // backgroundColor: '#00C0D1',
            // elevation: 0, // Remove shadow on Android
            // shadowOpacity: 0, // Remove shadow on iOS
            // borderBottomWidth: 0, // Remove border if any
            
          },
          headerTintColor: 'black',
          headerShadowVisible: false,
          // headerRight: () => <Button title="Update count" />,
          // headerShown: false,
        }}

      />
      <Stack.Screen
        name="connections" 
        options={{
          // Hide the header for this route
          // title: 'Explore',
          // headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          // headerRight: () => <Button title="Update count" />,
        }}
      />
      <Stack.Screen 
        name="settings" 
        options={{
          // Hide the header for this route
          // headerShown: false,
          title: 'Settings',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          // tabBarVisible: false // Hide tab bar for Project page

        }}
        
      />
      <Stack.Screen 
        name="notifications" 
        options={{
          // Hide the header for this route
          // headerShown: false,
          title: 'Notifications',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
        }}
        
      />
      <Stack.Screen
        name="newGroupScreen"
        options={{
          // Hide the header for this route
          // headerShown: false,
          title: 'Project',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          // tabBarVisible: false // Hide tab bar for Project page

        }}
      />
      <Stack.Screen
        name="deleteAccount"
        options={{
          // Hide the header for this route
          // headerShown: false,
          title: 'Delete Account',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          // tabBarVisible: false // Hide tab bar for Project page

        }}
      />
    </Stack>
  );
}
