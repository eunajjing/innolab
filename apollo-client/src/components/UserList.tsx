import React, { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'
import UserItem from './UserItem'
import UserCreator from './UserCreator'

const UserListBlock = styled.ul``

interface UserListProps {
  onReachEnd(): void;
  onSubmit(name: string): unknown;
  userList: { id: string, name: string }[];
}

const UserList: React.FC<UserListProps> = ({ onReachEnd, userList, onSubmit }) => {
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
    <UserListBlock ref={ref}>
      <UserCreator onSubmit={onSubmit} />
      {userList.map(user => <UserItem key={user.id} id={user.id} name={user.name} />)}
    </UserListBlock>
  );
}


export default UserList
