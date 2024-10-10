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

const SmallProjectCard = ({project}: any) => {

    // FETCH THE PROJECT OWNER
    const router = useRouter(); 
    const [user, setUser] = useState<any>(null);

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
                params: { id: project.id },
            })
            }
            style={{width: '100%'}}
            >
            <Image style={styles.browseProjectsImage} source={{uri: project.image}}/>
            {/* Icon */}
            <View style={styles.iconLargeContainer}>
              <View style={styles.iconSmallContainer}>
                <Icon name="heart" size={27} style={styles.iconFill}/>
                <Icon name="heart-outline" size={30} style={styles.iconOutline}/>
              </View>
            </View>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} 
              start={{ x: 0.5, y: 1 }} 
              end={{ x: 0.5, y: 0.3 }} 
              style={styles.browseProjectsLinearGradient}
              >
              <View style={styles.browseProjectsTextContainer}>
                <Text style={styles.browseProjectsTitle}>{project.title}</Text>
                <Text style={styles.browseProjectAuthor}>{user?.name}</Text>
              </View>
            </LinearGradient>
        </Pressable>
    )
}

export default SmallProjectCard

const styles = StyleSheet.create({
    // Browse Projects
  browseProjectsHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, 
  }, 
  browseProjectsHeaderText: {
    fontWeight: 'bold', 
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectsSubtitleText: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
  },
  browseProjectsOuterContainer: {
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseProjectsContainer: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  browseProjectsGridItem: {
    width: '48%', // Two items per row with spacing
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  browseProjectsImage: {
    width: '100%', 
    height: windowHeight/5, 
    borderRadius: 15,
  },
  browseProjectsLinearGradient: {
    position: 'absolute',
    height: '100%', 
    width: '100%', 
    borderRadius: 15,
    justifyContent: 'flex-end',
  },
  browseProjectsTextContainer: {
    padding: 10, 
  },
  browseProjectsTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: 'bold',
    fontSize: 15, 
    color: 'white'
  }, 
  browseProjectAuthor: {
    fontSize: 15, 
    color: 'lightgray',
    paddingTop: 5,
  },
  projectsScreenContainer: {
    width: "100%", 
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 25,
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


