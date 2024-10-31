import { API, graphqlOperation } from 'aws-amplify';
import { createProject } from '../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from 'aws-amplify';
import config from "../../src/aws-exports"
import { Auth } from 'aws-amplify'; // Import Auth module
import { createUserProject } from '../graphql/mutations';

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


export async function uploadNewProject(formData: any, setFormData: any) {
  
  try {
    // GET THE CURRENT USER 
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub; // User's ID

    // UPLOAD THE IMAGE TO S3
    // Get the URI
    const uri = formData.localImageUri

    // Step 1: Set the filename to the project title and date     
    const unfilteredTitle = formData.title // Get the title from the form data
    const filteredTitle = unfilteredTitle.replace(/ /g, "_").replace(/[^a-zA-Z0-9]/g, "") // Remove any alphanumeric characters and replace spaces with _
    const dateString = getCurrentDateString(); // Get the formatted date
    const fileName = `${filteredTitle}_${dateString}.jpg`; // Concatenate title and date

    console.log('filename ', fileName)

    // // Step 2: Fetch the image as a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // // Step 3: Upload the image to S3
    const s3Response = await Storage.put(fileName, blob, {
      contentType: 'image/jpeg', // Set the appropriate content type based on your image type
      level: 'public'
    });

    // // Step 4: Get the image URL as the public url available based on the filename
    const imageUrl = 'https://jonoa48aa29b26b146de8c05923d59de88cec85f4-dev.s3.us-west-1.amazonaws.com/public/' + fileName

    // // Step 5: Update formData with the image URL
    setFormData({ ...formData, imageUri: imageUrl });
    console.log('imageUrl: ', imageUrl)

    console.log('Image uploaded successfully:', imageUrl);

    // CREATE THE PROJECT 
    const projectData = {
      title: formData.title,
      image: imageUrl,
      description: formData.description,
      categories: formData.categories,
      skills: formData.skills,
      resources: formData.resources,
      ownerIDs: [userId], 
    };

    // UPLOAD THE PROJECT 
    const projectResult = await API.graphql(
      graphqlOperation(createProject, { input: projectData })
    );
    const castedProjectResult = projectResult as GraphQLResult<any>
    console.log('Project created successfully:', castedProjectResult?.data?.createProject);

    // CREATE USER-PROJECT RELATIONSHIP
    const projectId = castedProjectResult?.data?.createProject.id;
    const userProjectData = {
      userId: userId,     // Current user's ID
      projectId: projectId, // Newly created project's ID
    };

    await API.graphql(
      graphqlOperation(createUserProject, { input: userProjectData })
    );

    console.log('Project and user relationship created successfully.');

  } catch (error) {
    console.error('Error uploading projject:', error);
  }

  
}
