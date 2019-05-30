import React from 'react'
import User from '../components/User'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks';
import { UserByIdQuery, UserByIdQueryVariables } from './__generated__/UserByIdQuery';
import { withRouter, RouteComponentProps } from 'react-router';
import { safe } from '../utils';

const USER_BY_ID_QUERY = gql`
query UserByIdQuery($id: ID!) {
  user(id: $id) {
    id
    name
  }
}
`;

type NavParams = RouteComponentProps<{ id: string }>;

const UserContainer = withRouter<NavParams>(({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery<UserByIdQuery, UserByIdQueryVariables>(
    USER_BY_ID_QUERY,
    { variables: { id } }
  );

  const userId = safe(() => data!.user!.id);
  const userName = safe(() => data!.user!.name);

  if (loading)
    return <p>Loading..</p>;
  else if (error || !userId || !userName)
    return <p>Error!</p>;
  else
    return <User id={userId} name={userName} />;
});

export default UserContainer
