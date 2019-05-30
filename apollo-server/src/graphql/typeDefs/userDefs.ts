import { gql } from 'apollo-server'

const userDefs = gql`
type Query {
  user(id: ID!): User
  allUsers(first: Int!, after: String): UserConnection!
}

type Mutation {
  createUser(input: CreateUserInput!): User
  updateUser(input: UpdateUserInput!): User
  deleteUser(input: DeleteUserInput!): ID
}

type User {
  id: ID!
  name: String!
  messages(first: Int!, after: String): MessageConnection!
}

type UserConnection {
  totalCount: Int!
  pageInfo: PageInfo!
  edges: [UserEdge!]!
}

type UserEdge {
  cursor: String!
  node: User!
}

input CreateUserInput {
  name: String!
}

input UpdateUserInput {
  id: ID!
  name: String!
}

input DeleteUserInput {
  id: ID!
}
`;

export default userDefs