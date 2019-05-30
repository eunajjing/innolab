import { IResolvers } from 'apollo-server'
import * as path from 'path'
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas'

const resolversArray = fileLoader(path.join(__dirname, './'));
const resolvers = mergeResolvers<IResolvers>(resolversArray);

export default resolvers