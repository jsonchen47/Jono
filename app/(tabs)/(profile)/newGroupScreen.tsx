// import React, { useState, useEffect } from "react";
// import { FlatList, View, TextInput, StyleSheet, Button } from "react-native";
// import ContactListItem from "../../../src/components/ContactListItem";
// import { API, graphqlOperation, Auth } from "aws-amplify";
// import { listUsers } from "../../../src/graphql/queries";
// import { createChatRoom, createUserChatRoom } from "../../../src/graphql/mutations";
// import { GraphQLResult } from '@aws-amplify/api-graphql';

// import { useNavigation } from "@react-navigation/native";
// import { router } from "expo-router";
// import { useRouter } from 'expo-router';


// const ContactsScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUserIds, setSelectedUserIds] = useState<any>([]);
//   const [name, setName] = useState("");

//   const navigation = useNavigation();

//   useEffect(() => {
//     const setUsersAsync = async() => {
//         const result = await API.graphql(graphqlOperation(listUsers))
//         const castedResult = result as GraphQLResult<any>
//         setUsers(castedResult.data?.listUsers?.items)
//     }
//     setUsersAsync(); 
//   }, []);

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <Button
//           title="Create"
//           disabled={!name || selectedUserIds.length < 1}
//           onPress={onCreateGroupPress}
//         />
//       ),
//     });
//   }, [name, selectedUserIds]);

//   const onCreateGroupPress = async () => {
//     // Create a new Chatroom
//     const newChatRoomData = await API.graphql(
//       graphqlOperation(createChatRoom, { input: { name } })
//     );
//     const castedNewChatRoomData = newChatRoomData as GraphQLResult<any>
//     if (!castedNewChatRoomData.data?.createChatRoom) {
//       console.log("Error creating the chat error");
//     }
//     const newChatRoom = castedNewChatRoomData.data?.createChatRoom;

//     // Add the selected users to the ChatRoom
//     await Promise.all(
      
//       selectedUserIds.map((userID: any) =>
//       {
//         return API.graphql(
//           graphqlOperation(createUserChatRoom, {
//             input: { chatRoomId: newChatRoom.id, userId: userID },
//           })
//         )
//       } 
//       )
//     );

//     // Add the auth user to the ChatRoom
//     const authUser = await Auth.currentAuthenticatedUser();
//     await API.graphql(
//       graphqlOperation(createUserChatRoom, {
//         input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
//       })
//     );

//     setSelectedUserIds([]);
//     setName("");
//     // navigate to the newly created ChatRoom
//     // navigation.navigate("Chat", { id: newChatRoom.id });
//     router.push({pathname: '/chatScreen/[id]', params: {id: newChatRoom.id, chatRoomID: newChatRoom.id, name: name}})
//   };

//   const onContactPress = (id: any) => {
//     setSelectedUserIds((userIds: any) => {
//       if (userIds.includes(id)) {
//         // remove id from selected
//         return [...userIds].filter((uid) => uid !== id);
//       } else {
//         // add id to selected
//         return [...userIds, id];
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Group name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />
//       <FlatList
//         data={users}
//         renderItem={({ item }: any) => (
//           <ContactListItem
//             user={item}
//             selectable
//             onPress={() => onContactPress(item.id)}
//             isSelected={selectedUserIds.includes(item.id)}
//           />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { backgroundColor: "white" },
//   input: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderColor: "lightgray",
//     padding: 10,
//     margin: 10,
//   },
// });

// export default ContactsScreen;
