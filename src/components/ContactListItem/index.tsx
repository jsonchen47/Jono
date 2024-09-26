import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useRouter } from 'expo-router';
import getCommonChatRoomWithUser from '../../services/chatRoomService'


import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type ContactListItemProps = {
  user: any; // Allowing any type for the user
  onPress?: () => void; // Optional onPress function
};

const ContactListItem = ({ user, onPress = () => {} }: ContactListItemProps) => {
  const router = useRouter();

 


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
  