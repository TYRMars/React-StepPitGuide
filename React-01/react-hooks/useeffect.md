# useEffect

* 每次渲染之后都会执行

```js
import React, { userState, useEffect } from 'react'

const ViewUserName = () => {
  const [userName, setUserName ] = userState('');
  useEffect(() => {
    document.title = `用户-${userName}`;
  })
  return (
    <>
      <input value={userName} onChange={(val)=> { setUserName(val) }} />
    <>
  )
}
```



