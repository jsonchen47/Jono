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
    const headerHeight = useHeaderHeight();
    const { formData, setFormData } = useContext(FormContext);
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const router = useRouter(); 
    const navigation = useNavigation();

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
    }, [project])

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
      };

     // Handler for updating skills in formData
    const handleSkillsChange = (updatedSkills: any) => {
        setFormData({
        ...formData,
        skills: updatedSkills,
        });
    };

    // Handler for updating resources in formData
    const handleResourcesChange = (updatedResources: any) => {
        setFormData({
        ...formData,
        resources: updatedResources,
        });
    };
    

  return (
    // <Tabs.Container 
    //     // renderHeader={() => <Header/>}
    //     renderTabBar={props => (
    //         <MaterialTabBar
    //             {...props}
    //             scrollEnabled={true}
    //             indicatorStyle={{ backgroundColor: 'black', height: 2 }}
    //         />
    //     )}
    // >
    //     <Tabs.Tab name="Details">
    //         <Tabs.ScrollView>
    //             <DetailsTab/>
    //         </Tabs.ScrollView>
    //     </Tabs.Tab>
    //     <Tabs.Tab name="Members">
    //         <Tabs.ScrollView>
    //             <MembersTab/>
    //         </Tabs.ScrollView>
    //     </Tabs.Tab>
    //     <Tabs.Tab name="Requests to Join">
    //         <Tabs.ScrollView>
    //             <RequestsTab/>
    //         </Tabs.ScrollView>
    //     </Tabs.Tab>
    //     <Tabs.Tab name="Admins">
    //         <Tabs.ScrollView>
    //             <AdminsTab/>
    //         </Tabs.ScrollView>
    //     </Tabs.Tab>
    // </Tabs.Container>
    // <KeyboardAvoidingView
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // // keyboardVerticalOffset={200}
    // >
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
                <Dropdown
                    style={styles.dropdown}
                    data={categories}
                    labelField="label"
                    valueField="value"
                    placeholder="Select items"
                    value={formData?.categories}
                    onChange={handleSelectCategory}
                />
                <View style={styles.spacerVertical}/>
                {/* Manage members */}
                <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => {
                        router.push('/manageProject/manageProject1')
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
                    onPress={() => 
                        console.log('Pressed remove')
                    }
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
    removeButtonStyle: {
        borderRadius: 5,     
    }, 
    removeButtonContent: {
        backgroundColor: '#E7E7E7', // Light gray background
        paddingHorizontal: 10,     // Horizontal padding for better spacing
    }, 
    removeButtonText: {
        color: '#d32f2f', // Red text color
        fontWeight: 'bold', // Bold for emphasis
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
    approveButtonText: {
        color: 'black', 
        fontWeight: 'bold', // Bold for emphasis
    },
    approveButtonContent: {
        backgroundColor: '#4CDFFF', 
        paddingHorizontal: 10,     // Horizontal padding for better spacing
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


