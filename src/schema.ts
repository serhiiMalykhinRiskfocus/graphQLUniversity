export const typeDefs = `#graphql
 
  type Role {
    id: ID!
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String
    roles: [Role!]!
    session: Session
  }

  type Session {
    sessionUID: ID!
    createdTime: Int!
    expirationTime: Int!
    user: User!
  }

  type Query {
    sessions: [Session]
    users: [User]
    roles: [Role]
  }

  type Mutation {
    createRole(role: AddRoleInput!): [Role!]
    deleteRole(id: ID!): [Role!]
    deleteSession(sessionUID: ID!): [Session!]
    editRole(id: ID!, role: EditRoleInput!): [Role!]
    editUser(id: ID!, user: EditUserInput!): User
    createSessionsWithUsers(sessionAndUser: AddSessionAndUserInput!): [Session!]
  }

input AddRoleInput {
  title: String
  author: String
}

input EditRoleInput {
  title: String
  author: String
}

input EditUserInput {
  name: String
  roles: [ID!]
}

input AddSessionAndUserInput {
  user: AddUserInput!
  session: AddSessionInput!
}


input AddUserInput {
  name: String
  roles: [AddUserRoleInput!]!
}

input AddSessionInput {
  expirationTime: Int!
}

input AddUserRoleInput {
  id: ID!
}
`;