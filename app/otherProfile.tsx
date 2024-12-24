import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import ProfileScreen from '@/src/screens/ProfileScreen';

const otherProfile = () => {
    const router = useRouter();

    // Accessing the state
    const { id  } = useLocalSearchParams();
  
    return (
      <View style={{flex: 1}}>
        <ProfileScreen userID={id} />
      </View>
    );
}

export default otherProfile
