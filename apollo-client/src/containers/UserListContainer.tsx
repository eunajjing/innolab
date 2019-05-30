import React, { useCallback } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql, NetworkStatus } from 'apollo-boost'
import { produce } from 'immer'
import UserList from '../components/UserList'
import { GetAllUsersQuery, GetAllUsersQueryVariables } from './__generated__/GetAllUsersQuery'
import { safe } from '../utils';
import { CreateUserMutation, CreateUserMutationVariables } from './__generated__/CreateUserMutation';

const GET_ALL_USERS_QUERY = gql`
query GetAllUsersQuery($first: Int!, $after: String) {
  allUsers(first: $first, after: $after) @connection(key: "allUsers") {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor 
      node {
        id
        name
      }
    }
  }
}
`;

const CREATE_USER_MUTATION = gql`
mutation CreateUserMutation($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
  }
}
`;

const UserListContainer: React.FC = () => {
  const createUserMutation = useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER_MUTATION);

  const createUser = useCallback((name: string) => {
    const input = { name };
    createUserMutation({
      variables: { input },
      update(dataProxy, result: { data: CreateUserMutation }) {
        const newUser = safe(() => result.data.createUser!);
        if (!newUser)
          return;

        const prevResult = dataProxy.readQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({
          query: GET_ALL_USERS_QUERY
        })

        if (!prevResult)
          return;

        const nextResult = produce(prevResult, draft => {
          draft.allUsers.totalCount += 1;
          prevResult.allUsers.edges.unshift({
            __typename: "UserEdge",
            cursor: newUser.id,
            node: newUser
          })
        });

        dataProxy.writeQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({
          query: GET_ALL_USERS_QUERY,
          data: nextResult
        });



      }

    });
  }, []);

  const pageSize = 20;

  const { data, loading, error, fetchMore, networkStatus } = useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GET_ALL_USERS_QUERY,
    {
      variables: { first: pageSize },
      notifyOnNetworkStatusChange: true
    },
  );

  const endCursor = safe(() => data!.allUsers.pageInfo.endCursor);
  const allUsers = safe(() => data!.allUsers);

  const fetchNext = useCallback(() => {
    if (!endCursor || loading)
      return;

    fetchMore({
      variables: { first: pageSize, after: endCursor },
      updateQuery(prevResult, { fetchMoreResult }) {
        if (!fetchMoreResult)
          return prevResult;

        return produce(prevResult, (draft) => {
          draft.allUsers.pageInfo = fetchMoreResult.allUsers.pageInfo;
          draft.allUsers.edges.push(...fetchMoreResult.allUsers.edges);
        });
      }
    })
  }, [fetchMore, endCursor, loading]);

  if (networkStatus === NetworkStatus.loading)
    return <p>Loading...</p>

  if (error || !allUsers)
    return <p>Error!</p>

  const userList = allUsers.edges.map(edge => ({
    id: edge.node.id,
    name: edge.node.name
  }));

  return (
    <UserList
      onSubmit={createUser}
      onReachEnd={fetchNext}
      userList={userList} />
  );
}


export default UserListContainer
