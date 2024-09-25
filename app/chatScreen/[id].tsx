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


const bg = require("../../assets/images/BG.png");


export default function DetailsScreen() {
  const [chatRoom, setChatRoom] = useState<any>(null);
  const [messages, setMessages] = useState([]);

  
  const { chatRoomID, name } = useLocalSearchParams();
  // console.log(name)
  const router = useRouter();
  const height = useHeaderHeight()
  const navigation = useNavigation();

  // console.log(chatRoomID)

  // Fetch chat room
  useEffect(() => {
    const fetchChatRoom = async () => {
      const result = await API.graphql(graphqlOperation(getChatRoom, { id: chatRoomID }));
      const castedResult = result as GraphQLResult<any>
      setChatRoom(castedResult.data?.getChatRoom);
      // setMessages(castedResult.data?.getChatRoom?.Messages.items)
    };

    fetchChatRoom();
  }, [chatRoomID]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const result = await API.graphql(graphqlOperation(listMessagesByChatRoom, {chatroomID: chatRoomID, sortDirection: "DESC"}))
      console.log(result)
      const castedResult = result as GraphQLResult<any>
      setMessages(castedResult.data?.listMessagesByChatRoom?.items);
    };
    fetchMessages(); 
    
  }, [chatRoomID]);

  // console.log(messages)

  // Set the header title to the user's name
  useEffect(() => {
    navigation.setOptions({
      title: name || 'Chat',  // Fallback to 'Chat' if name is not available
      headerBackTitle: 'Chat',
    });
  }, [name, navigation]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  // console.log(chatRoom)

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
  }
});
