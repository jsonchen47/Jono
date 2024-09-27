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


export default function Chat() {
  const [chatRoom, setChatRooms] = useState<any>([]);
  const [loading, setLoading] = useState(false);

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
    console.log(chatRoom)
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
          data={chatRoom}
          keyExtractor={(item) => item.chatRoom.id}
          renderItem={({item}) => 
          <ChatListItem chat={item.chatRoom}/>
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
});
