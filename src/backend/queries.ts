export const listChatRooms = /* GraphQL */
    `query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            ChatRooms {
                items {
                chatRoom {
                    id
                    updatedAt
                    name
                    image
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

// graphql/queries.js
export const listProjects = /* GraphQL */ `
  query ListProjects {
    listProjects {
      items {
        id
        title
        description
        image
        skills
        resources
        ownerIDs
        categories
      }
    }
  }
`

export const listTeamsByUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      Projects {
        items {
          project {
            createdAt
            description
            id
            image
            ownerIDs
            resources
            skills
            title
            categories
          }
        }
      }
      id
    }
  }
`

export const searchProjects = /* GraphQL */ `
  query SearchProjects($filter: SearchableProjectFilterInput) {
    searchProjects(filter: $filter) {
      items {
        id
        name
        description
        createdAt
      }
    }
  }
`

export const listProjectsWithSort = /* GraphQL */ `query ListProjectsWithSort(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
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
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
`;

export const getUserWithoutConnections = /* GraphQL */ `
  query GetUserWithoutConnections($id: ID!) {
    getUser(id: $id) {
      id
      name
      status
      image
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
    }
  }
`;


export const listProjectsWithJoinRequests = /* GraphQL */ `
  query ListProjectsWithJoinRequests(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        image
        skills
        resources
        categories
        ownerIDs
        longitude
        latitude
        city
        createdAt
        updatedAt
        joinRequests {
          items {
            id
            userID
            projectID
            createdAt
            viewed
            user {
              id
              name
              image
              username
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
