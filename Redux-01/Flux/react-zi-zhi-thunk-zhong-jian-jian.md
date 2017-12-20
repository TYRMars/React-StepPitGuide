# React 自制thunk中间件

之前我们已经知道了thunk中间件是实现Redux异步的一种

```js
const thunk = ({dispatch,getState})=>next=>action=>{
  //如果是函数，执行一下
  if(typeof action==='function'){
     return action(dispatch,getState)
  }
  //
  return next(action)
}
export default thunk
```



