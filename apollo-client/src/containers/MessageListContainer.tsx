import React, { useCallback } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { gql, NetworkStatus } from 'apollo-boost'
import { produce } from 'immer'
import MessageList from '../components/MessageList'
import { GetAllMessagesQuery, GetAllMessagesQueryVariables } from './__generated__/GetAllMessagesQuery'
import { safe } from '../utils';

export const GET_ALL_MESSAGES_QUERY = gql`
query GetAllMessagesQuery($first: Int!, $after: String) {
  allMessages(first: $first, after: $after) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor 
      node {
        id
        payload
        author {
          id
          name
        }
      }
    }
  }
}
`;

const MessageListContainer: React.FC = () => {
  const pageSize = 20;

  const { data, loading, error, fetchMore, networkStatus } = useQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(
    GET_ALL_MESSAGES_QUERY,
    {
      variables: { first: pageSize },
      notifyOnNetworkStatusChange: true
    },
  );

  const endCursor = safe(() => data!.allMessages.pageInfo.endCursor);
  const allMessages = safe(() => data!.allMessages);
  const fetchNext = useCallback(() => {
    if (!endCursor || loading)
      return;

    fetchMore({
      variables: { first: pageSize, after: endCursor },
      updateQuery(prevResult, { fetchMoreResult }) {
        if (!fetchMoreResult)
          return prevResult;

        return produce(prevResult, (draft) => {
          draft.allMessages.pageInfo = fetchMoreResult.allMessages.pageInfo;
          draft.allMessages.edges.push(...fetchMoreResult.allMessages.edges);
        });
      }
    })
  }, [fetchMore, endCursor, loading]);

  if (networkStatus === NetworkStatus.loading)
    return <p>Loading...</p>

  if (error || !allMessages)
    return <p>Error!</p>

  const messageList = allMessages.edges.map(edge => ({
    id: edge.node.id,
    payload: edge.node.payload,
    author: {
      id: edge.node.author.id,
      name: edge.node.author.name
    }
  }));

  return (
    <MessageList onReachEnd={fetchNext} messageList={messageList} />
  );
}


export default MessageListContainer
