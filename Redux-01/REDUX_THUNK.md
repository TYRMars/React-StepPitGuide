# Redux异步

![](/assets/20160206132838_567.png)

* 处理异步、调试工具🔧、更优雅的和react结合
  * `Redux`处理异步，需要`redux-thunk`组件\(比较简单的\)
  * `npm install redux-devtools-extention`并开启🔛\(调试工具🔧\)
  * 使用`react-redux`优雅的链接🔗`react`和`redux`

### 处理异步

* Redux默认只处理同步，异步任务需要`react-thunk`中间件
  * `npm install redux-thunk --save`
  * 使用`applyMiddleware`开启thunk中间件
  * `Action`可以返回函数，使用`dispatch`提交`action`

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

---



