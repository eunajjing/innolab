import React, { memo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const UserItemBlock = styled.li``

interface UserItemProps {
  id: string;
  name: string;
}

const UserItem: React.FC<UserItemProps> = ({ id, name }) => (
  <UserItemBlock>
    <h2>{name}</h2>
    <Link to={`/user/${id}`}>
      <p>{id}</p>
    </Link>
  </UserItemBlock >
);

export default memo(UserItem)
