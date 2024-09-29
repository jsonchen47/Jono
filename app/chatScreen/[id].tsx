import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, FlatList, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import Message from '../../src/components/Message';
import messages from '../../assets/data/messages.json';
import InputBox from '../../src/components/InputBox'
import { useHeaderHeight } from '@react-navigation/elements'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from "aws-amplify";
import { getChatRoom, listMessagesByChatRoom } from "../../src/graphql/queries";
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'rxjs'; // For Observable type
import {
  onCreateMessage,
  onUpdateChatRoom,
} from "../../src/graphql/subscriptions";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome6';


const bg = require("../../assets/images/BG.png");


export default function DetailsScreen() {

  const [chatRoom, setChatRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);

  
  const { chatRoomID, name } = useLocalSearchParams();
  const router = useRouter();
  const height = useHeaderHeight()
  const navigation = useNavigation();

  // Fetch chat room
  useEffect(() => {
    const fetchChatRoom = async () => {
      const result = await API.graphql(graphqlOperation(getChatRoom, { id: chatRoomID }));
      const castedResult = result as GraphQLResult<any>
      setChatRoom(castedResult.data?.getChatRoom);
    };
    fetchChatRoom();

    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { 
        filter: { id: { eq: chatRoomID } } 
      })
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

  }, [chatRoomID]);

  console.log(chatRoomID)

  useEffect(() => {
    // Set the header title to the user's name
    navigation.setOptions({ 
      title: '', 
      headerRight: () => 
      <Link
        href={{
          pathname: '/groupInfoScreen',
          params: {chatroomID: chatRoomID}
        }}>
        <Icon name='gear' style={styles.icon} ></Icon>
       </Link>
        
    });
  }, [navigation]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const result = await API.graphql(graphqlOperation(listMessagesByChatRoom, {chatroomID: chatRoomID, sortDirection: "DESC"}))
      const castedResult = result as GraphQLResult<any>
      setMessages(castedResult.data?.listMessagesByChatRoom?.items);
    };
    fetchMessages(); 

    

    // Subscribe to new messages
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatroomID: { eq: chatRoomID } },
      })
    ) as unknown as Observable<GraphQLResult<any>>;

    const subscriptionHandler = subscription.subscribe({
      next: ({ value }: any) => {
        setMessages((m: any) => [value.data.onCreateMessage, ...m]);
      },
      error: (err: any) => console.warn(err),
    });

    // Unsubscribe when needed
    return () => {
      subscriptionHandler.unsubscribe();
    };

    
  }, [chatRoomID]);

  // Set the header title to the user's name
  useEffect(() => {
    navigation.setOptions({
      title: chatRoom?.name || name || 'Chat',  // Fallback to 'Chat' if name is not available
      headerBackTitle: 'Chat',
    });
  }, [chatRoom, name, navigation]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }


  return (
    
    
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      keyboardVerticalOffset={height}
      behavior={ Platform.OS == "ios" ? "padding" : "height"}
      style={styles.bg}
    >
        
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => 
            <Message message={item}/>
          }
          style={styles.list}
          inverted
        />
        <InputBox chatroom={chatRoom}/>
      </ImageBackground>
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  }, 
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    display:"flex",
    fontSize: 20,
    paddingRight: 10,
  },
});
