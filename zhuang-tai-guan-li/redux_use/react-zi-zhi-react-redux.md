# Redux 自制React-Redux

### connect负责链接组件，把redux里的数据放到组件属性中

```javascript
export function connect(){
  //...
}
```

1. 负责接受一个组件，把state里的一些数据放进去，返回一个组件
2. 数据变化的时候，能够通知组件

#### 分析React-Redux中

```javascript
App = connect(state=>({num:state}),{add,remove})(App)
//state=>() 映射state，map state to props
//{add,remove} 从dispatch，从具体操作函数到属性的映射 ，map dipatch to props
```

#### 高阶组件写法connect

* 实现其中的`mapStateToProps,mapDispatchToProps`参数

```javascript
//传统写法
export function connect(mapStateToProps,mapDispatchToProps){
  return function (WrapComponent){
    return class ConnectComponent extends React.Component{
    }
  }
}
//采用箭头函数
export const connect = (mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComponent)=>{
  return class ConnectComponent extends React.Component{
  }
}
```

### Provider把store放到context里，所有的子元素可以直接取到store

```javascript
class Provider extends React.Component{
  //...
}
```

## 自制React-Redux

* `import {bindActionCreators} from './tyrmars-redux.js'` 查看[自制Redux](redux_create.md)

```javascript
import React from 'react'
import PropTyps from 'prop-types'
import {bindActionCreators} from './tyrmars-redux.js'
//state=>state
//function (state){
//  return state
//}
//connect
export const connect = (mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComponent)=>{
  return class ConnectComponent extends React.Component{
    static contextType = {
      store:PropTypes.object
    }
    constructor(props){
      super(props)
      this.state = {
        props:{}
      }
    }
    componentDidMount(){
      const {store} = this.context
      store.subscirbe(()=>this.update())
      this.update()
    }
    update(){
      // 获取mapStateToProps和mapDispatchToProps 放入this.props里
      const {store} = this.context
      const stateProps = mapStateToProps(store.getState())
      //不能直接传递
      // add = ()=> store.dipatch(add())通过dispatch才有意义
      // 在这里其实就是用dispatch把actionCreator包了一层
      const stateDispatch = bindActionCreators(mapDispatchToProps,store.dispatch)
      this.setState(
       props:{
       //一定要把this.state.props放在最上面，因为要覆盖之前的state
        ...this.state.props,
        ...stateProps,
        ...stateDispatch,
       }
      )
    }
    render(){
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}
//Provider
export class Provider extends React.Component{
  static childContextTypes = {
    store:PropTypes.object
  }
  getChildContext(){
    return {store:this.store}
  }
  constructor(props,context){
    super(props,context)
    this.store = props.store
  }
  render(){
    return this.props.children
  }
}
```

