import React, { createContext, useState } from 'react';
import { Slot } from 'expo-router';
import { Stack } from 'expo-router';

// Define the shape of the form data
interface FormData {
    imageUri: string,
    title: string,
    description: string,
    categories: string[],
    skills: string[], 
    resources: string[], 
  }
  
  // Define a default value for the context
  const defaultFormData: { formData: FormData; setFormData: React.Dispatch<React.SetStateAction<FormData>> } = {
    formData: { 
        imageUri: '',
        title: '',
        description: '',
        categories: [],
        skills: [], 
        resources: [], 
    },
    setFormData: () => {}, // No-op function
  };
  
  // Create the FormContext with a default value
  export const FormContext = createContext(defaultFormData);

export default function FormLayout() {
  const [formData, setFormData] = useState<FormData>({
    imageUri: '',
    title: '',
    description: '',
    categories: [],
    skills: [], 
    resources: [], 
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {/* <Slot /> */}
      <Stack>
        {/* Define your stack screens here */}
        <Stack.Screen
          name="newProject1"
          options={{
            headerShown: false, // Hide header for this route
            animation: 'slide_from_bottom', // Add animation if desired
          }}
        />
        <Stack.Screen
          name="newProject2"
          options={{
            headerShown: false, // Hide header for this route
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
