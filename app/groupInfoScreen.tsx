// import React from 'react'
// import { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   FlatList,
//   View,
//   Text,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { useLocalSearchParams } from 'expo-router';
// import { GraphQLResult } from '@aws-amplify/api-graphql';
// import { API, graphqlOperation } from "aws-amplify";
// import { onUpdateChatRoom } from "../src/graphql/subscriptions";
// import { deleteUserChatRoom } from "../src/graphql/mutations";
// import ContactListItem from "../src/components/ContactListItem";
// import { Observable } from 'rxjs'; // For Observable type
// import { ListItem } from '@rneui/themed';


// const ChatRoomInfo = () => {
//   const [chatRoom, setChatRoom] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   // const [users, setUsers] = useState<any>(null);
//   const route = useRoute();
//   const navigation = useNavigation();

//   // const chatroomID = route.params.id;
//   const {chatroomID} = useLocalSearchParams();

//   const fetchChatRoom = async () => {
//     setLoading(true);
//     const result = await API.graphql(
//       graphqlOperation(getChatRoom, { id: chatroomID })
//     );
//     const castedResult = result as GraphQLResult<any>
//     setChatRoom(castedResult.data?.getChatRoom);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchChatRoom();

//     // Subscribe to onUpdateChatRoom
//     const subscription = API.graphql(
//       graphqlOperation(onUpdateChatRoom, {
//         filter: { id: { eq: chatroomID } },
//       })
//     ) as unknown as Observable<GraphQLResult<any>>;

    
//     const subscriptionHandler = subscription.subscribe({
//       next: ({ value }: any) => {
//         setChatRoom((cr: any) => ({
//           ...(cr || {}),
//           ...value.data.onUpdateChatRoom,
//         }));
//       },
//       error: (error) => console.warn(error),
//     });

//     // Stop receiving data updates from the subscription
//     return () => subscriptionHandler.unsubscribe();
//   }, [chatroomID]);

//   const removeChatRoomUser = async (chatRoomUser: any) => {
//     // await API.graphql(
//     //   graphqlOperation(deleteUserChatRoom, {
//     //     input: { _version: chatRoomUser._version, id: chatRoomUser.id },
//     //   })
//     // );

//   };

//   const onContactPress = (chatRoomUser: any) => {
//     Alert.alert(
//       "Removing the user",
//       `Are you sure you want to remove ${chatRoomUser.user.name} from this group`,
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Remove",
//           style: "destructive",
//           onPress: () => removeChatRoomUser(chatRoomUser),
//         },
//       ]
//     );
//   };

//   if (!chatRoom) {
//     return <ActivityIndicator />;
//   }


//   const users = chatRoom.users.items.filter((item: any) => !item._deleted);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{chatRoom.name}</Text>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Text style={styles.sectionTitle}>{users?.length} Participants</Text>
//         <Text
//           // onPress={() => navigation.navigate("Add Contacts", { chatRoom })}
//           style={{ fontWeight: "bold", color: "royalblue" }}
//         >
//           Invite friends
//         </Text>
//       </View>
//       <View style={styles.section}>
//         <FlatList
//           data={users}
//           renderItem={({ item }) => (
//             <ContactListItem
//               user={item.user}
//               onPress={() => onContactPress(item)} 
//               selectable={false} 
//               isSelected={false}   
//             />
//           )}
//           onRefresh={fetchChatRoom}
//           refreshing={loading}
//         />
//       </View>
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 30,
//   },
//   sectionTitle: {
//     fontWeight: "bold",
//     fontSize: 18,
//     marginTop: 20,
//   },
//   section: {
//     backgroundColor: "white",
//     borderRadius: 5,
//     marginVertical: 10,
//   },
// });

// // getChatRoom graphql operation
// export const getChatRoom = /* GraphQL */ `
//   query GetChatRoom($id: ID!) {
//     getChatRoom(id: $id) {
//       id
//       updatedAt
//       name
//       users {
//         items {
//           id
//           chatRoomId
//           createdAt
//           updatedAt
//           user {
//             id
//             name
//             status
//             image
//           }
//         }
//         nextToken
//       }
//       createdAt
//       chatRoomLastMessageId
//     }
//   }
// `;

// export default ChatRoomInfo