import React from 'react'
import ReactDOM from 'react-dom' 
import './styles/index.scss'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { client } from './client'
import { ApolloProvider } from 'react-apollo'
import { removeHash } from 'react-scrollable-anchor'


ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'))
serviceWorker.unregister()
removeHash()
