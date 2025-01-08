import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Amplify } from 'aws-amplify';
import { ThemeProvider, Authenticator } from '@aws-amplify/ui-react-native';


import AppEntrance from '@/src/components/AppEntrance';
import amplifyconfig from '../src/amplifyconfiguration.json'

// Configure Amplify
Amplify.configure(amplifyconfig);

const theme = {
  tokens: {
    colors: {
      primary: {
        10: '#e0f7f8',
        20: '#b3eef0',
        40: '#80e4e9',
        60: '#4dd9e1',
        80: '#1fcdd9',
        90: '#00b5c4',
        100: '#0098a6',
      },
    },
  },
};

function RootLayout() {
  

  return (
    <ThemeProvider theme={theme}>
      <Authenticator.Provider>
        <Authenticator>
          <AppEntrance />
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
