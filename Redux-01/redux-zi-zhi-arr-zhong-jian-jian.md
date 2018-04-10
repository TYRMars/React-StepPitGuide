# 自制Arr中间件

```js
const arrMid = ({dispatch, getState}) => next => action => {
  //如果是函数，执行一下
  if (Array.isArray(action)) {
    return action.forEach(v=>dispatch(v))
  }
  //默认什么都没做，继续执行下一个
  return next(action)
}
export default arrMid
```



