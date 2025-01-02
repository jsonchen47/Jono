import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listConnections } from '@/src/graphql/queries';
import { createConnection, deleteConnection } from '@/src/graphql/mutations';
import moment from 'moment';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const ConnectionsPage = () => {
  const [connections, setConnections] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        const authUserID = authUser?.attributes?.sub;

        if (!authUserID) {
          console.error('Error: User ID not found.');
          setLoading(false);
          return;
        }

        const result = await API.graphql(
          graphqlOperation(listConnections, {
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
          })
        );

        const castedResult = result as GraphQLResult<any>;
        const fetchedConnections = castedResult?.data?.listConnections?.items || [];
        console.log(fetchedConnections);
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
      await API.graphql(graphqlOperation(deleteConnection, { input: { id: connectionId } }));
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
      const result = await API.graphql(graphqlOperation(createConnection, { input }));
      const castedResult = result as GraphQLResult<any>;
      const newConnection = castedResult?.data?.createConnection;
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

  const renderItem = ({ item }: any) => {
    const otherUser =
      item?.userID === item?.connectedUserID ? item?.connectedUser : item?.user;

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
});
