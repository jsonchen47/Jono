import { Keyboard, Platform, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, memo, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Octicons from 'react-native-vector-icons/Octicons'; // Import vector icons
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import vector icons
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Emoji from 'react-native-emoji';
import ChipInput from '../components/ChipInput';
import cloneDeep from 'lodash.clonedeep';
import { List, Button } from 'react-native-paper';
import { fetchUsers } from '../functions/fetchUsers';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectPhoto } from '../functions/selectPhoto';
import { FormContext } from '@/app/manageProject/_layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useHeaderHeight } from '@react-navigation/elements';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Import vector icons
import Icon2 from 'react-native-vector-icons/MaterialIcons'; // Import vector icons
import DropdownWithChipDisplay from '../components/DropdownWithChipDisplay';
import Geolocation from '@react-native-community/geolocation';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listUserProjects } from '../graphql/queries';
import { deleteUserProject, createUserProject } from '../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { updateProject } from '../graphql/mutations';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';
import { updateProjectImage } from '../functions/updateProjectImage';
import { Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const categories = [
    { label: 'Health', value: '1' },
    { label: 'Tech', value: '2' },
    { label: 'Finance', value: '3' },
    { label: 'Politics', value: '4' },
    { label: 'Education', value: '5' },
    { label: 'Environment', value: '6' },
    { label: 'Social Justice', value: '7' },
];

const Tab = createMaterialTopTabNavigator();

const ManageProjectScreen = ({project}: any) => {
    const { setProjectID } = useProjectUpdateContext(); // Get setProjectID function from context
    const headerHeight = useHeaderHeight();
    const { formData, setFormData } = useContext(FormContext);
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const router = useRouter(); 
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false)
    

    // Header with image, title, and project 
    const Header = () => {
        return (
            <View>
                {/* Project image */}
                <View>
                    <Image
                        style={styles.projectImage}
                        source={{ uri: formData?.image }}
                    />
                    <TouchableOpacity 
                        style={styles.editImageButton}
                        onPress={() => selectPhoto(handlePhotoSelection)}
                    >
                        <Ionicons name="pencil" style={styles.editImageButtonIcon} />
                        <Text style={styles.editImageButtonText}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // When the screen first loads, set the formData as the project 
    useEffect(() => {
        setFormData((prevFormData) => ({ 
            ...prevFormData, 
            ownerIDs: project?.ownerIDs,
            users: project?.Users, 
            image: project?.image, 
            title: project?.title,
            description: project?.description,
            categories: project?.categories,
            skills: project?.skills, 
            resources: project?.resources, 
            longitude: project?.longitude, 
            latitude: project?.latitude, 
            city: project?.city, 
            joinRequestIDs: project?.joinRequestIDs, 
        }));
    }, [project])

    // Confirmation after clicking on save 
    const handleSaveConfirmation = () => {
        Alert.alert(
            "Confirm Changes",
            "Are you sure you want to make these changes?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Save",
                    onPress: handleSave
                }
            ]
        );
    };

    const handleSave = async () => {
        try {
            // Show a loading indicator if needed
            setLoading(true);

            // console.log(formData);
             // Clone or snapshot the latest formData
            const currentFormData = { ...formData };
            console.log(currentFormData);

            // Prepare the input data for the mutation
            const input = {
                id: project.id, // Assuming project.id is the identifier
                title: formData.title,
                description: formData.description,
                image: formData.image,
                categories: formData.categories,
                skills: formData.skills,
                resources: formData.resources,
                longitude: formData.longitude,
                latitude: formData.latitude,
                city: formData.city,
                joinRequestIDs: formData.joinRequestIDs,
                ownerIDs: formData.ownerIDs,
            };
    
            // Call the GraphQL mutation to update the project
            const result = await API.graphql(
                graphqlOperation(updateProject, { input })
            );

            // Update the project image if it has changed
            if (formData?.image != project?.image) {
                updateProjectImage(project?.id, formData, setFormData, project?.image)
            }

            // // Add any users that were approved and remove the users from the remove list 
            await Promise.all([
                handleAddUsers(),
                handleRemoveUsers(project.id, formData.removeUserIDs)
            ]);
            
            const castedResult = result as GraphQLResult<any>
    
            if (castedResult?.data?.updateProject) {
                alert("Project updated successfully!");
                // After successful update, notify the context with the updated project ID
                setProjectID(project?.id);
                router.back(); // Navigate back after saving
            } else {
                throw new Error("Failed to update project.");
            }
        } catch (error) {
            console.error("Error saving project:", error);
            alert("An error occurred while saving the project.");
        } finally {
            setLoading(false);
        }
    };

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
            onPress={() => {
                handleSaveConfirmation()
            }} 
          >
            <Text style={styles.saveButton}>
                Save
            </Text>
          </TouchableOpacity>
        });
    }, [navigation, router, handleSaveConfirmation, project])

    const handleAddUsers = async () => {
        try {
            const { addUserIDs, joinRequestIDs } = formData;
    
            // If there are no users to add, skip
            if (addUserIDs.length === 0) {
                console.log('No users to add.');
                return;
            }
    
            // For each user in the addUserIDs list, create a user-project relationship
            const addUserPromises = addUserIDs.map(async (userId) => {
                const input = {
                    userId,
                    projectId: project.id,
                    // You can add additional fields like role, status, etc. here
                };
    
                // Call the createUserProject mutation
                await API.graphql(graphqlOperation(createUserProject, { input }));
                console.log(`User ${userId} added to the project.`);
            });
    
            // Wait for all user-project relationships to be created
            await Promise.all(addUserPromises);
    
            // Remove added users from the joinRequestIDs list
            const updatedJoinRequestIDs = joinRequestIDs.filter(
                (id) => !addUserIDs.includes(id)
            );
    
            // Update the project with the new joinRequestIDs
            setFormData({ ...formData, joinRequestIDs: updatedJoinRequestIDs });
    
            // Now, update the project with the new joinRequestIDs
            const input = {
                id: project.id,
                joinRequestIDs: updatedJoinRequestIDs,
                // Other project fields here as needed
            };
            await API.graphql(graphqlOperation(updateProject, { input }));
    
            console.log('Users successfully added and join requests updated.');
        } catch (error) {
            console.error('Error adding users:', error);
            alert('An error occurred while adding users.');
        }
    };
    

    const handleRemoveUsers = async (projectId: string, userIds: string[]) => {
        try {

        console.log('just started')
          // If there are no users to remove, skip the operation
          if (userIds.length === 0) {
            console.log('No users to remove.');
            return;
          }

          console.log('step 1')
      
          // Create an array of conditions for userId using 'eq'
        const userIdConditions = userIds.map(userId => ({
            userId: { eq: userId }
        }));
        
        // Fetch the UserProject IDs for the specified project and userIds
        const userProjects = await API.graphql(graphqlOperation(listUserProjects, { 
            filter: { 
            projectId: { eq: projectId },
            or: userIdConditions  // Combine the conditions using 'or'
            }
        }));
  
          console.log("got to the user projects part")
      
          // Extract the UserProject IDs from the query results
          const castedUserProjects = userProjects as GraphQLResult<any>;
          const userProjectIds = castedUserProjects.data.listUserProjects.items.map((item: any) => item.id);
      
          // If no UserProjects are found, skip the deletion
          if (userProjectIds.length === 0) {
            console.log('No users found to remove.');
            return;
          }

          console.log("wow got so far")
      
          // Create an array of deletion promises for each user
          const deletionPromises = userProjectIds.map(async (userProjectId: any) => {
            // Now you can directly delete the UserProject relationship by its ID
            return API.graphql(graphqlOperation(deleteUserProject, { 
              input: { id: userProjectId }
            }));
          });
          console.log("basically end")
      
          // Wait for all deletions to finish
          await Promise.all(deletionPromises);
      
          console.log('All specified users removed from the project.');
          
          // Optionally, update the UI or state after all users are removed
      
        } catch (error) {
          console.error('Error removing users from project:', error);
        }
      };
      
      
    

    const handlePhotoSelection = async (uri: any) => {
        // setPhotoUri(uri);
        setFormData({ ...formData, image: uri })
      };

    const handleSelectCategory = (item: any) => {
        const selectedLabel = item.label;
        // if (selectedCategories.includes(item.value)) {
        if (formData?.categories.includes(selectedLabel)) {
          // Deselect the item if already selected
          // setFormData({ ...formData, categories: formData.categories.filter((value: any) => value !== item.value)})
          setFormData({ ...formData, categories: formData?.categories.filter((label: any) => label !== selectedLabel) });
    
        } else {
          // Add the item to selectedCategories
          // setFormData({ ...formData, categories: [...formData.categories, item.value] })
          setFormData({ ...formData, categories: [...formData?.categories, selectedLabel] });
    
        }
        console.log(formData?.categories)
      };

     // Handler for updating skills in formData
    const handleSkillsChange = (updatedSkills: any) => {
        setFormData({
        ...formData,
        skills: updatedSkills,
        });
        console.log(formData)
    };

    // Handler for updating resources in formData
    const handleResourcesChange = (updatedResources: any) => {
        setFormData({
        ...formData,
        resources: updatedResources,
        });
        console.log(formData)
    };
    
    const handleSetCurrentLocation = () => {
        // Get user's current location
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
                // Fetch city and state using Nominatim API
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        // Extract city and state from the response
                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.hamlet;
    
                        const state = data.address.state;
    
                        if (city && state) {
                            console.log(`Fetched location: ${city}, ${state}`);
                            // Update the formData with the fetched city and state
                            setFormData(prevFormData => ({
                                ...prevFormData,
                                city: `${city}, ${state}`, // Combine city and state
                                longitude: longitude,
                                latitude: latitude,
                            }));
                        } else {
                            console.warn("City or state not found in the response.");
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching location from Nominatim:', error);
                    });
            },
            error => {
                console.error('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };
    

  return (
   
    <KeyboardAwareScrollView
        extraScrollHeight={headerHeight}
    >
        <SafeAreaView
            edges={['bottom']}
        >
            <Header/>
            <View style={styles.detailsTabContainer}>
                {/* PROJECT TITLE AND DESCRIPTION */}
                {/* Project title */}
                <View style={styles.detailsTabHeaderContainer}>
                    <Emoji name="notebook" style={styles.emoji} />
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Title</Text>
                </View>
                <View style={styles.spacerVerticalSmall}/>
                <TextInput
                    onChangeText={(text) => setFormData((prevData) => ({
                        ...prevData,
                        title: text, // Update title while typing
                        }))}
                    value={formData?.title}
                    style={styles.titleTextBox}
                    numberOfLines={4}
                    maxLength={40}
                    multiline={true}
                />
                {/* Project description */}
                <View style={styles.detailsTabHeaderContainer}>
                    <Emoji name="scroll" style={styles.emoji} />
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Description</Text>
                </View>
                <View style={styles.spacerVerticalSmall}/>
                <TextInput
                    onChangeText={(text) => setFormData((prevData) => ({
                        ...prevData,
                        description: text, // Update title while typing
                        }))}
                    value={formData?.description}
                    style={styles.descriptionTextBox}
                    // numberOfLines={4}
                    // maxLength={40}
                    multiline={true}
                />
                {/* Category selection */}
                <View style={styles.detailsTabHeaderContainer}>
                    <Emoji name="label" style={styles.emoji} />
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Category selection</Text>
                </View>
                <DropdownWithChipDisplay formData={formData} setFormData={setFormData} handleSelectCategory={handleSelectCategory}/>
                <View style={styles.spacerVertical}/>
                {/* Manage members */}
                <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => {
                        router.push('/manageProject/manageProject2')
                      }}
                >
                    <Text style={styles.listButtonText}>
                        Manage members
                    </Text>
                    <FontAwesome6 name="chevron-right" style={styles.listButtonChevron} />
                </TouchableOpacity>
                <View style={styles.spacerVertical}/>
                {/* Skills Input */}
                <View style={styles.detailsTabHeaderContainer}>
                    <Emoji name="rocket" style={styles.emoji} />
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Skills needed</Text>
                </View>
                <ChipInput
                placeholder="Skills"
                chips={formData?.skills}
                onChangeChips={handleSkillsChange}
                />
                <View style={styles.spacerVertical}/>
                {/* Resources Input */}
                <View style={styles.detailsTabHeaderContainer}>
                    <Emoji name="briefcase" style={styles.emoji} />
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Resources needed</Text>
                </View>
                <ChipInput
                placeholder="Resources"
                chips={formData?.resources}
                onChangeChips={handleResourcesChange}
                />
                <View style={styles.spacerVertical}/>
                {/* Location reselection */}
                <View style={styles.detailsTabHeaderContainer}>
                    <Emoji name="earth_americas" style={styles.emoji} />
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Set location</Text>
                </View>
                <View style={styles.spacerVerticalSmall}/>
                <Text>
                    Current location: {formData?.city ? formData?.city : "Not set"}
                </Text>

                <View style={styles.spacerVerticalSmall}/>
                <Button    
                    mode="outlined"
                    onPress={handleSetCurrentLocation} // Call the handler
                    contentStyle={styles.locationButtonContent}
                    labelStyle={styles.locationButtonText}
                    style={styles.locationButtonStyle}
                >
                    Set location to current location
                </Button>
                <View style={styles.spacerVerticalSmall}/>
                {/* <View style={styles.spacerVerticalLarge}/> */}
            </View>      
            </SafeAreaView>
        </KeyboardAwareScrollView>
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
        borderWidth: 2,
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
        borderWidth: 2,
        height: windowHeight/8,
        borderRadius: 10, 
        padding: 10, 
        textAlign: 'left', 
        textAlignVertical: 'top', 
        marginBottom: 20, 
    }, 
    // Details tab
    detailsTabContainer: {
        marginTop: 20,
        marginHorizontal: 20, 
    },
    detailsTabHeaderContainer: {
        flexDirection: 'row'
    }, 
    detailsTabHeaderText: {
        fontSize: 15, 
        fontWeight: '500',
    }, 
    emoji: {
        fontSize: 15, 
    },
    spacerHorizontal: {
        marginHorizontal: 5, 
    },
    spacerVertical: {
        marginVertical: 15, 
    },
    spacerVerticalSmall: {
        marginVertical: 5, 
    },
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 10, 
    },
    spacerVerticalLarge: {
        marginVertical: 150,
    }, 
    locationButtonStyle: {
        borderRadius: 5,     
    }, 
    locationButtonContent: {
        // backgroundColor: '#4CDFFF', // Light gray background
        paddingHorizontal: 10,     // Horizontal padding for better spacing
    }, 
    locationButtonText: {
        color: 'darkblue', // Red text color
        fontWeight: 'bold', // Bold for emphasis
    },
    listButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'space-between',
    },
    listButtonText: {
        fontSize: 15, 
        fontWeight: '500', 
    }, 
    listButtonChevron: {
        fontSize: 15, 
        fontWeight: '500', 
    }, 
})


