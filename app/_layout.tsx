import React from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { Amplify } from 'aws-amplify';
import { ThemeProvider, Authenticator } from '@aws-amplify/ui-react-native';

import AppEntrance from '@/src/components/AppEntrance';
import amplifyconfig from '../src/amplifyconfiguration.json';

// Configure Amplify
Amplify.configure(amplifyconfig);

const theme = {
  tokens: {
    colors: {
      primary: {
        10: '#e0f7f8',
        20: '#b3eef0',
        40: '#015E98',
        60: '80e4e9',
        80: '#015E98',
        90: '#015E98',
        100: '#015E98',
      },
    },
  },
};










// Custom Header Component with Logo
function CustomHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/images/jono_logo_text_light.png')} // Update with your logo path
        style={styles.logo}
      />
    </View>
  );
}

function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator.Provider>
        <Authenticator
          
          components={{
            SignIn: (props) => (
              // will render only on the SignIn subcomponent
              <Authenticator.SignIn {...props} Header={CustomHeader} />
            ),
            SignUp: ({ fields, ...props }) => (
              <Authenticator.SignUp
                // Use the custom header here
                {...props}
                fields={[
                  ...fields,
                  {
                    name: 'name', // Custom field name
                    label: 'Full Name', // Label for the custom field
                    type: 'default', // Type of input
                    placeholder: 'Enter your full name', // Placeholder text
                  },
                  {
                    name: 'preferred_username', // Custom field name
                    label: 'Username', // Label for the custom field
                    type: 'default', // Type of input
                    placeholder: 'Enter a username', // Placeholder text
                  },
                ]}
              />
            ),
          }}
        >
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
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 100, // Adjust height as needed
    resizeMode: 'contain', // Ensures the logo maintains its aspect ratio
  },
});
