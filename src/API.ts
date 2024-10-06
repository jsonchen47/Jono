/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  ownerIDs?: Array< string | null > | null,
  title: string,
  description?: string | null,
  image?: string | null,
  skills?: Array< string | null > | null,
  resources?: Array< string | null > | null,
  categories?: Array< string | null > | null,
};

export type ModelProjectConditionInput = {
  ownerIDs?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  resources?: ModelStringInput | null,
  categories?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Project = {
  __typename: "Project",
  id: string,
  ownerIDs?: Array< string | null > | null,
  Users?: ModelUserProjectConnection | null,
  title: string,
  description?: string | null,
  image?: string | null,
  skills?: Array< string | null > | null,
  resources?: Array< string | null > | null,
  categories?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserProjectConnection = {
  __typename: "ModelUserProjectConnection",
  items:  Array<UserProject | null >,
  nextToken?: string | null,
};

export type UserProject = {
  __typename: "UserProject",
  id: string,
  projectId: string,
  userId: string,
  project: Project,
  user: User,
  createdAt: string,
  updatedAt: string,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  status?: string | null,
  image?: string | null,
  Messages?: ModelMessageConnection | null,
  ChatRooms?: ModelUserChatRoomConnection | null,
  Projects?: ModelUserProjectConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  createdAt: string,
  text: string,
  chatroomID: string,
  userID: string,
  images?: Array< string | null > | null,
  updatedAt: string,
};

export type ModelUserChatRoomConnection = {
  __typename: "ModelUserChatRoomConnection",
  items:  Array<UserChatRoom | null >,
  nextToken?: string | null,
};

export type UserChatRoom = {
  __typename: "UserChatRoom",
  id: string,
  chatRoomId: string,
  userId: string,
  chatRoom: ChatRoom,
  user: User,
  createdAt: string,
  updatedAt: string,
};

export type ChatRoom = {
  __typename: "ChatRoom",
  id: string,
  name?: string | null,
  image?: string | null,
  Messages?: ModelMessageConnection | null,
  users?: ModelUserChatRoomConnection | null,
  LastMessage?: Message | null,
  createdAt: string,
  updatedAt: string,
  chatRoomLastMessageId?: string | null,
};

export type UpdateProjectInput = {
  id: string,
  ownerIDs?: Array< string | null > | null,
  title?: string | null,
  description?: string | null,
  image?: string | null,
  skills?: Array< string | null > | null,
  resources?: Array< string | null > | null,
  categories?: Array< string | null > | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type CreateChatRoomInput = {
  id?: string | null,
  name?: string | null,
  image?: string | null,
  chatRoomLastMessageId?: string | null,
};

export type ModelChatRoomConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelChatRoomConditionInput | null > | null,
  or?: Array< ModelChatRoomConditionInput | null > | null,
  not?: ModelChatRoomConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  chatRoomLastMessageId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateChatRoomInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  chatRoomLastMessageId?: string | null,
};

export type DeleteChatRoomInput = {
  id: string,
};

export type CreateMessageInput = {
  id?: string | null,
  createdAt?: string | null,
  text: string,
  chatroomID: string,
  userID: string,
  images?: Array< string | null > | null,
};

export type ModelMessageConditionInput = {
  createdAt?: ModelStringInput | null,
  text?: ModelStringInput | null,
  chatroomID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  images?: ModelStringInput | null,
  and?: Array< ModelMessageConditionInput | null > | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  not?: ModelMessageConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateMessageInput = {
  id: string,
  createdAt?: string | null,
  text?: string | null,
  chatroomID?: string | null,
  userID?: string | null,
  images?: Array< string | null > | null,
};

export type DeleteMessageInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  status?: string | null,
  image?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  status?: string | null,
  image?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateUserProjectInput = {
  id?: string | null,
  projectId: string,
  userId: string,
};

export type ModelUserProjectConditionInput = {
  projectId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserProjectConditionInput | null > | null,
  or?: Array< ModelUserProjectConditionInput | null > | null,
  not?: ModelUserProjectConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateUserProjectInput = {
  id: string,
  projectId?: string | null,
  userId?: string | null,
};

export type DeleteUserProjectInput = {
  id: string,
};

export type CreateUserChatRoomInput = {
  id?: string | null,
  chatRoomId: string,
  userId: string,
};

export type ModelUserChatRoomConditionInput = {
  chatRoomId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelUserChatRoomConditionInput | null > | null,
  or?: Array< ModelUserChatRoomConditionInput | null > | null,
  not?: ModelUserChatRoomConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateUserChatRoomInput = {
  id: string,
  chatRoomId?: string | null,
  userId?: string | null,
};

export type DeleteUserChatRoomInput = {
  id: string,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  ownerIDs?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  resources?: ModelStringInput | null,
  categories?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
};

export type ModelChatRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelChatRoomFilterInput | null > | null,
  or?: Array< ModelChatRoomFilterInput | null > | null,
  not?: ModelChatRoomFilterInput | null,
  chatRoomLastMessageId?: ModelIDInput | null,
};

export type ModelChatRoomConnection = {
  __typename: "ModelChatRoomConnection",
  items:  Array<ChatRoom | null >,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  text?: ModelStringInput | null,
  chatroomID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  images?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMessageFilterInput | null > | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  not?: ModelMessageFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelUserProjectFilterInput = {
  id?: ModelIDInput | null,
  projectId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserProjectFilterInput | null > | null,
  or?: Array< ModelUserProjectFilterInput | null > | null,
  not?: ModelUserProjectFilterInput | null,
};

export type ModelUserChatRoomFilterInput = {
  id?: ModelIDInput | null,
  chatRoomId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserChatRoomFilterInput | null > | null,
  or?: Array< ModelUserChatRoomFilterInput | null > | null,
  not?: ModelUserChatRoomFilterInput | null,
};

export type ModelSubscriptionProjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  ownerIDs?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  skills?: ModelSubscriptionStringInput | null,
  resources?: ModelSubscriptionStringInput | null,
  categories?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionProjectFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionChatRoomFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatRoomFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatRoomFilterInput | null > | null,
  chatRoomLastMessageId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  chatroomID?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  images?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionUserProjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  projectId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserProjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserProjectFilterInput | null > | null,
};

export type ModelSubscriptionUserChatRoomFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  chatRoomId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserChatRoomFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserChatRoomFilterInput | null > | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    ownerIDs?: Array< string | null > | null,
    Users?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    title: string,
    description?: string | null,
    image?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    categories?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    ownerIDs?: Array< string | null > | null,
    Users?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    title: string,
    description?: string | null,
    image?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    categories?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    ownerIDs?: Array< string | null > | null,
    Users?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    title: string,
    description?: string | null,
    image?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    categories?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChatRoomMutationVariables = {
  input: CreateChatRoomInput,
  condition?: ModelChatRoomConditionInput | null,
};

export type CreateChatRoomMutation = {
  createChatRoom?:  {
    __typename: "ChatRoom",
    id: string,
    name?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    chatRoomLastMessageId?: string | null,
  } | null,
};

export type UpdateChatRoomMutationVariables = {
  input: UpdateChatRoomInput,
  condition?: ModelChatRoomConditionInput | null,
};

export type UpdateChatRoomMutation = {
  updateChatRoom?:  {
    __typename: "ChatRoom",
    id: string,
    name?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    chatRoomLastMessageId?: string | null,
  } | null,
};

export type DeleteChatRoomMutationVariables = {
  input: DeleteChatRoomInput,
  condition?: ModelChatRoomConditionInput | null,
};

export type DeleteChatRoomMutation = {
  deleteChatRoom?:  {
    __typename: "ChatRoom",
    id: string,
    name?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    chatRoomLastMessageId?: string | null,
  } | null,
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    text: string,
    chatroomID: string,
    userID: string,
    images?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    text: string,
    chatroomID: string,
    userID: string,
    images?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput,
  condition?: ModelMessageConditionInput | null,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    text: string,
    chatroomID: string,
    userID: string,
    images?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    status?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ChatRooms?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Projects?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    status?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ChatRooms?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Projects?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    status?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ChatRooms?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Projects?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserProjectMutationVariables = {
  input: CreateUserProjectInput,
  condition?: ModelUserProjectConditionInput | null,
};

export type CreateUserProjectMutation = {
  createUserProject?:  {
    __typename: "UserProject",
    id: string,
    projectId: string,
    userId: string,
    project:  {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserProjectMutationVariables = {
  input: UpdateUserProjectInput,
  condition?: ModelUserProjectConditionInput | null,
};

export type UpdateUserProjectMutation = {
  updateUserProject?:  {
    __typename: "UserProject",
    id: string,
    projectId: string,
    userId: string,
    project:  {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserProjectMutationVariables = {
  input: DeleteUserProjectInput,
  condition?: ModelUserProjectConditionInput | null,
};

export type DeleteUserProjectMutation = {
  deleteUserProject?:  {
    __typename: "UserProject",
    id: string,
    projectId: string,
    userId: string,
    project:  {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserChatRoomMutationVariables = {
  input: CreateUserChatRoomInput,
  condition?: ModelUserChatRoomConditionInput | null,
};

export type CreateUserChatRoomMutation = {
  createUserChatRoom?:  {
    __typename: "UserChatRoom",
    id: string,
    chatRoomId: string,
    userId: string,
    chatRoom:  {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserChatRoomMutationVariables = {
  input: UpdateUserChatRoomInput,
  condition?: ModelUserChatRoomConditionInput | null,
};

export type UpdateUserChatRoomMutation = {
  updateUserChatRoom?:  {
    __typename: "UserChatRoom",
    id: string,
    chatRoomId: string,
    userId: string,
    chatRoom:  {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserChatRoomMutationVariables = {
  input: DeleteUserChatRoomInput,
  condition?: ModelUserChatRoomConditionInput | null,
};

export type DeleteUserChatRoomMutation = {
  deleteUserChatRoom?:  {
    __typename: "UserChatRoom",
    id: string,
    chatRoomId: string,
    userId: string,
    chatRoom:  {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    ownerIDs?: Array< string | null > | null,
    Users?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    title: string,
    description?: string | null,
    image?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    categories?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatRoomQueryVariables = {
  id: string,
};

export type GetChatRoomQuery = {
  getChatRoom?:  {
    __typename: "ChatRoom",
    id: string,
    name?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    chatRoomLastMessageId?: string | null,
  } | null,
};

export type ListChatRoomsQueryVariables = {
  filter?: ModelChatRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatRoomsQuery = {
  listChatRooms?:  {
    __typename: "ModelChatRoomConnection",
    items:  Array< {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    text: string,
    chatroomID: string,
    userID: string,
    images?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesByChatRoomQueryVariables = {
  chatroomID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesByChatRoomQuery = {
  listMessagesByChatRoom?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MessagesByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByUserIDQuery = {
  messagesByUserID?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    status?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ChatRooms?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Projects?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserProjectQueryVariables = {
  id: string,
};

export type GetUserProjectQuery = {
  getUserProject?:  {
    __typename: "UserProject",
    id: string,
    projectId: string,
    userId: string,
    project:  {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserProjectsQueryVariables = {
  filter?: ModelUserProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProjectsQuery = {
  listUserProjects?:  {
    __typename: "ModelUserProjectConnection",
    items:  Array< {
      __typename: "UserProject",
      id: string,
      projectId: string,
      userId: string,
      project:  {
        __typename: "Project",
        id: string,
        ownerIDs?: Array< string | null > | null,
        title: string,
        description?: string | null,
        image?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        categories?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserProjectsByProjectIdQueryVariables = {
  projectId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserProjectsByProjectIdQuery = {
  userProjectsByProjectId?:  {
    __typename: "ModelUserProjectConnection",
    items:  Array< {
      __typename: "UserProject",
      id: string,
      projectId: string,
      userId: string,
      project:  {
        __typename: "Project",
        id: string,
        ownerIDs?: Array< string | null > | null,
        title: string,
        description?: string | null,
        image?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        categories?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserProjectsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserProjectsByUserIdQuery = {
  userProjectsByUserId?:  {
    __typename: "ModelUserProjectConnection",
    items:  Array< {
      __typename: "UserProject",
      id: string,
      projectId: string,
      userId: string,
      project:  {
        __typename: "Project",
        id: string,
        ownerIDs?: Array< string | null > | null,
        title: string,
        description?: string | null,
        image?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        categories?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserChatRoomQueryVariables = {
  id: string,
};

export type GetUserChatRoomQuery = {
  getUserChatRoom?:  {
    __typename: "UserChatRoom",
    id: string,
    chatRoomId: string,
    userId: string,
    chatRoom:  {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserChatRoomsQueryVariables = {
  filter?: ModelUserChatRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserChatRoomsQuery = {
  listUserChatRooms?:  {
    __typename: "ModelUserChatRoomConnection",
    items:  Array< {
      __typename: "UserChatRoom",
      id: string,
      chatRoomId: string,
      userId: string,
      chatRoom:  {
        __typename: "ChatRoom",
        id: string,
        name?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        chatRoomLastMessageId?: string | null,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserChatRoomsByChatRoomIdQueryVariables = {
  chatRoomId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserChatRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserChatRoomsByChatRoomIdQuery = {
  userChatRoomsByChatRoomId?:  {
    __typename: "ModelUserChatRoomConnection",
    items:  Array< {
      __typename: "UserChatRoom",
      id: string,
      chatRoomId: string,
      userId: string,
      chatRoom:  {
        __typename: "ChatRoom",
        id: string,
        name?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        chatRoomLastMessageId?: string | null,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserChatRoomsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserChatRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserChatRoomsByUserIdQuery = {
  userChatRoomsByUserId?:  {
    __typename: "ModelUserChatRoomConnection",
    items:  Array< {
      __typename: "UserChatRoom",
      id: string,
      chatRoomId: string,
      userId: string,
      chatRoom:  {
        __typename: "ChatRoom",
        id: string,
        name?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        chatRoomLastMessageId?: string | null,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    ownerIDs?: Array< string | null > | null,
    Users?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    title: string,
    description?: string | null,
    image?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    categories?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    ownerIDs?: Array< string | null > | null,
    Users?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    title: string,
    description?: string | null,
    image?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    categories?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    ownerIDs?: Array< string | null > | null,
    Users?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    title: string,
    description?: string | null,
    image?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    categories?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatRoomSubscriptionVariables = {
  filter?: ModelSubscriptionChatRoomFilterInput | null,
};

export type OnCreateChatRoomSubscription = {
  onCreateChatRoom?:  {
    __typename: "ChatRoom",
    id: string,
    name?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    chatRoomLastMessageId?: string | null,
  } | null,
};

export type OnUpdateChatRoomSubscriptionVariables = {
  filter?: ModelSubscriptionChatRoomFilterInput | null,
};

export type OnUpdateChatRoomSubscription = {
  onUpdateChatRoom?:  {
    __typename: "ChatRoom",
    id: string,
    name?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    chatRoomLastMessageId?: string | null,
  } | null,
};

export type OnDeleteChatRoomSubscriptionVariables = {
  filter?: ModelSubscriptionChatRoomFilterInput | null,
};

export type OnDeleteChatRoomSubscription = {
  onDeleteChatRoom?:  {
    __typename: "ChatRoom",
    id: string,
    name?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    users?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    LastMessage?:  {
      __typename: "Message",
      id: string,
      createdAt: string,
      text: string,
      chatroomID: string,
      userID: string,
      images?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    chatRoomLastMessageId?: string | null,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    text: string,
    chatroomID: string,
    userID: string,
    images?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    text: string,
    chatroomID: string,
    userID: string,
    images?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    id: string,
    createdAt: string,
    text: string,
    chatroomID: string,
    userID: string,
    images?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    status?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ChatRooms?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Projects?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    status?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ChatRooms?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Projects?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    status?: string | null,
    image?: string | null,
    Messages?:  {
      __typename: "ModelMessageConnection",
      items:  Array< {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ChatRooms?:  {
      __typename: "ModelUserChatRoomConnection",
      items:  Array< {
        __typename: "UserChatRoom",
        id: string,
        chatRoomId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Projects?:  {
      __typename: "ModelUserProjectConnection",
      items:  Array< {
        __typename: "UserProject",
        id: string,
        projectId: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserProjectSubscriptionVariables = {
  filter?: ModelSubscriptionUserProjectFilterInput | null,
};

export type OnCreateUserProjectSubscription = {
  onCreateUserProject?:  {
    __typename: "UserProject",
    id: string,
    projectId: string,
    userId: string,
    project:  {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserProjectSubscriptionVariables = {
  filter?: ModelSubscriptionUserProjectFilterInput | null,
};

export type OnUpdateUserProjectSubscription = {
  onUpdateUserProject?:  {
    __typename: "UserProject",
    id: string,
    projectId: string,
    userId: string,
    project:  {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserProjectSubscriptionVariables = {
  filter?: ModelSubscriptionUserProjectFilterInput | null,
};

export type OnDeleteUserProjectSubscription = {
  onDeleteUserProject?:  {
    __typename: "UserProject",
    id: string,
    projectId: string,
    userId: string,
    project:  {
      __typename: "Project",
      id: string,
      ownerIDs?: Array< string | null > | null,
      Users?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      title: string,
      description?: string | null,
      image?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      categories?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserChatRoomSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatRoomFilterInput | null,
};

export type OnCreateUserChatRoomSubscription = {
  onCreateUserChatRoom?:  {
    __typename: "UserChatRoom",
    id: string,
    chatRoomId: string,
    userId: string,
    chatRoom:  {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserChatRoomSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatRoomFilterInput | null,
};

export type OnUpdateUserChatRoomSubscription = {
  onUpdateUserChatRoom?:  {
    __typename: "UserChatRoom",
    id: string,
    chatRoomId: string,
    userId: string,
    chatRoom:  {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserChatRoomSubscriptionVariables = {
  filter?: ModelSubscriptionUserChatRoomFilterInput | null,
};

export type OnDeleteUserChatRoomSubscription = {
  onDeleteUserChatRoom?:  {
    __typename: "UserChatRoom",
    id: string,
    chatRoomId: string,
    userId: string,
    chatRoom:  {
      __typename: "ChatRoom",
      id: string,
      name?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      users?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      LastMessage?:  {
        __typename: "Message",
        id: string,
        createdAt: string,
        text: string,
        chatroomID: string,
        userID: string,
        images?: Array< string | null > | null,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      chatRoomLastMessageId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      name: string,
      status?: string | null,
      image?: string | null,
      Messages?:  {
        __typename: "ModelMessageConnection",
        nextToken?: string | null,
      } | null,
      ChatRooms?:  {
        __typename: "ModelUserChatRoomConnection",
        nextToken?: string | null,
      } | null,
      Projects?:  {
        __typename: "ModelUserProjectConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
