import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../graphql/mutations';

interface HeartButtonProps {
  projectID: string;
  user: {
    id: string;
    savedProjectsIDs: string[];
  };
}

const HeartButton: React.FC<HeartButtonProps> = ({ projectID, user }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if the projectID is in the user's savedProjectsIDs
    setIsSaved(user?.savedProjectsIDs?.includes(projectID));
  }, [projectID, user?.savedProjectsIDs]);

  const toggleSaveProject = async () => {
    const updatedSavedProjects = isSaved
      ? user.savedProjectsIDs?.filter((id) => id !== projectID)
      : [...user.savedProjectsIDs, projectID];

    try {
      // Update the savedProjectsIDs in the backend
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            savedProjectsIDs: updatedSavedProjects,
          },
        })
      );
      // Update the local state
      setIsSaved(!isSaved);
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
      <Icon name="heart-outline" size={30} style={styles.iconOutline} />
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
    padding: 5,
  },
});
