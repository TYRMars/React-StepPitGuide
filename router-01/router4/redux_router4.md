# React-router4 结合React-Redux

* 复杂redux应用，多个reducer，用combineReducers合并
* Redirect组件跳转
* Switch只渲染一个子组件

## 注意⚠️combineReducers合并数据后，取出数据时参数的选取

* App.js之前是从`counter`直接获取的父组件的传过来的参数，不用选取`counter`
* 但是合并后`state`对象变成了合并后的`reducer`，所以需要改变
  * 改变前`@connect(state => ({num:state}),{add, minus, addAsync})`
  * 改变后`@connect(state => ({num:state.counter}),{add, minus, addAsync})`

```javascript
import React from 'react'
import { connect } from 'react-redux'
import {add, minus, addAsync} from './index.redux'


// App = connect(mapStatetoProps,acitonCreators)(App)
@connect(state => ({num:state.counter}),{add, minus, addAsync})

class App extends React.Component {
    // constructor() {
    //
    // }
    render() {
        const num = this.props.num;
        const add = this.props.add;
        const minus = this.props.minus;
        const addAsync = this.props.addAsync;
        return (
            <div>
                <h1>展示dedux数据{num}</h1>
                <button onClick={add}>➕加1</button>
                <button onClick={minus}>➖减1</button>
                <button onClick={addAsync}>➕加1(两秒以后)</button>
            </div>
        )
    }
}

export default App
```

### 整体结构

* index.js

```javascript
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {BrowserRouter, Route , Redirect, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from "./reducer"
import Auth from './Auth'
import Dashboard from './Dashboard'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {
    }
));

console.log(store.getState());

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
```

* index.redux.js

```javascript
const ADD = 'add';
const MINUS = 'minus';

// reducer
export function counter(state=0,action) {
  switch (action.type) {
    case 'add':
      return state+1;
    case 'minus':
      return state-1;
    default:
      return 10
  }
}

//提交action，reducer就会执行

// action creator
export function add() {
  return {type:ADD};
}
export function minus() {
  return {type:MINUS};
}

export function addAsync() {
  return dispatch=>{
    setTimeout(
      ()=>{
        dispatch(add())
      },2000)
  }
}
```

* Auth.js

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { login } from './Auth.redux'
import {Redirect} from 'react-router-dom'

//两个reducers 每个reducers都有一个state
//合并reducer
@connect(
    state=>state.auth,
    {login}
)

class Auth extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div>
      {this.props.isAuth? <Redirect to='/dashboard'/> :null}
      <h2>你没有权限，需要登录</h2>
      <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth
```

* Auth.redux.js

```javascript
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export function auth(state={ isAuth:false , user:'root'},action) {
    switch(action.type){
        case LOGIN:
            return{...state, isAuth:true};
        case LOGOUT:
            return{...state, isAuth:false};
        default:
            return state
    }
}

//action

export function login() {
    return {type:LOGIN}
}
export function logout() {
    return {type:LOGOUT}
}
```

* reducer.js

```javascript
//合并reducer 并返回
import { combineReducers } from 'redux'
import { counter } from "./index.redux";
import { auth } from "./Auth.redux";

export default combineReducers({ counter , auth })
```

* Dashboard.js

```javascript
import React from 'react'
import {Route, Link,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './Auth.redux'
import App from "./App";

function News() {
    return (
        <div>
            <h2>News</h2>
        </div>
    )
}

function Video() {
    return (
        <div>
            <h2>Video</h2>
        </div>
    )
}

@connect(
  state=>state.auth,
  {logout}
)

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
      console.log(this.props);
      const redirectToLogin = <Redirect to='/login'></Redirect>
      const app = (
          <div>
          <h1>欢迎{this.props.user}</h1>
          {this.props.isAuths ? null : <button onClick={this.props.logout}>注销</button>}
              <ul>
                  <li>
                      <Link to='/dashboard/'>首页</Link>
                  </li>
                  <li>
                      <Link to='/dashboard/news'>新闻</Link>
                  </li>
                  <li>
                      <Link to='/dashboard/video'>视频</Link>
                  </li>
              </ul>
              <Route path='/dashboard/' exact component={App}></Route>
              <Route path='/dashboard/news' component={News}></Route>
              <Route path='/dashboard/video' component={Video}></Route>
          </div>
      )
        return this.props.isAuth ? app: redirectToLogin
    }
}

export default Dashboard
```

* 为了减少`to='/dashboard/'`，可以将其通过`this.props.match`来获取
* 可以更新`Dashboard.js`

```javascript
//。。。
    render() {
      const match = this.props.match;
      console.log(this.props);
      const redirectToLogin = <Redirect to='/login'></Redirect>
      const app = (
          <div>
          <h1>欢迎{this.props.user}</h1>
          {this.props.isAuths ? null : <button onClick={this.props.logout}>注销</button>}
              <ul>
                  <li>
                      <Link to={`${match.path}/`}>首页</Link>
                  </li>
                  <li>
                      <Link to={`${match.path}/news`}>新闻</Link>
                  </li>
                  <li>
                      <Link to={`${match.path}/video`}>视频</Link>
                  </li>
              </ul>
              <Route path={`${match.path}/`} exact component={App}></Route>
              <Route path={`${match.path}/news`} component={News}></Route>
              <Route path={`${match.path}/video`} component={Video}></Route>
          </div>
      )
        return this.props.isAuth ? app: redirectToLogin
    }
```

