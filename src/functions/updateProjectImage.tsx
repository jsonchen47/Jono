import { generateClient } from 'aws-amplify/api';
import { updateProject } from '../graphql/mutations';
import { getProject } from '../graphql/queries';
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData, remove } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import config from "../../src/aws-exports";
// import { useSendbirdChat } from '@sendbird/uikit-react-native';
import { chatClient } from '../backend/streamChat';

const client = generateClient();

// Configure Storage with your AWS settings
// Note: Storage configuration is now done globally in your app's entry point

// Function for getting current date as a string 
function getCurrentDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}_${month}_${day}`;
}

// Function to upload the new image, remove the old image, and update the project
export async function updateProjectImage(
  projectId: string,
  formData: any,
  setFormData: any,
  oldProjectImage: string,
  // sdk: any, 
  groupChatID: any
) {
  try {
    // GET THE CURRENT USER
    const currentUser = await getCurrentUser();
    const userId = currentUser.userId;
    
    // DELETE THE OLD IMAGE
    const imageKey = oldProjectImage.split('jonoa48aa29b26b146de8c05923d59de88cec85f4-dev.s3.us-west-1.amazonaws.com/public/')[1];
    console.log(`Attempting to delete image with key: ${imageKey}`);

    if (imageKey) {
      const deleteResult = await remove({ key: imageKey, options: { accessLevel: 'guest' } });
      console.log('Image deletion result:', deleteResult);
      console.log('Image deleted from S3 successfully');
    }
    
    // UPLOAD THE NEW IMAGE TO S3
    const uri = formData.image;

    const unfilteredTitle = formData.title;
    const filteredTitle = unfilteredTitle.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_");
    const dateString = getCurrentDateString();
    const randomString = `${uuidv4()}`;
    const fileName = `${filteredTitle}_${dateString}_${randomString}.jpg`;

    console.log('filename ', fileName);

    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadResult = await uploadData({
      key: fileName,
      data: blob,
      options: {
        contentType: 'image/jpeg',
        accessLevel: 'guest'
      }
    }).result;

    const imageUrl = `https://${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/${fileName}`;

    setFormData({ ...formData, imageUri: imageUrl });
    console.log('imageUrl: ', imageUrl);
    
    const updatedProjectData = {
      id: projectId,
      image: imageUrl,
    };
    
    // Update the project image 
    const updateResult = await client.graphql({
      query: updateProject,
      variables: { input: updatedProjectData }
    });

    // // Update the chat's image 
    // if (groupChatID) {
    //   const channel = await sdk.groupChannel.getChannel(groupChatID);
    //   await channel.updateChannel({
    //     coverUrl: imageUrl || channel.coverUrl, // Update the title if provided
    //     });
    // }
    if (groupChatID) {
      // Fetch the channel using its ID
      const channel = chatClient.channel('messaging', groupChatID);

      // Update the channel image (cover image)
      await channel.update({
        image: imageUrl || channel.data?.image, // Keep the existing image if none provided
      });

      console.log("Channel image updated successfully.");
    }

    
    console.log('Project updated successfully:', updateResult.data?.updateProject);
    
  } catch (error) {
    console.error('Error updating project image:', error);
  }
}
