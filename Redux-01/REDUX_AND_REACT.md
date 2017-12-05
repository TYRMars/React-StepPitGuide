# Redux结合React

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
