import React from 'react'
import styled from 'styled-components'

const MessageBlock = styled.div``

interface MessageProps {
  id: string;
  payload: string;
  author: {
    id: string;
    name: string;
  }
}

const Message: React.FC<MessageProps> = ({ id, payload, author }) => (
  <MessageBlock>
    <p>{id}</p>
    <h2>{payload}</h2>
  </MessageBlock>
);

export default Message
