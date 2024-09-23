import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useRouter } from 'expo-router';


import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ContactListItem = ({user}: any) => {
  const router = useRouter();

  const onPress = async () => {
    console.warn("Pressed");
    // Check if we already have a chatroom with the user

    // Create a new ChatRoom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {input: {}})
    )
    console.log(newChatRoomData)
    const castedChatRoomData = newChatRoomData as GraphQLResult<any>; // Casting the chat room data 
    if (!castedChatRoomData.data?.createChatRoom) {
      console.log("Error creating the chat error")
    }
    const newChatRoom = castedChatRoomData.data?.createChatRoom;
    // Add the clicked user to the ChatRoom
    await API.graphql(graphqlOperation(createUserChatRoom, {
      input: {
        cchatRoomID: newChatRoom.id,
        userID: user.id
      }
    }))

    // Add the Auth user to the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser(); 
    await API.graphql(graphqlOperation(createUserChatRoom, {
      input: {
        chatRoomID: newChatRoom.id,
        userID: authUser.attributes.sub
      }
    }))

    // Navigate to the newly created ChatRoom
    router.push('/chat')
  };


  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: user.image}}
          style={styles.image}/>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;


const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    name: {
      flex: 1,
      fontWeight: 'bold',
    },
  });
  