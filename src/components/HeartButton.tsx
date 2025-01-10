import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import {  updateUser } from '../graphql/mutations';
import { getUser } from '../graphql/queries';

interface HeartButtonProps {
  projectID: string;
}

const client = generateClient();

const HeartButton: React.FC<HeartButtonProps> = ({ projectID }) => {
  const [user, setUser] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const { userId } = await getCurrentUser();

        const userResult = await client.graphql({
          query: getUser,
          variables: { id: userId }
        });

        const fetchedUser = userResult.data?.getUser;
        setUser(fetchedUser);

        if (fetchedUser) {
          setIsSaved(fetchedUser.savedProjectsIDs?.includes(projectID) || false);
        }
      } catch (error) {
        console.error('Error fetching authenticated user:', error);
      }
    };

    fetchAuthenticatedUser();
  }, [projectID]);

  const toggleSaveProject = async () => {
    if (!user) {
      Alert.alert('Error', 'User data is not loaded yet.');
      return;
    }

    const updatedSavedProjects = isSaved
      ? (user.savedProjectsIDs || []).filter((id: any) => id !== projectID)
      : [...(user.savedProjectsIDs || []), projectID];

    try {
      const result = await client.graphql({
        query: updateUser,
        variables: {
          input: { id: user.id, savedProjectsIDs: updatedSavedProjects }
        }
      });

      if (result) {
        setIsSaved(!isSaved);
      } else {
        Alert.alert('Error', 'Failed to update saved projects.');
      }
    } catch (error) {
      console.error('Error updating saved projects:', error);
      Alert.alert('Error', 'Failed to update saved projects. Please try again.');
    }
  };

  return (
    <TouchableOpacity style={styles.iconSmallContainer} onPress={toggleSaveProject}>
      <Icon
        name="heart"
        size={27}
        style={[
          styles.iconFill,
          { color: isSaved ? 'red' : 'black', opacity: isSaved ? 1 : 0.7 },
        ]}
      />
      <Icon name="heart-outline" size={27} style={styles.iconOutline} />
    </TouchableOpacity>
  );
};

export default HeartButton;

const styles = StyleSheet.create({
  iconOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    position: 'absolute',
  },
  iconFill: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSmallContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5,
  },
});
