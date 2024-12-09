import { Keyboard, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, memo} from 'react';
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
import { formatDateShort } from '../functions/formatDateShort';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectPhoto } from '../functions/selectPhoto';

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
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const router = useRouter(); 
    const navigation = useNavigation();
    const [tempProject, setTempProject] = React.useState( cloneDeep(project) ) // Create a copy of project in tempProject 
    const [members, setMembers] = useState<any>([]);
    const [joinDates, setJoinDates] = useState<any>([]);
    const [requestMembers, setRequestMembers] = useState<any>([]);
    const [requestDates, setRequestDates] = useState<any>([]);
    const [admins, setAdmins] = useState<any>([]);
    const [adminJoinDates, setAdminJoinDates] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    // Header with image, title, and project 
    const Header = memo(() => {
        return (
            <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    {/* Project image */}
                    <View>
                        <Image
                            style={styles.projectImage}
                            source={{uri: tempProject?.image}}
                        />
                        <TouchableOpacity 
                            style={styles.editImageButton}
                            onPress={() => selectPhoto(handlePhotoSelection)}
                        >
                            <Ionicons name='pencil' style={styles.editImageButtonIcon}/>
                            <Text style={styles.editImageButtonText}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    });

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
    }, [])

    // When the screen first loads, set the tempProject as the project 
    useEffect(() => {
        setTitle(project?.title)
        setDescription(project?.description)
        setTempProject(cloneDeep(project))
    }, [])

    // Get all the members of each project 
    useEffect(() => {
        // Function for getting the project members
        const loadMembers = async () => {
          setLoading(true); // Set loading to true while fetching users
          const userIds = project?.Users?.items.map((item: any) => item.userId) || []; // Extract user IDs
          const joinedDates = project?.Users?.items.map((item: any) => item.createdAt) || []; 
          if (userIds.length > 0) {
            const usersList = await fetchUsers(userIds); // Fetch users
            setMembers(usersList); // Update state with fetched users
            setJoinDates(joinedDates);
          }
          setLoading(false); // Set loading to false after fetching
        };    

        // Function for getting the request members
        const loadRequestMembers = async () => {
            if (tempProject?.joinRequestIDs?.length > 0) {
                const usersList = await fetchUsers(tempProject?.joinRequestIDs); // Fetch users
                setRequestMembers(usersList); // Update state with fetched users
                const joinedDates = usersList?.map((item: any) => item.createdAt) || []; 
                setRequestDates(joinedDates);
              }
        }

        // Function for getting the admins
        const loadAdmins = async () => {
            if (tempProject?.ownerIDs?.length > 0) {
                const usersList = await fetchUsers(tempProject?.ownerIDs); // Fetch users
                setAdmins(usersList); // Update state with fetched users
                const joinedDates = usersList?.map((item: any) => item.createdAt) || []; 
                setAdminJoinDates(joinedDates);
              }
        }
        
        loadMembers(); // Call the function to load users
        loadRequestMembers(); 
        loadAdmins(); 
    }, []); // Run effect when the project changes

    const handlePhotoSelection = async (uri: any) => {
        // setPhotoUri(uri);
        setTempProject({ ...tempProject, image: uri })
      };

    const handleSelectCategory = (item: any) => {
        const selectedLabel = item.label;
        // if (selectedCategories.includes(item.value)) {
        if (tempProject?.categories.includes(selectedLabel)) {
          // Deselect the item if already selected
          // setFormData({ ...formData, categories: formData.categories.filter((value: any) => value !== item.value)})
          setTempProject({ ...tempProject, categories: tempProject?.categories.filter((label: any) => label !== selectedLabel) });
    
        } else {
          // Add the item to selectedCategories
          // setFormData({ ...formData, categories: [...formData.categories, item.value] })
          setTempProject({ ...tempProject, categories: [...tempProject?.categories, selectedLabel] });
    
        }
      };

     // Handler for updating skills in formData
    const handleSkillsChange = (updatedSkills: any) => {
        setTempProject({
        ...tempProject,
        skills: updatedSkills,
        });
    };

    // Handler for updating resources in formData
    const handleResourcesChange = (updatedResources: any) => {
        setTempProject({
        ...tempProject,
        resources: updatedResources,
        });
    };

    // Tab with details about project 
    function DetailsTab() {
        return (
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
                    onChangeText={setTitle}
                    value={title}
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
                    onChangeText={setDescription}
                    value={description}
                    style={styles.descriptionTextBox}
                    numberOfLines={4}
                    maxLength={40}
                    multiline={true}
                />
                {/* Skills Input */}
                <View style={styles.detailsTabHeaderContainer}>
                    <Emoji name="rocket" style={styles.emoji} />
                    <View style={styles.spacerHorizontal}/>
                    <Text style={styles.detailsTabHeaderText}>Skills needed</Text>
                </View>
                <ChipInput
                placeholder="Skills"
                chips={tempProject?.skills}
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
                chips={tempProject?.resources}
                onChangeChips={handleResourcesChange}
                />
                <View style={styles.spacerVertical}/>
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
                    value={tempProject?.categories}
                    onChange={handleSelectCategory}
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
                    Current location: {tempProject?.city ? tempProject?.city : "Not set"}
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
                <View style={styles.spacerVerticalLarge}/>
            </View>            
        );
    }

    // Tab with details about project 
    function MembersTab() {
        return (
            <View>
                <View style={{marginVertical: 5}}/>
                {members?.map((member: any, index: any) => (
                    <List.Item
                        key={index}
                        title={member.name}
                        description={`Joined ${formatDateShort(joinDates?.[index])}`}
                        left={props =>(
                            <Image
                            {...props}
                            source={{ uri: member.image }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 5,
                                marginLeft: 20, // Optional spacing between image and text
                            }}
                        />
                        )}
                        right={(props) => (
                            members.length > 1 ? (
                                <Button
                                    {...props}
                                    mode="text"
                                    onPress={() => console.log('Pressed demote')}
                                    contentStyle={styles.removeButtonContent}
                                    labelStyle={styles.removeButtonText}
                                    style={styles.removeButtonStyle}
                                >
                                    Remove
                                </Button>
                            ) : (
                                <View style={{width: 150, justifyContent: 'center'}}>
                                    <Text style={{ color: 'gray', textAlign: 'center', marginRight: 10 }}>
                                        Cannot leave project with 1 member
                                    </Text>
                                </View>
                            )
                        )}
                    />
                ))
                }
            </View>
        );
    }


    function RequestsTab() {
        return (
            <View>
                <View style={{ marginVertical: 5 }} />
                {requestMembers && requestMembers.length > 0 ? (
                    requestMembers.map((requestMember: any, index: any) => (
                        <List.Item
                            key={index}
                            title={requestMember.name}
                            description={`Joined ${formatDateShort(requestDates?.[index])}`}
                            left={(props) => (
                                <Image
                                    {...props}
                                    source={{ uri: requestMember.image }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 5,
                                        marginLeft: 20, // Optional spacing between image and text
                                    }}
                                />
                            )}
                            right={(props) => (
                                <Button
                                    {...props}
                                    mode="text"
                                    onPress={() => console.log('Pressed approve')}
                                    contentStyle={styles.approveButtonContent}
                                    labelStyle={styles.approveButtonText}
                                    style={styles.removeButtonStyle}
                                >
                                    Approve
                                </Button>
                            )}
                        />
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
                        No requests yet
                    </Text>
                )}
            </View>
        );
    }

    function AdminsTab() {
        return (
            <View>
                <View style={{ marginVertical: 5 }} />
                {admins && admins.length > 0 ? (
                    admins.map((requestMember: any, index: any) => (
                        <List.Item
                            key={index}
                            title={requestMember.name}
                            description={`Joined ${formatDateShort(adminJoinDates?.[index])}`}
                            left={(props) => (
                                <Image
                                    {...props}
                                    source={{ uri: requestMember.image }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 5,
                                        marginLeft: 20, // Optional spacing between image and text
                                    }}
                                />
                            )}
                            right={(props) => (
                                admins.length > 1 ? (
                                    <Button
                                        {...props}
                                        mode="text"
                                        onPress={() => console.log('Pressed demote')}
                                        contentStyle={styles.removeButtonContent}
                                        labelStyle={styles.removeButtonText}
                                        style={styles.removeButtonStyle}
                                    >
                                        Demote
                                    </Button>
                                ) : (
                                    <View style={{width: 150, justifyContent: 'center'}}>
                                        <Text style={{ color: 'gray', textAlign: 'center', marginRight: 10 }}>
                                            Cannot demote with only 1 admin
                                        </Text>
                                    </View>
                                )
                            )}
                        />
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
                        No admins set
                    </Text>
                )}
            </View>
        );
    }
    

  return (
    <Tabs.Container 
        renderHeader={() => <Header/>}
        renderTabBar={props => (
            <MaterialTabBar
                {...props}
                scrollEnabled={true}
                indicatorStyle={{ backgroundColor: 'black', height: 2 }}
            />
        )}
    >
        <Tabs.Tab name="Details">
            <Tabs.ScrollView>
                <DetailsTab/>
            </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Members">
            <Tabs.ScrollView>
                <MembersTab/>
            </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Requests to Join">
            <Tabs.ScrollView>
                <RequestsTab/>
            </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Admins">
            <Tabs.ScrollView>
                <AdminsTab/>
            </Tabs.ScrollView>
        </Tabs.Tab>
    </Tabs.Container>
        
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
})


