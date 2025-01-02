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
  longitude?: number | null,
  latitude?: number | null,
  city?: string | null,
  joinRequestIDs?: Array< string | null > | null,
};

export type ModelProjectConditionInput = {
  ownerIDs?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  resources?: ModelStringInput | null,
  categories?: ModelStringInput | null,
  longitude?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  city?: ModelStringInput | null,
  joinRequestIDs?: ModelStringInput | null,
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

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
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
  longitude?: number | null,
  latitude?: number | null,
  city?: string | null,
  joinRequestIDs?: Array< string | null > | null,
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
  savedProjectsIDs?: Array< string | null > | null,
  bio?: string | null,
  numProjects?: number | null,
  numTeams?: number | null,
  numConnections?: number | null,
  username?: string | null,
  skills?: Array< string | null > | null,
  resources?: Array< string | null > | null,
  links?: Array< string | null > | null,
  premium?: boolean | null,
  connections?: ModelConnectionConnection | null,
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

export type ModelConnectionConnection = {
  __typename: "ModelConnectionConnection",
  items:  Array<Connection | null >,
  nextToken?: string | null,
};

export type Connection = {
  __typename: "Connection",
  id: string,
  userID: string,
  connectedUserID: string,
  user?: User | null,
  connectedUser?: User | null,
  status?: string | null,
  createdAt?: string | null,
  viewed?: boolean | null,
  updatedAt: string,
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
  longitude?: number | null,
  latitude?: number | null,
  city?: string | null,
  joinRequestIDs?: Array< string | null > | null,
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
  savedProjectsIDs?: Array< string | null > | null,
  bio?: string | null,
  numProjects?: number | null,
  numTeams?: number | null,
  numConnections?: number | null,
  username?: string | null,
  skills?: Array< string | null > | null,
  resources?: Array< string | null > | null,
  links?: Array< string | null > | null,
  premium?: boolean | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  savedProjectsIDs?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  numProjects?: ModelIntInput | null,
  numTeams?: ModelIntInput | null,
  numConnections?: ModelIntInput | null,
  username?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  resources?: ModelStringInput | null,
  links?: ModelStringInput | null,
  premium?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  status?: string | null,
  image?: string | null,
  savedProjectsIDs?: Array< string | null > | null,
  bio?: string | null,
  numProjects?: number | null,
  numTeams?: number | null,
  numConnections?: number | null,
  username?: string | null,
  skills?: Array< string | null > | null,
  resources?: Array< string | null > | null,
  links?: Array< string | null > | null,
  premium?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateConnectionInput = {
  id?: string | null,
  userID: string,
  connectedUserID: string,
  status?: string | null,
  createdAt?: string | null,
  viewed?: boolean | null,
};

export type ModelConnectionConditionInput = {
  userID?: ModelIDInput | null,
  connectedUserID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  viewed?: ModelBooleanInput | null,
  and?: Array< ModelConnectionConditionInput | null > | null,
  or?: Array< ModelConnectionConditionInput | null > | null,
  not?: ModelConnectionConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateConnectionInput = {
  id: string,
  userID?: string | null,
  connectedUserID?: string | null,
  status?: string | null,
  createdAt?: string | null,
  viewed?: boolean | null,
};

export type DeleteConnectionInput = {
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
  longitude?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  city?: ModelStringInput | null,
  joinRequestIDs?: ModelStringInput | null,
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

export type SearchableProjectFilterInput = {
  id?: SearchableIDFilterInput | null,
  ownerIDs?: SearchableStringFilterInput | null,
  title?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  image?: SearchableStringFilterInput | null,
  skills?: SearchableStringFilterInput | null,
  resources?: SearchableStringFilterInput | null,
  categories?: SearchableStringFilterInput | null,
  longitude?: SearchableFloatFilterInput | null,
  latitude?: SearchableFloatFilterInput | null,
  city?: SearchableStringFilterInput | null,
  joinRequestIDs?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableProjectFilterInput | null > | null,
  or?: Array< SearchableProjectFilterInput | null > | null,
  not?: SearchableProjectFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableFloatFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableProjectSortInput = {
  field?: SearchableProjectSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableProjectSortableFields {
  id = "id",
  ownerIDs = "ownerIDs",
  title = "title",
  description = "description",
  image = "image",
  skills = "skills",
  resources = "resources",
  categories = "categories",
  longitude = "longitude",
  latitude = "latitude",
  city = "city",
  joinRequestIDs = "joinRequestIDs",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableProjectAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableProjectAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
  cardinality = "cardinality",
}


export enum SearchableProjectAggregateField {
  id = "id",
  ownerIDs = "ownerIDs",
  title = "title",
  description = "description",
  image = "image",
  skills = "skills",
  resources = "resources",
  categories = "categories",
  longitude = "longitude",
  latitude = "latitude",
  city = "city",
  joinRequestIDs = "joinRequestIDs",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableProjectConnection = {
  __typename: "SearchableProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
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

export type SearchableChatRoomFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  image?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  chatRoomLastMessageId?: SearchableIDFilterInput | null,
  and?: Array< SearchableChatRoomFilterInput | null > | null,
  or?: Array< SearchableChatRoomFilterInput | null > | null,
  not?: SearchableChatRoomFilterInput | null,
};

export type SearchableChatRoomSortInput = {
  field?: SearchableChatRoomSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableChatRoomSortableFields {
  id = "id",
  name = "name",
  image = "image",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  chatRoomLastMessageId = "chatRoomLastMessageId",
}


export type SearchableChatRoomAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableChatRoomAggregateField,
};

export enum SearchableChatRoomAggregateField {
  id = "id",
  name = "name",
  image = "image",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  chatRoomLastMessageId = "chatRoomLastMessageId",
}


export type SearchableChatRoomConnection = {
  __typename: "SearchableChatRoomConnection",
  items:  Array<ChatRoom | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
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


export type SearchableMessageFilterInput = {
  id?: SearchableIDFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  text?: SearchableStringFilterInput | null,
  chatroomID?: SearchableIDFilterInput | null,
  userID?: SearchableIDFilterInput | null,
  images?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableMessageFilterInput | null > | null,
  or?: Array< SearchableMessageFilterInput | null > | null,
  not?: SearchableMessageFilterInput | null,
};

export type SearchableMessageSortInput = {
  field?: SearchableMessageSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableMessageSortableFields {
  id = "id",
  createdAt = "createdAt",
  text = "text",
  chatroomID = "chatroomID",
  userID = "userID",
  images = "images",
  updatedAt = "updatedAt",
}


export type SearchableMessageAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableMessageAggregateField,
};

export enum SearchableMessageAggregateField {
  id = "id",
  createdAt = "createdAt",
  text = "text",
  chatroomID = "chatroomID",
  userID = "userID",
  images = "images",
  updatedAt = "updatedAt",
}


export type SearchableMessageConnection = {
  __typename: "SearchableMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  savedProjectsIDs?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  numProjects?: ModelIntInput | null,
  numTeams?: ModelIntInput | null,
  numConnections?: ModelIntInput | null,
  username?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  resources?: ModelStringInput | null,
  links?: ModelStringInput | null,
  premium?: ModelBooleanInput | null,
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

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  status?: SearchableStringFilterInput | null,
  image?: SearchableStringFilterInput | null,
  savedProjectsIDs?: SearchableStringFilterInput | null,
  bio?: SearchableStringFilterInput | null,
  numProjects?: SearchableIntFilterInput | null,
  numTeams?: SearchableIntFilterInput | null,
  numConnections?: SearchableIntFilterInput | null,
  username?: SearchableStringFilterInput | null,
  skills?: SearchableStringFilterInput | null,
  resources?: SearchableStringFilterInput | null,
  links?: SearchableStringFilterInput | null,
  premium?: SearchableBooleanFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableUserFilterInput | null > | null,
  or?: Array< SearchableUserFilterInput | null > | null,
  not?: SearchableUserFilterInput | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableBooleanFilterInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  name = "name",
  status = "status",
  image = "image",
  savedProjectsIDs = "savedProjectsIDs",
  bio = "bio",
  numProjects = "numProjects",
  numTeams = "numTeams",
  numConnections = "numConnections",
  username = "username",
  skills = "skills",
  resources = "resources",
  links = "links",
  premium = "premium",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUserAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableUserAggregateField,
};

export enum SearchableUserAggregateField {
  id = "id",
  name = "name",
  status = "status",
  image = "image",
  savedProjectsIDs = "savedProjectsIDs",
  bio = "bio",
  numProjects = "numProjects",
  numTeams = "numTeams",
  numConnections = "numConnections",
  username = "username",
  skills = "skills",
  resources = "resources",
  links = "links",
  premium = "premium",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUserConnection = {
  __typename: "SearchableUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelConnectionFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  connectedUserID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  viewed?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelConnectionFilterInput | null > | null,
  or?: Array< ModelConnectionFilterInput | null > | null,
  not?: ModelConnectionFilterInput | null,
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
  longitude?: ModelSubscriptionFloatInput | null,
  latitude?: ModelSubscriptionFloatInput | null,
  city?: ModelSubscriptionStringInput | null,
  joinRequestIDs?: ModelSubscriptionStringInput | null,
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

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
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
  savedProjectsIDs?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  numProjects?: ModelSubscriptionIntInput | null,
  numTeams?: ModelSubscriptionIntInput | null,
  numConnections?: ModelSubscriptionIntInput | null,
  username?: ModelSubscriptionStringInput | null,
  skills?: ModelSubscriptionStringInput | null,
  resources?: ModelSubscriptionStringInput | null,
  links?: ModelSubscriptionStringInput | null,
  premium?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionConnectionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  connectedUserID?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  viewed?: ModelSubscriptionBooleanInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConnectionFilterInput | null > | null,
  or?: Array< ModelSubscriptionConnectionFilterInput | null > | null,
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
    longitude?: number | null,
    latitude?: number | null,
    city?: string | null,
    joinRequestIDs?: Array< string | null > | null,
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
    longitude?: number | null,
    latitude?: number | null,
    city?: string | null,
    joinRequestIDs?: Array< string | null > | null,
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
    longitude?: number | null,
    latitude?: number | null,
    city?: string | null,
    joinRequestIDs?: Array< string | null > | null,
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
    savedProjectsIDs?: Array< string | null > | null,
    bio?: string | null,
    numProjects?: number | null,
    numTeams?: number | null,
    numConnections?: number | null,
    username?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    links?: Array< string | null > | null,
    premium?: boolean | null,
    connections?:  {
      __typename: "ModelConnectionConnection",
      items:  Array< {
        __typename: "Connection",
        id: string,
        userID: string,
        connectedUserID: string,
        status?: string | null,
        createdAt?: string | null,
        viewed?: boolean | null,
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
    savedProjectsIDs?: Array< string | null > | null,
    bio?: string | null,
    numProjects?: number | null,
    numTeams?: number | null,
    numConnections?: number | null,
    username?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    links?: Array< string | null > | null,
    premium?: boolean | null,
    connections?:  {
      __typename: "ModelConnectionConnection",
      items:  Array< {
        __typename: "Connection",
        id: string,
        userID: string,
        connectedUserID: string,
        status?: string | null,
        createdAt?: string | null,
        viewed?: boolean | null,
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
    savedProjectsIDs?: Array< string | null > | null,
    bio?: string | null,
    numProjects?: number | null,
    numTeams?: number | null,
    numConnections?: number | null,
    username?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    links?: Array< string | null > | null,
    premium?: boolean | null,
    connections?:  {
      __typename: "ModelConnectionConnection",
      items:  Array< {
        __typename: "Connection",
        id: string,
        userID: string,
        connectedUserID: string,
        status?: string | null,
        createdAt?: string | null,
        viewed?: boolean | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConnectionMutationVariables = {
  input: CreateConnectionInput,
  condition?: ModelConnectionConditionInput | null,
};

export type CreateConnectionMutation = {
  createConnection?:  {
    __typename: "Connection",
    id: string,
    userID: string,
    connectedUserID: string,
    user?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    connectedUser?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status?: string | null,
    createdAt?: string | null,
    viewed?: boolean | null,
    updatedAt: string,
  } | null,
};

export type UpdateConnectionMutationVariables = {
  input: UpdateConnectionInput,
  condition?: ModelConnectionConditionInput | null,
};

export type UpdateConnectionMutation = {
  updateConnection?:  {
    __typename: "Connection",
    id: string,
    userID: string,
    connectedUserID: string,
    user?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    connectedUser?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status?: string | null,
    createdAt?: string | null,
    viewed?: boolean | null,
    updatedAt: string,
  } | null,
};

export type DeleteConnectionMutationVariables = {
  input: DeleteConnectionInput,
  condition?: ModelConnectionConditionInput | null,
};

export type DeleteConnectionMutation = {
  deleteConnection?:  {
    __typename: "Connection",
    id: string,
    userID: string,
    connectedUserID: string,
    user?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    connectedUser?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status?: string | null,
    createdAt?: string | null,
    viewed?: boolean | null,
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
    longitude?: number | null,
    latitude?: number | null,
    city?: string | null,
    joinRequestIDs?: Array< string | null > | null,
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchProjectsQueryVariables = {
  filter?: SearchableProjectFilterInput | null,
  sort?: Array< SearchableProjectSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableProjectAggregationInput | null > | null,
};

export type SearchProjectsQuery = {
  searchProjects?:  {
    __typename: "SearchableProjectConnection",
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
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

export type SearchChatRoomsQueryVariables = {
  filter?: SearchableChatRoomFilterInput | null,
  sort?: Array< SearchableChatRoomSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableChatRoomAggregationInput | null > | null,
};

export type SearchChatRoomsQuery = {
  searchChatRooms?:  {
    __typename: "SearchableChatRoomConnection",
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
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
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

export type SearchMessagesQueryVariables = {
  filter?: SearchableMessageFilterInput | null,
  sort?: Array< SearchableMessageSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableMessageAggregationInput | null > | null,
};

export type SearchMessagesQuery = {
  searchMessages?:  {
    __typename: "SearchableMessageConnection",
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
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
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
    savedProjectsIDs?: Array< string | null > | null,
    bio?: string | null,
    numProjects?: number | null,
    numTeams?: number | null,
    numConnections?: number | null,
    username?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    links?: Array< string | null > | null,
    premium?: boolean | null,
    connections?:  {
      __typename: "ModelConnectionConnection",
      items:  Array< {
        __typename: "Connection",
        id: string,
        userID: string,
        connectedUserID: string,
        status?: string | null,
        createdAt?: string | null,
        viewed?: boolean | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null,
  sort?: Array< SearchableUserSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableUserAggregationInput | null > | null,
};

export type SearchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUserConnection",
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetConnectionQueryVariables = {
  id: string,
};

export type GetConnectionQuery = {
  getConnection?:  {
    __typename: "Connection",
    id: string,
    userID: string,
    connectedUserID: string,
    user?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    connectedUser?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status?: string | null,
    createdAt?: string | null,
    viewed?: boolean | null,
    updatedAt: string,
  } | null,
};

export type ListConnectionsQueryVariables = {
  filter?: ModelConnectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConnectionsQuery = {
  listConnections?:  {
    __typename: "ModelConnectionConnection",
    items:  Array< {
      __typename: "Connection",
      id: string,
      userID: string,
      connectedUserID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      connectedUser?:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      status?: string | null,
      createdAt?: string | null,
      viewed?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ConnectionsByUserIDAndCreatedAtQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelConnectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ConnectionsByUserIDAndCreatedAtQuery = {
  connectionsByUserIDAndCreatedAt?:  {
    __typename: "ModelConnectionConnection",
    items:  Array< {
      __typename: "Connection",
      id: string,
      userID: string,
      connectedUserID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      connectedUser?:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      status?: string | null,
      createdAt?: string | null,
      viewed?: boolean | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ConnectionsByConnectedUserIDAndCreatedAtQueryVariables = {
  connectedUserID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelConnectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ConnectionsByConnectedUserIDAndCreatedAtQuery = {
  connectionsByConnectedUserIDAndCreatedAt?:  {
    __typename: "ModelConnectionConnection",
    items:  Array< {
      __typename: "Connection",
      id: string,
      userID: string,
      connectedUserID: string,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      connectedUser?:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      status?: string | null,
      createdAt?: string | null,
      viewed?: boolean | null,
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
        longitude?: number | null,
        latitude?: number | null,
        city?: string | null,
        joinRequestIDs?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
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
        longitude?: number | null,
        latitude?: number | null,
        city?: string | null,
        joinRequestIDs?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
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
        longitude?: number | null,
        latitude?: number | null,
        city?: string | null,
        joinRequestIDs?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      },
      user:  {
        __typename: "User",
        id: string,
        name: string,
        status?: string | null,
        image?: string | null,
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
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
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
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
        savedProjectsIDs?: Array< string | null > | null,
        bio?: string | null,
        numProjects?: number | null,
        numTeams?: number | null,
        numConnections?: number | null,
        username?: string | null,
        skills?: Array< string | null > | null,
        resources?: Array< string | null > | null,
        links?: Array< string | null > | null,
        premium?: boolean | null,
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
    longitude?: number | null,
    latitude?: number | null,
    city?: string | null,
    joinRequestIDs?: Array< string | null > | null,
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
    longitude?: number | null,
    latitude?: number | null,
    city?: string | null,
    joinRequestIDs?: Array< string | null > | null,
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
    longitude?: number | null,
    latitude?: number | null,
    city?: string | null,
    joinRequestIDs?: Array< string | null > | null,
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
    savedProjectsIDs?: Array< string | null > | null,
    bio?: string | null,
    numProjects?: number | null,
    numTeams?: number | null,
    numConnections?: number | null,
    username?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    links?: Array< string | null > | null,
    premium?: boolean | null,
    connections?:  {
      __typename: "ModelConnectionConnection",
      items:  Array< {
        __typename: "Connection",
        id: string,
        userID: string,
        connectedUserID: string,
        status?: string | null,
        createdAt?: string | null,
        viewed?: boolean | null,
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
    savedProjectsIDs?: Array< string | null > | null,
    bio?: string | null,
    numProjects?: number | null,
    numTeams?: number | null,
    numConnections?: number | null,
    username?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    links?: Array< string | null > | null,
    premium?: boolean | null,
    connections?:  {
      __typename: "ModelConnectionConnection",
      items:  Array< {
        __typename: "Connection",
        id: string,
        userID: string,
        connectedUserID: string,
        status?: string | null,
        createdAt?: string | null,
        viewed?: boolean | null,
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
    savedProjectsIDs?: Array< string | null > | null,
    bio?: string | null,
    numProjects?: number | null,
    numTeams?: number | null,
    numConnections?: number | null,
    username?: string | null,
    skills?: Array< string | null > | null,
    resources?: Array< string | null > | null,
    links?: Array< string | null > | null,
    premium?: boolean | null,
    connections?:  {
      __typename: "ModelConnectionConnection",
      items:  Array< {
        __typename: "Connection",
        id: string,
        userID: string,
        connectedUserID: string,
        status?: string | null,
        createdAt?: string | null,
        viewed?: boolean | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateConnectionSubscriptionVariables = {
  filter?: ModelSubscriptionConnectionFilterInput | null,
};

export type OnCreateConnectionSubscription = {
  onCreateConnection?:  {
    __typename: "Connection",
    id: string,
    userID: string,
    connectedUserID: string,
    user?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    connectedUser?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status?: string | null,
    createdAt?: string | null,
    viewed?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateConnectionSubscriptionVariables = {
  filter?: ModelSubscriptionConnectionFilterInput | null,
};

export type OnUpdateConnectionSubscription = {
  onUpdateConnection?:  {
    __typename: "Connection",
    id: string,
    userID: string,
    connectedUserID: string,
    user?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    connectedUser?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status?: string | null,
    createdAt?: string | null,
    viewed?: boolean | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteConnectionSubscriptionVariables = {
  filter?: ModelSubscriptionConnectionFilterInput | null,
};

export type OnDeleteConnectionSubscription = {
  onDeleteConnection?:  {
    __typename: "Connection",
    id: string,
    userID: string,
    connectedUserID: string,
    user?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    connectedUser?:  {
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status?: string | null,
    createdAt?: string | null,
    viewed?: boolean | null,
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      longitude?: number | null,
      latitude?: number | null,
      city?: string | null,
      joinRequestIDs?: Array< string | null > | null,
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
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
      savedProjectsIDs?: Array< string | null > | null,
      bio?: string | null,
      numProjects?: number | null,
      numTeams?: number | null,
      numConnections?: number | null,
      username?: string | null,
      skills?: Array< string | null > | null,
      resources?: Array< string | null > | null,
      links?: Array< string | null > | null,
      premium?: boolean | null,
      connections?:  {
        __typename: "ModelConnectionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
