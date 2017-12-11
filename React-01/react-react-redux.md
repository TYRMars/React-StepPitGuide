# React React-Redux

不难想通过Redux进行数据处理，把显示与数据分开，通过之前容器组件和展示组件结合Context，综合它们的优点。

出现了React-Redux来实现这些功能

* `npm install react-redux --save`
* 对于Redux，只需要记住reducer，action和dispatch
* 使用React-Redux的两个重要接口connect和Provider

#### React-Redux主要两个功能

* **connect**：连接容器组件和展示组件；
* **Provider**：提供包含store的context

## 1.Connect

* Connect负责组件外部获取组件需要的参数

```js
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
  * 如果使用的`create-react-app` 要 `npm run eject`弹出个性化配置
  * `npm install babel-plugin-transform-decorators-legacy`
  * `Package.json`里`babel`加上`plugins`配置`transform-decorators-legacy`

```js
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

## 2.Provider

* Provider组件在最外层，传入store即可，只用一次（数据传入到组件）

```js
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



