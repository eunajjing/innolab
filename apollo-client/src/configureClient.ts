import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
// import { makeExecutableSchema } from 'graphql-tools'
// import { SchemaLink } from 'apollo-link-schema'

export default function configureClient() {
  const uri = 'http://localhost:8888/graphql'
  const cache = new InMemoryCache({
    // cacheRedirects: {
    //   Query: {
    //     user: (rootValue, { id }, { getCacheKey }) => {
    //       return getCacheKey({ __typename: 'User', id });
    //     }
    //   }
    // }
  });

  const link = new HttpLink({ uri });
  // const link = new SchemaLink({ schema })
  return new ApolloClient({ cache, link });
}