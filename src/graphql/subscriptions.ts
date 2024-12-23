/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateProject = /* GraphQL */ `subscription OnCreateProject($filter: ModelSubscriptionProjectFilterInput) {
  onCreateProject(filter: $filter) {
    id
    ownerIDs
    Users {
      items {
        id
        projectId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    title
    description
    image
    skills
    resources
    categories
    longitude
    latitude
    city
    joinRequestIDs
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProjectSubscriptionVariables,
  APITypes.OnCreateProjectSubscription
>;
export const onUpdateProject = /* GraphQL */ `subscription OnUpdateProject($filter: ModelSubscriptionProjectFilterInput) {
  onUpdateProject(filter: $filter) {
    id
    ownerIDs
    Users {
      items {
        id
        projectId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    title
    description
    image
    skills
    resources
    categories
    longitude
    latitude
    city
    joinRequestIDs
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProjectSubscriptionVariables,
  APITypes.OnUpdateProjectSubscription
>;
export const onDeleteProject = /* GraphQL */ `subscription OnDeleteProject($filter: ModelSubscriptionProjectFilterInput) {
  onDeleteProject(filter: $filter) {
    id
    ownerIDs
    Users {
      items {
        id
        projectId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    title
    description
    image
    skills
    resources
    categories
    longitude
    latitude
    city
    joinRequestIDs
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProjectSubscriptionVariables,
  APITypes.OnDeleteProjectSubscription
>;
export const onCreateChatRoom = /* GraphQL */ `subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
  onCreateChatRoom(filter: $filter) {
    id
    name
    image
    Messages {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        images
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
    LastMessage {
      id
      createdAt
      text
      chatroomID
      userID
      images
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    chatRoomLastMessageId
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
    name
    image
    Messages {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        images
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
    LastMessage {
      id
      createdAt
      text
      chatroomID
      userID
      images
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    chatRoomLastMessageId
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
    name
    image
    Messages {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        images
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
    LastMessage {
      id
      createdAt
      text
      chatroomID
      userID
      images
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    chatRoomLastMessageId
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
    createdAt
    text
    chatroomID
    userID
    images
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
    createdAt
    text
    chatroomID
    userID
    images
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
    createdAt
    text
    chatroomID
    userID
    images
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
        createdAt
        text
        chatroomID
        userID
        images
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
    Projects {
      items {
        id
        projectId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    savedProjectsIDs
    bio
    numProjects
    numTeams
    numConnections
    username
    skills
    resources
    links
    premium
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
        createdAt
        text
        chatroomID
        userID
        images
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
    Projects {
      items {
        id
        projectId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    savedProjectsIDs
    bio
    numProjects
    numTeams
    numConnections
    username
    skills
    resources
    links
    premium
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
        createdAt
        text
        chatroomID
        userID
        images
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
    Projects {
      items {
        id
        projectId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    savedProjectsIDs
    bio
    numProjects
    numTeams
    numConnections
    username
    skills
    resources
    links
    premium
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateUserProject = /* GraphQL */ `subscription OnCreateUserProject(
  $filter: ModelSubscriptionUserProjectFilterInput
) {
  onCreateUserProject(filter: $filter) {
    id
    projectId
    userId
    project {
      id
      ownerIDs
      Users {
        nextToken
        __typename
      }
      title
      description
      image
      skills
      resources
      categories
      longitude
      latitude
      city
      joinRequestIDs
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
      Projects {
        nextToken
        __typename
      }
      savedProjectsIDs
      bio
      numProjects
      numTeams
      numConnections
      username
      skills
      resources
      links
      premium
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
  APITypes.OnCreateUserProjectSubscriptionVariables,
  APITypes.OnCreateUserProjectSubscription
>;
export const onUpdateUserProject = /* GraphQL */ `subscription OnUpdateUserProject(
  $filter: ModelSubscriptionUserProjectFilterInput
) {
  onUpdateUserProject(filter: $filter) {
    id
    projectId
    userId
    project {
      id
      ownerIDs
      Users {
        nextToken
        __typename
      }
      title
      description
      image
      skills
      resources
      categories
      longitude
      latitude
      city
      joinRequestIDs
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
      Projects {
        nextToken
        __typename
      }
      savedProjectsIDs
      bio
      numProjects
      numTeams
      numConnections
      username
      skills
      resources
      links
      premium
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
  APITypes.OnUpdateUserProjectSubscriptionVariables,
  APITypes.OnUpdateUserProjectSubscription
>;
export const onDeleteUserProject = /* GraphQL */ `subscription OnDeleteUserProject(
  $filter: ModelSubscriptionUserProjectFilterInput
) {
  onDeleteUserProject(filter: $filter) {
    id
    projectId
    userId
    project {
      id
      ownerIDs
      Users {
        nextToken
        __typename
      }
      title
      description
      image
      skills
      resources
      categories
      longitude
      latitude
      city
      joinRequestIDs
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
      Projects {
        nextToken
        __typename
      }
      savedProjectsIDs
      bio
      numProjects
      numTeams
      numConnections
      username
      skills
      resources
      links
      premium
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
  APITypes.OnDeleteUserProjectSubscriptionVariables,
  APITypes.OnDeleteUserProjectSubscription
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
      name
      image
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        images
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
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
      Projects {
        nextToken
        __typename
      }
      savedProjectsIDs
      bio
      numProjects
      numTeams
      numConnections
      username
      skills
      resources
      links
      premium
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
      name
      image
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        images
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
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
      Projects {
        nextToken
        __typename
      }
      savedProjectsIDs
      bio
      numProjects
      numTeams
      numConnections
      username
      skills
      resources
      links
      premium
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
      name
      image
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        images
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
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
      Projects {
        nextToken
        __typename
      }
      savedProjectsIDs
      bio
      numProjects
      numTeams
      numConnections
      username
      skills
      resources
      links
      premium
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
