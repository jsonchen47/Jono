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
import { MaterialIcons } from "@expo/vector-icons";
import getCommonChatRoomWithUser from '../../../src/services/chatRoomService'


const connections = () => {
const [users, setUsers] = useState<any>([]);
const [selectedUserIds, setSelectedUserIds] = useState<any>([]);
  const [name, setName] = useState<any>("");
const router = useRouter();

useEffect(() => {
  // Show the users that are in the database
  (async () => {
    const result = await API.graphql(graphqlOperation(listUsers)) as GraphQLResult<any>;
    setUsers(result.data?.listUsers?.items);
  })();
}, []);

const createAChatRoomWithTheUser = async (user: any) => {
  // Check if we already have a chatroom with the user
  const existingChatRoom = await getCommonChatRoomWithUser(user.id);
  if (existingChatRoom != undefined) {
    router.push({pathname: '/chatScreen/[id]', params: {id: existingChatRoom.chatRoom.id, chatRoomID: existingChatRoom.chatRoom.id, name: user?.name}}); 
    return;
  }
  
  // Otherwise, create a new ChatRoom
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
      chatRoomId: newChatRoom.id,
      userId: user.id
    }
  }))

  // Add the Auth user to the ChatRoom
  const authUser = await Auth.currentAuthenticatedUser(); 
  await API.graphql(graphqlOperation(createUserChatRoom, {
    input: {
      chatRoomId: newChatRoom.id,
      userId: authUser.attributes.sub
    }
  }))

  // Navigate to the newly created ChatRoom
  // router.push('/chatScreen/${newChatRoom.id}')
  router.push({pathname: '/chatScreen/[id]', params: {id: newChatRoom.id, chatRoomID: newChatRoom.id, name: user?.name}}); 
}

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => 
            <ContactListItem 
              user={item}
              onPress={() => createAChatRoomWithTheUser(item)}
              isSelected={false}
              selectable={false}
            />
        }
        ListHeaderComponent={() => (
          <Pressable
            onPress={() => {
              // navigation.navigate("New Group");
              router.push('/(profile)/newGroupScreen')
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15,
              paddingHorizontal: 20,
            }}
          >
            <MaterialIcons
              name="group"
              size={24}
              color="royalblue"
              style={{
                marginRight: 20,
                backgroundColor: "gainsboro",
                padding: 7,
                borderRadius: 20,
                overflow: "hidden",
              }}
            />
            <Text style={{ color: "royalblue", fontSize: 16 }}>New Group</Text>
          </Pressable>
        )}
        />
    </View>
  )
}

export default connections
