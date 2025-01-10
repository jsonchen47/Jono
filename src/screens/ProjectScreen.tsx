import { View, Text, Image, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser } from '../graphql/queries'
import Emoji from 'react-native-emoji';
import { Chip, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { updateProject } from '../graphql/mutations';
import { getProject } from '../graphql/queries';
import { formatDateLong } from '../functions/formatDateLong';
import { fetchUsers } from '../functions/fetchUsers';
import { useFocusEffect } from '@react-navigation/native';
import HeartButton from '../components/HeartButton';

const client = generateClient();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProjectScreen = ({ project }: any) => {
    const router = useRouter(); 
    const [user, setUser] = useState<any>(null);
    const [members, setMembers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<any>([]);
    const [joinedDates, setJoinedDates] = useState<any>([]);
    const [headerOpacity, setHeaderOpacity] = useState(0);
    const [authUserID, setAuthUserID] = useState<any>(null); 
    const [hasRequested, setHasRequested] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchUser = async (ownerID: any) => {
        try {
            const result = await client.graphql({
                query: getUser,
                variables: { id: ownerID }
            }) as GraphQLResult<any>;
            setUser(result.data?.getUser);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchAuthUserID = async () => { 
        try {
            const authUser = await getCurrentUser();
            setAuthUserID(authUser.userId);
        } catch (error) {
            console.error('Error fetching auth user:', error);
        }
    }

    useEffect(() => {
      if (project?.ownerIDs?.[0]) {
        fetchUser(project?.ownerIDs[0]);
      }

      if (project?.joinRequestIDs?.includes(authUserID)) {
        setHasRequested(true)
      } else {
        setHasRequested(false)
      }
    }, [project?.ownerIDs, authUserID]);

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        const newOpacity = Math.min(1, scrollY / 100);
        setHeaderOpacity(newOpacity);
    };

    useEffect(() => {
        fetchAuthUserID()
        const loadUsers = async () => {
          setLoading(true);
          const userIds = project?.Users?.items.map((item: any) => item.userId) || [];
          const joinedDates = project?.Users?.items.map((item: any) => item.createdAt) || []; 
          if (userIds.length > 0) {
            const usersList = await fetchUsers(userIds);
            setUsers(usersList);
            setJoinedDates(joinedDates);
          }
          setLoading(false);
        };
    
        loadUsers();
    }, [project]);

    const handleRequest = async () => {
        setIsProcessing(true);
        try {
            console.log('Sending join request...');
            await addUserToJoinRequests()
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
            await removeUserFromJoinRequests()
            setHasRequested(false);
        } catch (error) {
            console.error('Failed to cancel request:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const addUserToJoinRequests = async () => {
        try {
          const projectData = await client.graphql({
              query: getProject,
              variables: { id: project.id }
          }) as GraphQLResult<any>;
          const currentJoinRequestIDs = projectData?.data?.getProject?.joinRequestIDs || [];
      
          if (currentJoinRequestIDs?.includes(authUserID)) {
            console.log("User is already in the joinRequestIDs array.");
            return;
          }
      
          const updatedJoinRequestIDs = [...currentJoinRequestIDs, authUserID];
      
          const updatedProject = await client.graphql({
              query: updateProject,
              variables: {
                  input: {
                      id: project.id,
                      joinRequestIDs: updatedJoinRequestIDs,
                  },
              }
          }) as GraphQLResult<any>;
          console.log("Updated Project:", updatedProject?.data?.updateProject);
        } catch (error) {
          console.error("Error adding user to joinRequestIDs:", error);
        }
    };

    const removeUserFromJoinRequests = async () => {
        try {
        const projectData = await client.graphql({
            query: getProject,
            variables: { id: project.id }
        }) as GraphQLResult<any>;
        const currentJoinRequestIDs = projectData?.data?.getProject?.joinRequestIDs || [];
    
        if (!currentJoinRequestIDs.includes(authUserID)) {
            console.log("User is not in the joinRequestIDs array.");
            return;
        }
    
        const updatedJoinRequestIDs = currentJoinRequestIDs.filter((id: any) => id !== authUserID);
    
        const updatedProject = await client.graphql({
            query: updateProject,
            variables: {
                input: {
                    id: project.id,
                    joinRequestIDs: updatedJoinRequestIDs,
                },
            }
        }) as GraphQLResult<any>;
        console.log("Updated Project (after removal):", updatedProject?.data?.updateProject);
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
                        {/* <TouchableOpacity 
                            style={styles.headerButtonRight}
                            onPress={() => {
                                console.log('pressed share')
                            }}
                            >
                            <Icon name="share-outline" style={styles.icon}/>
                        </TouchableOpacity> */}
                        {/* Heart button */}
                        {/* Heart button with white circle background */}
                        {/* <View style={styles.heartButtonContainer}>
                            <HeartButton projectID={project.id} />
                        </View> */}
                        <View style={styles.heartButtonWrapper}>
                            <View style={styles.circleBackground} />
                            <View style={styles.onlyHeartButtonContainer}>
                                <HeartButton projectID={project?.id} />
                            </View>
                        </View>
                        {/* <TouchableOpacity 
                            style={styles.headerButtonRight}
                            onPress={() => {
                                console.log('pressed heart')
                            }}
                            >
                            <Icon name="heart-outline" style={styles.icon}/>

                        </TouchableOpacity> */}
                    </View>
                </SafeAreaView>
            </View>
            <View style={styles.contentContainer}>
                <ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16}>
                    <Image style={styles.projectImage} source={{uri: project?.image}}>
                        
                    </Image>
                    {/* Details */}
                    <View style={styles.detailsContainer}>
                        {/* Title */}
                        <Text style = {styles.title} >{project?.title}</Text>
                        <View style = {styles.spacerVertical}/>
                        {/* Location */}
                        <View style={styles.locationRow}>
                            <Icon name="location-outline" style={styles.locationIcon} />
                            <Text style={styles.locationText}>
                                {project?.city || 'City not specified'}
                            </Text>
                        </View>
                        <View style={styles.divider} />
                        {/* Description */}
                        <Text style = {styles.description}>{project?.description}</Text>
                        <View style={styles.divider} />
                        {/* Author details */}
                        <View style={styles.authorSection}>
                            <Image style={styles.authorImage} source={{uri: user?.image}}/>
                            <View style={styles.authorDetailsContainer}>
                                <Text style={styles.authorName}>Authored by {user?.name}</Text>
                                <Text style={styles.dateAuthored}>{formatDateLong(project?.createdAt)} </Text>
                            </View>
                        </View>
                        
                        <View style={styles.divider} /> 
                        {/* Skills */}
                        <View style={styles.skillsAndResourcesTopPadding}></View>
                        <View style={styles.skillsAndResourcesTitleContainer}>
                            <Emoji name="rocket" style={styles.emoji} />
                            <Text style={styles.subtitle}> Skills needed</Text>
                        </View>
                        <View style={styles.skillsAndResourcesChipsContainer}>
                            {project?.skills?.map((skill: any, index: any) => (
                                <Chip key={index} style={styles.chip} textStyle={styles.chipText}>{skill}</Chip>
                            ))}
                        </View>
                        {/* Resources */}
                        <View style={styles.skillsAndResourcesTitleContainer}>
                            <Emoji name="briefcase" style={styles.emoji} />
                            <Text style={styles.subtitle}> Resources needed</Text>
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
                                        <Text style={styles.dateAuthored}>Joined {formatDateLong(joinedDates?.[index])} </Text>
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
                        pathname: '/manageProject/manageProject1',
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
        paddingTop: 20, 
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
        fontSize: 18,
        fontWeight: 'bold', 
        paddingHorizontal: 10,
    }, 
    subtitle: {
        fontWeight: '700', 
        fontSize: 18, 
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
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10, // Optional spacing adjustment
    },
    locationIcon: {
        fontSize: 18,
        marginRight: 5, // Space between the icon and text
        fontWeight: '700'
    },
    locationText: {
        fontSize: 15,
        fontWeight: '500',
    },
    spacerVertical: {
        paddingVertical: 5, 
    }, 
    heartButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15, // Consistent spacing with other buttons
    marginBottom: 10,
  },
  circleBackground: {
    backgroundColor: 'white',
    width: 30, // Circle size
    height: 30,
    borderRadius: 15, // Circular shape
    position: 'absolute', // Allows layering
  },
  onlyHeartButtonContainer: {
    paddingTop: 3, 
  }

})