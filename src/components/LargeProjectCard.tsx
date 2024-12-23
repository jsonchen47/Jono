import { View, Text, Image, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from "aws-amplify";
import { getUser, getProject } from '../graphql/queries' // Make sure getProject query is imported
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useProjectUpdateContext } from '../contexts/ProjectUpdateContext';
import HeartButton from './HeartButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LargeProjectCard = ({project}: any) => {
    const { updatedProjectID, updated } = useProjectUpdateContext();
    const router = useRouter(); 
    const [user, setUser] = useState<any>(null);
    const [currentProject, setCurrentProject] = useState(project);  // Local state to hold the current project data

    // Fetch the owner information for the project
    const fetchUser = async (ownerID: any) => {
        const result = await API.graphql(
          graphqlOperation(getUser, { id: ownerID })
        );
        const castedResult = result as GraphQLResult<any>
        setUser(castedResult.data?.getUser);
    };

    // Fetch the updated project data if the project ID matches the updatedProjectID
    const fetchProject = async (projectID: string) => {
        try {
            const result = await API.graphql(
                graphqlOperation(getProject, { id: projectID })
            );
            const castedResult = result as GraphQLResult<any>;
            setCurrentProject(castedResult.data?.getProject);  // Update the current project with the fetched data
        } catch (error) {
            console.error('Error fetching updated project:', error);
        }
    };

    useEffect(() => {
        // Fetch the user only when project ownerID changes
        if (currentProject?.ownerIDs?.[0]) {
            fetchUser(currentProject.ownerIDs[0]);
        }
    }, [currentProject?.ownerIDs]);

    // Run when updatedProjectID changes, refetch project if necessary
    useEffect(() => {
      if (updated && updatedProjectID === currentProject.id) {
        console.log(`Project ${currentProject.id} was recently updated.`);
        fetchProject(updatedProjectID);
      }
    }, [updated, updatedProjectID, currentProject.id]);

    return (
        <Pressable
            onPress={() =>
                router.push({
                    pathname: '/project/[id]',
                    params: { id: currentProject.id, projectID: currentProject.id },
                })
            }
            style={styles.largeProjectContainer}
        >
            <ImageBackground 
                style={styles.largeProjectImageBackground} 
                imageStyle={styles.largeProjectImage}
                source={{uri: currentProject.image}}
                resizeMode="cover"
            >
                
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} // Darker at the top, lighter at the bottom
                    start={{ x: 0.5, y: 0 }} 
                    end={{ x: 0.5, y: 0.5 }} 
                    style={styles.largeProjectGradient}
                    
                >
                     
                    <View style={styles.largeProjectTextContainer}>
                        
                        <View style={styles.authorTextContainer}>
                            <Text style={styles.largeProjectAuthor} numberOfLines={1}>{user?.name ?? ""}</Text>
                            <HeartButton projectID={project.id} user={user}/>
                        </View>
                        
                        <Text style={styles.largeProjectTitle} numberOfLines={3}>{currentProject.title}</Text>
                        
                        {currentProject.city ? (
                            <View style={styles.detailOverlay}>
                                <Ionicons name='location-outline' style={styles.detailIcon} />
                                <Text style={styles.detailText}>
                                    {currentProject.city}
                                </Text>
                            </View>
                        ) : null}  
                        
                        {currentProject.description ? (
                            <View style={styles.detailOverlay}>
                                <FontAwesome6 name='quote-left' style={styles.quoteIconStart} />
                                <Text style={styles.detailText} numberOfLines={4}>
                                    {currentProject.description}
                                </Text>
                                <FontAwesome6 name='quote-right' style={styles.quoteIconEnd} />
                            </View>
                        ) : null} 
                    </View>
                </LinearGradient>
            </ImageBackground>
        </Pressable>
    );
};

export default LargeProjectCard;

const styles = StyleSheet.create({
    // Styles remain unchanged
    largeProjectContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeProjectImageBackground: {
        width: '87%',
        height: '100%',
    },
    largeProjectImage: {
        width: '100%',
        height: '100%', 
        borderRadius: 15,
        padding: 20
    }, 
    largeProjectTextContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 25, 
        width: '100%',
        height: '100%',
    },
    authorTextContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor: 'red'
    }, 
    largeProjectAuthor: {
        color: 'white',
        fontSize: 14,
        textTransform: 'uppercase',
    }, 
    largeProjectTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22,
        flexShrink: 1,
        paddingTop: 10,
    }, 
    largeProjectGradient: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        width: '100%', 
        height: '100%',
        borderRadius: 15, 
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        alignItems: 'flex-end',
        padding: 25,
    },
    iconOutline: {
        color: 'white',
        position: 'absolute',
        padding: 12,
    },
    iconFill: {
        color: 'black',
        position: 'absolute', 
        padding: 12,
        opacity: 0.7 
    },
    iconSmallContainer: {
        padding: 32,
    },
    iconLargeContainer: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    }, 
    detailOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        marginTop: 20, 
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    detailText: { 
        color: 'white',
        fontSize: 14,
    }, 
    detailIcon: {
        color: 'white',
        fontSize: 14,
        paddingRight: 5, 
    }, 
    quoteIconStart: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 17,
        paddingRight: 5, 
    },
    quoteIconEnd: {
        alignSelf: 'flex-end',
        color: 'white',
        fontSize: 17,
        paddingLeft: 5, 
    },
});
