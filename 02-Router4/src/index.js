import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {counter} from './index.redux'
import App from './App'
import Auth from './Auth.js'
import Dashboard from './Dashboard.js'

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {
    }
));

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
