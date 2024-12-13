import { API, graphqlOperation } from 'aws-amplify';
import { updateProject } from '../graphql/mutations'; // Assuming you have an updateProject mutation defined
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import config from "../../src/aws-exports";
import { Auth } from 'aws-amplify';
import { getProject } from '../graphql/queries';

// Configure Storage with your AWS settings
Storage.configure({
  region: config.aws_user_files_s3_bucket_region,
  bucket: config.aws_user_files_s3_bucket,
  identityPoolId: config.aws_user_pools_id,
  level: "public",
});

// Function for getting current date as a string 
function getCurrentDateString() {
    const date = new Date();
    const year = date.getFullYear(); // Get the full year (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (01-12)
    const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month (01-31)
  
    return `${year}_${month}_${day}`; // Format as YYYY-MM-DD
  }

// Function to upload the new image, remove the old image, and update the project
export async function updateProjectImage(
  projectId: string, // ID of the project to update
  formData: any, // New form data containing the image
  setFormData: any, // Function to update the form data
  oldProjectImage: string
) {
  try {
    
    // GET THE CURRENT USER
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub; // User's ID
    
    // DELETE THE OLD IMAGE
    // // Fetch the existing project data to get the old image URL
    // const getProjectResponse = await API.graphql(
    //   graphqlOperation(getProject, { id: projectId }) // Assuming you have a getProject query
    // );
    // const castedGetProjectResponse = getProjectResponse as GraphQLResult<any>
    // const existingProject = castedGetProjectResponse?.data?.getProject;
    // const oldImageUrl = existingProject.image;
    // const oldFileName = oldImageUrl.split('/').pop(); // Extract the file name from the URL
    
    // // If there's an old image, remove it from S3
    // if (oldFileName) {
    //   try {
    //     await Storage.remove(oldFileName, { level: 'public' }); // Remove the old image
    //     console.log('Old image removed successfully:', oldFileName);
    //   } catch (error) {
    //     console.error('Error removing old image from S3:', error);
    //   }
    // }
    // Delete the image
    const imageKey = oldProjectImage.split('jonoa48aa29b26b146de8c05923d59de88cec85f4-dev.s3.us-west-1.amazonaws.com/public/')[1]; // Extract key after ".com/"
    console.log(`Attempting to delete image with key: ${imageKey}`);

    if (imageKey) {
      // await Storage.remove(imageKey); // Delete image from S3
      const deleteResult = await Storage.remove(imageKey, { level: 'public' }); // Delete image from S3
      console.log('Image deletion result:', deleteResult); // Log result of deletion
      console.log('Image deleted from S3 successfully');
    }
    
    // UPLOAD THE NEW IMAGE TO S3
    const uri = formData.image; // Get the new image URI
    
    // Generate a new file name for the image
    const unfilteredTitle = formData.title; // Project title (or any other unique identifier)
    const filteredTitle = unfilteredTitle.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_"); // Clean the title
    const dateString = getCurrentDateString(); // Get current date
    const randomString = `${uuidv4()}`; // Unique random string for the file name
    const fileName = `${filteredTitle}_${dateString}_${randomString}.jpg`; // Final file name
    
    console.log('filename ', fileName);
    
    // Fetch the image as a blob
    const response = await fetch(uri);
    const blob = await response.blob();
        
    // Upload the image to S3
    const s3Response = await Storage.put(fileName, blob, {
      contentType: 'image/jpeg',
      level: 'public', 
    });
    
    // Get the image URL from S3
    const imageUrl = `https://${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/${fileName}`;
    
    // Update form data with the new image URL
    setFormData({ ...formData, imageUri: imageUrl });
    console.log('imageUrl: ', imageUrl);
    
    // Step 2: Update the project with the new image URL
    const updatedProjectData = {
      id: projectId, // Project ID to update
      image: imageUrl, // New image URL
    };
    
    // Update the project in the database
    const updateResult = await API.graphql(
      graphqlOperation(updateProject, { input: updatedProjectData })
    );
    const castedUpdateResult = updateResult as GraphQLResult<any>;
    
    console.log('Project updated successfully:', castedUpdateResult?.data?.updateProject);
    
  } catch (error) {
    console.error('Error updating project image:', error);
  }
}
