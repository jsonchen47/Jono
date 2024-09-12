import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ChatListItem = ({chat}: any) => {
    return (
    // <Text>ChatListItem</Text>

    <View style={styles.container}>
      <Image source={{ uri: chat.user.image}}
      style={styles.image}/>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.user.name}
        </Text>
          <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text>
        </View>
        <Text numberOfLines={2} style={styles.subTitle}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </View>
    );
};

export default ChatListItem;


const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 10, 
      marginVertical: 5,
      height: 70,
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
  