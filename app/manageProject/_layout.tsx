import React, { createContext, useState } from 'react';
import { Slot } from 'expo-router';
import { Stack } from 'expo-router';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface User {
    userId: string;
    // other properties
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
    joinRequestIDs: string[]
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
        joinRequestIDs: [], 
    },
    setFormData: () => {}, // No-op function
  };
  
  // Create the FormContext with a default value
  export const FormContext = createContext(defaultFormData);

export default function FormLayout() {
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
    joinRequestIDs: [], 
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {/* <Slot /> */}
      <Stack>
        {/* Define your stack screens here */}
        <Stack.Screen
          name="manageProject1"
          options={{
            headerShown: false, // Hide header for this route
            // animation: 'slide_from_bottom', // Add animation if desired
          }}
        />
        <Stack.Screen
          name="manageMembersScreen"
          options={{
            headerShown: false, // Hide header for this route
            animation: 'slide_from_bottom', // Add animation if desired
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
