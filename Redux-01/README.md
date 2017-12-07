# Redux

* Redux专注与状态管理、和react解耦
* 单一状态、单向数据流
* 核心概念：`store`、`state`、`action`

```
为什么会出现Redux呢，因为在处理少量数据的时候，可以使用setState
但是如果，现在有🈶️成千上万的数据，数据的传递就要和组件的显示分开
所以Redux就是来帮助React来管理数据的，React现在只负责自己的View
```

* `store`:📝记录了所有组件的状态\(state\)
* `dispatch`:更改管理实体
* `action`:要更改什么
* `reducer`:这个🈯️指的是要改变的组件，它获取`state`和`action`，生成新的`state`

## Action

action 内必须使用一个字符串类型的`type`字段来表示将要执行的动作。多数情况下，`type`会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

## Action创建函数

**Action 创建函数**就是生成 action 的方法。

```JavaScript
// action creator

export function add() {
  return {type:ADD};
};
export function reduce() {
  return {type:REDUCE};
};
```

## Reducer合并

通过一个combineReducers合并所有的reducers

```js
//合并所有reducer
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'

export default combineReducers({user,chatuser,chat})
```

在index中使用reducers来进行数据管理

```js
import reducers from './reducer'
const store = createStore(reducers)
```



