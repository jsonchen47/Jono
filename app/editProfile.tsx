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
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import ChipInput from '@/src/components/ChipInput';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [resources, setResources] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const userID = authUser.attributes.sub;
        const userResult = await API.graphql(
          graphqlOperation(getUser, { id: userID })
        );
        const castedResult = userResult as GraphQLResult<any>;
        const userData = castedResult.data?.getUser;
        if (userData) {
          setProfileImage(userData.profileImage);
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

  // Set navigation options for the header
  React.useEffect(() => {
    navigation.setOptions({
      title: 'Edit Profile',
      headerStyle: { backgroundColor: '#f8f8f8' },
      headerTitleStyle: { fontWeight: 'bold' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log('Save changes')}>
          <Text style={styles.headerButton}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleImagePicker = async () => {
    await selectPhoto((uri: any) => setProfileImage(uri));
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView edges={['bottom']}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/images/default-profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.imageText}>Change Profile Image</Text>
        </TouchableOpacity>

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
          <ChipInput
            placeholder="Add a resource"
            chips={resources}
            onChangeChips={setResources}
          />

          <Text style={styles.label}>Skills</Text>
          <ChipInput
            placeholder="Add a skill"
            chips={skills}
            onChangeChips={setSkills}
          />

          <Text style={styles.label}>Links</Text>
          <ChipInput
            placeholder="Add a link"
            chips={links}
            onChangeChips={setLinks}
          />
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
    borderColor: '#ddd',
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
    color: '#007bff',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
});
