import { View, Text, Image, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRouter } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from '../graphql/queries'
import Icon from 'react-native-vector-icons/Ionicons';


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
            // imageStyle={{ width: 100, height: 100 }}
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
                  <Text style={styles.largeProjectAuthor}>{user?.name ?? ""}</Text>
                  <Text style={styles.largeProjectTitle}>{project.title}</Text>
                </View>
                
              {/* </View> */}
            </LinearGradient>
             {/* Icon */}
          <View style={styles.iconLargeContainer}>
              <View style={styles.iconSmallContainer}>
                <Icon name="heart" size={27} style={styles.iconFill}/>
                <Icon name="heart-outline" size={30} style={styles.iconOutline}/>
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
  }
})