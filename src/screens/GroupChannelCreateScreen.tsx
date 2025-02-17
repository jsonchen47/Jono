import React, { useState, useCallback, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  SafeAreaView,
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
import { 
  useChatContext, 
  Channel as StreamChatChannel 
} from 'stream-chat-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { searchConnectionsWithUsers } from '@/src/backend/queries';
import { searchUsers } from '@/src/backend/queries';

// Import your search connections query
import { searchConnections } from '@/src/graphql/queries';
// import { APITypes } from '@/src/API'; // Adjust path as needed

// Define your RootStackParamList type
// type RootStackParamList = {
//   GroupChannelCreate: undefined;
//   ChatScreen: { channel: StreamChatChannel };
// };

// Define a type for connected user based on your query result
// interface ConnectedUser {
//   id: string;
//   name?: string;
//   image?: string;
//   username?: string;
// }

const GroupChannelCreateScreen: React.FC = () => {
  const { client: chatClient } = useChatContext();
  const navigation = useNavigation<any>();
  const amplifyClient = generateClient();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [connectedUserIDs, setConnectedUserIDs] = useState<string[]>([]);


  /**
   * Step 1: Fetch all approved connections of the current user
   */
  const fetchConnectedUserIDs = useCallback(async () => {
    try {
      const authUser = await getCurrentUser();
      const authUserId = authUser.userId;

      const result = await amplifyClient.graphql({
        query: searchConnections,
        variables: {
          filter: {
            and: [
              { status: { eq: "approved" } },
              {
                or: [
                  { userID: { eq: authUserId } },
                  { connectedUserID: { eq: authUserId } }
                ]
              }
            ]
          },
          limit: 100
        }
      }) as GraphQLResult<any>;

      const connections = result.data?.searchConnections?.items || [];
      const userIDs = connections.map((conn: any) => 
        conn.userID === authUserId ? conn.connectedUserID : conn.userID
      );

      setConnectedUserIDs(userIDs);
    } catch (error) {
      console.error("Error fetching connections:", error);
      setConnectedUserIDs([]);
    }
  }, []);

  /**
   * Load connections on mount
   */
  useEffect(() => {
    fetchConnectedUserIDs();
  }, []);


  /**
   * Step 2: Search for users only within the connectedUserIDs list
   */
  const searchForConnections = useCallback(async (term: string) => {
    if (term.length < 2 || connectedUserIDs.length === 0) {
      setConnectedUsers([]);
      return;
    }

    setLoading(true);
    try {
      const result = await amplifyClient.graphql({
        query: searchUsers,
        variables: {
          filter: {
            and: [
              {
                or: connectedUserIDs.map((id) => ({ id: { eq: id } })) // Fix: Replace "in" with multiple OR conditions
              },
              {
                or: [
                  { name: { wildcard: `${term}*` } },
                  { username: { wildcard: `${term}*` } }
                ]
              }
            ]
          },
          limit: 10
        }
      }) as GraphQLResult<any>;
    
      const users = result.data?.searchUsers?.items || [];
      setConnectedUsers(users);
    } catch (error) {
      console.error("Error searching connected users:", error);
      setConnectedUsers([]);
    } finally {
      setLoading(false);
    }
  }, [connectedUserIDs]);

  // Handle search input
  const handleSearchChange = useCallback((text: string) => {
    setSearchTerm(text);
    searchForConnections(text);
  }, [searchForConnections]);

  // Toggle user selection
const toggleUserSelection = (user: any) => {
  setSelectedUsers(current => {
    // Check if user is already selected
    const isAlreadySelected = current.some(selectedUser => selectedUser.id === user.id);
    
    // If already selected, remove; if not selected, add
    return isAlreadySelected 
      ? current.filter(selectedUser => selectedUser.id !== user.id)
      : [...current, user];
  });
};

const createChannel = async () => {
  try {
    const currentUserId = chatClient.userID;
    if (!currentUserId) {
      console.error('No current user ID');
      return;
    }

    const memberIds = [currentUserId, ...selectedUsers.map(user => user.id)];
    
    const channelType = memberIds.length > 2 ? 'messaging' : 'messaging';
    
    const channel = chatClient.channel(channelType, {
      members: memberIds,
      ...(memberIds.length > 2 && { 
        name: selectedUsers.map(u => u.name || u.username || u.id).join(', ') 
      })
    });

    // Create the channel
    const createdChannel = await channel.create();
    
    // Navigate to GroupChannelScreen with channelId
    navigation.replace('GroupChannel', { channelId: channel.id });
  } catch (error) {
    console.error('Error creating channel', error);
  }
};


  // Render selected users chips
  const SelectedUserChips = () => (
    <View style={styles.selectedUsersContainer}>
      {selectedUsers.map(user => (
        <TouchableOpacity 
          key={user.id} 
          style={styles.userChip}
          onPress={() => toggleUserSelection(user)}
        >
          {user.image && (
            <Image 
              source={{ uri: user.image }} 
              style={styles.chipAvatar} 
            />
          )}
          <Text style={styles.chipText}>{user.name || user.username || user.id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Render user search results
  // Render user search results
const renderUserItem = ({ item }: { item: any }) => (
  <TouchableOpacity 
    style={styles.userItem}
    onPress={() => toggleUserSelection(item)}
  >
    {item.image && (
      <Image 
        source={{ uri: item.image }} 
        style={styles.userAvatar} 
      />
    )}
    <View style={styles.userInfoContainer}>
      <Text style={styles.userName}>
        {item.name || item.username || item.id}
      </Text>
      <View 
        style={[
          styles.selectionIndicator,
          selectedUsers.some(user => user.id === item.id) && styles.selectedIndicator
        ]}
      />
    </View>
  </TouchableOpacity>
);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Message</Text>
        <TouchableOpacity 
          onPress={createChannel} 
          disabled={selectedUsers.length === 0}
          style={[
            styles.createButton,
            selectedUsers.length === 0 && styles.disabledCreateButton
          ]}
        >
          <Text style={[
            styles.createButtonText,
            selectedUsers.length === 0 && styles.disabledCreateButtonText
          ]}>Create</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Search connections" 
          value={searchTerm}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
        />
      </View>

      {selectedUsers.length > 0 && <SelectedUserChips />}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList 
          data={connectedUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          style={styles.userList}
          ListEmptyComponent={() => (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                {searchTerm 
                  ? "No connections found matching your search" 
                  : "Start searching for your connections"}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0'
  },
  closeButton: {
    padding: 5
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 17
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600'
  },
  createButton: {
    padding: 5
  },
  disabledCreateButton: {
    opacity: 0.5
  },
  createButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600'
  },
  disabledCreateButtonText: {
    color: '#CCCCCC'
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0'
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16
  },
  selectedUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5
  },
  chipAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5
  },
  chipText: {
    fontSize: 14
  },
  userList: {
    flex: 1
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0'
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userName: {
    fontSize: 16,
    fontWeight: '500'
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF'
  },
  selectedIndicator: {
    backgroundColor: '#007AFF'
  }, 
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyStateText: {
    color: '#888',
    textAlign: 'center'
  }
});

export default GroupChannelCreateScreen;