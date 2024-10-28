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

export async function uploadNewProject(formData: any, setFormData: any) {
  
  try {
    // GET THE CURRENT USER 
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub; // User's ID

    // UPLOAD THE IMAGE TO S3
    // Get the URI
    const uri = formData.localImageUri

    // Step 1: Extract the filename from the URI
    const fileName = `${uuidv4()}.jpg`; // Get the last part of the URI as the filename
    console.log('filename ', fileName)
    // setFormData({ ...formData, imageUri: uri })

    // // Step 2: Fetch the image as a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // // Step 3: Upload the image to S3
    const s3Response = await Storage.put(fileName, blob, {
      contentType: 'image/jpeg', // Set the appropriate content type based on your image type
    });

    // // Step 4: Get the image URL from the response  
    const imageUrl = await Storage.get(s3Response.key, { level: 'public' }); // Fetch the public URL

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
