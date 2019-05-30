import { gql } from 'apollo-server'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import * as path from 'path'

const typesArray = fileLoader(path.join(__dirname, './'));
const typeDefs = gql(mergeTypes(typesArray));

export default typeDefs