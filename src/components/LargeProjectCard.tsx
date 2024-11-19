import { View, Text, Image, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from '../graphql/queries'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LargeProjectCard = ({project}: any) => {
    const router = useRouter(); 
    const [user, setUser] = useState<any>(null);

    // FETCH THE OWNER
    const fetchUser = async (ownerID: any) => {
        const result = await API.graphql(
          graphqlOperation(getUser, { id: ownerID })
        );
        const castedResult = result as GraphQLResult<any>
        setUser(castedResult.data?.getUser);
    };

    useEffect(() => {
      if (project.ownerIDs?.[0]) {
        fetchUser(project.ownerIDs[0]);
      }
    }, [project.ownerIDs]);

    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/project/[id]',
            params: { id: project.id, projectID: project.id },
          })
        }
        style={styles.largeProjectContainer}
        >
         
        <ImageBackground 
            style={styles.largeProjectImageBackground} 
            imageStyle={styles.largeProjectImage}
            source={{uri: project.image}}
            resizeMode="cover"
            >
              
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} // Darker at the top, lighter at the bottom
              start={{ x: 0.5, y: 0 }} 
              end={{ x: 0.5, y: 0.5 }} 
              style={styles.largeProjectGradient}
              >
              {/* <View> */}
                <View style={styles.largeProjectTextContainer}>
                  <Text style={styles.largeProjectAuthor} numberOfLines={1}>{user?.name ?? ""}</Text>
                  <Text style={styles.largeProjectTitle} numberOfLines={3}>{project.title}</Text>
                  {/* Conditionally render Location */}
                  {project.city ? (
                    <View style={styles.detailOverlay}>
                      <Ionicons name='location-outline' style={styles.detailIcon} />
                      <Text style={styles.detailText}>
                        {project.city}
                      </Text>
                    </View>
                  ) : null}  
                  {/* Conditionally render the description */}
                  {project.description ? (
                    <View style={styles.detailOverlay}>
                      <FontAwesome6 name='quote-left' style={styles.quoteIconStart} />
                      <Text style={styles.detailText} numberOfLines={4}>
                        {project.description}
                      </Text>
                      <FontAwesome6 name='quote-right' style={styles.quoteIconEnd} />
                    </View>
                  ) : null} 
                </View>
                
              {/* </View> */}
            </LinearGradient>
             {/* Icon */}
          <View style={styles.iconLargeContainer}>
              <View style={styles.iconSmallContainer}>
                <Ionicons name="heart" size={27} style={styles.iconFill}/>
                <Ionicons name="heart-outline" size={30} style={styles.iconOutline}/>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
    )
}

export default LargeProjectCard

const styles = StyleSheet.create({
    // Large projects
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
    // padding: 30,
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
    borderRadius: 15, // Match the border radius of the image
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    alignItems: 'flex-end',
    padding: 25,
  },
  // Icon
  iconOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    position: 'absolute', 
    padding: 12,
    // backgroundColor: 'red'
  },
  iconFill: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    position: 'absolute', 
    padding: 12,
    opacity: 0.7 
    // backgroundColor: 'red'
  },
  iconSmallContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    padding: 32,
  },
  iconLargeContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    // backgroundColor: 'green',
    position: 'absolute'
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
    flexShrink: 1,
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
})