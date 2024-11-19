import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Octicons from 'react-native-vector-icons/Octicons'; // Import vector icons
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import vector icons

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ManageProjectScreen = ({project}: any) => {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const router = useRouter(); 

    const navigation = useNavigation();

    useEffect(() => {
        // Set the header
        navigation.setOptions({ 
          title: 'Manage Project', 
          headerLeft: () => 
          <TouchableOpacity
          onPress={() => 
            router.back()
          } 
          >
            <Octicons name='x' style={styles.exitButton}/>
          </TouchableOpacity>,
          headerRight: () => 
          <TouchableOpacity
          onPress={() => 
            router.back()
          } 
          >
            <Text style={styles.saveButton}>
                Save
            </Text>
          </TouchableOpacity>
        });
    })

    useEffect(() => {
        setTitle(project.title)
        setDescription(project.description)
    }, [project])

  return (
    <View>
        {/* Project image */}
      <View>
        <Image
            style={styles.projectImage}
            source={{uri: project?.image}}
        />
        <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name='pencil' style={styles.editImageButtonIcon}/>
            <Text style={styles.editImageButtonText}>
                Edit
            </Text>
        </TouchableOpacity>
      </View>
        {/* PROJECT TITLE AND DESCRIPTION */}
        {/* Project title */}
        <View style={styles.titleAndDescriptionContainer}>
            <Text style={styles.textBoxHeader}> 
                Title
            </Text>
            <TextInput
                onChangeText={setTitle}
                value={title}
                style={styles.titleTextBox}
                numberOfLines={4}
                maxLength={40}
                multiline={true}
            />
            <Text style={styles.textBoxHeader}> 
                Description
            </Text>
            <TextInput
                onChangeText={setDescription}
                value={description}
                style={styles.descriptionTextBox}
                numberOfLines={4}
                maxLength={40}
                multiline={true}
            />
        </View>
    </View>
  )
}

ManageProjectScreen.options = {
    title: 'hi', 
    headerStyle: {
        backgroundColor: 'blue', // Background color
      },
}

export default ManageProjectScreen

const styles = StyleSheet.create({
    exitButton: {
        fontSize: 25, 
        marginLeft: 10
    },
    saveButton: {
        fontSize: 17, 
        fontWeight: '500', 
        // marginRight: 10
        // alignSelf: 'center',
    },
    projectImage: {
        width: '100%', 
        height: windowHeight*0.25,
    }, 
    editImageButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignSelf: 'center',
        position: 'absolute', 
        right: 20, 
        bottom: 20, 
        borderRadius: 10, 
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center',
    }, 
    editImageButtonText: {
        color: 'white', 
        fontWeight: 'bold',
        marginRight: 2, 
    }, 
    editImageButtonIcon: {
        color: 'white', 
        fontWeight: 'bold',
        marginRight: 7, 
        marginLeft: 2, 
        fontSize: 15,
    }, 
    titleAndDescriptionContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20, 
    },
    titleTextBox: {
        borderWidth: 1,
        height: windowHeight/10,
        borderRadius: 10, 
        padding: 10, 
        textAlign: 'left', 
        textAlignVertical: 'top', 
        marginBottom: 20, 
    }, 
    textBoxHeader: { 
        marginBottom: 5, 
        marginLeft: 5, 
        color: 'dimgray'
    }, 
    descriptionTextBox: {
        borderWidth: 1,
        height: windowHeight/8,
        borderRadius: 10, 
        padding: 10, 
        textAlign: 'left', 
        textAlignVertical: 'top', 
        marginBottom: 20, 
    }, 

})


