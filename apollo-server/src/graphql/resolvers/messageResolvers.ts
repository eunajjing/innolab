import { IResolvers } from 'apollo-server'
import { DataSourceType } from '../configureDataSource'

const messageResolvers: IResolvers<any, DataSourceType> = {
  Query: {
    message: (rootValue, { id }, { dataSources }) => {
      return dataSources.messageAPI.getMessageById(id);
    },
    allMessages: (rootValue, { first, after }, { dataSources }) => {
      return dataSources.messageAPI.getAllMessages(first, after);
    }
  },
  Message: {
    author: (message, { }, { dataSources }) => {
      return dataSources.userAPI.getAuthorByMessageId(message.id);
    }
  }
};

export default messageResolvers