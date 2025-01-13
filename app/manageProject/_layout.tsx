import React, { createContext, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Slot } from 'expo-router';
import { Stack } from 'expo-router';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { useRouter } from 'expo-router';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Import vector icons


interface User {
    userId: string;
    // other properties
}


// Define the shape of a join request
interface JoinRequest {
  id: string;
  userID: string;
  projectID: string;
  createdAt?: string;
  user?: User; // Relationship to User
}


// Define the shape of the form data
interface FormData {
    ownerIDs: string[],
    users?: {
        items: User[];
    };
    image: string, 
    title: string,
    description: string,
    categories: string[],
    skills: string[], 
    resources: string[], 
    longitude: Float
    latitude: Float
    city: string
    joinRequests: JoinRequest[]; // Updated to use JoinRequest model
    removeUserIDs: string[]
    addUserIDs: string[]
  }
  
  // Define a default value for the context
  const defaultFormData: { formData: FormData; setFormData: React.Dispatch<React.SetStateAction<FormData>> } = {
    formData: { 
        ownerIDs: [],
        users: { items: [] }, 
        image: '', 
        title: '',
        description: '',
        categories: [],
        skills: [], 
        resources: [], 
        longitude: 0, 
        latitude: 0, 
        city: '', 
        joinRequests: [], // Initialize joinRequests as an empty array
        removeUserIDs: [],
        addUserIDs: [],
    },
    setFormData: () => {}, // No-op function
  };
  
  // Create the FormContext with a default value
  export const FormContext = createContext(defaultFormData);

export default function FormLayout() {
  const router = useRouter(); 
  const [formData, setFormData] = useState<FormData>({
    ownerIDs: [],
    users: { items: [] },
    image: '', 
    title: '',
    description: '',
    categories: [],
    skills: [], 
    resources: [], 
    longitude: 0, 
    latitude: 0, 
    city: '', 
    joinRequests: [], // Initialize joinRequests as an empty array
    removeUserIDs: [],
    addUserIDs: [],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {/* <Slot /> */}
      <Stack>
        {/* Define your stack screens here */}
        <Stack.Screen
          name="manageProject1"
          options={{
            // headerShown: false, // Hide header for this route
            // animation: 'slide_from_bottom', // Add animation if desired
          }}
        />
        <Stack.Screen
          name="manageProject2"
          options={{
          //   headerLeft: () => 
          // <TouchableOpacity
          // onPress={() => 
          //   router.back()
          // } 
          // >
          //   <FontAwesome6 name="chevron-left" style={styles.exitButton} />
          // </TouchableOpacity>,
            // headerShown: false, // Hide header for this route
            // animation: 'slide_from_bottom', // Add animation if desired
          }}
        />
      </Stack>
    </FormContext.Provider>
  );
}

// Disable the header for all pages in this layout
export const options = {
  headerShown: false, // This removes the header
};


const styles = StyleSheet.create({
  exitButton: {
    fontSize: 25, 
    marginLeft: 10
},
})