import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
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

  return (
    <GroupChannelCreateFragment
      queryCreator={() => {
        const query = sdk.createApplicationUserListQuery({
          userIdsFilter: allowedUserIDs, // Use the dynamic list of allowed user IDs
        });
        return query;
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
});
