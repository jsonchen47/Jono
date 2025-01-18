import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listConnections } from '@/src/graphql/queries';
import { createConnection, deleteConnection } from '@/src/graphql/mutations';
import moment from 'moment';
import { useRefresh } from '@/src/contexts/RefreshContext';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const client = generateClient();

const ConnectionsPage = () => {
  const [connections, setConnections] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const { setShouldRefresh } = useRefresh();
  const navigation = useNavigation();
  

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => 
        {
          navigation.goBack()
          setShouldRefresh(true); // Notify that ProfileScreen should refresh
        }}
        >
          <FontAwesome6 name="chevron-left" style={styles.backButtonIcon} />
        </TouchableOpacity>
      ),
      title: 'Connections',
    });
  }, [navigation]);


  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      try {
        const authUser = await getCurrentUser();
        const authUserID = authUser.userId;
        setAuthUser(authUser)

        if (!authUserID) {
          console.error('Error: User ID not found.');
          setLoading(false);
          return;
        }

        const result = await client.graphql({
          query: listConnections,
          variables: {
            filter: {
              and: [
                {
                  or: [
                    { userID: { eq: authUserID } },
                    { connectedUserID: { eq: authUserID } },
                  ],
                },
                { status: { eq: 'approved' } },
              ],
            },
          }
        });

        const fetchedConnections = result.data?.listConnections?.items || [];

        console.log('connections', fetchedConnections);
        setConnections(fetchedConnections);
      } catch (error) {
        console.error('Error fetching connections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleUnfollow = async (connectionId: string) => {
    if (!connectionId) {
      console.error('Error: Connection ID is undefined.');
      return;
    }

    try {
      await client.graphql({
        query: deleteConnection,
        variables: { input: { id: connectionId } }
      });
      setConnections((prev) =>
        prev.map((connection) =>
          connection.id === connectionId ? { ...connection, status: 'unfollowed' } : connection
        )
      );
    } catch (error) {
      console.error('Error unfollowing:', error);
    }
  };

  const handleConnect = async (userID: string, connectedUserID: string) => {
    if (!userID || !connectedUserID) {
      console.error('Error: User IDs are undefined.');
      return;
    }

    try {
      const input = {
        userID,
        connectedUserID,
        status: 'approved',
      };
      const result = await client.graphql({
        query: createConnection,
        variables: { input }
      });
      const newConnection = result.data?.createConnection;
      if (newConnection) {
        setConnections((prev) =>
          prev.map((connection) =>
            connection.userID === userID && connection.connectedUserID === connectedUserID
              ? { ...connection, status: 'approved' }
              : connection
          )
        );
      }
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  // Rest of the component remains the same...
  const renderItem = ({ item }: any) => {
    const otherUser =
      authUser?.userId === item?.connectedUserID ? item?.user : item?.connectedUser;

    const connectionDate = moment(item?.updatedAt).format('MMMM D, YYYY');

    return (
      <List.Item
        style={{ paddingRight: 0, justifyContent: 'center' }}
        title={otherUser?.username || 'Unknown Username'}
        titleStyle={styles.listItemTitle}
        description={otherUser?.name || 'Unknown Name'}
        left={() => (
          <Image
            source={{ uri: otherUser?.image || '' }}
            style={styles.profileImage}
          />
        )}
        right={() => (
          <View style={styles.listItemRight}>
            <TouchableOpacity
              onPress={() =>
                item?.status === 'approved'
                  ? handleUnfollow(item?.id)
                  : handleConnect(item?.userID, item?.connectedUserID)
              }
              style={
                item?.status === 'approved'
                  ? styles.unfollowButton
                  : styles.connectButton
              }
            >
              <Text style={styles.buttonText}>
                {item?.status === 'approved' ? 'Following' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  // Filter connections based on search term
  const filteredConnections = connections.filter((connection) => {
    const otherUser = connection?.userID === connection?.connectedUserID
      ? connection?.connectedUser
      : connection?.user;

    const username = otherUser?.username || '';
    const name = otherUser?.name || '';
    const searchLower = searchTerm.toLowerCase();

    return username.toLowerCase().includes(searchLower) || name.toLowerCase().includes(searchLower);
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search connections"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredConnections} // Use filtered connections
          keyExtractor={(item) => item?.id || Math.random().toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default ConnectionsPage;

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  unfollowButton: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  connectButton: {
    backgroundColor: '#1ABFFB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  listItemTitle: {
    fontWeight: '700',
    fontSize: 15,
  },
  listItemRight: {
    justifyContent: 'center',
  },
  backButtonIcon: {
    fontSize: 21,
    color: 'black',
    marginLeft: 10,
  },
});