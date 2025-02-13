/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProject = /* GraphQL */ `mutation CreateProject(
  $input: CreateProjectInput!
  $condition: ModelProjectConditionInput
) {
  createProject(input: $input, condition: $condition) {
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
    joinRequests {
      items {
        id
        userID
        projectID
        createdAt
        viewed
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    groupChatID
    isFeatured
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProjectMutationVariables,
  APITypes.CreateProjectMutation
>;
export const updateProject = /* GraphQL */ `mutation UpdateProject(
  $input: UpdateProjectInput!
  $condition: ModelProjectConditionInput
) {
  updateProject(input: $input, condition: $condition) {
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
    joinRequests {
      items {
        id
        userID
        projectID
        createdAt
        viewed
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    groupChatID
    isFeatured
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProjectMutationVariables,
  APITypes.UpdateProjectMutation
>;
export const deleteProject = /* GraphQL */ `mutation DeleteProject(
  $input: DeleteProjectInput!
  $condition: ModelProjectConditionInput
) {
  deleteProject(input: $input, condition: $condition) {
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
    joinRequests {
      items {
        id
        userID
        projectID
        createdAt
        viewed
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    groupChatID
    isFeatured
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProjectMutationVariables,
  APITypes.DeleteProjectMutation
>;
export const createChatRoom = /* GraphQL */ `mutation CreateChatRoom(
  $input: CreateChatRoomInput!
  $condition: ModelChatRoomConditionInput
) {
  createChatRoom(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateChatRoomMutationVariables,
  APITypes.CreateChatRoomMutation
>;
export const updateChatRoom = /* GraphQL */ `mutation UpdateChatRoom(
  $input: UpdateChatRoomInput!
  $condition: ModelChatRoomConditionInput
) {
  updateChatRoom(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChatRoomMutationVariables,
  APITypes.UpdateChatRoomMutation
>;
export const deleteChatRoom = /* GraphQL */ `mutation DeleteChatRoom(
  $input: DeleteChatRoomInput!
  $condition: ModelChatRoomConditionInput
) {
  deleteChatRoom(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChatRoomMutationVariables,
  APITypes.DeleteChatRoomMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $input: CreateMessageInput!
  $condition: ModelMessageConditionInput
) {
  createMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $input: UpdateMessageInput!
  $condition: ModelMessageConditionInput
) {
  updateMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $input: DeleteMessageInput!
  $condition: ModelMessageConditionInput
) {
  deleteMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
    connections {
      items {
        id
        userID
        connectedUserID
        status
        createdAt
        viewed
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    joinRequests {
      items {
        id
        userID
        projectID
        createdAt
        viewed
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    premium
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
    connections {
      items {
        id
        userID
        connectedUserID
        status
        createdAt
        viewed
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    joinRequests {
      items {
        id
        userID
        projectID
        createdAt
        viewed
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    premium
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
    connections {
      items {
        id
        userID
        connectedUserID
        status
        createdAt
        viewed
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    joinRequests {
      items {
        id
        userID
        projectID
        createdAt
        viewed
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    premium
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createConnection = /* GraphQL */ `mutation CreateConnection(
  $input: CreateConnectionInput!
  $condition: ModelConnectionConditionInput
) {
  createConnection(input: $input, condition: $condition) {
    id
    userID
    connectedUserID
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
    connectedUser {
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
    status
    createdAt
    viewed
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateConnectionMutationVariables,
  APITypes.CreateConnectionMutation
>;
export const updateConnection = /* GraphQL */ `mutation UpdateConnection(
  $input: UpdateConnectionInput!
  $condition: ModelConnectionConditionInput
) {
  updateConnection(input: $input, condition: $condition) {
    id
    userID
    connectedUserID
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
    connectedUser {
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
    status
    createdAt
    viewed
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateConnectionMutationVariables,
  APITypes.UpdateConnectionMutation
>;
export const deleteConnection = /* GraphQL */ `mutation DeleteConnection(
  $input: DeleteConnectionInput!
  $condition: ModelConnectionConditionInput
) {
  deleteConnection(input: $input, condition: $condition) {
    id
    userID
    connectedUserID
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
    connectedUser {
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
    status
    createdAt
    viewed
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteConnectionMutationVariables,
  APITypes.DeleteConnectionMutation
>;
export const createJoinRequest = /* GraphQL */ `mutation CreateJoinRequest(
  $input: CreateJoinRequestInput!
  $condition: ModelJoinRequestConditionInput
) {
  createJoinRequest(input: $input, condition: $condition) {
    id
    userID
    projectID
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
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
      joinRequests {
        nextToken
        __typename
      }
      groupChatID
      isFeatured
      createdAt
      updatedAt
      __typename
    }
    createdAt
    viewed
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateJoinRequestMutationVariables,
  APITypes.CreateJoinRequestMutation
>;
export const updateJoinRequest = /* GraphQL */ `mutation UpdateJoinRequest(
  $input: UpdateJoinRequestInput!
  $condition: ModelJoinRequestConditionInput
) {
  updateJoinRequest(input: $input, condition: $condition) {
    id
    userID
    projectID
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
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
      joinRequests {
        nextToken
        __typename
      }
      groupChatID
      isFeatured
      createdAt
      updatedAt
      __typename
    }
    createdAt
    viewed
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateJoinRequestMutationVariables,
  APITypes.UpdateJoinRequestMutation
>;
export const deleteJoinRequest = /* GraphQL */ `mutation DeleteJoinRequest(
  $input: DeleteJoinRequestInput!
  $condition: ModelJoinRequestConditionInput
) {
  deleteJoinRequest(input: $input, condition: $condition) {
    id
    userID
    projectID
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
      premium
      createdAt
      updatedAt
      __typename
    }
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
      joinRequests {
        nextToken
        __typename
      }
      groupChatID
      isFeatured
      createdAt
      updatedAt
      __typename
    }
    createdAt
    viewed
    status
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteJoinRequestMutationVariables,
  APITypes.DeleteJoinRequestMutation
>;
export const createUserProject = /* GraphQL */ `mutation CreateUserProject(
  $input: CreateUserProjectInput!
  $condition: ModelUserProjectConditionInput
) {
  createUserProject(input: $input, condition: $condition) {
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
      joinRequests {
        nextToken
        __typename
      }
      groupChatID
      isFeatured
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
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
` as GeneratedMutation<
  APITypes.CreateUserProjectMutationVariables,
  APITypes.CreateUserProjectMutation
>;
export const updateUserProject = /* GraphQL */ `mutation UpdateUserProject(
  $input: UpdateUserProjectInput!
  $condition: ModelUserProjectConditionInput
) {
  updateUserProject(input: $input, condition: $condition) {
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
      joinRequests {
        nextToken
        __typename
      }
      groupChatID
      isFeatured
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
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
` as GeneratedMutation<
  APITypes.UpdateUserProjectMutationVariables,
  APITypes.UpdateUserProjectMutation
>;
export const deleteUserProject = /* GraphQL */ `mutation DeleteUserProject(
  $input: DeleteUserProjectInput!
  $condition: ModelUserProjectConditionInput
) {
  deleteUserProject(input: $input, condition: $condition) {
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
      joinRequests {
        nextToken
        __typename
      }
      groupChatID
      isFeatured
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
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
` as GeneratedMutation<
  APITypes.DeleteUserProjectMutationVariables,
  APITypes.DeleteUserProjectMutation
>;
export const createUserChatRoom = /* GraphQL */ `mutation CreateUserChatRoom(
  $input: CreateUserChatRoomInput!
  $condition: ModelUserChatRoomConditionInput
) {
  createUserChatRoom(input: $input, condition: $condition) {
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
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
` as GeneratedMutation<
  APITypes.CreateUserChatRoomMutationVariables,
  APITypes.CreateUserChatRoomMutation
>;
export const updateUserChatRoom = /* GraphQL */ `mutation UpdateUserChatRoom(
  $input: UpdateUserChatRoomInput!
  $condition: ModelUserChatRoomConditionInput
) {
  updateUserChatRoom(input: $input, condition: $condition) {
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
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
` as GeneratedMutation<
  APITypes.UpdateUserChatRoomMutationVariables,
  APITypes.UpdateUserChatRoomMutation
>;
export const deleteUserChatRoom = /* GraphQL */ `mutation DeleteUserChatRoom(
  $input: DeleteUserChatRoomInput!
  $condition: ModelUserChatRoomConditionInput
) {
  deleteUserChatRoom(input: $input, condition: $condition) {
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
      connections {
        nextToken
        __typename
      }
      joinRequests {
        nextToken
        __typename
      }
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
` as GeneratedMutation<
  APITypes.DeleteUserChatRoomMutationVariables,
  APITypes.DeleteUserChatRoomMutation
>;
