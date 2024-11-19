import { Stack } from 'expo-router';


export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
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
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          // headerRight: () => <Button title="Update count" />,
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
          title: 'Project',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          // tabBarVisible: false // Hide tab bar for Project page

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
    </Stack>
  );
}
