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
    const [approvedMembers, setApprovedMembers] = useState<any>([]); // Track approved members
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
            const userIds = formData?.users?.items.map((item: any) => item.userId) || []; // Extract user IDs
            const joinedDates = formData?.users?.items.map((item: any) => item.createdAt) || [];
    
            if (userIds.length > 0) {
                const usersList = await fetchUsers(userIds); // Fetch users
                setMembers(usersList); // Update members state
                setJoinDates(joinedDates); // Update join dates state
                return { usersList, joinedDates }; // Return fetched data
            }
            return { usersList: [], joinedDates: [] }; // Return empty arrays if no user IDs
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
        // Function for getting the admins based on existing members and ownerIDs
        const loadAdmins = (usersList: any[], joinedDates: any[]) => {
            if (!usersList || usersList.length === 0) {
                console.error("No members loaded to derive admins.");
                setAdmins([]);
                setAdminJoinDates([]);
                return;
            }
    
            if (formData?.ownerIDs?.length > 0) {
                // Filter members to get the admins based on ownerIDs
                const filteredAdmins = usersList.filter((member: any) =>
                    formData.ownerIDs.includes(member.id)
                );
    
                // Collect the join dates for the admins
                const adminDates = filteredAdmins.map((admin: any) => {
                    const memberIndex = usersList.findIndex((member: any) => member.id === admin.id);
                    return joinedDates[memberIndex]; // Map to the corresponding joinDate
                });
    
                // Set admins and their join dates
                setAdmins(filteredAdmins);
                setAdminJoinDates(adminDates);
            } else {
                // If no ownerIDs, clear admins and adminJoinDates
                setAdmins([]);
                setAdminJoinDates([]);
            }
        };
        
        const fetchData = async () => {
            setLoading(true); // Start loading state for all fetches
    
            // Step 1: Load members and get their data
            const { usersList, joinedDates } = await loadMembers();
    
            // Step 2: Load admins using the data returned from loadMembers
            loadAdmins(usersList, joinedDates);
    
            // Step 3: Load request members (optional, can run concurrently if not dependent)
            loadRequestMembers();
    
            setLoading(false); // End loading state
        };
    
        fetchData(); // Call the asynchronous fetchData function
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
                        
                            return isAdmin ? (
                                <View style={{ justifyContent: 'center'}}>
                                    <Text style={{fontWeight: '500'}}>Project Admin</Text>
                                </View>
                            ) : (
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
        const handleApprove = (requestId: any) => {
            setFormData((prevFormData: any) => {
                const isAlreadyApproved = prevFormData?.addUserIDs?.includes(requestId);
    
                return {
                    ...prevFormData,
                    addUserIDs: isAlreadyApproved
                        ? prevFormData.addUserIDs.filter((id: any) => id !== requestId) // Remove the requestId if already approved
                        : [...(prevFormData?.addUserIDs || []), requestId], // Add the requestId if not already approved
                };
            });
    
            setApprovedMembers((prevApprovedMembers: any) => {
                const isAlreadyApproved = prevApprovedMembers.includes(requestId);
    
                return isAlreadyApproved
                    ? prevApprovedMembers.filter((id: any) => id !== requestId) // Remove from approved list
                    : [...prevApprovedMembers, requestId]; // Add to approved list
            });
        };
    
        return (
            <View>
                <View style={{ marginVertical: 5 }} />
                {requestMembers && requestMembers.length > 0 ? (
                    requestMembers.map((requestMember: any, index: any) => {
                        const isApproved = approvedMembers.includes(requestMember.id);
                        return (
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
                                        onPress={() => handleApprove(requestMember.id)}
                                        contentStyle={styles.approveButtonContent}
                                        labelStyle={styles.approveButtonText}
                                        style={[
                                            styles.removeButtonStyle,
                                            {
                                                backgroundColor: isApproved ? '#E7E7E7' : '#4CDFFF', // Change background color on approval
                                            },
                                        ]}
                                    >
                                        {isApproved ? 'Approved' : 'Approve'} {/* Change text based on approval status */}
                                    </Button>
                                )}
                            />
                        );
                    })
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
            console.log(joinDates)
            console.log(adminJoinDates)
            // Check if the member is already an admin (owner)
            if (formData?.ownerIDs?.includes(memberId)) {
                return; // If the member is already an admin, do nothing
            }
        
            // Find the index of the member being promoted
            const memberIndex = members.findIndex((member: any) => member.id === memberId);
            if (memberIndex === -1) {
                console.error("Member not found");
                return;
            }
        
            // Get the join date of the member being promoted
            const joinDate = joinDates[memberIndex];
        
            // Promote the member and move the join date to adminJoinDates
            setAdmins((prevAdmins: any) => {
                const isAlreadyAdmin = prevAdmins.some((admin: any) => admin.id === memberId);
                if (isAlreadyAdmin) return prevAdmins;
        
                const newAdmin = members[memberIndex];
                setAdminJoinDates((prevAdminJoinDates: any) => [...prevAdminJoinDates, joinDate]);
        
                return [...prevAdmins, newAdmin];
            });
        
            // Update joinDates to remove the promoted member's join date
            setJoinDates((prevJoinDates: any) => {
                const updatedJoinDates = [...prevJoinDates];
                updatedJoinDates.splice(memberIndex, 1);
                return updatedJoinDates;
            });
        
            // Update ownerIDs to include the promoted member
            setFormData((prevFormData: any) => ({
                ...prevFormData,
                ownerIDs: [...(prevFormData?.ownerIDs || []), memberId],
            }));
        };
        
        const handleDemoteMember = (memberId: any) => {
            // Check if the member is not an admin
            if (!formData?.ownerIDs?.includes(memberId)) {
                return; // Member is not an admin, so no need to demote
            }
        
            // Find the index of the admin being demoted
            const adminIndex = admins.findIndex((admin: any) => admin.id === memberId);
            if (adminIndex === -1) {
                console.error("Admin not found");
                return;
            }
        
            // Get the join date of the admin being demoted
            const joinDate = adminJoinDates[adminIndex];
        
            // Demote the member and move the join date back to joinDates
            setAdmins((prevAdmins: any) => {
                const updatedAdmins = [...prevAdmins];
                updatedAdmins.splice(adminIndex, 1);
                return updatedAdmins;
            });
        
            setAdminJoinDates((prevAdminJoinDates: any) => {
                const updatedAdminJoinDates = [...prevAdminJoinDates];
                updatedAdminJoinDates.splice(adminIndex, 1);
                return updatedAdminJoinDates;
            });
        
            setJoinDates((prevJoinDates: any) => [...prevJoinDates, joinDate]);
        
            // Update ownerIDs to remove the demoted member
            setFormData((prevFormData: any) => ({
                ...prevFormData,
                ownerIDs: prevFormData?.ownerIDs?.filter((id: any) => id !== memberId),
            }));
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
                {members?.filter((member: any) => !formData?.ownerIDs?.includes(member.id)).length > 0 && (
                    <>
                        <Text style={styles.header}>Select members to promote</Text>
                        <View style={styles.spacerVerticalSmall} />
                    </>
                )}

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
        // backgroundColor: '#4CDFFF', 
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


