import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createConnection, deleteConnection } from '../graphql/mutations';
import { listConnections } from '@/src/graphql/queries';
import { useState, useEffect } from 'react';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { router } from 'expo-router';
// import { useNotifications } from '@/src/contexts/NotificationContext';

const ProfileHeader = ({ user, otherProfile = false }: any) => {
  const [isRequested, setIsRequested] = useState(false);
  const [connectionID, setConnectionID] = useState<string | null>(null);
  // const { hasNotifications } = useNotifications();

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const authUser = await Auth?.currentAuthenticatedUser();
        const authUserID = authUser?.attributes?.sub;

        if (!authUserID || !user?.id) {
          console.warn('Skipping connection status check: Missing user data.');
          return;
        }

        // Query all connections
        const result = await API.graphql(
          graphqlOperation(listConnections, {
            filter: {
              or: [
                { userID: { eq: authUserID }, connectedUserID: { eq: user?.id } },
                { userID: { eq: user?.id }, connectedUserID: { eq: authUserID } },
              ],
            },
          })
        );

        const castedResult = result as GraphQLResult<any>;
        const connections = castedResult?.data?.listConnections?.items || [];
        const existingConnection = connections.length > 0;

        if (existingConnection) {
          setIsRequested(true);
          setConnectionID(connections[0]?.id); // Save the connection ID for removal
        } else {
          setIsRequested(false);
          setConnectionID(null);
        }
      } catch (error) {
        console.error('Error checking connection status:', error);
      }
    };

    if (otherProfile && user) {
      checkConnectionStatus();
    }
  }, [user, otherProfile]);

  const handleRequestConnection = async () => {
    try {
      const authUser = await Auth?.currentAuthenticatedUser();
      const authUserID = authUser?.attributes?.sub;

      const input = {
        userID: authUserID,
        connectedUserID: user?.id,
        status: 'requested', // Initial status
      };

      const result = await API.graphql(graphqlOperation(createConnection, { input }));
      const newConnection = (result as GraphQLResult<any>).data.createConnection;

      setIsRequested(true);
      setConnectionID(newConnection.id); // Save the new connection ID
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

      const input = { id: connectionID };

      await API.graphql(graphqlOperation(deleteConnection, { input }));
      setIsRequested(false);
      setConnectionID(null);
      console.log('Connection request removed.');
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.topItemsContainer}>
          {/* Profile picture */}
          <View style={styles.imageContainer}>
            <View style={styles.imageOutline}>
              <Image style={styles.image} source={{ uri: user?.image }} />
            </View>
          </View>

          {/* Right of Image Info Box */}
          <View style={styles.rightOfImageInfoBox}>
            <View style={styles.eachRowContainer}>
              <Text style={styles.nameText}>{user?.name}</Text>
            </View>
            <View style={styles.eachRowContainer}>
              <Text style={styles.usernameText}>
                {user?.username ? `@${user.username}` : '@Anonymous'}
              </Text>
            </View>
            <View style={styles.allStatsContainer}>
              <View style={styles.statsContainer}>
                <Emoji name="bulb" style={styles.emoji} />
                <Text style={styles.statsText}>{user?.numProjects}</Text>
              </View>
              <View style={styles.statsSpacer} />
              <View style={styles.statsContainer}>
                <Emoji name="handshake" style={styles.emoji} />
                <Text style={styles.statsText}>{user?.numTeams}</Text>
              </View>
              <View style={styles.statsSpacer} />
              <TouchableOpacity 
                style={styles.statsContainer}
                onPress={() => 
                  router.push('/(tabs)/(profile)/connections')
                }

              >
                <Emoji name="link" style={styles.emoji} />
                <Text style={styles.statsText}>{user?.numConnections}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={otherProfile
            ? isRequested
              ? styles.removeRequestButton
              : styles.editProfileButton
            : styles.editProfileButton
          }
          onPress={() => {
            if (otherProfile) {
              if (isRequested) {
                handleRemoveConnection();
              } else {
                handleRequestConnection();
              }
            } else {
              console.log('edit profile button pressed');
            }
          }}
        >
          <Text 
            style={otherProfile
              ? isRequested
                ? styles.editProfileText
                : styles.editProfileText
              : styles.editProfileText
            }
          >
            {otherProfile
              ? isRequested
                ? 'Requested'
                : 'Request to Connect'
              : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

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
  },
  eachRowContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 7,
  },
  allStatsContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  emoji: {
    fontSize: 18,
  },
  statsText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  statsSpacer: {
    marginHorizontal: 7,
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
  removeRequestButtonText: {

  }, 
  
});
