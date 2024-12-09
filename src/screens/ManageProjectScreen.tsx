import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, ScrollView } from 'react-native'
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();

const ManageProjectScreen = ({project}: any) => {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const router = useRouter(); 
    const navigation = useNavigation();
    const [tempProject, setTempProject] = React.useState( cloneDeep(project) ) // Create a copy of project in tempProject 
    const [image, setImage] = React.useState("")
    const imageRef = React.useRef(image);
    const [users, setUsers] = useState<any>([]);
    const [joinedDates, setJoinedDates] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    // Header with image, title, and project 
    const Header = memo(() => {
        return (
            <View>
                {/* Project image */}
                <View>
                    <Image
                        style={styles.projectImage}
                        source={{uri: image}}
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
    })

    useEffect(() => {
        setTitle(project?.title)
        setDescription(project?.description)
        setImage(project?.image ? `${project.image}` : "")
        setTempProject(cloneDeep(project))
        imageRef.current = image; 
    }, [project])

    // Get all the members of each project 
    useEffect(() => {
        const loadUsers = async () => {
          setLoading(true); // Set loading to true while fetching users
          const userIds = project?.Users?.items.map((item: any) => item.userId) || []; // Extract user IDs
          const joinedDates = project?.Users?.items.map((item: any) => item.createdAt) || []; 
          if (userIds.length > 0) {
            const usersList = await fetchUsers(userIds); // Fetch users
            setUsers(usersList); // Update state with fetched users
            setJoinedDates(joinedDates);
          }
          setLoading(false); // Set loading to false after fetching
        };
    
        loadUsers(); // Call the function to load users
    }, [project]); // Run effect when the project changes

    // Tab with details about project 
    function DetailsTab() {
        return (
            <View style={styles.detailsTabContainer}>
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
            </View>
        );
    }

    // Tab with details about project 
    function MembersTab() {
        return (
            <View>
                <View style={{marginVertical: 5}}/>
                {users?.map((member: any, index: any) => (
                    <List.Item
                        key={index}
                        title={member.name}
                        description={`Joined ${formatDateShort(joinedDates?.[index])}`}
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
                        right={props => (
                            <Button
                                {...props}
                                mode="text"
                                onPress={() => 
                                    console.log('Pressed remove')
                                }
                                contentStyle={styles.removeButtonContent}
                                labelStyle={styles.removeButtonText}
                                style={styles.removeButtonStyle}
                            >
                                Remove
                            </Button>
                        )}
                    />
                ))
                }
            </View>
        );
    }

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
                <Text>hi</Text>
            </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Admins">
            
                <Text>hi</Text>
        
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
        fontSize: 18, 
        fontWeight: '500',
    }, 
    emoji: {
        fontSize: 18, 
    },
    spacerHorizontal: {
        marginHorizontal: 5, 
    },
    spacerVertical: {
        marginVertical: 15, 
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
})


