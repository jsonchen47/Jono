import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { selectPhoto } from '@/src/functions/selectPhoto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { getUser } from '@/src/graphql/queries';
import { updateUser } from '@/src/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ChipInput from '@/src/components/ChipInput';
import { uploadData, remove } from 'aws-amplify/storage'; // For uploading and removing images from S3
import config from "../src/aws-exports"; // AWS Amplify configuration
import { useRefresh } from '@/src/contexts/RefreshContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const client = generateClient();

const EditProfileScreen = () => {
  const { setShouldRefresh } = useRefresh();
  const navigation = useNavigation();

  const [image, setImage] = useState<any>(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [resources, setResources] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authUser = await getCurrentUser();
        const userID = authUser.userId;
        const userResult = await client.graphql({
          query: getUser,
          variables: { id: userID }
        }) as GraphQLResult<any>;
        const userData = userResult.data?.getUser;
        if (userData) {
          setImage(userData.image);
          setName(userData.name);
          setUsername(userData.username);
          setBio(userData.bio);
          setResources(userData.resources || []);
          setSkills(userData.skills || []);
          setLinks(userData.links || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImagePicker = async () => {
    try {
      await selectPhoto(async (uri: any) => {
        if (!uri) return;
  
        // Remove the old profile image if it exists
        if (image) {
          const oldImageKey = image.split(`${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/`)[1];
          if (oldImageKey) {
            try {
              await remove({ key: oldImageKey, options: { accessLevel: 'guest' } });
              console.log('Old profile image removed successfully');
            } catch (error) {
              console.error('Error removing old profile image:', error);
            }
          }
        }
  
        // Generate a new filename for the uploaded image
        const unfilteredUsername = username || 'default_user';
        const sanitizedUsername = unfilteredUsername.replace(/[^a-zA-Z0-9]/g, '_');
        const newImageKey = `${sanitizedUsername}_profile_${Date.now()}.jpg`;
  
        // Upload the new image to S3
        const response = await fetch(uri);
        const blob = await response.blob();
  
        const uploadResult = await uploadData({
          key: newImageKey,
          data: blob,
          options: {
            contentType: 'image/jpeg',
            accessLevel: 'guest',
          },
        }).result;
  
        const newImageUrl = `https://${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/${newImageKey}`;
        console.log('New profile image uploaded successfully:', newImageUrl);
  
        // Update the state with the new image URL
        setImage(newImageUrl);
      });
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };
  
  const handleSave = async () => {
    try {
      
      const authUser = await getCurrentUser();
      const userID = authUser.userId;
  
      const updatedUser = {
        id: userID,
        image, // Updated profile image URL
        name,
        username,
        bio,
        resources,
        skills,
        links,
      };
  
      const result = await client.graphql({
        query: updateUser,
        variables: { input: updatedUser },
      }) as GraphQLResult<any>;
  
      console.log('User profile updated successfully:', result.data?.updateUser);
      setShouldRefresh(true); // Notify that ProfileScreen should refresh

      navigation.goBack();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  

  // Set navigation options for the header
  React.useEffect(() => {

    const getUser = async () => {
      const user = await getCurrentUser();
      console.log(user)
    }
    
    navigation.setOptions({
      title: 'Edit Profile',
      headerTitleAlign: 'center', // Center the title
      headerStyle: { backgroundColor: '#f8f8f8' },
      headerTitleStyle: { fontWeight: 'bold' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => 
        {
          getUser()
          navigation.goBack()
        }
        }
        >
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerButton}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, image, name, username, bio, resources, skills, links]);

  

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView edges={['bottom']}>
        {/* <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
          <Image
            source={image ? { uri: image } : require('../assets/images/profile1.png')}
            style={styles.profileImage}
          />
          <Text style={styles.imageText}>Change Profile Image</Text>
        </TouchableOpacity> */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImagePicker} style={styles.editButtonContainer}>
            <Image
              source={image ? { uri: image } : require('../assets/images/profile1.png')}
              style={styles.profileImage}
            />
            <View style={styles.outerBorder}>
              <View style={styles.editIcon}>
                <Icon name="edit" size={20} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
          />

          <Text style={styles.label}>Resources</Text>
          <View style={styles.chipInputContainer}>
            <ChipInput
              placeholder="Press return after each resource"
              chips={resources}
              onChangeChips={setResources}
            />
          </View>

          <Text style={styles.label}>Skills</Text>
          <View style={styles.chipInputContainer}>
            <ChipInput
              placeholder="Press return after each skill"
              chips={skills}
              onChangeChips={setSkills}
            />
          </View>

          <Text style={styles.label}>Links</Text>
          <View style={styles.chipInputContainer}>
            <ChipInput
              placeholder="Press return after each link"
              chips={links}
              onChangeChips={setLinks}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  imageText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  headerButton: {
    // color: '#007bff',
    fontWeight: '500',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  spacerVertical: {

  }, 
  chipInputContainer: {
    marginBottom: 20, 
  }, 
  editButtonContainer: {
    position: 'relative',
  },
  editIcon: {
    
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 3, // Thickness of the border
    // borderColor: 'white', // Color of the border
  },
  outerBorder: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35, // Outer border size (larger than the inner shape)
    height: 35, // Outer border size
    backgroundColor: 'white', // Outer border color
    borderRadius: 15, // To match the inner shape's border radius
  },
});
