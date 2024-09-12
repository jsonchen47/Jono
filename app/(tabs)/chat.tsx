import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChatListItem from '../../components/ChatListItem';

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

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ChatListItem chat={chat} bool={true} string="Hello"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
