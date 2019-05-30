import { IResolvers } from 'apollo-server'
import { DataSourceType } from '../configureDataSource'

const userResolvers: IResolvers<any, DataSourceType> = {
  Query: {
    user: async (rootValue, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id);
    },
    allUsers: (rootValue, { first, after }, { dataSources }) => {
      return dataSources.userAPI.getAllUsers(first, after);
    }
  },
  Mutation: {
    createUser: (rootValue, { input }, { dataSources }) => {
      return dataSources.userAPI.createUser(input.name);
    },
    updateUser: (rootValue, { input }, { dataSources }) => {
      return dataSources.userAPI.updateUser(input.id, input.name);
    },
    deleteUser: (rootValue, { input }, { dataSources }) => {
      return dataSources.userAPI.deleteUser(input.id);
    },
  },
  User: {
    messages: async (user, { first, after }, { dataSources }) => {
      return dataSources.messageAPI.getMessageByAuthorId(user.id, first, after);
    }
  },
};

export default userResolvers