/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllUsersQuery
// ====================================================

export interface GetAllUsersQuery_allUsers_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface GetAllUsersQuery_allUsers_edges_node {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetAllUsersQuery_allUsers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: GetAllUsersQuery_allUsers_edges_node;
}

export interface GetAllUsersQuery_allUsers {
  __typename: "UserConnection";
  totalCount: number;
  pageInfo: GetAllUsersQuery_allUsers_pageInfo;
  edges: GetAllUsersQuery_allUsers_edges[];
}

export interface GetAllUsersQuery {
  allUsers: GetAllUsersQuery_allUsers;
}

export interface GetAllUsersQueryVariables {
  first: number;
  after?: string | null;
}
