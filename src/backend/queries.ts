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
