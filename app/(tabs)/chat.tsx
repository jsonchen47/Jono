import { Link } from 'expo-router';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navigator from '../../src/navigation';
import ChatListItem from '../../src/components/ChatListItem'
import {listChatRooms} from "../../src/backend/chatQueries"
import {useEffect, useState} from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { onUpdateChatRoom } from '../../src/graphql/subscriptions'; // Your subscription query
import { Observable } from 'rxjs'; // For Observable type
import { ListItem } from '@rneui/themed';
import { Button } from '@rneui/themed';
import { deleteUserChatRoom, deleteChatRoom } from "../../src/graphql/mutations";


export default function Chat() {
  const [chatRooms, setChatRooms] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  // const [chatRoomForDeletion, setChatRoomForDeletion] = useState<any>();


  // To remove the ChatRoomUser join table 
  const removeChatRoom = async (chatRoom: any) => {

    // Remove chatRoom from UI
    const updatedChatRooms = chatRooms.filter((room: any) => room.chatRoom.id !== chatRoom.id);
    setChatRooms(updatedChatRooms);

    // Set the chat room for deletion
    const result = await API.graphql(
      graphqlOperation(getChatRoom, { id: chatRoom.id })
    );
    const castedResult = result as GraphQLResult<any>
    const chatRoomForDeletion = castedResult.data?.getChatRoom;

    // Get the users from the chatRoom
    const chatRoomUsers = chatRoomForDeletion.users.items.filter((item: any) => !item._deleted);
    // Remove the UserChatRoom
    for (const chatRoomUser of chatRoomUsers) {
      console.log(chatRoomUser.id)
      await API.graphql(
        graphqlOperation(deleteUserChatRoom, {
          input: { id: chatRoomUser.id },
        })
      );
    }

    // Remove the ChatRoom 
    await API.graphql(
      graphqlOperation(deleteChatRoom, {
        input: { id: chatRoomForDeletion.id },
      })
    );
  };

  const handlePress = (chatRoom: any) => {
    removeChatRoom(chatRoom); 
  };

  const fetchChatRooms = async () => {
    // setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(listChatRooms, {id: authUser.attributes.sub})
    );
    const castedResponse = response as GraphQLResult<any>; // Casting the chat room data 
    const rooms = castedResponse?.data?.getUser?.ChatRooms?.items?.filter(
      (item: any) => !item._deleted
    );
    const sortedRooms = rooms.sort(
      (r1: any, r2: any) => {
        const date1 = new Date(r1.chatRoom.updatedAt).getTime();  // Convert to milliseconds
        const date2 = new Date(r2.chatRoom.updatedAt).getTime();
        // Ensure that both dates are valid numbers
        if (isNaN(date1) || isNaN(date2)) {
          return 0;  // Keep the current order if either date is invalid
        }
        return date2 - date1;  // Sort in descending order
      }
    );
    setChatRooms(sortedRooms);
    // setLoading(false);
    console.log(chatRooms)
  };

  useEffect(() => {
    fetchChatRooms(); 
    // Subscribe to chat room updates
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom)
    ) as unknown as Observable<GraphQLResult<any>>;

    const subscriptionHandler = subscription.subscribe({
      next: () => {
        // Refetch chat rooms when a new update happens
        fetchChatRooms();
      },
      error: (error) => console.warn("Subscription error:", error),
    });

    // Cleanup subscription on unmount
    return () => subscriptionHandler.unsubscribe();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.chatRoom.id}
          renderItem={({item}) => 
          <View style={styles.listUnderline}>
            <ListItem.Swipeable
            // style={styles.container}
              rightContent={(reset) => (
                <Button
                  title="Delete"
                  onPress={() => 
                    {
                      handlePress(item.chatRoom);
                      reset();
                    }
                  }
                  icon={{ name: 'delete', color: 'white' }}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                />
              )}
              >
              <ChatListItem chat={item.chatRoom}/>
            </ListItem.Swipeable>
          </View>
        }
          // refreshing={loading}
          // onRefresh={fetchChatRooms}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 50,
  },
  listUnderline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray'
  }
});


// getChatRoom graphql operation
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      updatedAt
      name
      LastMessage {
        text
        createdAt
      }
      users {
        items {
          id
          chatRoomId
          createdAt
          updatedAt
          user {
            id
            name
            status
            image
          }
        }
        nextToken
      }
      createdAt
      chatRoomLastMessageId
    }
  }
`;