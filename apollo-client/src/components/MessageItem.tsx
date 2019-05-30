import React, { memo } from 'react'
import styled from 'styled-components'

const UserItemBlock = styled.li``

interface MessageItemProps {
  id: string;
  payload: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ id, payload }) => (
  <UserItemBlock>
    <p>{id}</p>
    <p>{payload}</p>
  </UserItemBlock >
);

export default memo(MessageItem)
