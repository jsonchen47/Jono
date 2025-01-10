import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ProfileScreen from '@/src/screens/ProfileScreen';
import { getCurrentUser } from 'aws-amplify/auth';

const OtherProfile = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [passedUserID, setPassedUserID] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthUser = async () => {
      try {
        
        const authUserID = (await getCurrentUser()).userId;
        console.log(authUserID)
        console.log(id)
        console.log(passedUserID)
        if (id === authUserID) {
          setPassedUserID(null);
        } else {
          setPassedUserID(id as string);
        }
      } catch (error) {
        console.error('Error fetching authenticated user:', error);
        // Optionally, handle error (e.g., redirect or show error message)
      } finally {
        setLoading(false);
      }
    };

    checkAuthUser();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ProfileScreen passedUserID={passedUserID} />
    </View>
  );
};

export default OtherProfile;
