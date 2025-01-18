import { Keyboard, Platform, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, memo, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Octicons from 'react-native-vector-icons/Octicons'; // Import vector icons
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import vector icons
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Emoji from 'react-native-emoji';
import ChipInput from '../components/ChipInput';
import { List, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectPhoto } from '../functions/selectPhoto';
import { FormContext } from '@/app/manageProject/_layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useHeaderHeight } from '@react-navigation/elements';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Import vector icons
import DropdownWithChipDisplay from '../components/DropdownWithChipDisplay';
import Geolocation from '@react-native-community/geolocation';
import { listUserProjects } from '../graphql/queries';
import { deleteUserProject, createUserProject } from '../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { updateProject } from '../graphql/mutations';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';
import { updateProjectImage } from '../functions/updateProjectImage';
import { Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { deleteJoinRequest } from '../graphql/mutations';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const client = generateClient();

const windowHeight = Dimensions.get('window').height;

const ManageProjectScreen = ({project}: any) => {
    const { setProjectID } = useProjectUpdateContext(); // Get setProjectID function from context
    const headerHeight = useHeaderHeight();
    const { formData, setFormData } = useContext(FormContext);
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const router = useRouter(); 
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(false)
    const { sdk } = useSendbirdChat();

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
            joinRequests: project?.joinRequests?.items, 
        }));
        // console.log('joinRequests')
        // console.log(project?.joinRequests)
        // console.log(formData.joinRequests)
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
            setLoading(true);
    
            // Step 1: Remove canceled joinRequests
            await removeCanceledJoinRequests();
    
            // Step 2: Update project details
            const input = {
                id: project.id,
                title: formData.title,
                description: formData.description,
                image: formData.image,
                categories: formData.categories,
                skills: formData.skills,
                resources: formData.resources,
                longitude: formData.longitude,
                latitude: formData.latitude,
                city: formData.city,
                ownerIDs: formData.ownerIDs,
            };
    
            // Update the project
            const result = await client.graphql({
                query: updateProject,
                variables: { input },
            }) as GraphQLResult<any>;

            // Update the chat's title 
            if (project?.groupChatID) {
                const channel = await sdk.groupChannel.getChannel(project.groupChatID);
                await channel.updateChannel({
                    name: formData.title || channel.name, // Update the title if provided
                  });
            }

            // Update the project image and the chat image 
            if (formData?.image !== project?.image) {
                await updateProjectImage(project?.id, formData, setFormData, project?.image, sdk, project?.groupChatID);
            }


    
            await Promise.all([
                handleAddUsers(),
                handleRemoveUsers(project.id, formData.removeUserIDs),
            ]);
    
            if (result?.data?.updateProject) {
                alert("Project updated successfully!");
                setProjectID(project?.id);
                router.back();
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
        navigation.setOptions({ 
            title: 'Manage Project', 
            headerLeft: () => 
            <TouchableOpacity onPress={() => router.back()}>
                <Octicons name='x' style={styles.exitButton}/>
            </TouchableOpacity>,
            headerRight: () => 
            <TouchableOpacity onPress={handleSaveConfirmation}>
                <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
        });
    }, [navigation, router, handleSaveConfirmation, project]);
    

    // Function to remove canceled joinRequests
const removeCanceledJoinRequests = async () => {
    try {
        // Get the list of joinRequests to be removed
        const canceledRequests = project.joinRequests.items.filter(
            (request: any) => !formData.joinRequests.some((formRequest: any) => formRequest.id === request.id)
        );

        // Remove each canceled request
        const removePromises = canceledRequests.map((request: any) =>
            client.graphql({
                query: deleteJoinRequest, // Replace with the actual mutation
                variables: { input: { id: request.id } },
            })
        );

        await Promise.all(removePromises);
        console.log("Canceled joinRequests successfully removed.");
    } catch (error) {
        console.error("Error removing canceled joinRequests:", error);
    }
};

