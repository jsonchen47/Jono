import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listConnections } from '@/src/graphql/queries';
import { createConnection, deleteConnection } from '@/src/graphql/mutations';
import moment from 'moment';

const client = generateClient();

const ConnectionsPage = () => {
  const [connections, setConnections] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      try {
        const authUser = await getCurrentUser();
        const authUserID = authUser.userId;

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
};

export default ConnectionsPage;

// Styles remain unchanged
