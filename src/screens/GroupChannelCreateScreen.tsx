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
interface ConnectedUser {
  id: string;
  name?: string;
  image?: string;
  username?: string;
}

const GroupChannelCreateScreen: React.FC = () => {
  const { client: chatClient } = useChatContext();
  const navigation = useNavigation<any>();
  const amplifyClient = generateClient();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Search for connections
  const searchForConnections = useCallback(async (term: string) => {
    if (term.length < 2) {
      setConnectedUsers([]);
      return;
    }

    setLoading(true);
    try {
      const authUser = await getCurrentUser();
      const authUserId = authUser.userId;
    
      // Step 1: Search users based on the term
      const userSearchResult = await amplifyClient.graphql({
        query: searchUsers,
        variables: {
          filter: {
            or: [
              { name: { wildcard: `${searchTerm}*` } },  // Wildcard for partial matches
              { username: { wildcard: `${searchTerm}*` } }
            ]
          },
          limit: 10
        }
      }) as GraphQLResult<any>;
    
      const matchingUserIDs = userSearchResult.data?.searchUsers?.items.map((user: any) => user.id);
    
      if (!matchingUserIDs.length) {
        console.log('No users found');
        return [];
      }
    
      // Step 2: Fetch only approved connections involving the current user
      const connectionsResult = await amplifyClient.graphql({
        query: searchConnectionsWithUsers,
        variables: {
          filter: {
            and: [
              { status: { eq: "approved" } }, // Only approved connections
              {
                or: [
                  { userID: { eq: authUserId } }, // The current user must be part of the connection
                  { connectedUserID: { eq: authUserId } }
                ]
              },
              {
                or: matchingUserIDs.map((id: string) => ({
                  or: [{ userID: { eq: id } }, { connectedUserID: { eq: id } }]
                }))
              }
            ]
          },
          limit: 10
        }
      }) as GraphQLResult<any>;
    
      // Extract only relevant users from approved connections
      const users: ConnectedUser[] = (connectionsResult.data?.searchConnections?.items || [])
        .map((connection: any) => {
          const relevantUser = connection.userID === authUserId 
            ? connection.connectedUser 
            : connection.user;
          
          return {
            id: relevantUser?.id || '',
            name: relevantUser?.name,
            image: relevantUser?.image,
            username: relevantUser?.username
          };
        })
        // Remove duplicates and exclude current user
        .filter((user: any, index: any, self: any) => 
          user.id && 
          user.id !== authUserId && 
          self.findIndex((u: any) => u.id === user.id) === index
        );
    
      setConnectedUsers(users);
    } catch (error) {
      console.error('Error searching connections:', error);
      setConnectedUsers([]);
    } finally {
      setLoading(false);
    }
  }, [amplifyClient]);

  // Handle search input
  const handleSearchChange = useCallback((text: string) => {
    setSearchTerm(text);
    searchForConnections(text);
  }, [searchForConnections]);

  // Toggle user selection
const toggleUserSelection = (user: ConnectedUser) => {
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
const renderUserItem = ({ item }: { item: ConnectedUser }) => (
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