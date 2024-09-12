import { View, Text, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import {useEffect} from 'react';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native'
import Message from '../components/Message';
import messages from '../../assets/data/messages.json';
import InputBox from '../components/InputBox'
import { useHeaderHeight } from '@react-navigation/elements'


const bg = require("../../assets/images/BG.png");

const ChatScreen = () => {
  const route = useRoute<RouteProp<{ params: { name: string } }, 'params'>>();
  const navigation = useNavigation(); 



  useEffect(() => {
    navigation.setOptions({title: route.params?.name ?? "Name"});
  }, [route.params.name])

  const height = useHeaderHeight()
  return (
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
        <InputBox/>
      </ImageBackground>
    </KeyboardAvoidingView>
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

