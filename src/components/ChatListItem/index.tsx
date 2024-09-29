import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Auth, API, graphqlOperation } from 'aws-amplify'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from 'expo-router';
import {onUpdateChatRoom} from '../../graphql/subscriptions'
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'rxjs'; // For Observable type

import getCommonChatRoomWithUser from '../../services/chatRoomService'
import { useEffect, useState} from 'react';

dayjs.extend(relativeTime);

const ChatListItem = ({chat}: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [chatRoom, setChatRoom] = useState(chat);


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

export default ChatListItem;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 10, 
      marginVertical: 5,
      height: 70,
      width: '100%',
    },
    image: {
      width: 60, 
      height: 60,
      borderRadius: 30,
      marginRight: 10, 
    }, 
    content: {
      flex: 1,

      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'lightgray'
  
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
  