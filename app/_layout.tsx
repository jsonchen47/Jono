import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PaperProvider>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{
              // Hide the header for this route
              headerShown: false,
            }}
          />
        </Stack>
      </PaperProvider>
    </ApplicationProvider>
  );
}

