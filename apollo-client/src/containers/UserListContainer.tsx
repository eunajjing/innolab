import React, { useCallback } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql, NetworkStatus } from "apollo-boost";
import { produce } from "immer";
import UserList from "../components/UserList";
import {
  GetAllUsersQuery,
  GetAllUsersQueryVariables
} from "./__generated__/GetAllUsersQuery";
import { safe } from "../utils";
import {
  CreateUserMutation,
  CreateUserMutationVariables
} from "./__generated__/CreateUserMutation";

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
  // 페이지네이션 방식을
  // 마지막 요소가 페이지에 들어오게 되면 다음 요소들을 서버에서 가지고 오는 식으로 구현

  // 단, 로딩 중일 때는 호출이 되면 안되는 설정 해줘야 함
  // 만약 설정을 해주지 않으면 같은 ref를 호출하고 있다는 에러가 뜬다

  const createUserMutation = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER_MUTATION);

  const createUser = useCallback((name: string) => {
    const input = { name };
    createUserMutation({
      variables: { input },
      update(dataProxy, result: { data: CreateUserMutation }) {
        const newUser = safe(() => result.data.createUser!);
        if (!newUser) return;

        const prevResult = dataProxy.readQuery<
          GetAllUsersQuery,
          GetAllUsersQueryVariables
        >({
          query: GET_ALL_USERS_QUERY
        });

        if (!prevResult) return;

        const nextResult = produce(prevResult, draft => {
          draft.allUsers.totalCount += 1;
          prevResult.allUsers.edges.unshift({
            __typename: "UserEdge",
            cursor: newUser.id,
            node: newUser
          });
        });

        dataProxy.writeQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({
          query: GET_ALL_USERS_QUERY,
          data: nextResult
        });
      }
    });
  }, []);

  const pageSize = 20;

  const { data, loading, error, fetchMore, networkStatus } = useQuery<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >(GET_ALL_USERS_QUERY, {
    variables: { first: pageSize },
    notifyOnNetworkStatusChange: true
    // notifyOnNetworkStatusChange 하위 요소 추가 렌더링을 로딩으로 치지 않겠다
  });

  const endCursor = safe(() => data!.allUsers.pageInfo.endCursor);
  // 엔드 커서 있는지 여부 확인
  const allUsers = safe(() => data!.allUsers);
  // 유저 있는지 여부

  const fetchNext = useCallback(() => {
    if (!endCursor || loading) return;

    fetchMore({
      // 확장
      variables: { first: pageSize, after: endCursor },
      updateQuery(prevResult, { fetchMoreResult }) {
        // 데이터 확장
        // 새로운 데이터를 만들어줘야 함
        if (!fetchMoreResult)
          // 만약 에러가 난다면 기존 페이지네이션을 건들이지 않겠다
          return prevResult;

        return produce(prevResult, draft => {
          // immer 라이브러리를 사용해서 불변성 유지
          draft.allUsers.pageInfo = fetchMoreResult.allUsers.pageInfo;
          draft.allUsers.edges.push(...fetchMoreResult.allUsers.edges);
        });
      }
    });
  }, [fetchMore, endCursor, loading]);

  if (networkStatus === NetworkStatus.loading) return <p>Loading...</p>;

  if (error || !allUsers) return <p>Error!</p>;

  const userList = allUsers.edges.map(edge => ({
    id: edge.node.id,
    name: edge.node.name
  }));

  return (
    <UserList
      onSubmit={createUser}
      onReachEnd={fetchNext}
      userList={userList}
    />
  );
};

export default UserListContainer;
