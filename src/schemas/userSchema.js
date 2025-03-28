import { gql } from "apollo-server-express";

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    address: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type MessageResponse {
    message: String!
  }

  type AuthPayload {
    token: String!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, age: Int, address: String!): MessageResponse
    login(email: String!, password: String!): AuthPayload
    updateUserRole(id: ID!, role: String!): MessageResponse
    deleteUser(id: ID!): String
  }
  type Subscription {
    userAdded: MessageResponse
  }
`;

export default userSchema;
