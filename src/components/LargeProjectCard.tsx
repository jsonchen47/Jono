import {
    View,
    Text,
    Image,
    Pressable,
    ImageBackground,
    StyleSheet,
    Dimensions,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { useRouter } from 'expo-router';
  import { GraphQLResult } from '@aws-amplify/api-graphql';
  import { API, graphqlOperation } from 'aws-amplify';
  import { getUser } from '../graphql/queries';
  import HeartButton from './HeartButton';
  
  const windowWidth = Dimensions.get('window').width;
  
  const LargeProjectCard = ({ project }: any) => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
  
    const fetchUser = async (ownerID: any) => {
      try {
        const result = await API.graphql(
          graphqlOperation(getUser, { id: ownerID })
        );
        const castedResult = result as GraphQLResult<any>;
        setUser(castedResult.data?.getUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    useEffect(() => {
      if (project?.ownerIDs?.[0]) {
        fetchUser(project.ownerIDs[0]);
      }
    }, [project?.ownerIDs]);
  
    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/project/[id]',
            params: { id: project.id },
          })
        }
        style={styles.cardContainer}
      >
        <View style={styles.cardContent}>
            <ImageBackground
            style={styles.imageBackground}
            imageStyle={styles.image}
            source={{ uri: project.image }}
            >
            <View style={styles.heartButtonContainer}>
                <HeartButton projectID={project.id} user={user} />
            </View>
            </ImageBackground>
    
            <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={3}>
                {project.title}
            </Text>
    
            <View style={styles.authorContainer}>
                <Image source={{ uri: user?.image }} style={styles.authorImage} />
                <View>
                <Text style={styles.authorName}>{user?.name}</Text>
                <Text style={styles.location}>{project.city}</Text>
                </View>
            </View>
    
            <Text style={styles.description} numberOfLines={3}>
                {project.description}
            </Text>
            </View>
        </View>
      </Pressable>
    );
  };
  
  export default LargeProjectCard;
  
  const styles = StyleSheet.create({
    cardContainer: {
      width: '87%',
      marginBottom: 10,
    //   backgroundColor: 'white',
    //   borderRadius: 10,
    //   overflow: 'hidden',
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 4,
    //   elevation: 3,
      alignSelf: 'center'
    },
    cardContent: {
        width: '100%'
    },
    imageBackground: {
      width: '100%',
      aspectRatio: 1.5,
      
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    heartButtonContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    detailsContainer: {
      paddingVertical: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#000',
    },
    authorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    authorImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    authorName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    location: {
      fontSize: 14,
      color: '#888',
    },
    description: {
      fontSize: 14,
      color: '#555',
    },
  });
  