const handleAddUsers = async () => {
    try {
        const { addUserIDs, joinRequests } = formData;

        if (addUserIDs.length === 0) {
            console.log('No users to add.');
            return;
        }

        // Step 1: Add users to the project
        const addUserPromises = addUserIDs.map(async (userId) => {
            const input = {
                userId,
                projectId: project.id,
            };

            await client.graphql({
                query: createUserProject,
                variables: { input },
            });
            console.log(`User ${userId} added to the project.`);

            // Add users to the group chat 
            if (project?.groupChatID) {
                const channel = await sdk.groupChannel.getChannel(project.groupChatID);
                console.log('got the channel at least')
                await channel.inviteWithUserIds([userId]);
                console.log(`User ${userId} added to group chat ${project?.groupChatID}.`);
            }
        });

        await Promise.all(addUserPromises);

        // Step 2: Remove corresponding joinRequests
        const joinRequestsToDelete = joinRequests.filter((request) =>
            addUserIDs.includes(request.userID)
        );

        const deletePromises = joinRequestsToDelete.map(async (request) =>
            client.graphql({
                query: deleteJoinRequest, // Replace with your actual mutation
                variables: { input: { id: request.id } },
            })
        );

        await Promise.all(deletePromises);

        // Update formData locally
        const updatedJoinRequests = joinRequests.filter(
            (request) => !addUserIDs.includes(request.userID)
        );
        setFormData({ ...formData, joinRequests: updatedJoinRequests });

        console.log('Users successfully added and join requests updated.');
    } catch (error) {
        console.error('Error adding users:', error);
        alert('An error occurred while adding users.');
    }
};


    
    const handleRemoveUsers = async (projectId: string, userIds: string[]) => {
        try {
            if (userIds.length === 0) {
                console.log('No users to remove.');
                return;
            }
    
            const userIdConditions = userIds.map(userId => ({
                userId: { eq: userId }
            }));
            
            const userProjects = await client.graphql({
                query: listUserProjects,
                variables: { 
                    filter: { 
                        projectId: { eq: projectId },
                        or: userIdConditions
                    }
                }
            }) as GraphQLResult<any>;
    
            const userProjectIds = userProjects.data.listUserProjects.items.map((item: any) => item.id);
    
            if (userProjectIds.length === 0) {
                console.log('No users found to remove.');
                return;
            }
    
            const deletionPromises = userProjectIds.map(async (userProjectId: any) => {
                

                // Return the deletion query 
                return client.graphql({
                    query: deleteUserProject,
                    variables: { input: { id: userProjectId } }
                });
            });
    
            await Promise.all(deletionPromises);
    
            console.log('All specified users removed from the project.');
            
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
                    {/* <Emoji name="notebook" style={styles.emoji} /> */}
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
                    {/* <Emoji name="scroll" style={styles.emoji} /> */}
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
                    {/* <Emoji name="label" style={styles.emoji} /> */}
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
                    {/* <Emoji name="rocket" style={styles.emoji} /> */}
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Skills needed</Text>
                </View>
                <View style={styles.spacerVerticalSmall}/>
                <ChipInput
                placeholder="Skills"
                chips={formData?.skills}
                onChangeChips={handleSkillsChange}
                />
                <View style={styles.spacerVertical}/>
                {/* Resources Input */}
                <View style={styles.detailsTabHeaderContainer}>
                    {/* <Emoji name="briefcase" style={styles.emoji} /> */}
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Resources needed</Text>
                </View>
                <View style={styles.spacerVerticalSmall}/>
                <ChipInput
                placeholder="Resources"
                chips={formData?.resources}
                onChangeChips={handleResourcesChange}
                />
                <View style={styles.spacerVertical}/>
                {/* Location reselection */}
                <View style={styles.detailsTabHeaderContainer}>
                    {/* <Emoji name="earth_americas" style={styles.emoji} /> */}
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
        borderWidth: 1,
        height: windowHeight/10,
        borderRadius: 10, 
        padding: 10, 
        textAlign: 'left', 
        textAlignVertical: 'top', 
        marginBottom: 20, 
        borderColor: 'lightgray',
        backgroundColor: '#f9f9f9'
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
        borderColor: 'lightgray',
        backgroundColor: '#f9f9f9'
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
        borderRadius: 10,     
        marginBottom: 20, 
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
        borderColor: 'gray'
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


