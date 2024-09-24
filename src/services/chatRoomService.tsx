import {API, graphqlOperation, Auth} from "aws-amplify"
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { createChatRoom } from "../graphql/mutations";



const getCommonChatRoomWithUser = async (userID: any) => {
    const authUser = await Auth.currentAuthenticatedUser(); 
    // get all chat rooms of user 1
    const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
    );
    const castedResponse = response as GraphQLResult<any>; 
    const chatRooms = castedResponse.data?.getUser?.ChatRooms?.items || [];

    // console.log(chatRooms)
    const chatRoom = chatRooms.find((chatRoomItem: any) => {
        // console.log(chatRoom);
        return chatRoomItem.chatRoom.users.items.some(
            (userItem: any) => userItem.user.id == userID
            );
    });

    return chatRoom;
    // get all chat rooms of user 2

    // remove chat rooms with more than 2 chat rooms

    // get the common chat rooms 
};

export default getCommonChatRoomWithUser;

export const listChatRooms = /* GraphQL */
    `query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            ChatRooms {
                items {
                chatRoom {
                    id
                    users {
                    items {
                        user {
                        id
                        image
                        name
                        }
                    }
                    }
                    LastMessage {
                    id
                    createdAt
                    text
                    }
                }
                }
            }
        }
    }`
    
    