import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'
import { schema, configureDataSource } from './graphql'

export default async function bootstrap() {
  const connection = await createConnection();
  const port = 8888;

  const server = new ApolloServer({
    schema,
    context: ctx => ctx,
    dataSources: () => configureDataSource(connection),
  });

  await server.listen(port);
  console.log(`Server is running... http://localhost:${port}`);
}