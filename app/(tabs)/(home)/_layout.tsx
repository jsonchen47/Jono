import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle:{
          backgroundColor:'#FFFFFF'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Explore',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: 'Map',
          // presentation: 'fullScreenModal',
        }}
       />
    </Stack>
  );
}
