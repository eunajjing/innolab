import React, { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'
import UserItem from './UserItem'
import MessageItem from './MessageItem';

const MessageListBlock = styled.ul``

interface MessageListProps {
  onReachEnd(): void;
  messageList: {
    id: string;
    payload: string;
    author: {
      id: string;
      name: string;
    }
  }[];
}

const MessageList: React.FC<MessageListProps> = ({ onReachEnd, messageList }) => {
  const ref = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !element.children.length)
      return;

    const [lastChildren] = [...element.children].slice(-1);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onReachEnd();
      }
    }, { rootMargin: '300px' });

    observer.observe(lastChildren);
    return () => observer.disconnect();
  }, [onReachEnd]);

  return (
    <MessageListBlock ref={ref}>
      {messageList.map(message => <MessageItem key={message.id} id={message.id} payload={message.payload} />)}
    </MessageListBlock>
  );
}


export default MessageList
