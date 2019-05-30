import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo-hooks'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import configureClient from './configureClient'
import './index.css'

const client = configureClient();
const Root: React.FC = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
