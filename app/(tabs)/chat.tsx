import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChatListItem from '../../components/ChatListItem';


export default function ChatScreen() {
  return (
    <View>
      <ChatListItem/>
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
