# React Context

当在多层组件中，如果传递层数过多，如以下实例：

```js
import React from 'react'

//3
class Navbar extends React.Component{
  render(){
    return(
      <div>{this.props.user}的导航栏</div>
    )
  }
}

//2
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

//1
class Page extends React.Component{
  render(){
    const user = 'TYRMars'
    return(
      <div>
        <p>我是{user}</p>
        <Sidebar user={this.props.user}/>
      </div>
    )
  }
}
```

就会出现中间组件只是作为参数传递。

如果层数再次增加，而且最外层传入一个参数，只有最内层使用，这就需要中间每一层帮忙传递。

所以在使用Redux的时候，通过props传递state不是一个很好的方法。

不过呢，React提供了一个很不错的功能，能很好的解决这个问题。那就是Context

---

#### Context

Context是全局的，就是“上下文环境”，所有子元素都可以直接获取。

1. 顶层组件进行Context的设置，提供一个函数来返回代表Context的对象
2. 对顶层组件之下的组件，声称其需要这个Context，可以通过this.context访问到这个共同的环境变量

我们可以自定义一个Provider的React组件

```js
import {PropType,Component} from 'react'
//React16之后PropType与React分开，单独了出来，详细请查看React PropsTypes
class Provider extends React.Component{
  getChildContext(){
    return {
     store:this.props.store
    };
  }
  render(){
    return this.props.children;
  }
}

Provider.childContextType = {
  store:PropTypes.object
}

export default Provider
```

改进相关的`index.js`入口文件

```js
import {Store} from './Store.js' 
import ReactDOM from 'react'
import Provider from './Provider.js'

ReactDOM.render(
 <Provider>
   <Page/>
 </Provider>
 ,document.getElementById('root')
);
```

给ControlPanel包一层Provider，Provider提供了Context，也就是通过这种方式，让Context覆盖所有组件

```js
import React from 'react'

Navbar.contextTypes = {
 store:PropType.object
}

//3
class Navbar extends React.Component{
  render(){
    return(
      <div>{this.context.store.user}的导航栏</div>
    )
  }
}
```

在最底层直接引入Context，相应的store就能通过this.context.store读取出来

如果定义了构造函数就要把context以参数形式引入

```js
constructor(props,context){
  super(props,context)
}
```



