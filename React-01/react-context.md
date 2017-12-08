# Context

当在多层组件中，如果传递层数过多

```js
import React from 'react'

class Navbar extends React.Component{
  render(){
    return(
      <div>{this.props.user}的导航栏</div>
    )
  }
}

class Sidebar extends React.Component{
  render(){
     return(
      <div>
        <p>侧边栏</p>
        <Navbar user={this.props.user}></Navbar>
      </div>
     )
  }
}

class Page extends React.Component{
  render(){
    const user = 'TYRMars'
    return(
      <div>
        <p>我是{user}</p>
        <Sidebar
      </div>
    )
  }
}
```

context是全局的，组件里声明，所有子元素都可以直接获取

