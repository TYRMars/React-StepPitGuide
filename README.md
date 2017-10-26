# ReactLearn-Advanced
React进阶学习（包含Redux和Router4）

<p align="center"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508844173022&di=ceb56106e3e78327c9cd27cf7aaa249a&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F958489%2F201703%2F958489-20170310162319092-515657136.png" /></p>

## 目录
*

## 知识复习

```JavaScript
import React from 'react';
import {Button,List} from 'antd-mobile';

class App extends React.Component {
  render(){
    const boss = 'JavaScript';
    return (
      <div>
        <h1>React is {boss}</h1>
        <First use='React'/>
      </div>
    )
  }
}

class First extends React.Component {
  constructor(){
    super();
    this.state = {
      things:['C++','PHP','Python']
    }
  }
  componentWillMount(){
    console.log('组件马上开始加载');
  }
  componentDidMount(){
    console.log('组件加载完毕');
  }
  componentWillReceiveProps(){
    console.log('组件要接受父组件的值');
  }
  shouldComponentUpdate(){
    console.log('判断是不是要更新组件');
    return true;
  }
  componentWillUpdate(){
    console.log('马上要更新组件了');
  }
  componentDidUpdate(){
    console.log("组件更新完毕");
  }
  componentWillUnmount(){
    console.log('组件卸载');
  }
  addthings(){
    console.log('hello world');
    this.setState({
      things:[...this.state.things,'love'+ Math.random()]
    })
  }
  render(){
    console.log('组件加载');
    return (
      <div>
        <h2>Component is {this.props.use}</h2>
        <Button type='primary' onClick={()=>this.addthings()}>hello</Button>
        <Rd list = 'Router'/>
        <List renderHeader={()=>'语言列表'}>{this.state.things.map(v=><List.Item key={v}>{v}</List.Item>)}</List>
      </div>
    );
  }
}

function Rd(props) {
  return (
    <div>
      <h3>Redux and {props.list}</h3>
    </div>
  );
}

export default App;
```

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

### Redux使用

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

### Redux结合React

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
