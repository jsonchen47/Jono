import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Emoji from 'react-native-emoji';
import { generateClient } from 'aws-amplify/api';
import { searchConnections, listProjects } from '@/src/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useUser } from '../contexts/UserContext';
import { listTeamsByUser } from '../backend/queries';
import { router } from 'expo-router';
import { createConnection, deleteConnection } from '../graphql/mutations';
import { getCurrentUser } from 'aws-amplify/auth';
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';
import { listConnections } from '@/src/graphql/queries';
import { chatClient } from '../backend/streamChat';
import Purchases from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';


const windowWidth = Dimensions.get('window').width;


const client = generateClient();

const ProfileHeader = ({ user, otherProfile = false, loading, setLoading }: any) => {
  const [isRequested, setIsRequested] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionID, setConnectionID] = useState<string | null>(null);
  const [counts, setCounts] = useState({ numConnections: 0, numProjects: 0, numTeams: 0 });
  // const [loading, setLoading] = useState(true);
  const { user: loggedInUser } = useUser();
  const [stateAuthUserID, setAuthUserID] = useState<string | null>(null); // State for user's ID

  useEffect(() => {
    // Fetch the user's ID from context or Auth
    const fetchUserID = async () => {
      try {
        if (loggedInUser?.id) {
          // Use context if it's populated
          setAuthUserID(loggedInUser.id);
        } else {
          // Fallback to fetching from Auth
          const authUser = await getCurrentUser();
          setAuthUserID(authUser.userId);
        }
      } catch (error) {
        console.error('Error fetching authenticated user ID:', error);
      } finally {
        setLoading(false); // Stop loading after attempting to fetch
      }
    };

    fetchUserID();
  }, [loggedInUser]); // Depend on loggedInUser to re-fetch if it changes

  // Check if theres already a connection
  useEffect(() => {
    if (stateAuthUserID && user?.id) {
      checkExistingConnection();
    }
  }, [stateAuthUserID, user?.id]);

  const checkExistingConnection = async () => {
    try {
      if (!stateAuthUserID || !user?.id) return;
  
      const result = await client.graphql({
        query: searchConnections,
        variables: {
          filter: {
            or: [
              { userID: { eq: stateAuthUserID }, connectedUserID: { eq: user.id } },
              { userID: { eq: user.id }, connectedUserID: { eq: stateAuthUserID } },
            ],
          },
        },
      }) as GraphQLResult<any>;
  
      const connection = result?.data?.searchConnections?.items[0];
  
      if (connection) {
        setConnectionID(connection.id);
        if (connection.status === 'approved') {
          setIsConnected(true);
          setIsRequested(false);
        } else if (connection.status === 'requested') {
          setIsRequested(true);
          setIsConnected(false);
        }
      } else {
        setIsRequested(false);
        setIsConnected(false);
        setConnectionID(null);
      }
    } catch (error) {
      console.error('Error checking existing connection:', error);
    }
  };
  
  


  const fetchCounts = async (userID: string) => {
    try {
      // Fetch connections using searchable with a filter for accepted status
      const connectionsResult = await client.graphql({
        query: searchConnections,
        variables: {
          filter: {
            or: [
              { userID: { eq: userID }, status: { eq: "approved" } },
              { connectedUserID: { eq: userID }, status: { eq: "approved" } },
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

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#003B7B" />
  //     </View>
  //   );
  // }

  const handlePress = async () => {
    try {
      const authUser = await getCurrentUser();
      const authUserId = authUser.userId;

      // Check for existing connection
      const connectionResult = await client.graphql({
        query: listConnections,
        variables: {
          filter: {
            or: [
              { userID: { eq: authUserId }, connectedUserID: { eq: user?.id } },
              { userID: { eq: user?.id }, connectedUserID: { eq: authUserId } },
            ],
            status: { eq: 'approved' },
          },
        },
      });

      const connectionExists = connectionResult.data?.listConnections?.items.length > 0;

      if (connectionExists) {
        // Check if the channel exists or create a new one
        const channel = chatClient.channel('messaging', {
          members: [authUserId, user?.id],
        });

        await channel.create();
        router.push(`/groupChat?channelUrl=${channel.id}`);
      } else {
        // Check for premium status
        const customerInfo = await Purchases.getCustomerInfo();
        const isPremium = !!customerInfo.entitlements.active['premium'];

        if (isPremium) {
          const channel = chatClient.channel('messaging', {
            members: [authUserId, user?.id],
          });

          await channel.create();
          router.push(`/groupChat?channelUrl=${channel.id}`);
        } else {
          const offerings = await Purchases.getOfferings();

          if (offerings.current) {
            const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
              offering: offerings.current,
              requiredEntitlementIdentifier: 'premium',
            });

            if (paywallResult === RevenueCatUI.PAYWALL_RESULT.PURCHASED) {
              const channel = chatClient.channel('messaging', {
                members: [authUserId, user?.id],
              });

              await channel.create();
              router.push(`/groupChat?channelUrl=${channel.id}`);
            } else {
              console.log('Paywall dismissed without purchase');
            }
          } else {
            console.error('No offerings configured in RevenueCat.');
            Alert.alert('No available offerings found.');
          }
        }
      }
    } catch (error) {
      console.error('Error handling message button:', error);
      Alert.alert('An error occurred while processing your request.');
    }
  };

  const handleRequestConnection = async () => {
    try {
      const authUserID = stateAuthUserID;

      console.log('authuser: ', authUserID)
      console.log('user id: ', user?.id)

      if (!authUserID || !user?.id) {
        console.warn('Missing user data for connection request.');
        return;
      }

      const result = await client.graphql({
        query: createConnection,
        variables: {
          input: {
            userID: authUserID,
            connectedUserID: user?.id,
            status: 'requested',
          },
        },
      }) as GraphQLResult<any>;

      const newConnection = result.data.createConnection;
      setIsRequested(true);
      setConnectionID(newConnection.id);
      console.log('Connection request sent.');
    } catch (error) {
      console.error('Error requesting connection:', error);
    }
  };

  const handleRemoveConnection = async () => {
    try {
      if (!connectionID) {
        console.warn('No connection ID found to remove.');
        return;
      }

      await client.graphql({
        query: deleteConnection,
        variables: { input: { id: connectionID } },
      });

      setIsRequested(false);
      setConnectionID(null);
      console.log('Connection request removed.');
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  if (loading) {
    return <ProfileHeaderSkeleton />;
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
              {user?.premium && ( // Check if user is premium
                <View style={styles.premiumIcon}>
                  <Text style={styles.star}>★</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.rightOfImageInfoBox}>
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.usernameText}>{user?.username ? `@${user.username}` : '@Anonymous'}</Text>
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
        {/* Button */}
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            otherProfile
              ? isConnected
                ? styles.connectedButton // Green for "Following"
                : isRequested
                ? styles.requestedButton // Grey for "Requested"
                : styles.connectButton // Blue for "Request to Connect"
              : styles.editProfileButton
          }
          onPress={() => {
            if (otherProfile) {
              if (isConnected || isRequested) {
                handleRemoveConnection(); // Remove connection or cancel request
              } else {
                handleRequestConnection(); // Send connection request
              }
            } else {
              router.push('/editProfile');
            }
          }}
        >
          <Text
            style={
              otherProfile
                ? isConnected
                  ? styles.connectedText // Green text
                  : isRequested
                  ? styles.requestedText // Grey text
                  : styles.connectText // Blue text
                : styles.editProfileText
            }
          >
            {otherProfile
              ? isConnected
                ? 'Following'
                : isRequested
                ? 'Requested'
                : 'Connect'
              : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
        {/* Message Button */}
        {otherProfile && (
        <TouchableOpacity
          style={styles.messageButton} onPress={handlePress}>
          <Text style={styles.messageText}>Message</Text>
        </TouchableOpacity>
        )}
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 100, 
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
    width: '80%',
    flex: 1, 
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
  }, 
  editProfileButton: {
    width: '100%',
    backgroundColor: '#004068',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  removeRequestButton: {
    width: '100%',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  editProfileText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  connectButton: {
    backgroundColor: '#004068', // Blue
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    width: '47%', 
  },
  
  requestedButton: {
    backgroundColor: 'lightgray', // Grey
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    width: '47%', 
  },
  
  connectedButton: {
    backgroundColor: 'lightgray', // Green for "Following"
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    width: '47%', 
  },
  
  connectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  
  requestedText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
  },
  
  connectedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  messageButton: {
    backgroundColor: '#1ABFFB', // Light blue color
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10, // Space between buttons
    alignItems: 'center',
    width: '47%', 
  },
  
  messageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  premiumIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#4CDFFF', // Light blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  star: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  
});

export default ProfileHeader;
