import { View, Text, Image, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { getUser } from '../graphql/queries'
import Emoji from 'react-native-emoji';
import { Chip } from 'react-native-paper';

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
    const [user, setUser] = useState<any>(null);
    const [members, setMembers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<any>([]);
    const [joinedDates, setJoinedDates] = useState<any>([]);

    const fetchUser = async (ownerID: any) => {
        const result = await API.graphql(
          graphqlOperation(getUser, { id: ownerID })
        );
        const castedResult = result as GraphQLResult<any>
        setUser(castedResult.data?.getUser);
    };

    useEffect(() => {
      if (project?.ownerIDs?.[0]) {
        fetchUser(project?.ownerIDs[0]);
      }
      console.log(project?.Users?.items)
    }, [project?.ownerIDs]);

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

    return (
        <ScrollView>
            <Image style={styles.projectImage} source={{uri: project?.image}}/>
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
    )
}

export default ProjectScreen

const styles = StyleSheet.create({
    // Project details
    detailsContainer: {
        padding: 15, 
    },
    projectImage: {
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
    }
})