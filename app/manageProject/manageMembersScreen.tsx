import { Keyboard, Platform, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, memo, useContext } from 'react';
import { List, Button } from 'react-native-paper';
import { formatDateShort } from '@/src/functions/formatDateShort';
import { FormContext } from './_layout';
import { fetchUsers } from '@/src/functions/fetchUsers';

const manageMembersScreen = () => {
    const [members, setMembers] = useState<any>([]);
    const [joinDates, setJoinDates] = useState<any>([]);
    const [requestMembers, setRequestMembers] = useState<any>([]);
    const [requestDates, setRequestDates] = useState<any>([]);
    const [admins, setAdmins] = useState<any>([]);
    const [adminJoinDates, setAdminJoinDates] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const { formData, setFormData } = useContext(FormContext);

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
    }, []); // Run effect when the project changes

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
    <View>
      <Text>manageProject2</Text>
    </View>
  )
}

export default manageMembersScreen


const styles = StyleSheet.create({
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


