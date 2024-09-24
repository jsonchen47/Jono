import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import {useState, useEffect} from 'react';
import chats from '../../../assets/data/chats.json'
import ContactListItem from '../../../src/components/ContactListItem'
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../../../src/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useRouter } from 'expo-router';
import {listUsers} from "../../../src/graphql/queries"

const connections = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    // API.graphql(graphqlOperation(listUsers)).then((result) => {
    //   console.log(result);
    //   setUsers(result.data?.listUsers?.items)
    // });
    (async () => {
      try {
        const result = await API.graphql(graphqlOperation(listUsers)) as GraphQLResult<any>;
        console.log(result);
        setUsers(result.data?.listUsers?.items);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, []);

  const router = useRouter();

  const onPress = async ({user}: any) => {
    try {
      console.warn("Pressed");
      console.warn("1");
      // Check if we already have a chatroom with the user

      // Create a new ChatRoom
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, {input: {}})
      )
      
      console.log(newChatRoomData)
      const castedChatRoomData = newChatRoomData as GraphQLResult<any>; // Casting the chat room data 
      if (!castedChatRoomData.data?.createChatRoom) {
        console.log("Error creating the chat error")
      }
      const newChatRoom = castedChatRoomData.data?.createChatRoom;
      // Add the clicked user to the ChatRoom
      await API.graphql(graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomID: newChatRoom.id,
          userID: user.id
        }
      }))

      // Add the Auth user to the ChatRoom
      const authUser = await Auth.currentAuthenticatedUser(); 
      await API.graphql(graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomID: newChatRoom.id,
          userID: authUser.attributes.sub
        }
      }))

      // Navigate to the newly created ChatRoom
      // router.push('/chatScreen/${newChatRoom.id}')
      router.push('/(profile)/settings')
      // navigation.navigate('chatScreen', {id: newChatRoom.id}); 
    }
    catch (error) {
      console.error("Error in onPress:", error);
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => 
            // <Pressable onPress={() => onPress(item.user)}> 
              <ContactListItem user={item}/>
            // </Pressable>
        }
        />
    </View>
  )
}

export default connections
