import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavigationBlock = styled.div`
  height: 60px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(229, 255, 179, 0.95);
  & > * {
    margin: 0 12px;
  }

  & a {
    font-weight: bold;
    text-decoration: none;
    color: rgb(50, 72, 141);
  }
`;

const Navigation: React.FC = () => (
  <NavigationBlock>
    <Link to="/">Home</Link>
    <Link to="/user/0">User</Link>
    <Link to="/users">Users</Link>
    <Link to="/messages">Messages</Link>
  </NavigationBlock>
);

export default Navigation
