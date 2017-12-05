# Redux Chrome插件使用

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
