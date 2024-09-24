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
      const result = await API.graphql(graphqlOperation(listUsers)) as GraphQLResult<any>;
      console.log(result);
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
        />
    </View>
  )
}

export default connections
