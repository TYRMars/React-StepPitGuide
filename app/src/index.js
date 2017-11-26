import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './App'
import { counter } from './index.redux'

const Appstore = createStore(counter,compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>{}
))

ReactDom.render(
  (<Provider store={Appstore}>
    <App/>
   </Provider>)
  ,document.getElementById('root')
)
