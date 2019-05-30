import { Connection } from 'typeorm'
import MessageAPI from './dataSources/MessageAPI'
import SessionAPI from './dataSources/SessionAPI'
import UserAPI from './dataSources/UserAPI'

export function configureDataSource(connection: Connection) {
  const messageAPI = new MessageAPI(connection);
  const sessionAPI = new SessionAPI(connection);
  const userAPI = new UserAPI(connection);

  return { messageAPI, sessionAPI, userAPI };
}

export interface DataSourceType {
  dataSources: ReturnType<typeof configureDataSource>;
}