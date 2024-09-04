import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="(home)" 
        options={{ 
            title: 'Explore',
            headerTitleAlign: 'left'
        }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{ title: 'Settings' }}
      />
    </Tabs>
  );
}
