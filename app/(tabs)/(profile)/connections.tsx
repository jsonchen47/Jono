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

const connections = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    // Show the users that are in the database
    (async () => {
      const result = await API.graphql(graphqlOperation(listUsers)) as GraphQLResult<any>;
      setUsers(result.data?.listUsers?.items);
    })();
  }, []);

  const router = useRouter();

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => 
            <ContactListItem user={item}/>
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
