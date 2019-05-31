import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";

// import { makeExecutableSchema } from 'graphql-tools'
// import { SchemaLink } from "apollo-link-schema";

export default function configureClient() {
  const uri = "http://localhost:8888/graphql";
  const cache = new InMemoryCache({
    // InMemoryCache 캐시 만들기
    // /graphql가 endpoint
    // 자바스크립트 객체 빈 것을 인자로 넣어줌
    // cacheRedirects: {
    //   Query: {
    //     user: (rootValue, { id }, { getCacheKey }) => {
    //       return getCacheKey({ __typename: 'User', id });
    //     }
    //   }
    // }
  });

  const link = new HttpLink({ uri });
  // HttpLink 생성

  // const link = new SchemaLink({ schema });
  // 클라이언트 단에서 스키마를 구현해서 아폴로 클라이언트 단에서 사용하게 하면
  // 서버가 없어도 그랲큐엘 방식으로 만들 수 있다
  return new ApolloClient({ cache, link });
  // 아폴로 클라이언트 생성
}
