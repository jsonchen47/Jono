import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createGroupChannelCreateFragment } from '@sendbird/uikit-react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listConnections } from '@/src/graphql/queries'; // Update to your actual path
import { GraphQLResult } from '@aws-amplify/api-graphql';

const GroupChannelCreateFragment = createGroupChannelCreateFragment();

const GroupChannelCreateScreen = () => {
  const navigation = useNavigation<any>();
  const { sdk } = useSendbirdChat();
  const [allowedUserIDs, setAllowedUserIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const client = generateClient();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const authUser = await getCurrentUser();
        const authUserID = authUser.userId;

        // Fetch connections where the authenticated user is involved
        const result = (await client.graphql({
          query: listConnections,
          variables: {
            filter: {
              or: [
                { userID: { eq: authUserID } },
                { connectedUserID: { eq: authUserID } },
              ],
              status: { eq: 'approved' }, // Only approved connections
            },
          },
        })) as GraphQLResult<any>;

        const connections = result.data?.listConnections?.items || [];
        console.log('Fetched connections:', connections);

        // Extract the userIDs of the connections
        const userIDs = connections.map((connection: any) =>
          connection.userID === authUserID
            ? connection.connectedUserID
            : connection.userID
        );

        setAllowedUserIDs(userIDs); // Set the filtered list of user IDs
      } catch (error) {
        console.error('Error fetching connections:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchConnections();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1ABFFB" />
      </View>
    );
  }

  // if (allowedUserIDs.length === 0) {
  //   return (
  //     <View style={styles.noConnectionsContainer}>
  //       <Text style={styles.noConnectionsText}>No connections available to create a group.</Text>
  //     </View>
  //   );
  // }

  return (
    <GroupChannelCreateFragment
      queryCreator={() => {
        if (allowedUserIDs.length === 0) {
          // Return an empty query when there are no connections
          return {
            next: () => Promise.resolve([]),
            hasNext: false,
            loadNext: () => Promise.resolve([]),
            isLoading: loading
          };
        }

        return sdk.createApplicationUserListQuery({
          userIdsFilter: allowedUserIDs,
        });
      }}
      onCreateChannel={async (channel) => {
        navigation.replace('GroupChannel', { channelUrl: channel.url });
      }}
      onPressHeaderLeft={() => {
        navigation.goBack();
      }}
    />
  );
};

export default GroupChannelCreateScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  noConnectionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  noConnectionsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});
