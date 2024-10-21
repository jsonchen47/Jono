import * as ImagePicker from 'expo-image-picker';

export const selectPhoto = async (callback: any) => {
  // Request permissions for camera and photo library
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    console.log('Permission to access media library is required');
    return;
  }

  // Open the image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
    quality: 1, // Set image quality
  });

  // Check if user canceled the picker or if there was an error
  if (result.canceled) {
    console.log('User cancelled image picker');
  } else if (result.assets[0].uri) {
    // Successfully picked an image
    const source = result.assets[0].uri;
    console.log('Image URI: ', source);
    callback(source);
  } else {
    console.log('ImagePicker Error: No image selected');
  }
};
