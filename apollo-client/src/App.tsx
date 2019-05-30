import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Navigation from './components/Navigation'
import AllUsersPage from './pages/AllUsersPage'
import MainPage from './pages/MainPage'
import AllMessagesPage from './pages/AllMessagesPage'
import UserPage from './pages/UserPage'


const PageSection = styled.div`
  margin-top: 60px;
`

const App: React.FC = () => (
  <div>
    <Navigation />
    <PageSection>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/user/:id' component={UserPage} />
        <Route exact path='/users' component={AllUsersPage} />
        <Route exact path='/messages' component={AllMessagesPage} />
      </Switch>
    </PageSection>
  </div>
);


export default App;
