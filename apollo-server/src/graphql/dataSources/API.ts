import { DataSource, DataSourceConfig } from 'apollo-datasource'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

export default abstract class API extends DataSource {
  constructor() {
    super();
  }

  protected authorization?: string;

  public initialize(config: DataSourceConfig<ExpressContext>) {
    this.authorization = config.context.req.headers.authorization;
  }
}