import React from 'react'
import styled from 'styled-components'

const UserBlock = styled.div``

interface UserProps {
  id: string;
  name: string;
}

const User: React.FC<UserProps> = ({ id, name }) => (
  <UserBlock>
    <p>{id}</p>
    <h2>{name}</h2>
  </UserBlock>
);

export default User
