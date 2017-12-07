# Redux 自制

#### 简版Redux基本实现

* TYRMars-redux.js

```js
export function createStore(reducer) {
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    //传入函数
    currentListeners.push(listener)
  }

  function dispatch(action){
    currentState = reducer(currentState,action)
    currentListeners.forEach(v=>v())
    return action
  }

  //触发初始状态
  dispatch({type:'@TYRMARS/Mars-Redux'})

  return {getState,subscribe,dispatch}
}
```

##### 测试与redux的过程分析

```js
import {createStore} from './TYRMars-redux'

//新建数据存放点
const store = createStore(counter)

//对于reducer处理函数，参数是状态和新的aciton
function counter(state=0,action) {
  switch (aciton.type) {
    case '+':
       return state+1
    case '-':
       return state-1
    default:
      return state
  }
}

//监听state的状态
function listerner() {
  const current = store.getState()
  console.log(`num is ${current}`)
}

//订阅每一次state修改，都会执行listener
store.subscribe(listener)

//触发动作
store.dispatch({type:'+'})
store.dispatch({type:'-'})
```

使用上部的自制redux可以看出

1. 使用函数createStore创建store数据点
2. 创建Reducer。在介绍Redux的时候，我们就知道Reducer这个🈯️指的是要改变的组件，它获取`state`和`action`，生成新的`state`，
3. 用subscribe监听每次修改情况
4. dispatch执行，reducer\(currentState,action\)处理当前dispatch后的传入的action.type并返回给currentState处理后的state，通过currentListeners.forEach\(v=&gt;v\(\)\)执行监听函数，并最后返回当前 action状态

#### React 中的使用

```js
const store = createStore(counter)

function render() {
  ReactDom.render(<App store={store} />,document.getElementById('root'));
}
render();

store.subscribe(render)
```

简版的Redux，采用subscribe每次监听render

