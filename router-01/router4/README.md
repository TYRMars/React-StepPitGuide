# React-router4

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

```javascript
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

## 其他组件

* URL参数，Router组件参数可用冒号标识参数
* Redirect组件 跳转
* Switch只是渲染一个子Route组件

```javascript
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

### Redirect

`<Redirect to='/Second'></Redirect>`初始的页面，访问主页面自动跳转此页面

```javascript
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

### Switch

* 只渲染命中的第一个Route

```javascript
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

