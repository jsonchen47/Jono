import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useRouter } from 'expo-router';
import getCommonChatRoomWithUser from '../../services/chatRoomService'
import { AntDesign, FontAwesome } from "@expo/vector-icons";


import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ContactListItem = ({ 
  user, 
  onPress = () => {},
  selectable = false,
  isSelected = false,
}: { 
  user: any; 
  onPress?: () => void; 
  selectable: boolean; 
  isSelected: boolean; 
})  => {
  const router = useRouter();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* <View style={styles.container}>
        <Image source={{ uri: user.image}}
          style={styles.image}/>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
      </View>
      {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color="royalblue" />
        ) : (
          <FontAwesome name="circle-thin" size={24} color="lightgray" />
        ))} */}
         <Image source={{ uri: user.image }} style={styles.image} />

<View style={styles.content}>
  <Text style={styles.name} numberOfLines={1}>
    {user.name}
  </Text>

  <Text numberOfLines={2} style={styles.subTitle}>
    {user.status}
  </Text>
</View>
{selectable &&
  (isSelected ? (
    <AntDesign name="checkcircle" size={24} color="royalblue" />
  ) : (
    <FontAwesome name="circle-thin" size={24} color="lightgray" />
  ))}
      </Pressable>
  );
};

export default ContactListItem;


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

  