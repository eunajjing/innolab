import { gql } from 'apollo-server'

const sessionDefs = gql`
# type Mutation {
#   login(input: LoginInput!): Session!
# }

input LoginInput {
  id: ID!
}

type Session {
  id: ID!
  token: String!
}
`;

export default sessionDefs