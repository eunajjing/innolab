import { gql } from 'apollo-server'

const commonDefs = gql`
type Query {
  ping: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}
`;

export default commonDefs