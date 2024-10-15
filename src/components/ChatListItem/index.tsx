import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Auth, API, graphqlOperation } from 'aws-amplify'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from 'expo-router';
import {onUpdateChatRoom} from '../../graphql/subscriptions'
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'rxjs'; // For Observable type
import SwipeRow from '@nghinv/react-native-swipe-row';
import { ListItem } from '@rneui/themed';
import { Button } from '@rneui/themed';
import { deleteUserChatRoom, deleteChatRoom } from "../../../src/graphql/mutations";
import { updateChatRoom } from '../../../src/graphql/mutations'; 
import getCommonChatRoomWithUser from '../../services/chatRoomService'
import { useEffect, useState} from 'react';
import ChatRoomInfo from '@/app/groupInfoScreen';

dayjs.extend(relativeTime);


// For swipabble delete 

const ChatListItem = ({chat}: any) => {


  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [chatRoom, setChatRoom] = useState(chat);
  // const [users, setUsers] = useState<any>();

  const fetchChatRoom = async () => {
    // setLoading(true);
    const result = await API.graphql(
      graphqlOperation(getChatRoom, { id: chat.id })
    );
    const castedResult = result as GraphQLResult<any>
    setChatRoom(castedResult.data?.getChatRoom);
    // setLoading(false);
  };

  // To remove the ChatRoomUser join table 
  const removeChatRoom = async (chatRoom: any) => {

    // // Get the users from the chatRoom
    // const chatRoomUsers = chatRoom.users.items.filter((item: any) => !item._deleted);
    // // console.log(chatRoomUsers)
    // // console.log(user)
    // // Remove the UserChatRoom
    // for (const chatRoomUser of chatRoomUsers) {
    //   console.log(chatRoomUser.id)
    //   // console.log(chatRoomUser)
    //   await API.graphql(
    //     graphqlOperation(deleteUserChatRoom, {
    //       input: { id: chatRoomUser.id },
    //     })
    //   );
    // }

    // // Remove the ChatRoom 
    // await API.graphql(
    //   graphqlOperation(deleteChatRoom, {
    //     input: { id: chatRoom.id },
    //   })
    // );
  };

  const handlePress = () => {
    removeChatRoom(chatRoom); 
  };

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser(); 

      const userItem = chatRoom.users.items.find((item: any) => item.user.id != authUser.attributes.sub);
      setUser(userItem?.user)

    };

    fetchUser(); 
    // setChatRoom(chat.id)
  }, [])

// Fetch chat room
useEffect(() => {

  fetchChatRoom(); 

  const subscription = API.graphql(
    graphqlOperation(onUpdateChatRoom
      , { 
      filter: { id: { eq: chat.id } } 
    }
    )
  ) as unknown as Observable<GraphQLResult<any>>;
  
  const subscriptionHandler = subscription.subscribe({
    next: ({ value }: any) => {
      setChatRoom((cr: any) => ({
        ...(cr || {}),
        ...value.data.onUpdateChatRoom,
      }));
    },
    error: (err) => console.warn(err),
  });
  return () => subscriptionHandler.unsubscribe();

}, [chat.id]);

const navigation = useNavigation<any>(); 

  
    return (
      
        <Pressable 
          onPress={() => 
          router.push({pathname: '/chatScreen/[id]', params: {id: chatRoom.id, chatRoomID: chatRoom.id, name: user?.name}})} 
        style={styles.container}
        >
          <View style={styles.container}>
            <Image source={{ uri: user?.image}}
              style={styles.image}/>
            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={styles.name} numberOfLines={1}>
                  {chatRoom.name || user?.name}
              </Text>
              {chatRoom.LastMessage && (
                <Text style={styles.subTitle}>
                  {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
                </Text>
              )}          
              </View>
              <Text numberOfLines={2} style={styles.subTitle}>
                {chatRoom.LastMessage?.text}
              </Text>
            </View>
          </View>
        </Pressable>
    );
};

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


const styles = StyleSheet.create({
    outerView: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'lightgray'
    },
    swipeList: {
      // height: 70,
      paddingVertical: 0,
      
    },
    container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      flexDirection: 'row',
      height: 60,
      width: '100%',
      
    },
    image: {
      width: 60, 
      height: 60,
      borderRadius: 5,
      marginRight: 10, 
    }, 
    content: {
      flex: 1,

    }, 
    row: {
      flexDirection: 'row',
      marginBottom: 5,
    }, 
    name: {
      flex: 1,
      fontWeight: 'bold',
    },
    subTitle: { 
      color: 'gray',
    }
  });
  

  export default ChatListItem;
