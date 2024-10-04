import { View, Text, Image, Pressable, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import { PageIndicator } from 'react-native-page-indicator';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from '../graphql/queries'
import LargeProjectCard from '../components/LargeProjectCard';

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
        // <View>
        // <Text>SmallProjectCard</Text>
        // </View>
        <Pressable
              onPress={() =>
                router.push({
                  pathname: '/project/[id]',
                  params: { id: project.id },
                })
              }
            //   key={index}
              // style={styles.browseProjectsGridItem}
              style={{width: '100%'}}
            >
              <Image style={styles.browseProjectsImage} source={{uri: project.image}}/>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']} 
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
})


