import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Auth} from 'aws-amplify'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from 'expo-router';


import getCommonChatRoomWithUser from '../../services/chatRoomService'
import { useEffect, useState} from 'react';

dayjs.extend(relativeTime);

const ChatListItem = ({chat}: any) => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser(); 

      const userItem = chat.users.items.find((item: any) => item.user.id != authUser.attributes.sub);
      setUser(userItem?.user)
    };

    fetchUser(); 
  }, [])

  console.log(user)

  const navigation = useNavigation<any>(); 
    return (
    <Pressable onPress={() => router.push({pathname: '/chatScreen/[id]', params: {id: chat.id, name: user?.name}})} style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: user?.image}}
          style={styles.image}/>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>
              {user?.name}
          </Text>
            <Text style={styles.subTitle}>{dayjs(chat.lastMessage?.createdAt).fromNow(true)}</Text>
          </View>
          <Text numberOfLines={2} style={styles.subTitle}>
            {chat.lastMessage?.text}
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
  