/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserByIdQuery
// ====================================================

export interface UserByIdQuery_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface UserByIdQuery {
  user: UserByIdQuery_user | null;
}

export interface UserByIdQueryVariables {
  id: string;
}
