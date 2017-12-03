# ReactLearn-Advanced
React进阶学习（包含Redux和Router4）

<p align="center"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508844173022&di=ceb56106e3e78327c9cd27cf7aaa249a&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F958489%2F201703%2F958489-20170310162319092-515657136.png" /></p>

## 脚手架常用

* `npm start`开启调试环境
* `npm install redux --save `安装第三方库redux
* `npm run eject`弹出配置菜单，可以自定义配置webpack
* 扩展`package.json`里的script字段，扩展`npm run`命令

## 目录
* [00-00](https://github.com/TYRMars/ReactLearn-Advanced)`知识复习`

### 第一章 Redux

* [01-01](https://github.com/TYRMars/ReactLearn-Advanced#01-01)`Redux介绍`
* [01-02](https://github.com/TYRMars/ReactLearn-Advanced#01-02)`Redux使用`
* [01-03](https://github.com/TYRMars/ReactLearn-Advanced#01-03)`Redux结合React`
* [01-04](https://github.com/TYRMars/ReactLearn-Advanced#01-04)`Redux同步异步问题`
* [01-05](https://github.com/TYRMars/ReactLearn-Advanced#01-05)`Redux Chrome插件使用`
* [01-06](https://github.com/TYRMars/ReactLearn-Advanced#01-06)`React-Redux`

### 第二章 React-router4

* [02-01](https://github.com/TYRMars/ReactLearn-Advanced#02-01)`React-router4基础介绍`
* [02-02](https://github.com/TYRMars/ReactLearn-Advanced#02-02)`React-router4其他组件`
* [02-03](https://github.com/TYRMars/ReactLearn-Advanced#02-03)`React-router4结合React-redux`

### 第三章 asios

* [03-01](https://github.com/TYRMars/ReactLearn-Advanced#03-01)`axios异步请求`

### 第四章 React高阶组件

* [04-01](https://github.com/TYRMars/ReactLearn-Advanced#04-01)`React高阶组件`

# 01-01
## Redux是什么

* Redux专注与状态管理、和react解耦
* 单一状态、单向数据流
* 核心概念：`store`、`state`、`action`

```
为什么会出现Redux呢，因为在处理少量数据的时候，可以使用setState
但是如果，现在有🈶️成千上万的数据，数据的传递就要和组件的显示分开
所以Redux就是来帮助React来管理数据的，React现在只负责自己的View
```

### Redux

* `store`:📝记录了所有组件的状态(state)
* `dispatch`:更改管理实体
* `action`:要更改什么
* `reducer`:这个🈯️指的是要改变的组件，它获取`state`和`action`，生成新的`state`

# 01-02
## Redux使用

* 通过`reducer`新建`store`，随时通过`store.getState`获取状态
* 需要状态变更，`store.dispatch(action)`来修改状态
* `reducer`函数接受`state`和`action`，🔙返回🆕新的`state`，可以用`store.subscribe`监听每次修改

##### `index.js`

```JavaScript
import {createStore} from 'redux'

function counter(state=0,action) {
  switch (action.type) {
    case 'add':
      return state+1;
    case 'reduce':
      return state-1;
    default:
      return 10
  }
}

//新建store
const store = createStore(counter);
const init = store.getState();
console.log(init);

//监听
function listener() {
  const current = store.getState();
  console.log(`现在有的${current}`);
}
store.subscribe(listener)

//派发事件 传递aciton
store.dispatch({type:'add'});
store.dispatch({type:'reduce'});
store.dispatch({type:'add'});
store.dispatch({type:'add'});
```

# 01-03
## Redux结合React

##### `index.js`

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import {counter} from './index.redux'
import App from './App'

const store = createStore(counter)

function render() {
  ReactDom.render(<App store={store} />,document.getElementById('root'));
}
render();

store.subscribe(render)
```

##### `App.jsx`

```JavaScript
import React from 'react'
import {add} from './index.redux'
class App extends React.Component {
  // constructor() {
  //
  // }
  render(){
    const store = this.props.store
    const num = store.getState()
    return(
      <div>
      <h1>展示dedux数据{num}</h1>
      <button onClick={()=>store.dispatch(add())}>➕加1</button>
      </div>
    )
  }
}

export default App
```

##### `index.redux.js`

```JavaScript
const ADD = 'add';
const REDUCE = 'reduce';

// reducer
const ADD = 'add';
const REDUCE = 'reduce';

// reducer
exports.counter = function (state=0,action) {
  switch (action.type) {
    case 'add':
      return state+1;
    case 'reduce':
      return state-1;
    default:
      return 10
  }
};

// action creator
exports.add = function () {
  return {type:ADD};
};
exports.reduce = function () {
  return {type:REDUCE};
};
```

* 此种方式耦合程度太高，为了保证组件的独立性做出如下修改
* index.redux.js封装📦了`add`函数，直接import这个函数
* 通过参数形式传递给App.js

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import {counter,add} from './index.redux'
import App from './App'

const store = createStore(counter)//新建一个store

function render() {
  ReactDom.render(<App store={store} add={add} />,document.getElementById('root'));
  //以组件的属性形式传递到组件里面
}
render();

store.subscribe(render)
//利用subscribe订阅render函数，状态变化时render会重新执行，渲染整个页面
```

* App.js通过组件内部接受父组件传递来的数据

```JavaScript
import React from 'react'

class App extends React.Component {
  // constructor() {
  //
  // }
  render(){
    const store = this.props.store
    const num = store.getState()//获取初始状态
    //获取dispatch方法，获取action
    const add = this.props.add
    const reduce = this.props.reduce
    return(
      <div>
      <h1>展示dedux数据{num}</h1>
      <button onClick={()=>store.dispatch(add())}>➕加1</button>
      <button onClick={()=>store.dispatch(reduce())}>➖减1</button>
      </div>
    )
  }
}

export default App
```

# 01-04
## Redux同步

* 处理异步、调试工具🔧、更优雅的和react结合
  - `Redux`处理异步，需要`redux-thunk`组件(比较简单的)
  - `npm install redux-devtools-extention`并开启🔛(调试工具🔧)
  - 使用`react-redux`优雅的链接🔗`react`和`redux`

### 处理异步

* Redux默认只处理同步，异步任务需要`react-thunk`中间件
  - `npm install redux-thunk --save`
  - 使用`applyMiddleware`开启thunk中间件
  - `Action`可以返回函数，使用`dispatch`提交`action`

```JavaScript
//创建一个异步动作
export function addAsync() {
  return dispatch=>{
    setTimeout(
      ()=>{
        dispatch(add())
      },2000)
  }
}
```

* index.js

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware } from 'redux'
import {counter,add,reduce,addAsync} from './index.redux'
import App from './App'

const store = createStore(counter,applyMiddleware(thunk))

function render() {
  ReactDom.render(<App store={store} addAsync={addAsync} add={add} reduce={reduce} />,document.getElementById('root'));
}
render();

store.subscribe(render)
```

* index.redux.js

```JavaScript
const ADD = 'add';
const REDUCE = 'reduce';

// reducer
export function counter(state=0,action) {
  switch (action.type) {
    case 'add':
      return state+1;
    case 'reduce':
      return state-1;
    default:
      return 10
  }
};

//提交action，reducer就会执行

// action creator
export function add() {
  return {type:ADD};
};
export function reduce() {
  return {type:REDUCE};
};

//创建一个异步动作
export function addAsync() {
  return dispatch=>{
    setTimeout(
      ()=>{
        dispatch(add())
      },2000)
  }
}
```

* App.js

```JavaScript
import React from 'react'

class App extends React.Component {
  // constructor() {
  //
  // }
  render(){
    const store = this.props.store
    const num = store.getState()
    const add = this.props.add
    const reduce = this.props.reduce
    const addAsync = this.props.addAsync
    return(
      <div>
      <h1>展示dedux数据{num}</h1>
      <button onClick={()=>store.dispatch(add())}>➕加1</button>
      <button onClick={()=>store.dispatch(reduce())}>➖减1</button>
      <button onClick={()=>store.dispatch(addAsync())}>➕加1(两秒以后)</button>
      </div>
    )
  }
}

export default App
```

# 01-05
## Redux Chrome插件使用

* 🆕新建store的时候判断window.devToolsExtension
* 使用compose结合thunk和winows.devToolsExtension
* 调试窗的redux选项卡，实时看到state

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware ,compose} from 'redux'
import {counter,add,reduce,addAsync} from './index.redux'
import App from './App'

const store = createStore(counter,compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension():()=>{}

))

function render() {
  ReactDom.render(<App store={store} addAsync={addAsync} add={add} reduce={reduce} />,document.getElementById('root'));
}
render();

store.subscribe(render)
```

# 01-06
## React-Redux

* 完全使用Redux会很麻烦，所以使用专门React-Redux来管理
  - `npm install react-redux --save`
  - 忘记`subscribe`，记住`reducer`，`action`和`dispath`即可
  - `react-redux`提供`Provider`和`Connect`两个接口来链接🔗

### 使用React-Redux

* Provider组件在最外层，传入store即可，只用一次（数据传入到组件）

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware ,compose} from 'redux'
import {counter} from './index.redux'
import App from './App'

const store = createStore(counter,compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension():()=>{}

))

ReactDom.render(
  (<Provider store={store}>
    <App/>
    </Provider>),
  document.getElementById('root')
);
```

* Connect负责组件外部获取组件需要的参数

```JavaScript
import React from 'react'
import {connect} from 'react-redux'
import {add,reduce,addAsync} from './index.redux'
class App extends React.Component {
  // constructor() {
  //
  // }
  render(){
    const num = this.props.num
    const add = this.props.add
    const reduce = this.props.reduce
    const addAsync = this.props.addAsync
    return(
      <div>
      <h1>展示dedux数据{num}</h1>
      <button onClick={add}>➕加1</button>
      <button onClick={reduce}>➖减1</button>
      <button onClick={addAsync}>➕加1(两秒以后)</button>
      </div>
    )
  }
}
const mapStatetoProps = (state) => {
  return {num:state}
}
const acitonCreators = {add,reduce,addAsync}

App = connect(mapStatetoProps,acitonCreators)(App)
export default App
```

* Connect可以用装饰器的方式来书写
  - `npm run eject`弹出个性化配置
  - `npm install babel-plugin-transform-decorators-legacy`
  - `Package.json`里`babel`加上`plugins`配置`transform-decorators-legacy`

```JavaScript
import React from 'react'
import {connect} from 'react-redux'
import {add,reduce,addAsync} from './index.redux'

@connect(
  // 你要state什么属性放到props
  (state) => {
  return {num:state}},
  {add,reduce,addAsync}
)

class App extends React.Component {
  // constructor() {
  //
  // }
  render(){
    const num = this.props.num
    const add = this.props.add
    const reduce = this.props.reduce
    const addAsync = this.props.addAsync
    return(
      <div>
      <h1>展示dedux数据{num}</h1>
      <button onClick={add}>➕加1</button>
      <button onClick={reduce}>➖减1</button>
      <button onClick={addAsync}>➕加1(两秒以后)</button>
      </div>
    )
  }
}

export default App
```

# 02-01
## React-router4

* React官方的路由库
* React开发单页应用，路由即组件
* 核心概念：动态路由、Route、Link、Switch
* 安装：`npm install react-router-dom --save`
* `react-router-dom`浏览器端的路由

#### 入门组件

* BrowserRouter，📦包裹应用
* Router路由对应渲染的组件，可嵌套
* Link跳转专用

```JavaScript
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

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    //点击跳转制定路由
                    <li><Link to='/'>First</Link></li>
                    <li><Link to='/Second'>Second</Link></li>
                    <li><Link to='/Third'>Third</Link></li>
                    <li><Link to='/Fourth'>Fourth</Link></li>
                </ul>
                //路由对应渲染板
                <Route path='/' exact component={App}/>
                <Route path='/Second' component={Second}/>
                <Route path='/Third' component={Third}/>
                <Route path='/Fourth' component={Fourth}/>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
```

* exact完全匹配，如果不进行完全匹配`<li><Link to='/'>First</Link></li>`会一直显示在页面上

# 02-02
## 其他组件

* URL参数，Router组件参数可用冒号标识参数
* Redirect组件 跳转
* Switch只是渲染一个子Route组件

```JavaScript
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

class Test extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    return (<h1> test测试组件{this.props.match.params.location} </h1>)
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
                <Route path='/' exact  component={App}/>
                <Route path='/:location' component={Test}/>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
```

##### `Redirect,Switch`

`<Redirect to='/Second'></Redirect>`初始的页面，访问主页面自动跳转此页面

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
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
                <Redirect to='/Second'></Redirect>
                <Route path='/' exact  component={App}/>
                <Route path='/Second' component={Second}/>
                <Route path='/Third' component={Third}/>
                <Route path='/Fourth' component={Fourth}/>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
```

##### `Switch`

* 只渲染命中的第一个Route

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
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
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    return (<h1> test测试组件{this.props.match.params.location} </h1>)
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
                <Switch>
                  <Route path='/' exact  component={App}/>
                  <Route path='/Second' component={Second}/>
                  <Route path='/Third' component={Third}/>
                  <Route path='/Fourth' component={Fourth}/>
                  <Route path='/:location' component={Test}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
```

# 02-03
## React-router4结合React-redux

* 复杂redux应用，多个reducer，用combineReducers合并
* Redirect组件跳转
* Switch只渲染一个子组件

## 注意⚠️combineReducers合并数据后，取出数据时参数的选取

* App.js之前是从`counter`直接获取的父组件的传过来的参数，不用选取`counter`
* 但是合并后`state`对象变成了合并后的`reducer`，所以需要改变
  - 改变前`@connect(state => ({num:state}),{add, minus, addAsync})`
  - 改变后`@connect(state => ({num:state.counter}),{add, minus, addAsync})`

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
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

```JavaScript
//合并reducer 并返回
import { combineReducers } from 'redux'
import { counter } from "./index.redux";
import { auth } from "./Auth.redux";

export default combineReducers({ counter , auth })
```

* Dashboard.js

```JavaScript
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

```JavaScript
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

# 03-01
## axios发送异步请求

* 端口不一致，配置proxy配置转发
* axios拦截器，统一loading处理
* redux里使用异步数据，渲染页面📃

## axios

* `npm install axios --save`

# 04-01
## React高阶组件

* 装饰器模式

```JavaScript
function hello() {
  console.log('hello YueYue');
}

function WrapperHello(fn) {
  return function () {
    console.log('before hello');
    fn()
    console.log('after hello');
  }
}
hello = WrapperHello(hello)
hello()
```

  - 便捷写法

```JavaScript
@connect()
```

### React使用

* 高阶组件属性代理

```JavaScript
class Hello extends React.component {
  render(){
    return(<h2>hello YueYue</h2>)
  }
}

function WrapperHello(Comp) {
  class WrapComp extends React.Component{
    render(){
      return (
        <div>
         <p>这是HOC高阶组件特有元素</p>
         <Camp {...this.props}></Camp>
        </div>
      )
    }
  }
  return WrapComp
}

hello = WrapperHello(Hello)
```

* HOC，给出的组件外面包装一层
  - 属性代理
  - 反向继承:渲染劫持

* 高阶组件反向继承

```JavaScript
function WrapperHello(Comp) {
  class WrapComp extends Comp {
    componentDidMount(){
      console.log('高阶组件新增的生命周期，加载完成');
    }
    render(){
      return <Comp></Comp>
    }
  }
  return WrapComp
}

@WrapperHello
```
