/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserMutation
// ====================================================

export interface CreateUserMutation_createUser {
  __typename: "User";
  id: string;
  name: string;
}

export interface CreateUserMutation {
  createUser: CreateUserMutation_createUser | null;
}

export interface CreateUserMutationVariables {
  input: CreateUserInput;
}
