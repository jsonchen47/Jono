import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createProject, createUserProject } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { uploadData } from 'aws-amplify/storage';
import config from '../../src/aws-exports';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import Geolocation from '@react-native-community/geolocation';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import { chatClient } from '../backend/streamChat';

const client = generateClient();

// (async () => {
//   try {
//     const { credentials } = await fetchAuthSession();
//     console.log('AWS Credentials:', {
//       accessKeyId: credentials?.accessKeyId,
//       secretAccessKey: credentials?.secretAccessKey,
//       sessionToken: credentials?.sessionToken,
//     });
//   } catch (error) {
//     console.error('Error fetching AWS credentials:', error);
//   }
// })();

function getCurrentDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}_${month}_${day}`;
}

export async function uploadNewProject(
  formData: any,
  setFormData: any,
  showProgressBar: () => void,
  hideProgressBar: () => void,
  updateProgress: (progress: number) => void,
  isVisible: boolean,
  setProjectId: any,
  // sdk: any
) {

  try {
    showProgressBar();
    updateProgress(0);

    console.log('just started');

    // Fetch current user
    const currentUser = await getCurrentUser();
    const userId = currentUser.userId;
    updateProgress(0.1);

    console.log('just got the auth user');

    // Fetch current location
    const location = await new Promise<GeolocationPosition>((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => resolve(position as GeolocationPosition), // Explicitly cast
            reject,
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    });
    const { latitude, longitude } = location.coords;
      
      

    // Fetch city using reverse geocoding
    const reverseGeocodingResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const locationData = await reverseGeocodingResponse.json();
    const cityOnly =
      locationData.address.city ||
      locationData.address.town ||
      locationData.address.village ||
      locationData.address.hamlet ||
      'Unknown';

    const state = locationData.address.state;
    const city = `${cityOnly}, ${state}`

    console.log(`Location: ${latitude}, ${longitude}, City: ${city}`);
    updateProgress(0.2);

    // Continue with image upload
    const uri = formData.localImageUri;
    const unfilteredTitle = formData.title;
    const filteredTitle = unfilteredTitle.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_');
    const dateString = getCurrentDateString();
    const randomString = `${uuidv4()}`;
    const fileName = `${filteredTitle}_${dateString}_${randomString}.jpg`;

    console.log('filename ', fileName);
    updateProgress(0.3);

    const response = await fetch(uri);
    const blob = await response.blob();

    updateProgress(0.4);

    const uploadResult = await uploadData({
      key: fileName,
      data: blob,
      options: {
        contentType: 'image/jpeg',
        accessLevel: 'guest',
        onProgress: ({ transferredBytes, totalBytes }) => {
          updateProgress(transferredBytes / (totalBytes ?? 1));
        },
      },
    }).result;

    const imageUrl = `https://${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/${fileName}`;
    updateProgress(0.8);

    setFormData({ ...formData, imageUri: imageUrl });
    console.log('imageUrl: ', imageUrl);

    console.log('Image uploaded successfully:', imageUrl);

    // Create a chat channel in Sendbird
    
    console.log('formdata.title', formData.title)
    const channelName = `${formData.title}`;
    const channelCoverImageUrl = imageUrl; // Use the project image as the channel cover

    // const channelParams = {
    //   name: channelName,
    //   coverUrl: channelCoverImageUrl,
    //   isDistinct: false, // Ensures new chat will be created even when it has the same users
    //   invitedUserIds: [userId], // Invites the user who created the project
    //   operatorUserIds: [userId], // Sets the project creator as the channel operator
    // };

    // const channel = await sdk.groupChannel.createChannel(channelParams);
    // console.log('Sendbird channel created:', channel);
    // const groupChatID = channel.url; // Get the unique ID of the group chat
    // console.log('group chat id: ', groupChatID)

    const groupChatID = uuidv4();


    console.log('no channel yet')
    const channel = chatClient.channel('messaging', groupChatID, {
      name: channelName,
      image: channelCoverImageUrl || '', // Optional default image
      members: [userId], // Add the creator as the first member
      // created_by_id: userId
    });

    console.log('got channel')

    // Create and watch the channel
    await channel.create();

    console.log('created channel')
    // await channel.addMembers([userId])


    // const groupChatID = channel.id;

    // Create project data
    const projectData = {
      title: formData.title,
      image: imageUrl,
      description: formData.description,
      categories: formData.categories,
      skills: formData.skills,
      resources: formData.resources,
      ownerIDs: [userId],
      longitude,
      latitude,
      city,
      groupChatID: groupChatID
    };

    const projectResult = await client.graphql({
      query: createProject,
      variables: { input: projectData },
    });

    console.log('Project created successfully:', projectResult.data?.createProject);

    const projectId = projectResult.data?.createProject.id;
    const userProjectData = {
      userId,
      projectId,
    };

    await client.graphql({
      query: createUserProject,
      variables: { input: userProjectData },
    });

    console.log('Project and user relationship created successfully.');

    setProjectId(projectId);


    

    updateProgress(1);
    await new Promise((resolve) => setTimeout(resolve, 100));
    hideProgressBar();
  } catch (error) {
    console.error('Error uploading project:', error);
  }
}
