# 代理方式的高阶组件

代理方式的高阶组件，特点是返回新组件，直接继承React.Component

```javascript
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

代理方式的高阶组件，下列场景中：

* 操纵prop；
* 访问ref；
* 抽取状态；
* 包装组件；

## 1.操纵prop

## 2.访问ref

## 3.抽取状态

## 4.包装组件

