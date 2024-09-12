import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'

const InputBox = () => {
    const [newMessage, setNewMessage] = useState('');

    const onSend = () => {
        console.warn('Sending a new message: ', newMessage);
        
        setNewMessage('');
    }
  return (
    // <SafeAreaView>
    <View style={styles.container}>
        {/* Icon */}
      <AntDesign name= 'plus' size={24} color="royalBlue"/>

      {/* Text Input */}
      <TextInput 
        value={newMessage} 
        onChangeText={setNewMessage} 
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