import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";
import { GraphQLResult } from '@aws-amplify/api-graphql';


const InputBox = ({chatroom}: any) => {
    const [text, setText] = useState('');

    const onSend = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const newMessage = {
        chatroomID: chatroom.id,
        text,
        userID: authUser.attributes.sub,
      };

      const newMessageData = await API.graphql(
        graphqlOperation(createMessage, { input: newMessage })
      );

      const castedNewMessageData = newMessageData as GraphQLResult<any>
  
      setText("");
  
      // set the new message as LastMessage of the ChatRoom
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            _version: chatroom._version,
            chatRoomLastMessageId: castedNewMessageData.data.createMessage.id,
            id: chatroom.id,
          },
        })
      );
    }
  return (
    // <SafeAreaView>
    <View style={styles.container}>
        {/* Icon */}
      <AntDesign name= 'plus' size={24} color="royalBlue"/>

      {/* Text Input */}
      <TextInput 
        value={text} 
        onChangeText={setText} 
        style={styles.input} 
        placeholder="type your message..."
        /> 
      <MaterialIcons onPress = {onSend} style={styles.send} name="send" size={16} color="white"/>
    </View>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
        padding: 5,
        paddingHorizontal: 10, 
        alignItems: 'center'
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 10, 
        marginHorizontal: 10,

        borderRadius: 50, 
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
    },
    send: {
        backgroundColor: 'royalblue', 
        padding: 7, 
        borderRadius: 15, 
        overflow: 'hidden', 
    }
});

export default InputBox