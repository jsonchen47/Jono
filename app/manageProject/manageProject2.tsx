import { Keyboard, Platform, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, memo, useContext } from 'react';
import { List, Button } from 'react-native-paper';
import { formatDateShort } from '@/src/functions/formatDateShort';
import { FormContext } from './_layout';
import { fetchUsers } from '@/src/functions/fetchUsers';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Import vector icons
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';

const manageProject2 = () => {
    const [members, setMembers] = useState<any>([]);
    const [joinDates, setJoinDates] = useState<any>([]);
    const [requestMembers, setRequestMembers] = useState<any>([]);
    const [requestDates, setRequestDates] = useState<any>([]);
    const [admins, setAdmins] = useState<any>([]);
    const [adminJoinDates, setAdminJoinDates] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const { formData, setFormData } = useContext(FormContext);
    const navigation = useNavigation();
    const router = useRouter(); 

    useEffect(() => {
        // Set the header
        navigation.setOptions({ 
          title: 'Manage Members', 
          headerLeft: () => 
          <TouchableOpacity
          onPress={() => 
            router.back()
          } 
          >
            <FontAwesome6 name="chevron-left" style={styles.exitButton} />
          </TouchableOpacity>
        });
    }, [])

    // Get all the members of each project 
    useEffect(() => {
        // Function for getting the project members
        const loadMembers = async () => {
          setLoading(true); // Set loading to true while fetching users
          const userIds = formData?.users?.items.map((item: any) => item.userId) || []; // Extract user IDs
          const joinedDates = formData?.users?.items.map((item: any) => item.createdAt) || []; 
          if (userIds.length > 0) {
            const usersList = await fetchUsers(userIds); // Fetch users
            setMembers(usersList); // Update state with fetched users
            setJoinDates(joinedDates);
          }
          setLoading(false); // Set loading to false after fetching
        };    

        // Function for getting the request members
        const loadRequestMembers = async () => {
            if (formData?.joinRequestIDs?.length > 0) {
                const usersList = await fetchUsers(formData?.joinRequestIDs); // Fetch users
                setRequestMembers(usersList); // Update state with fetched users
                const joinedDates = usersList?.map((item: any) => item.createdAt) || []; 
                setRequestDates(joinedDates);
              }
        }

        // Function for getting the admins
        const loadAdmins = async () => {
            if (formData?.ownerIDs?.length > 0) {
                const usersList = await fetchUsers(formData?.ownerIDs); // Fetch users
                setAdmins(usersList); // Update state with fetched users
                const joinedDates = usersList?.map((item: any) => item.createdAt) || []; 
                setAdminJoinDates(joinedDates);
              }
        }
        
        loadMembers(); // Call the function to load users
        loadRequestMembers(); 
        loadAdmins(); 
    }, [formData]); // Run effect when the project changes

    // Tab with details about project 
    function MembersTab() {
        const handleRemoveMember = (memberId: any) => {
            setFormData((prevFormData: any) => {
                // Remove the member from the users.items list
                const updatedUsers = prevFormData?.users?.items.filter((item: any) => item.userId !== memberId);
        
                // Remove the member from the ownerIDs list (if they're an owner)
                const updatedOwnerIDs = prevFormData?.ownerIDs?.filter((ownerId: any) => ownerId !== memberId);
        
                // Add the member's ID to the removeUserIDs list
                const updatedRemoveUserIDs = [...(prevFormData?.removeUserIDs || []), memberId];
        
                return {
                    ...prevFormData,
                    users: {
                        ...prevFormData.users,
                        items: updatedUsers, // Updated users list without the member
                    },
                    ownerIDs: updatedOwnerIDs, // Updated ownerIDs list without the member (if applicable)
                    removeUserIDs: updatedRemoveUserIDs, // Add memberId to the removeUserIDs list
                };
            });

            // Directly update the members state to remove the member
            setMembers((prevMembers: any) => prevMembers.filter((member: any) => member.userId !== memberId));
        };
        

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
                        right={(props) => {
                            // Check if the current member is an admin by matching the user ID with the ownerIDs list
                            const isAdmin = formData?.ownerIDs?.includes(member.id);
                        
                            return isAdmin ? null : (
                                members.length > 1 ? (
                                    <Button
                                        {...props}
                                        mode="text"
                                        onPress={() => handleRemoveMember(member.id)}
                                        contentStyle={styles.removeButtonContent}
                                        labelStyle={styles.removeButtonText}
                                        style={styles.removeButtonStyle}
                                    >
                                        Remove
                                    </Button>
                                ) : (
                                    <View style={{width: 150, justifyContent: 'center'}}>
                                        <Text style={{ color: 'gray', textAlign: 'center', marginRight: 10 }}>
                                            Cannot remove sole member of project
                                        </Text>
                                    </View>
                                )
                            );
                        }}
                        
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
        // Function for promoting members
        const handlePromoteMember = (memberId: any) => {
            // Check if the member is already an admin (owner)
            if (formData?.ownerIDs?.includes(memberId)) {
                return; // If the member is already an admin, do nothing
            }
        
            // Add member to the ownerIDs in formData (if not already present)
            setFormData((prevFormData: any) => {
                // Add the member's ID to the ownerIDs array if not already there
                const updatedOwnerIDs = prevFormData?.ownerIDs?.includes(memberId)
                    ? prevFormData?.ownerIDs
                    : [...(prevFormData?.ownerIDs || []), memberId];
        
                // Add the member to the admins array and set join date (if not already there)
                const updatedAdmins = admins.some((admin: any) => admin.id === memberId)
                    ? admins
                    : [...admins, members.find((member: any) => member.id === memberId)];
        
                const updatedAdminJoinDates = adminJoinDates.some((date: any, index: any) => members[index].id === memberId)
                    ? adminJoinDates
                    : [
                          ...adminJoinDates,
                          joinDates[members.findIndex((member: any) => member.id === memberId)],
                      ];
        
                return {
                    ...prevFormData,
                    ownerIDs: updatedOwnerIDs, // Updated ownerIDs list without duplicates
                };
            });
        
            // Add the promoted member to the admins state if not already present
            setAdmins((prevAdmins: any) => {
                return prevAdmins.some((admin: any) => admin.id === memberId)
                    ? prevAdmins
                    : [...prevAdmins, members.find((member: any) => member.id === memberId)];
            });
        
            // Add the join date for the promoted member to adminJoinDates state (if not already present)
            setAdminJoinDates((prevAdminJoinDates: any) => {
                return prevAdminJoinDates.some((date: any, index: any) => members[index].id === memberId)
                    ? prevAdminJoinDates
                    : [
                          ...prevAdminJoinDates,
                          joinDates[admins.findIndex((member: any) => member.id === memberId)],
                      ];
            });
        };

        // Function for demoting members
        const handleDemoteMember = (memberId: any) => {
            // Check if the member is already not an admin, if so do nothing
            if (!formData?.ownerIDs?.includes(memberId)) {
                return; // Member is not an admin, so no need to demote
            }
        
            // Update formData to remove the member from ownerIDs
            setFormData((prevFormData: any) => {
                // Remove the member's ID from the ownerIDs array
                const updatedOwnerIDs = prevFormData?.ownerIDs?.filter((id: any) => id !== memberId);
        
                return {
                    ...prevFormData,
                    ownerIDs: updatedOwnerIDs, // Updated ownerIDs list after removal
                };
            });
        
            // Remove the member from the admins list and adminJoinDates list
            setAdmins((prevAdmins: any) => prevAdmins.filter((admin: any) => admin.id !== memberId));
            setAdminJoinDates((prevAdminJoinDates: any) => prevAdminJoinDates.filter((date: any, index: any) => members[index].id !== memberId));
        };
        
        
        return (
            <View>
                <View style={{ marginVertical: 5 }} />
                {admins && admins.length > 0 ? (
                    admins.map((admin: any, index: any) => (
                        <List.Item
                            key={index}
                            title={admin.name}
                            description={`Joined ${formatDateShort(adminJoinDates?.[index])}`}
                            left={(props) => (
                                <Image
                                    {...props}
                                    source={{ uri: admin.image }}
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
                                        onPress={() => handleDemoteMember(admin.id)}
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
                <View style={styles.spacerVerticalSmall}/>
                <View style={styles.divider}/>
                <View style={styles.spacerVerticalSmall}/>
                <View style={styles.spacerVerticalSmall}/>
                <Text style={styles.header}>Select members to promote </Text>
                <View style={styles.spacerVerticalSmall}/>

                {/* List of members to promote */}
                {members
                    ?.filter((member: any) => !formData?.ownerIDs?.includes(member.id)) // Filter out members who are owners
                    .map((member: any, index: any) => (
                        <List.Item
                            key={index}
                            title={member.name}
                            description={`Joined ${formatDateShort(joinDates?.[index])}`}
                            left={props => (
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
                                <Button
                                    {...props}
                                    mode="text"
                                    onPress={() => handlePromoteMember(member.id)}
                                    contentStyle={styles.approveButtonContent}
                                    labelStyle={styles.approveButtonText}
                                    style={styles.removeButtonStyle}
                                >
                                    Promote
                                </Button>
                            )}
                        />
                    ))
                }

            </View>
        );
    }

  return (
     <Tabs.Container 
        renderTabBar={props => (
            <MaterialTabBar
                {...props}
                scrollEnabled={true}
                indicatorStyle={{ backgroundColor: 'black', height: 2 }}
            />
        )}
        >
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

export default manageProject2


const styles = StyleSheet.create({
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
    approveButtonText: {
        color: 'black', 
        fontWeight: 'bold', // Bold for emphasis
    },
    approveButtonContent: {
        backgroundColor: '#4CDFFF', 
        paddingHorizontal: 10,     // Horizontal padding for better spacing
    }, 
    exitButton: {
        fontSize: 18, 
    },
    header: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginLeft: 20, 
    }, 
    divider: {
        height: 1, 
        backgroundColor: 'lightgray'
    }
})


