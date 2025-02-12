import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
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
import { createJoinRequest } from '../graphql/mutations';
import { deleteJoinRequest, deleteUserProject } from '../graphql/mutations';
import { listJoinRequests } from '../graphql/queries';
import { listUserProjects } from '../graphql/queries';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { ChatNavigatorParamList } from '../navigation/ChatNavigatorParamList';
// import { useSendbirdChat } from '@sendbird/uikit-react-native';
import { Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import { StreamChat } from 'stream-chat';
import { chatClient } from '../backend/streamChat';
import * as Location from 'expo-location';

// type NavigationProps = NativeStackNavigationProp<ChatNavigatorParamList, 'GroupChannel'>;
const client = generateClient();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProjectScreen = ({ project }: any) => {
    // const { sdk } = useSendbirdChat();
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
    const navigation = useNavigation();
    const [isValidChat, setIsValidChat] = useState(false);

    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 3958.8; // Radius of the Earth in miles
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // const handleRequestToJoin = async () => {
    //     try {
    //       setIsProcessing(true);
    
    //       // Check the user's premium status
    //       const customerInfo = await Purchases.getCustomerInfo();
    //       const isPremium = !!customerInfo.entitlements.active['premium'];
    
    //       if (isPremium) {
    //         // Handle the request to join logic here
    //         console.log('User is premium, sending join request...');
    //         // Your actual request to join logic
    //         // Alert.alert('Request Sent', 'Your request to join has been sent!');
    //         handleRequest()
    //       } else {
    //         console.log('User is not premium, showing paywall...');
    //         // Show the paywall
    //         const offerings = await Purchases.getOfferings();
    
    //         if (offerings.current) {
    //           const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
    //             offering: offerings.current,
    //             requiredEntitlementIdentifier: 'premium',
    //           });
    
    //           if (paywallResult === RevenueCatUI.PAYWALL_RESULT.PURCHASED) {
    //             console.log('User purchased premium, unlocking features...');
    //             Alert.alert('Success', 'You are now a premium member! Please try again.');
    //           } else {
    //             console.log('Paywall dismissed without purchase');
    //           }
    //         } else {
    //           console.error('No offerings configured in RevenueCat.');
    //           Alert.alert('Error', 'No available offerings found.');
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Error handling request or paywall:', error);
    //       Alert.alert('Error', 'An error occurred while processing your request.');
    //     } finally {
    //       setIsProcessing(false);
    //     }
    //   };

    const handlePress = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const distance = haversineDistance(
            location.coords.latitude,
            location.coords.longitude,
            project.latitude,
            project.longitude
          );
    
          const currentUser = await getCurrentUser();
          // const isInProject = project.users?.some((user: any) => user.id === currentUser.userId);
          const userItems = project.Users?.items || [];
          const isInProject = userItems.some((item: any) => item.user?.id === currentUser.userId);
    
          const customerInfo = await Purchases.getCustomerInfo();
          const isPremium = !!customerInfo.entitlements.active['premium'];
    
          console.log('project:', project);
          console.log('projectusers:', project.users);
          console.log('isInProject:', isInProject);
    
          if (isInProject || distance <= 10000 || isPremium) {
            router.push({ pathname: '/project/[id]', params: { id: project.id, projectID: project.id } });
          } else {
            const offerings = await Purchases.getOfferings();
            if (offerings.current) {
              const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
                offering: offerings.current,
                requiredEntitlementIdentifier: 'premium',
              });
    
              if (paywallResult === RevenueCatUI.PAYWALL_RESULT.PURCHASED) {
                router.push({ pathname: '/project/[id]', params: { id: project.id, projectID: project.id } });
              } else {
                console.log('Paywall dismissed without purchase');
              }
            } else {
              console.error('No offerings configured in RevenueCat.');
              Alert.alert('No available offerings found.');
            }
          }
        } catch (error) {
          console.error('Error handling project card press:', error);
        }
      };

    const handleRequestToJoin = async () => {
      try {
        console.log('User is sending join request...');
          // Your actual request to join logic
          // Alert.alert('Request Sent', 'Your request to join has been sent!');
        handleRequest()
      } catch (error) {
        Alert.alert('Error', 'An error occurred while processing your request.');
      } finally {
        setIsProcessing(false);
      }
    };
    
    // const createGroupChat = async () => {
    //     try {
    //       // Create a new group channel
    //       const newChannel = await sdk.groupChannel.createChannel({
    //         invitedUserIds: project.Users.items.map((user: any) => user.userId),
    //         name: project.title, // Use project title as the chat name
    //         isDistinct: false,
    //         coverUrl: project.image, // Use the project's image as the group chat's cover image
    //       });
      
    //       // Update the project's groupChatID
    //       const updatedProject = await client.graphql({
    //         query: updateProject,
    //         variables: {
    //           input: {
    //             id: project.id,
    //             groupChatID: newChannel.url, // Set the new group chat ID
    //           },
    //         },
    //       });
      
    //       console.log('Project updated with new group chat ID:', updatedProject);
      
    //       // Navigate to the newly created group chat
    //       router.push(`/groupChat?channelUrl=${newChannel.url}`);
    //     } catch (error) {
    //       console.error('Error creating group chat:', error);
    //       Alert.alert('Error', 'Failed to create a group chat. Please try again later.');
    //     }
    // };

    const createGroupChat = async () => {
      try {
        // Generate a unique group chat ID
        const groupChatID = uuidv4();
    
        console.log('Creating group chat...');
    
        // Extract user IDs from the project
        const invitedUserIds = project.Users.items.map((user: any) => user.userId);
    
        // Create the channel in Stream Chat
        const channel = chatClient.channel('messaging', groupChatID, {
          name: project.title, // Use project title as the chat name
          image: project.image || '', // Use the project's image as the group chat cover image
          members: invitedUserIds, // Add the creator + members
        });
    
        console.log('Channel instance created');
    
        // Create the channel in Stream
        await channel.create();
        console.log('Group chat created successfully');
    
        // Update the project with the new group chat ID
        const updatedProject = await client.graphql({
          query: updateProject,
          variables: {
            input: {
              id: project.id,
              groupChatID: channel.id, // Store the new group chat ID
            },
          },
        });
    
        console.log('Project updated with new group chat ID:', updatedProject);
    
        // Navigate to the newly created group chat
        router.push(`/groupChat?channelUrl=${channel.id}`);
      } catch (error) {
        console.error('Error creating group chat:', error);
        Alert.alert('Error', 'Failed to create a group chat. Please try again later.');
      }
    };
      
    useEffect(() => {
        const checkChatValidity = async () => {
          if (project?.groupChatID) {
            try {
              // Check if the group chat exists
              const channel = chatClient.channel('messaging', project.groupChatID);
              if (channel) {
                setIsValidChat(true); // Valid group chat ID
              } else {
                setIsValidChat(false); // Not a valid group chat
              }
            } catch {
              setIsValidChat(false); // Silently handle invalid or deleted group chats
            }
          }
        };
    
        checkChatValidity();
    }, [project?.groupChatID, chatClient]);

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
    
        if (
            Array.isArray(project?.joinRequests?.items) &&
            project?.joinRequests?.items?.some((request: any) => request.userID === authUserID)
        ) {
            setHasRequested(true);
        } else {
            setHasRequested(false);
        }
    }, [project?.ownerIDs, authUserID, project?.joinRequests]);
    
    

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
          const input = {
            userID: authUserID,
            projectID: project.id,
            createdAt: new Date().toISOString(),
            status: 'requested'
          };
      
          const result = await client.graphql({
            query: createJoinRequest,
            variables: { input },
          });
          console.log('Join request created:', result);
          setHasRequested(true);
        } catch (error) {
          console.error('Error creating join request:', error);
        }
      };

      const removeUserFromJoinRequests = async () => {
        try {
          // Fetch the JoinRequest ID for this user and project
          const result = await client.graphql({
            query: listJoinRequests,
            variables: { filter: { userID: { eq: authUserID }, projectID: { eq: project.id } } },
          });
      
          const joinRequestId = result.data?.listJoinRequests?.items?.[0]?.id;
      
          if (!joinRequestId) {
            console.log('No join request found to remove.');
            return;
          }
      
          await client.graphql({
            query: deleteJoinRequest,
            variables: { input: { id: joinRequestId } },
          });
      
          console.log('Join request removed.');
          setHasRequested(false);
        } catch (error) {
          console.error('Error removing join request:', error);
        }
      };
  
      const removeUserFromProject = async () => {
        try {
            // Step 1: Query to find the user's project relationship
            const result = await client.graphql({
                query: listUserProjects,
                variables: {
                    filter: {
                        projectId: { eq: project.id },
                        userId: { eq: authUserID },
                    },
                },
            }) as GraphQLResult<any>;
    
            const userProject = result.data?.listUserProjects?.items?.[0];
    
            if (!userProject) {
                console.log('User is not part of the project.');
                return;
            }
    
            // Step 2: Remove the user from the chat channel
            const channel = chatClient.channel('messaging', project.groupChatID);
            await channel.removeMembers([authUserID]);
    
            console.log(`User ${authUserID} removed from the chat.`);
    
            // Step 3: Delete any join requests associated with the user for the project
            const joinRequestResult = await client.graphql({
                query: listJoinRequests,
                variables: {
                    filter: {
                        userID: { eq: authUserID },
                        projectID: { eq: project.id },
                    },
                },
            }) as GraphQLResult<any>;
    
            const joinRequestId = joinRequestResult.data?.listJoinRequests?.items?.[0]?.id;
    
            if (joinRequestId) {
                await client.graphql({
                    query: deleteJoinRequest,
                    variables: { input: { id: joinRequestId } },
                });
    
                console.log(`Join request with ID ${joinRequestId} deleted.`);
            }
    
            // Step 4: Use deleteUserProject mutation to remove the user from the project
            await client.graphql({
                query: deleteUserProject,
                variables: { input: { id: userProject.id } },
            });
    
            console.log('User successfully removed from the project and associated join request deleted.');
    
            // Optional: Navigate back or refresh the UI
            // router.back();
        } catch (error) {
            console.error('Error removing user from project:', error);
        }
    };
    
      

    return (
        <View style={styles.container}>
            {/* HEADER */}
            {/* Header background that changes opacity */}
            <View style={[styles.headerBackground, { opacity: headerOpacity }]}>
                <SafeAreaView style={styles.headerBackgroundSafeAreaView} edges={['top']}>
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
                                    params: { projectId: project.id, owner: project?.ownerIDs?.includes(authUserID) },
                                })
                            }}
                            >
                            <Icon name="ellipsis-horizontal" style={styles.icon}/>
                        </TouchableOpacity>
                        {/* Chat button */}
                        {project?.Users?.items?.some((user: any) => user.userId === authUserID) && (
                        // <TouchableOpacity 
                        //     style={styles.headerButtonRight}
                        //     onPress={() => {
                        //     console.log('pressed chat');
                        //     if (project?.groupChatID) {
                        //         router.push(`/groupChat?channelUrl=${project.groupChatID}`);
                        //         console.log('group chat id', project.groupChatID);
                        //     } else {
                        //         alert('Chat channel not found for this project.');
                        //     }
                        //     }}
                        // >
                        //     <Icon name="chatbubbles" style={styles.icon}/>
                        // </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.headerButtonRight}
                          onPress={async () => {
                            try {
                              // console.log('Pressed chat');
                              // // Check user's premium status
                              // const customerInfo = await Purchases.getCustomerInfo();
                              // const isPremium = !!customerInfo.entitlements.active['premium'];

                              // if (isPremium) {
                              //   console.log('User is premium');
                              //   if (isValidChat && project?.groupChatID) {
                              //     // Navigate to the existing group chat
                              //     router.push(`/groupChat?channelUrl=${project.groupChatID}`);
                              //   } else {
                              //     // Create a new group chat if invalid
                              //     await createGroupChat();
                              //   }
                              // } else {
                              //   console.log('User is not premium, showing paywall...');
                              //   const offerings = await Purchases.getOfferings();

                              //   if (offerings.current) {
                              //     const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
                              //       offering: offerings.current,
                              //       requiredEntitlementIdentifier: 'premium',
                              //     });

                              //     if (paywallResult === RevenueCatUI.PAYWALL_RESULT.PURCHASED) {
                              //       console.log('User purchased premium, unlocking chat feature...');
                              //       Alert.alert('Success', 'You are now a premium member! Please try again.');
                              //     } else {
                              //       console.log('Paywall dismissed without purchase.');
                              //     }
                              //   } else {
                              //     console.error('No offerings configured in RevenueCat.');
                              //     Alert.alert('Error', 'No available offerings found.');
                              //   }
                              // }
                              
                              console.log('User is premium');
                              if (isValidChat && project?.groupChatID) {
                                const authUser = await getCurrentUser();
                                const userId = authUser.userId;
                        
                                // Get the channel
                                const channel = chatClient.channel('messaging', project?.groupChatID);
                        
                                const isMember = channel.state.members[userId];
                        
                                if (!isMember) {
                                  console.log(`User ${userId} is not in the group chat. Adding...`);
                        
                                  // Add the user to the channel
                                  await channel.addMembers([userId]);
                                  await channel.update({image: project?.image, name: project?.title})
                                  console.log(`User ${userId} added to the group chat.`);
                                } else {
                                  console.log(`User ${userId} is already a member of the group chat.`);
                                }
                        
                                // Navigate to the group chat
                                const channelName = project?.title
                                const channelImage = project?.image

                                await channel.update({
                                  name: channelName, 
                                  image: channelImage, 
                                });
                                router.push(`/groupChat?channelUrl=${project.groupChatID}`);
                              } else {
                                // Create a new group chat if invalid
                                await createGroupChat();
                              }
                            } catch (error) {
                              console.error('Error checking premium status or showing paywall:', error);
                              // Alert.alert('Error', 'An error occurred while processing your request.');
                            }
                          }}
                        >
                          <Icon name="chatbubbles" style={styles.icon} />
                        </TouchableOpacity>

                        

                        )}

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
                    <Image style={styles.projectImage} source={{uri: project?.image}}/>
                        
                    
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
                        {project?.description && (
                        <>
                            <Text style={styles.description}>{project.description}</Text>
                            <View style={styles.divider} />
                        </>
                        )}

                        {/* Author details */}
                        <View style={styles.authorSection}>
                            <Image style={styles.authorImage} source={{uri: user?.image}}/>
                            <View style={styles.authorDetailsContainer}>
                                <Text style={styles.authorName}>Authored by {user?.name}</Text>
                                <Text style={styles.dateAuthored}>{formatDateLong(project?.createdAt)} </Text>
                            </View>
                        </View>
                        
                        <View style={styles.divider} /> 
                        {/* Conditional rendering for Skills and Resources */}
                        {(project?.skills?.length > 0 || project?.resources?.length > 0) && (
                        <View style={styles.skillsAndResourcesTopPadding}></View>
                        )}

                        {/* Skills */}
                        {project?.skills?.length > 0 && (
                        <>
                            <View style={styles.skillsAndResourcesTitleContainer}>
                            <Emoji name="rocket" style={styles.emoji} />
                            <Text style={styles.subtitle}> Skills needed</Text>
                            </View>
                            <View style={styles.skillsAndResourcesChipsContainer}>
                            {project.skills.map((skill: any, index: any) => (
                                <Chip key={index} style={styles.chip} textStyle={styles.chipText}>
                                {skill}
                                </Chip>
                            ))}
                            </View>
                        </>
                        )}

                        {/* Resources */}
                        {project?.resources?.length > 0 && (
                        <>
                            <View style={styles.skillsAndResourcesTitleContainer}>
                            <Emoji name="briefcase" style={styles.emoji} />
                            <Text style={styles.subtitle}> Resources needed</Text>
                            </View>
                            <View style={styles.skillsAndResourcesChipsContainer}>
                            {project.resources.map((resource: any, index: any) => (
                                <Chip key={index} style={styles.chip} textStyle={styles.chipText}>
                                {resource}
                                </Chip>
                            ))}
                            </View>
                        </>
                        )}

                        {/* Divider */}
                        {(project?.skills?.length > 0 || project?.resources?.length > 0) && (
                        <View style={styles.divider} />
                        )}

                        {/* Members */}
                        <Text style={styles.membersSubtitle}>Members</Text>
                        <View style={styles.membersList}>
                            {users?.map((member: any, index: any) => (
                                <TouchableOpacity key={index} style={styles.authorSection}
                                    onPress={() =>
                                        router.push({
                                        pathname: '/otherProfile',
                                        params: { id: member.id },
                                        })
                                    }
                                >
                                    <Image style={styles.authorImage} source={{uri: member?.image}}/>
                                    <View style={styles.authorDetailsContainer}>
                                        <Text style={styles.authorName}>{member?.name}</Text>
                                        <Text style={styles.dateAuthored}>Joined {formatDateLong(joinedDates?.[index])} </Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                            }
                        </View>
                    </View>
                </ScrollView>
            
                {/* Divider */}
                <View style={styles.bottomDivider}></View>
                {/* Bottom content */}
                <SafeAreaView edges={['bottom']}>
                    <View style={styles.contentBottom}>
                        <View style={styles.membersCountTextContainer}>
                            <Text style={styles.membersCountText}>{users.length}</Text>
                            <Text style={styles.membersText}>Members</Text>
                        </View>
                        
                        {/* Conditional Button Rendering */}
  {project?.ownerIDs?.includes(authUserID) ? (
    // Owner: Manage and Edit button
    <Button 
      style={styles.joinButton} 
      labelStyle={styles.joinButtonText}
      mode="contained"  
      onPress={() => 
        router.push({
          pathname: '/manageProject/manageProject1',
          params: { projectId: project.id },
        })
      }>
      Manage and Edit
    </Button>
  ) : users.some((user: any) => user.id === authUserID) ? (
    // Member: Leave Project button
    <Button
      style={styles.leaveButton}
      labelStyle={styles.joinButtonText}
      mode="contained"
      onPress={async () => {
        try {
          await removeUserFromProject(); // Call the removal function
          router.back(); // Navigate back after leaving the project
        } catch (error) {
          console.error('Failed to leave the project:', error);
        }
      }}
    >
      Leave Project
    </Button>
  ) : hasRequested ? (
    // Not a member, but requested: Requested button
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
    // Not a member and no request: Request to Join button
    <Button
      style={styles.joinButton}
      labelStyle={styles.joinButtonText}
      mode="contained"
      onPress={handleRequestToJoin}
      disabled={isProcessing}
    >
      {isProcessing ? 'Requesting...' : 'Request to Join'}
    </Button>
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
  },
  leaveButton: {
    borderRadius: 10,
    alignSelf: 'flex-end',
    width: 200,
    backgroundColor: '#EFD6D6', // Red color for leaving the project
  },

})