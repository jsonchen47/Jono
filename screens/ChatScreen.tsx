import { View, Text, ImageBackground, StyleSheet, FlatList } from "react-native";
import React from "react";
import Message from '../components/Message';
import messages from '../assets/data/messages.json';
import chats from '../assets/data/chats.json'
import ChatListItem from '../components/ChatListItem'

const bg = require("../assets/images/BG.png");

const ChatScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.bg}>
      <FlatList
        data={messages}
        renderItem={({ item }) => 
          <Message message={item}/>
        }
        // style={styles.list}
        // inverted
      />
      {/* <FlatList
        data={chats}
        renderItem={({item}) => 
            <ChatListItem chat={item}/>
        }
        /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  }
});



export default ChatScreen;

