/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateChatRoom = /* GraphQL */ `subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
  onCreateChatRoom(filter: $filter) {
    id
    Messages {
      items {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    users {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatRoomSubscriptionVariables,
  APITypes.OnCreateChatRoomSubscription
>;
export const onUpdateChatRoom = /* GraphQL */ `subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
  onUpdateChatRoom(filter: $filter) {
    id
    Messages {
      items {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    users {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatRoomSubscriptionVariables,
  APITypes.OnUpdateChatRoomSubscription
>;
export const onDeleteChatRoom = /* GraphQL */ `subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
  onDeleteChatRoom(filter: $filter) {
    id
    Messages {
      items {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    users {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatRoomSubscriptionVariables,
  APITypes.OnDeleteChatRoomSubscription
>;
export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
  onCreateMessage(filter: $filter) {
    id
    text
    chatroomID
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
  onUpdateMessage(filter: $filter) {
    id
    text
    chatroomID
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
  onDeleteMessage(filter: $filter) {
    id
    text
    chatroomID
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
    id
    name
    status
    image
    Messages {
      items {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    ChatRooms {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
    id
    name
    status
    image
    Messages {
      items {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    ChatRooms {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
    id
    name
    status
    image
    Messages {
      items {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    ChatRooms {
      items {
        id
        chatRoomId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateUserChatRoom = /* GraphQL */ `subscription OnCreateUserChatRoom(
  $filter: ModelSubscriptionUserChatRoomFilterInput
) {
  onCreateUserChatRoom(filter: $filter) {
    id
    chatRoomId
    userId
    chatRoom {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    user {
      id
      name
      status
      image
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserChatRoomSubscriptionVariables,
  APITypes.OnCreateUserChatRoomSubscription
>;
export const onUpdateUserChatRoom = /* GraphQL */ `subscription OnUpdateUserChatRoom(
  $filter: ModelSubscriptionUserChatRoomFilterInput
) {
  onUpdateUserChatRoom(filter: $filter) {
    id
    chatRoomId
    userId
    chatRoom {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    user {
      id
      name
      status
      image
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserChatRoomSubscriptionVariables,
  APITypes.OnUpdateUserChatRoomSubscription
>;
export const onDeleteUserChatRoom = /* GraphQL */ `subscription OnDeleteUserChatRoom(
  $filter: ModelSubscriptionUserChatRoomFilterInput
) {
  onDeleteUserChatRoom(filter: $filter) {
    id
    chatRoomId
    userId
    chatRoom {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    user {
      id
      name
      status
      image
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserChatRoomSubscriptionVariables,
  APITypes.OnDeleteUserChatRoomSubscription
>;
