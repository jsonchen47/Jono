import { useRouter } from 'expo-router';
import { ScrollView, Image, View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {selectPhoto} from '../../src/functions/selectPhoto'
import React, { useState, useContext } from 'react';
import { FormContext } from './_layout';
import 'react-native-get-random-values';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const newProject1 = () => {
  const { formData, setFormData } = useContext(FormContext);
  // const [photoUri, setPhotoUri] = useState(null);
  const router = useRouter();

  const handlePhotoSelection = async (uri: any) => {
    // setPhotoUri(uri);
    setFormData({ ...formData, localImageUri: uri })
  };

  const handleSubmitTitle = () => {
  }

  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </Pressable>
        </View>
        <View style={styles.divider}></View>

        {/* Screen Content */}
        <View style={styles.contentContainer}>
          {/* Top Content */}
          <ScrollView 
            style={styles.contentTop}
            showsVerticalScrollIndicator={false}
            >
            {/* Title */}
            <Text style={styles.title}>Show off your new idea</Text>
            {/* Add photo button */}
            <TouchableOpacity 
            style={styles.addPhotoButtonContainer}
            onPress={() => selectPhoto(handlePhotoSelection)}
            > 
              <View style={styles.addPhotoButtonContent}>
                <Icon name='plus' size={18}></Icon>
                <Text style={styles.addPhotoButtonText}>Add photo</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {/* {photoUri && ( */}
              {formData.localImageUri && (
                <>
                {/* <Text>Selected Photo URI: {formData.localImageUri}</Text> */}
                <Image 
                    // source={{ uri: photoUri }} 
                    source={{ uri: formData.localImageUri }} 
                    style={styles.image} 
                />
                </>
              )}
            </View>
            
            
            {/* Add project title */}
            <Text style={styles.projectTitleHeader}>Project Title</Text>
            <TextInput
              style={styles.projectTitleTextInput}
              placeholder="Give a name to your dream"
              multiline={true}
              value={formData.title}
              maxLength={100} // Limit to `100` characters
              // onChangeText={(text) => setFormData((prevData) => ({
              //   ...prevData,
              //   title: text, // Update title while typing
              // }))}
              onChangeText={(text) => {
                if (text.length <= 100) {  // Explicitly limit input to 70 characters
                  setFormData((prevData) => ({
                    ...prevData,
                    title: text,
                  }));
                }
              }}
            >
            </TextInput>
            {/* Character Count */}
            <Text style={styles.charCount}>{`${formData.title.length}/100`}</Text>

            {/* Add description */}
            <Text style={styles.projectTitleHeader}>Description</Text>
            <TextInput
              style={styles.projectDescriptionTextInput}
              placeholder="What does your product do, what are you looking for, etc"
              multiline={true}
              // onChangeText={(text) => setFormData((prevData) => ({
              //   ...prevData,
              //   description: text, // Update title while typing
              // }))}
              value={formData.description}
              maxLength={550} // Limit to 550 characters
              onChangeText={(text) => {
                if (text.length <= 550) {  // Explicitly limit input to 70 characters
                  setFormData((prevData) => ({
                    ...prevData,
                    description: text,
                  }));
                }
              }}
            >
            </TextInput>
            {/* Character Count */}
            <View style={styles.viewWithBottomPadding}>
              <Text style={styles.charCount}>{`${formData.description.length}/550`}</Text>
            </View>
          </ScrollView>
          {/* Divider */}
          <View style={styles.divider}></View>
          {/* Bottom content */}
          <View style={styles.contentBottom}>
            {/* <Button 
              style={styles.nextButton} 
              labelStyle={styles.nextButtonText}
              mode="contained"  
              onPress={() => {
                router.push('/newProject/newProject2')
                console.log(formData)
              }}
              
              >
              Next
            </Button> */}
            <Button 
              style={[styles.nextButton, (!formData.localImageUri || !formData.title.trim() || !formData.description.trim()) && { backgroundColor: 'lightgray' }]} 
              labelStyle={styles.nextButtonText}
              mode="contained"  
              onPress={() => {
                if (formData.localImageUri && formData.title.trim() && formData.description.trim()) {
                  router.push('/newProject/newProject2');
                  console.log(formData);
                }
              }}
              disabled={!formData.localImageUri || !formData.title.trim() || !formData.description.trim()} // Disable button if any field is missing
            >
              Next
            </Button>

          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default newProject1


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancelButton: {
    marginLeft: 20, 
    // backgroundColor: 'transparent'
    color: 'black',
    fontSize: 17, 
  },
  header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Content
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentTop: {
    width: '80%', 
    // justifyContent: 'flex-start'
  },
  image: {
    // padding: 20, 
    width: windowWidth*0.7, 
    height: windowHeight*0.2
  }, 
  imageContainer: {
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 20,
  },
  divider: {
    height: 1,            
    width: '100%',        
    backgroundColor: '#D3D3D3', 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 20, 
  }, 
  addPhotoButtonContainer: {
    borderWidth: 2, 
    borderRadius: 10,
    marginTop: 20, 
    borderColor: 'gray'
  }, 
  addPhotoButtonContent: {
    margin: 15, 
    flexDirection: 'row',
    alignItems: 'center'
  }, 
  addPhotoButtonText: {
    fontSize: 17, 
    marginLeft: 10
  }, 
  addPhotoButtonIcon:{

  }, 
  // Project title
  projectTitleHeader: {
    fontSize: 18, 
    fontWeight: '500', 
    marginTop: 30, 
  }, 
  projectTitleTextInput: {
    marginTop: 10, 
    borderWidth: 2, 
    borderRadius: 10,
    height: windowHeight/10, 
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14, 
    borderColor: 'gray',
    backgroundColor: '#f9f9f9',
  }, 
  // Project description
  projectDescriptionTextInput: {
    marginTop: 10, 
    borderWidth: 2, 
    borderRadius: 10,
    height: windowHeight/5, 
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14, 
    borderColor: 'gray',
    backgroundColor: '#f9f9f9',
    
  }, 
  // Bottom content
  contentBottom: {
    width: '80%',
    justifyContent: 'flex-end',
    // backgroundColor: 'red'
    paddingTop: 20,
  }, 
  nextButton: {
    borderRadius: 5, 
    alignSelf: 'flex-end',
    backgroundColor: 'black'
  },
  nextButtonText: {
    fontSize: 18, 
  }, 
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  viewWithBottomPadding: {
    paddingBottom: 50
  }
  
});
