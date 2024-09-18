import { Link } from 'expo-router';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navigator from '../../src/navigation';
import chats from '../../assets/data/chats.json'
import ChatListItem from '../../src/components/ChatListItem'

const chat = {
  id: "1",
  user: {
    image: 
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
    name: "Lukas",
  },
  lastMessage: {
    text: "Oke",
    createdAt: "07:30"
  },
};

export default function Chat() {
  return (
    <View style={styles.container}>
    
      <FlatList
          data={chats}
          renderItem={({item}) => 
            <Link
            href={{
              pathname: '../chatScreen/[id]',
              params: { id: item.id, name: item.user.name },
            }}>
            <ChatListItem chat={item}/>
            {/* <Text>
              hi
            </Text> */}
            </Link>
      }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 50,
  },
});
