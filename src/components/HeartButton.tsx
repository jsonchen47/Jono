import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { generateClient } from 'aws-amplify/api';
import { updateUser } from '../graphql/mutations';

const client = generateClient();

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
    setIsSaved(user?.savedProjectsIDs?.includes(projectID));
  }, [projectID, user?.savedProjectsIDs]);

  const toggleSaveProject = async () => {
    console.log('Heart button pressed');
  
    // Provide a default empty array if `savedProjectsIDs` is null or undefined
    const updatedSavedProjects = isSaved
      ? (user.savedProjectsIDs || []).filter((id) => id !== projectID)
      : [...(user.savedProjectsIDs || []), projectID];
  
    try {
      console.log('Updated Saved Projects:', updatedSavedProjects);
  
      const result = await client.graphql({
        query: updateUser,
        variables: { input: { id: user.id, savedProjectsIDs: updatedSavedProjects } },
      });
  
      console.log('Mutation Result:', result);
  
      if (result?.data?.updateUser) {
        setIsSaved(!isSaved);
        console.log('Project save state toggled:', !isSaved);
      } else {
        console.error('Mutation did not return expected data:', result.errors);
      }
    } catch (error) {
      console.error('GraphQL Mutation Error:', error);
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
