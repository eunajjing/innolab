import { IResolvers } from 'apollo-server'

const commonResolvers: IResolvers = {
  Query: {
    ping: () => 'pong'
  },
};

export default commonResolvers