/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllMessagesQuery
// ====================================================

export interface GetAllMessagesQuery_allMessages_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface GetAllMessagesQuery_allMessages_edges_node_author {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetAllMessagesQuery_allMessages_edges_node {
  __typename: "Message";
  id: string;
  payload: string;
  author: GetAllMessagesQuery_allMessages_edges_node_author;
}

export interface GetAllMessagesQuery_allMessages_edges {
  __typename: "MessageEdge";
  cursor: string;
  node: GetAllMessagesQuery_allMessages_edges_node;
}

export interface GetAllMessagesQuery_allMessages {
  __typename: "MessageConnection";
  totalCount: number;
  pageInfo: GetAllMessagesQuery_allMessages_pageInfo;
  edges: GetAllMessagesQuery_allMessages_edges[];
}

export interface GetAllMessagesQuery {
  allMessages: GetAllMessagesQuery_allMessages;
}

export interface GetAllMessagesQueryVariables {
  first: number;
  after?: string | null;
}
