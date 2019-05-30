import { gql } from 'apollo-server'

const messageDefs = gql`
type Query {
  message(id: ID!): Message
  allMessages(first: Int!, after: String): MessageConnection!
}

# type Mutation {
#   createMessage(input: CreateMessageInput!): Message!
#   updateMessage(input: UpdateMessageInput!): Message!
#   deleteMessage(input: DeleteMessageInput!): ID!
# }

type Message {
  id: ID!
  payload: String!
  createdAt: String!
  author: User!
}

type MessageConnection {
  totalCount: Int!
  pageInfo: PageInfo!
  edges: [MessageEdge!]!
}

type MessageEdge {
  cursor: String!
  node: Message!
}

input CreateMessageInput {
  payload: String!
  authorId: ID!
}

input UpdateMessageInput {
  id: ID!
  payload: String!
}

input DeleteMessageInput {
  id: ID!
}
`;

export default messageDefs