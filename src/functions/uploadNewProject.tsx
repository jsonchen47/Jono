// import { Amplify } from 'aws-amplify';
// import { generateClient } from 'aws-amplify/api';
// import { createProject, createUserProject } from '../graphql/mutations';
// import { v4 as uuidv4 } from 'uuid';
// import { uploadData } from 'aws-amplify/storage';
// import config from "../../src/aws-exports";
// import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';


// const client = generateClient();

// (async () => {
//   try {
//     const { credentials } = await fetchAuthSession();
//     console.log('AWS Credentials:', {
//       accessKeyId: credentials?.accessKeyId,
//       secretAccessKey: credentials?.secretAccessKey,
//       sessionToken: credentials?.sessionToken
//     });

//   } catch (error) {
//     console.error('Error fetching AWS credentials:', error);
//   }
// })();

// // Storage configuration is now done globally in your app's entry point

// function getCurrentDateString() {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}_${month}_${day}`;
// }

// export async function uploadNewProject(
//   formData: any,
//   setFormData: any,
//   showProgressBar: () => void,
//   hideProgressBar: () => void,
//   updateProgress: (progress: number) => void,
//   isVisible: boolean, 
//   setProjectId: any,
// ) {
//   try {
//     showProgressBar();
//     updateProgress(0);

//     console.log('just started');
    
//     const currentUser = await getCurrentUser();
//     const userId = currentUser.userId;
//     updateProgress(0.1);

//     console.log('just got the auth user');

//     const uri = formData.localImageUri;
//     const unfilteredTitle = formData.title;
//     const filteredTitle = unfilteredTitle.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_");
//     const dateString = getCurrentDateString();
//     const randomString = `${uuidv4()}`;
//     const fileName = `${filteredTitle}_${dateString}_${randomString}.jpg`;

//     console.log('filename ', fileName);
//     updateProgress(0.3);

//     const response = await fetch(uri);
//     const blob = await response.blob();

//     updateProgress(0.4);

//     const uploadResult = await uploadData({
//       key: fileName,
//       data: blob,
//       options: {
//         contentType: 'image/jpeg',
//         accessLevel: 'guest',
//         onProgress: ({ transferredBytes, totalBytes }) => {
//           updateProgress(transferredBytes / (totalBytes ?? 1));
//         },        
//       }
//     }).result;

//     const imageUrl = `https://${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/${fileName}`;
//     updateProgress(0.8);

//     setFormData({ ...formData, imageUri: imageUrl });
//     console.log('imageUrl: ', imageUrl);

//     console.log('Image uploaded successfully:', imageUrl);

//     const projectData = {
//       title: formData.title,
//       image: imageUrl,
//       description: formData.description,
//       categories: formData.categories,
//       skills: formData.skills,
//       resources: formData.resources,
//       ownerIDs: [userId], 
//     };

//     const projectResult = await client.graphql({
//       query: createProject,
//       variables: { input: projectData }
//     });

//     console.log('Project created successfully:', projectResult.data?.createProject);

//     const projectId = projectResult.data?.createProject.id;
//     const userProjectData = {
//       userId: userId,
//       projectId: projectId,
//     };

//     await client.graphql({
//       query: createUserProject,
//       variables: { input: userProjectData }
//     });

//     console.log('Project and user relationship created successfully.');
    
//     setProjectId(projectId);

//     updateProgress(1);
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     hideProgressBar();
//   } catch (error) {
//     console.error('Error uploading project:', error);
//   }
// }
