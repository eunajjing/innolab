import React, { memo, useState } from 'react'
import styled from 'styled-components'

const UserCreatorBlock = styled.div``

interface UserCreatorProps {
  onSubmit(name: string): unknown;
}

const UserCreator: React.FC<UserCreatorProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  return (
    <UserCreatorBlock>
      <form onSubmit={(event) => (event.preventDefault(), onSubmit(name))}>
        <input type='text' value={name} onChange={event => setName(event.target.value)} />
        <button role='submit'>SUBMIT!</button>
      </form>
    </UserCreatorBlock >
  );
}

export default UserCreator
