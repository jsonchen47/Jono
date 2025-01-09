import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Emoji from 'react-native-emoji';
import { generateClient } from 'aws-amplify/api';
import { searchConnections, listProjects } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useUser } from '../contexts/UserContext';
import { listTeamsByUser } from '../backend/queries';
import { router } from 'expo-router';

const client = generateClient();

const ProfileHeader = ({ user, otherProfile = false }: any) => {
  const [isRequested, setIsRequested] = useState(false);
  const [connectionID, setConnectionID] = useState<string | null>(null);
  const [counts, setCounts] = useState({ numConnections: 0, numProjects: 0, numTeams: 0 });
  const [loading, setLoading] = useState(true);
  const { user: loggedInUser } = useUser();

  const fetchCounts = async (userID: string) => {
    try {
      // Fetch connections using searchable
      const connectionsResult = await client.graphql({
        query: searchConnections,
        variables: {
          filter: {
            or: [
              { userID: { eq: userID } },
              { connectedUserID: { eq: userID } },
            ],
          },
        },
      }) as GraphQLResult<any>;

      const numConnections = connectionsResult?.data?.searchConnections?.total || 0;

      // Fetch projects
      const projectsResult = await client.graphql({
        query: listProjects,
        variables: {
          filter: { ownerIDs: { contains: userID } },
        },
      }) as GraphQLResult<any>;

      const numProjects = projectsResult?.data?.listProjects?.items?.length || 0;

      // Fetch teams
      const teamsResult = await client.graphql({
        query: listTeamsByUser,
        variables: {
          id: userID,
        },
      }) as GraphQLResult<any>;

      const numTeams = teamsResult?.data?.listTeamsByUser?.items?.length || 0;

      setCounts({ numConnections, numProjects, numTeams });
    } catch (error) {
      console.error('Error fetching counts:', error);
      setCounts({ numConnections: 0, numProjects: 0, numTeams: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCounts(user.id);
    }
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003B7B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.topItemsContainer}>
          <View style={styles.imageContainer}>
            <View style={styles.imageOutline}>
              <Image
                style={styles.image}
                source={
                  user?.image
                    ? { uri: user.image }
                    : require('../../assets/images/profile1.png') // Path to your default image
                }
              />
            </View>
          </View>

          <View style={styles.rightOfImageInfoBox}>
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text style={styles.usernameText}>{user?.username ? `@${user.username}` : '@Anonymous'}</Text>
            <View style={styles.allStatsContainer}>
              <View style={styles.statsContainer}>
                <Emoji name="bulb" style={styles.emoji} />
                <Text style={styles.statsText}>{counts.numProjects}</Text>
              </View>
              <View style={styles.statsSpacer} />
              <View style={styles.statsContainer}>
                <Emoji name="handshake" style={styles.emoji} />
                <Text style={styles.statsText}>{counts.numTeams}</Text>
              </View>
              <View style={styles.statsSpacer} />
              <TouchableOpacity style={styles.statsContainer}
                onPress={() =>
                  router.push('/(tabs)/(profile)/connections')
                }
              >
                <Emoji name="link" style={styles.emoji} />
                <Text style={styles.statsText}>{counts.numConnections}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    width: '90%',
    alignSelf: 'center',
  },
  topItemsContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageOutline: {
    borderWidth: 10,
    borderColor: 'white',
    borderRadius: 50,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightOfImageInfoBox: {
    alignItems: 'flex-start',
    padding: 10,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  allStatsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  statsText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 3, 
  },
  statsSpacer: {
    marginHorizontal: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 15,
  }
});

export default ProfileHeader;
