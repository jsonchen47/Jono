import { Link } from 'expo-router';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navigator from '../../src/navigation';
import ChatListItem from '../../src/components/ChatListItem'
import {listChatRooms} from "../../src/backend/chatQueries"
import {useEffect, useState} from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';


const chat = {

  id: "1",
  user: {
    image: 
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
    name: "Lukas",
  },
  lastMessage: {
    text: "Oke",
    createdAt: "07:30"
  },
};

export default function Chat() {
  const [chatRoom, setChatRooms] = useState<any>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, {id: authUser.attributes.sub})
      );
      const castedResponse = response as GraphQLResult<any>; // Casting the chat room data 

      setChatRooms(castedResponse.data.getUser.ChatRooms.items);
    };
    fetchChatRooms(); 
  }, [])

  return (
    
    <SafeAreaView style={styles.container}>
    
      <FlatList
          data={chatRoom}
          renderItem={({item}) => 
            <Link
            href={{
              pathname: '../chatScreen/[id]',
              params: { id: item.id, name: item.user?.name },
            }}>
            <ChatListItem chat={item}/>
            {/* <Text>
              hi
            </Text> */}
            </Link>
      }
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
