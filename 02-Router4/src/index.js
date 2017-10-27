import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {counter} from './index.redux'
import App from './App'

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {
    }
));

function Second() {
    return <h2>Second</h2>
}

function Third() {
    return <h2>Third</h2>
}

function Fourth() {
    return <h2>Fourth</h2>
}

class Test extends React.Component {
  render(){
    console.log(this.props);
    return (
      <h1>test测试组件{this.props.params.location}</h1>
    );
  }
}

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to='/'>First</Link></li>
                    <li><Link to='/Second'>Second</Link></li>
                    <li><Link to='/Third'>Third</Link></li>
                    <li><Link to='/Fourth'>Fourth</Link></li>
                </ul>
                <Route path='/' exact component={App}/>
                <Route path='/:location' component={Test}/>
                <Route path='/Second' component={Second}/>
                <Route path='/Third' component={Third}/>
                <Route path='/Fourth' component={Fourth}/>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
