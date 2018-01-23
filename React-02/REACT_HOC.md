# React 高阶组件\(HOC\)与函数子组件

### React高阶组件

高阶组件\(Higher Order Component,HOC\)是为React提供一种增强组件功能的开发模式。

它是函数形式出现，本身可以称为“`高阶组件工厂函数`”，**高阶组件**是一个函数，它的参数就是要增强功能的组件，然后返回一个新组件作为结果，返回的新组件就是在原有传入组件上挂载了新的功能。

###### Example

```js
import React from 'react'

function doingThings (BaseComponent){
  return class DoingThingsComponent extends React.Component{
    render(){
      return(
        <div>
          <p>这个高阶组件特有的</p>
          <BaseComponent {...this.props}></BaseComponent>
        </div>
      )
    }
  }
}
```

**高阶组件**的实现方式可以分为两大类：

1. 代理方式的高阶组件
2. 继承方式的高阶组件



