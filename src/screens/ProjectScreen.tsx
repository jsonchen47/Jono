import { View, Text, Image, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser } from '../graphql/queries'
import Emoji from 'react-native-emoji';
import { Chip, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { updateProject } from '../graphql/mutations';
import { getProject } from '../graphql/queries';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(date);
    }
    else {
        return ""
    }
  };

// Function to fetch users based on user IDs
const fetchUsers = async (userIds: any) => {
    const userPromises = userIds.map(async (userId: any) => {
      try {
        const response = await API.graphql(graphqlOperation(getUser, { id: userId }));
        const castedResponse = response as GraphQLResult<any>
        return castedResponse.data?.getUser; // Return the fetched user data
      } catch (error) {
        console.error('Error fetching user:', error);
        return null; // Return null if an error occurs
      }
    });

    // Wait for all promises to resolve and filter out any null values
    const fetchedUsers = await Promise.all(userPromises);
    return fetchedUsers.filter(user => user !== null); // Filter out null users
  };

const ProjectScreen = ( {project}: any ) => {
    const router = useRouter(); 
    const [user, setUser] = useState<any>(null);
    const [members, setMembers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<any>([]);
    const [joinedDates, setJoinedDates] = useState<any>([]);
    const [headerOpacity, setHeaderOpacity] = useState(0);
    const [authUserID, setAuthUserID] = useState<any>(null); 
    const [hasRequested, setHasRequested] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Optional for async handling

    const fetchUser = async (ownerID: any) => {
        const result = await API.graphql(
          graphqlOperation(getUser, { id: ownerID })
        );
        const castedResult = result as GraphQLResult<any>
        setUser(castedResult.data?.getUser);
    };

    const fetchAuthUserID = async () => { 
        // Fetch the Auth user and set it 
        const authUser = await Auth.currentAuthenticatedUser();
        const userID = authUser.attributes.sub
        setAuthUserID(userID)
    }

    useEffect(() => {
        // Fetch the first owner of the project 
      if (project?.ownerIDs?.[0]) {
        fetchUser(project?.ownerIDs[0]);
      }

      // Check if the Auth user is included in the joinRequestIDs. If so, set hasRequested to true. 
      if (project?.joinRequestIDs?.includes(authUserID)) {
        setHasRequested(true)
      }
      else {
        setHasRequested(false)
      }

    }, [project?.ownerIDs]);

     // Scroll event handler
     const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        const newOpacity = Math.min(1, scrollY / 100); // Adjust divisor for faster/slower fade
        setHeaderOpacity(newOpacity); // Update header opacity
    };

    // Get all the members of each project 
    useEffect(() => {
        fetchAuthUserID()
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

      // Handle request to join and cancelling request to join

      const handleRequest = async () => {
        setIsProcessing(true);
        try {
            console.log('Sending join request...');
            // Add logic to send the join request (API call or state update)
            addUserToJoinRequests()

            setHasRequested(true);
        } catch (error) {
            console.error('Failed to send request:', error);
        } finally {
            setIsProcessing(false);
        }
    };
    
    const handleCancelRequest = async () => {
        setIsProcessing(true);
        try {
            console.log('Canceling join request...');
            // Add logic to cancel the join request (API call or state update)
            removeUserFromJoinRequests()
            setHasRequested(false);
        } catch (error) {
            console.error('Failed to cancel request:', error);
        } finally {
            setIsProcessing(false);
        }
    };



    // Function to add user's ID to the join requests array 
    const addUserToJoinRequests = async () => {
        try {
          // Fetch the current project to get existing joinRequestIDs
          const projectData = await API.graphql(graphqlOperation(getProject, { id: project.id }));
          const castedProjectData = projectData as GraphQLResult<any>;
          console.log('castedProjectData?.data?.joinRequestIDs: ', castedProjectData?.data?.getProject?.joinRequestIDs)
          const currentJoinRequestIDs = castedProjectData?.data?.getProject?.joinRequestIDs || [];
      
          // Check if the authUserID is already in the array
          if (currentJoinRequestIDs?.includes(authUserID)) {
            console.log("User is already in the joinRequestIDs array.");
            return;
          }
      
          // Add the authUserID to the array
          const updatedJoinRequestIDs = [...currentJoinRequestIDs, authUserID];
      
          // Update the project with the new joinRequestIDs array
          const updatedProject = await API.graphql(
            graphqlOperation(updateProject, {
              input: {
                id: project.id,
                joinRequestIDs: updatedJoinRequestIDs,
              },
            })
          );
        const castedUpdatedProject = updatedProject as GraphQLResult<any>;
          console.log("Updated Project:", castedUpdatedProject.data.updateProject);
        } catch (error) {
          console.error("Error adding user to joinRequestIDs:", error);
        }
    };

    // Function to remove user's ID from the join requests array
    const removeUserFromJoinRequests = async () => {
        try {
        // Fetch the current project to get existing joinRequestIDs
        const projectData = await API.graphql(graphqlOperation(getProject, { id: project.id }));
        const castedProjectData = projectData as GraphQLResult<any>;
        console.log('castedProjectData?.data?.joinRequestIDs: ', castedProjectData?.data?.getProject?.joinRequestIDs)
        console.log('authID', authUserID)
        const currentJoinRequestIDs = castedProjectData?.data?.getProject?.joinRequestIDs || [];
    
        // Check if the authUserID is in the array
        if (!currentJoinRequestIDs.includes(authUserID)) {
            console.log("User is not in the joinRequestIDs array.");
            return;
        }
    
        // Remove the authUserID from the array
        const updatedJoinRequestIDs = currentJoinRequestIDs.filter((id: any) => id !== authUserID);
    
        // Update the project with the new joinRequestIDs array
        const updatedProject = await API.graphql(
            graphqlOperation(updateProject, {
            input: {
                id: project.id,
                joinRequestIDs: updatedJoinRequestIDs,
            },
            })
        );
        const castedUpdatedProject = updatedProject as GraphQLResult<any>;
        console.log("Updated Project (after removal):", castedUpdatedProject.data.updateProject);
        } catch (error) {
        console.error("Error removing user from joinRequestIDs:", error);
        }
    };
  
    

    return (
        <View style={styles.container}>
            {/* HEADER */}
            {/* Header background that changes opacity */}
            <View style={[styles.headerBackground, { opacity: headerOpacity }]}>
                <SafeAreaView style={styles.headerBackgroundSafeAreaView}>
                    {/* Back button icon */}
                    <TouchableOpacity 
                        style={styles.headerButton}
                        onPress={() => {
                            router.back()
                        }}
                        >
                        <Icon name="chevron-back" style={styles.icon}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
            {/* Header overlay with buttons */}
            <View style={styles.headerOverlay}>
                <SafeAreaView style={styles.headerOverlaySafeAreaView}>
                    {/* Back button icon */}
                    <TouchableOpacity 
                        style={styles.headerButton}
                        onPress={() => {
                            router.back()
                        }}
                        >
                        <Icon name="chevron-back" style={styles.icon}/>
                    </TouchableOpacity>
                    {/* Right side buttons */}
                    <View style={styles.rightSideButtonsContainer}>
                        {/* Share button */}
                        <TouchableOpacity 
                            style={styles.headerButtonRight}
                            onPress={() => {
                                console.log('pressed ellipsis')
                                router.push({
                                    pathname: '/optionsScreen',
                                    params: { projectId: project.id },
                                })
                            }}
                            >
                            <Icon name="ellipsis-horizontal" style={styles.icon}/>
                        </TouchableOpacity>
                        {/* Share button */}
                        <TouchableOpacity 
                            style={styles.headerButtonRight}
                            onPress={() => {
                                console.log('pressed share')
                            }}
                            >
                            <Icon name="share-outline" style={styles.icon}/>
                        </TouchableOpacity>
                        {/* Heart button */}
                        <TouchableOpacity 
                            style={styles.headerButtonRight}
                            onPress={() => {
                                console.log('pressed heart')
                            }}
                            >
                            <Icon name="heart-outline" style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
            <View style={styles.contentContainer}>
                <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
                    <Image style={styles.projectImage} source={{uri: project?.image}}>
                        
                    </Image>
                    {/* Details */}
                    <View style={styles.detailsContainer}>
                        <Text style = {styles.title} >{project?.title}</Text>
                        <Text style = {styles.description}>{project?.description}</Text>
                        <View style={styles.divider} />
                        {/* Author details */}
                        <View style={styles.authorSection}>
                            <Image style={styles.authorImage} source={{uri: user?.image}}/>
                            <View style={styles.authorDetailsContainer}>
                                <Text style={styles.authorName}>Authored by {user?.name}</Text>
                                <Text style={styles.dateAuthored}>{formatDate(project?.createdAt)} </Text>
                            </View>
                        </View>
                        <View style={styles.divider} /> 
                        {/* Skills */}
                        <View style={styles.skillsAndResourcesTopPadding}></View>
                        <View style={styles.skillsAndResourcesTitleContainer}>
                            <Emoji name="rocket" style={styles.emoji} />
                            <Text style={styles.subtitle}> Skills</Text>
                        </View>
                        <View style={styles.skillsAndResourcesChipsContainer}>
                            {project?.skills?.map((skill: any, index: any) => (
                                <Chip key={index} style={styles.chip} textStyle={styles.chipText}>{skill}</Chip>
                            ))}
                        </View>
                        {/* Resources */}
                        <View style={styles.skillsAndResourcesTitleContainer}>
                            <Emoji name="briefcase" style={styles.emoji} />
                            <Text style={styles.subtitle}> Resources</Text>
                        </View>
                        <View style={styles.skillsAndResourcesChipsContainer}>
                            {project?.resources?.map((resource: any, index: any) => (
                                <Chip key={index} style={styles.chip} textStyle={styles.chipText}>{resource}</Chip>
                            ))}
                        </View>
                        <View style={styles.divider} /> 
                        {/* Members */}
                        <Text style={styles.membersSubtitle}>Members</Text>
                        <View style={styles.membersList}>
                            {users?.map((member: any, index: any) => (
                                <View key={index} style={styles.authorSection}>
                                    <Image style={styles.authorImage} source={{uri: member?.image}}/>
                                    <View style={styles.authorDetailsContainer}>
                                        <Text style={styles.authorName}>{member?.name}</Text>
                                        <Text style={styles.dateAuthored}>Joined {formatDate(joinedDates?.[index])} </Text>
                                    </View>
                                </View>
                            ))
                            }
                        </View>
                    </View>
                </ScrollView>
            
                {/* Divider */}
                <View style={styles.bottomDivider}></View>
                {/* Bottom content */}
                <SafeAreaView>
                    <View style={styles.contentBottom}>
                        <View style={styles.membersCountTextContainer}>
                            <Text style={styles.membersCountText}>{users.length}</Text>
                            <Text style={styles.membersText}>Members</Text>
                        </View>
                        {/* <Button 
                            style={styles.joinButton} 
                            labelStyle={styles.joinButtonText}
                            mode="contained"  
                            onPress={() => console.log('pressed')}>
                            Request to Join
                        </Button> */}
                        {/* Conditional Button Rendering */}
        {users.some((user: any) => user.id === authUserID) ? (
            <Button 
                style={styles.joinButton} 
                labelStyle={styles.joinButtonText}
                mode="contained"  
                onPress={() => 
                    // console.log('Manage/Edit pressed')
                    router.push({
                        pathname: '/manageProject',
                        params: { projectId: project.id },
                    })
                }>
                Manage and Edit
            </Button>
        ) : (
            hasRequested ? (
                // Requested Button
                <Button
                    style={styles.requestedButton}
                    labelStyle={styles.joinButtonText}
                    mode="contained"
                    onPress={handleCancelRequest}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Canceling...' : 'Requested'}
                </Button>
            ) : (
                // Join Button
                <Button
                    style={styles.joinButton}
                    labelStyle={styles.joinButtonText}
                    mode="contained"
                    onPress={handleRequest}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Requesting...' : 'Request to Join'}
                </Button>
            )
        )}
                    </View>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default ProjectScreen

const styles = StyleSheet.create({
    // Main view
    container: {
        flex: 1,
        // width: '100%',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    scrollView: {
        // flex: 1,
        // width: '100%',
    },
    // Header 
    headerContainer: {
        
       
    },
    headerBackground: {   
        // flex: 1,
        position: 'absolute',
        backgroundColor: 'green',
        top: 0, 
        left: 0,
        right: 0,
        height: 60,
        zIndex: 1,
    },
    headerOverlay: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0, 
        left: 0,
        right: 0,
        height: 60,
        zIndex: 2,
    },
    headerButton: {
        // position: 'absolute',
        backgroundColor: 'white', 
        width: 30,                    // Circle diameter
        height: 30,                   // Circle diameter
        borderRadius: 15, 
        marginLeft: 20, 
        marginBottom: 10, 
        alignItems: 'center', 
        justifyContent: 'center',
        // opacity: 100
    }, 
    headerButtonRight: {
        // position: 'absolute',
        backgroundColor: 'white', 
        width: 30,                    // Circle diameter
        height: 30,                   // Circle diameter
        borderRadius: 15, 
        marginLeft: 15, 
        marginBottom: 10, 
        alignItems: 'center', 
        justifyContent: 'center',
        // opacity: 100
    }, 
    headerBackgroundSafeAreaView: {
        backgroundColor: 'white', 
    }, 
    headerOverlaySafeAreaView: {
        backgroundColor: 'transparent', 
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    icon: {
        fontSize: 20, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    rightSideButtonsContainer: {
        flexDirection: 'row',
        marginRight: 20, 
    },
    // Project details
    detailsContainer: {
        padding: 15, 
        // flex: 1,
        // width: '100%',
    },
    projectImage: {
        // flex: 1,
        width: windowWidth, 
        height: windowHeight/3
    }, 
    title: {
        fontSize: 25, 
        fontWeight: 'bold', 
    }, 
    description: {
        paddingTop: 10, 
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray'
    }, 
    divider: {
        height: 1,            // Thickness of the line
        width: '100%',        // Full width of the screen
        backgroundColor: '#D3D3D3', // Light gray color
        marginTop: 20,   // Space above and below the divider
    },
    // Author section 
    authorSection: {    
        flexDirection: 'row', 
        paddingTop: 20
    }, 
    authorImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    }, 
    authorDetailsContainer: {
        paddingLeft: 20, 
    }, 
    authorName: {
        fontSize: 17,
        fontWeight: '500'
    }, 
    dateAuthored: {
        color: 'dimgray',
        paddingTop: 5,
    }, 
    // Skills and resources section
    skillsAndResourcesTopPadding: {
        paddingTop: 5, 
    },
    skillsAndResourcesTitleContainer: {
        paddingTop: 15,
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    emoji: {
        fontSize: 23,
        fontWeight: 'bold', 
        paddingHorizontal: 10,
    }, 
    subtitle: {
        fontWeight: 'bold', 
        fontSize: 23, 
    }, 
    skillsAndResourcesChipsContainer: {
        paddingTop: 15, 
        flexDirection: 'row',
        flexWrap: 'wrap',   
    },
    chip: {
        alignSelf: 'flex-start',
        margin: 5, 
        backgroundColor: 'black'
    },
    chipText: {
        color: 'white',
        fontSize: 15
    }, 
    // Members 
    membersSubtitle: {
        paddingTop: 15,
        paddingLeft: 10, 
        fontWeight: 'bold', 
        fontSize: 23, 
    }, 
    membersList: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    }, 
    bottomDivider: {
        height: 1,            // Thickness of the line
        width: '100%',        // Full width of the screen
        backgroundColor: '#D3D3D3', // Light gray color
    },
    // Bottom content
    contentBottom: {
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        flexDirection: 'row'
    }, 
    membersCountTextContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        // flex: 1, 
        paddingLeft: 15,
        // backgroundColor: 'red'
    }, 
    membersCountText: {
        color: 'black',
        fontSize: 22,
        fontWeight: '500'
    }, 
    membersText: {
        color: 'gray'
    }, 
    joinButton: {
        borderRadius: 10, 
        alignSelf: 'flex-end',
        width: 200, 
        backgroundColor: '#4CDFFF', 
    },
    requestedButton: {
        borderRadius: 10, 
        alignSelf: 'flex-end',
        width: 200, 
        backgroundColor: '#BCEAF3', 
    },
    joinButtonText: {
        fontSize: 17, 
        color: 'black',
        padding: 5,
    },
})