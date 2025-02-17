/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProject = /* GraphQL */ `query GetProject($id: ID!) {
  getProject(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProjectQueryVariables,
  APITypes.GetProjectQuery
>;
export const listProjects = /* GraphQL */ `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProjectsQueryVariables,
  APITypes.ListProjectsQuery
>;
export const searchProjects = /* GraphQL */ `query SearchProjects(
  $filter: SearchableProjectFilterInput
  $sort: [SearchableProjectSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableProjectAggregationInput]
) {
  searchProjects(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
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
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchProjectsQueryVariables,
  APITypes.SearchProjectsQuery
>;
export const getChatRoom = /* GraphQL */ `query GetChatRoom($id: ID!) {
  getChatRoom(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetChatRoomQueryVariables,
  APITypes.GetChatRoomQuery
>;
export const listChatRooms = /* GraphQL */ `query ListChatRooms(
  $filter: ModelChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatRoomsQueryVariables,
  APITypes.ListChatRoomsQuery
>;
export const searchChatRooms = /* GraphQL */ `query SearchChatRooms(
  $filter: SearchableChatRoomFilterInput
  $sort: [SearchableChatRoomSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableChatRoomAggregationInput]
) {
  searchChatRooms(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
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
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchChatRoomsQueryVariables,
  APITypes.SearchChatRoomsQuery
>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const listMessagesByChatRoom = /* GraphQL */ `query ListMessagesByChatRoom(
  $chatroomID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessagesByChatRoom(
    chatroomID: $chatroomID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.ListMessagesByChatRoomQueryVariables,
  APITypes.ListMessagesByChatRoomQuery
>;
export const messagesByUserID = /* GraphQL */ `query MessagesByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.MessagesByUserIDQueryVariables,
  APITypes.MessagesByUserIDQuery
>;
export const searchMessages = /* GraphQL */ `query SearchMessages(
  $filter: SearchableMessageFilterInput
  $sort: [SearchableMessageSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableMessageAggregationInput]
) {
  searchMessages(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
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
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchMessagesQueryVariables,
  APITypes.SearchMessagesQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const searchUsers = /* GraphQL */ `query SearchUsers(
  $filter: SearchableUserFilterInput
  $sort: [SearchableUserSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableUserAggregationInput]
) {
  searchUsers(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
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
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchUsersQueryVariables,
  APITypes.SearchUsersQuery
>;
export const getConnection = /* GraphQL */ `query GetConnection($id: ID!) {
  getConnection(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetConnectionQueryVariables,
  APITypes.GetConnectionQuery
>;
export const listConnections = /* GraphQL */ `query ListConnections(
  $filter: ModelConnectionFilterInput
  $limit: Int
  $nextToken: String
) {
  listConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      connectedUserID
      user {
        id
        name
        status
        image
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
      connectedUser {
        id
        name
        status
        image
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
      status
      createdAt
      viewed
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConnectionsQueryVariables,
  APITypes.ListConnectionsQuery
>;
export const connectionsByUserIDAndCreatedAt = /* GraphQL */ `query ConnectionsByUserIDAndCreatedAt(
  $userID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelConnectionFilterInput
  $limit: Int
  $nextToken: String
) {
  connectionsByUserIDAndCreatedAt(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      connectedUserID
      user {
        id
        name
        status
        image
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
      connectedUser {
        id
        name
        status
        image
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
      status
      createdAt
      viewed
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ConnectionsByUserIDAndCreatedAtQueryVariables,
  APITypes.ConnectionsByUserIDAndCreatedAtQuery
>;
export const connectionsByConnectedUserIDAndCreatedAt = /* GraphQL */ `query ConnectionsByConnectedUserIDAndCreatedAt(
  $connectedUserID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelConnectionFilterInput
  $limit: Int
  $nextToken: String
) {
  connectionsByConnectedUserIDAndCreatedAt(
    connectedUserID: $connectedUserID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      connectedUserID
      user {
        id
        name
        status
        image
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
      connectedUser {
        id
        name
        status
        image
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
      status
      createdAt
      viewed
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ConnectionsByConnectedUserIDAndCreatedAtQueryVariables,
  APITypes.ConnectionsByConnectedUserIDAndCreatedAtQuery
>;
export const searchConnections = /* GraphQL */ `query SearchConnections(
  $filter: SearchableConnectionFilterInput
  $sort: [SearchableConnectionSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableConnectionAggregationInput]
) {
  searchConnections(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      userID
      connectedUserID
      user {
        id
        name
        status
        image
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
      connectedUser {
        id
        name
        status
        image
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
      status
      createdAt
      viewed
      updatedAt
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchConnectionsQueryVariables,
  APITypes.SearchConnectionsQuery
>;
export const getJoinRequest = /* GraphQL */ `query GetJoinRequest($id: ID!) {
  getJoinRequest(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetJoinRequestQueryVariables,
  APITypes.GetJoinRequestQuery
>;
export const listJoinRequests = /* GraphQL */ `query ListJoinRequests(
  $filter: ModelJoinRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listJoinRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      projectID
      user {
        id
        name
        status
        image
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
      project {
        id
        ownerIDs
        title
        description
        image
        skills
        resources
        categories
        longitude
        latitude
        city
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListJoinRequestsQueryVariables,
  APITypes.ListJoinRequestsQuery
>;
export const joinRequestsByUserIDAndCreatedAt = /* GraphQL */ `query JoinRequestsByUserIDAndCreatedAt(
  $userID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelJoinRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  joinRequestsByUserIDAndCreatedAt(
    userID: $userID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      projectID
      user {
        id
        name
        status
        image
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
      project {
        id
        ownerIDs
        title
        description
        image
        skills
        resources
        categories
        longitude
        latitude
        city
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.JoinRequestsByUserIDAndCreatedAtQueryVariables,
  APITypes.JoinRequestsByUserIDAndCreatedAtQuery
>;
export const joinRequestsByProjectIDAndCreatedAt = /* GraphQL */ `query JoinRequestsByProjectIDAndCreatedAt(
  $projectID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelJoinRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  joinRequestsByProjectIDAndCreatedAt(
    projectID: $projectID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      projectID
      user {
        id
        name
        status
        image
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
      project {
        id
        ownerIDs
        title
        description
        image
        skills
        resources
        categories
        longitude
        latitude
        city
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.JoinRequestsByProjectIDAndCreatedAtQueryVariables,
  APITypes.JoinRequestsByProjectIDAndCreatedAtQuery
>;
export const getUserProject = /* GraphQL */ `query GetUserProject($id: ID!) {
  getUserProject(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserProjectQueryVariables,
  APITypes.GetUserProjectQuery
>;
export const listUserProjects = /* GraphQL */ `query ListUserProjects(
  $filter: ModelUserProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      projectId
      userId
      project {
        id
        ownerIDs
        title
        description
        image
        skills
        resources
        categories
        longitude
        latitude
        city
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserProjectsQueryVariables,
  APITypes.ListUserProjectsQuery
>;
export const userProjectsByProjectId = /* GraphQL */ `query UserProjectsByProjectId(
  $projectId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  userProjectsByProjectId(
    projectId: $projectId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      projectId
      userId
      project {
        id
        ownerIDs
        title
        description
        image
        skills
        resources
        categories
        longitude
        latitude
        city
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserProjectsByProjectIdQueryVariables,
  APITypes.UserProjectsByProjectIdQuery
>;
export const userProjectsByUserId = /* GraphQL */ `query UserProjectsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  userProjectsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      projectId
      userId
      project {
        id
        ownerIDs
        title
        description
        image
        skills
        resources
        categories
        longitude
        latitude
        city
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserProjectsByUserIdQueryVariables,
  APITypes.UserProjectsByUserIdQuery
>;
export const getUserChatRoom = /* GraphQL */ `query GetUserChatRoom($id: ID!) {
  getUserChatRoom(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserChatRoomQueryVariables,
  APITypes.GetUserChatRoomQuery
>;
export const listUserChatRooms = /* GraphQL */ `query ListUserChatRooms(
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      chatRoomId
      userId
      chatRoom {
        id
        name
        image
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserChatRoomsQueryVariables,
  APITypes.ListUserChatRoomsQuery
>;
export const userChatRoomsByChatRoomId = /* GraphQL */ `query UserChatRoomsByChatRoomId(
  $chatRoomId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatRoomsByChatRoomId(
    chatRoomId: $chatRoomId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      chatRoomId
      userId
      chatRoom {
        id
        name
        image
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserChatRoomsByChatRoomIdQueryVariables,
  APITypes.UserChatRoomsByChatRoomIdQuery
>;
export const userChatRoomsByUserId = /* GraphQL */ `query UserChatRoomsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatRoomsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      chatRoomId
      userId
      chatRoom {
        id
        name
        image
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserChatRoomsByUserIdQueryVariables,
  APITypes.UserChatRoomsByUserIdQuery
>;
