# React 容器组件和展示组件

* 让一个组件只专注做一件事，如果发现一个组件做的事情太多了，就可以把这个组件拆分成多个组件，让每个组件依然只专注做一件事。

#### 分析

Redux框架之下，React组件要完成以下的事情

* 和Redux Store进行交流，读取Store状态，用于初始化组件的状态，同时还要监听Store的状态改变；当Store状态发生变化时，需要更新组件状态，从而驱动组建重新渲染；但需要更新Store状态时，就要派发action对象；
* 根据当前props和state，渲染出用户界面

所以为了让React对于处理数据和显示界面能更加专注。我们可以把其组件进行拆分，让一部分专注于处理数据，让另一部分专注于显示界面。这样在通过嵌套调用。完成之前一个组件的任务。

#### 第一种组件【容器组件\(Container Component\)】

它要专注于处理数据，负责和Redux Store进行交流，用来做状态处理，它是动态的。处于组件嵌套的外层，所以叫做容器组件

```js
//容器组件
import React from 'react'
import Counter from './component/counter'
class CounterContainer extends React.Component{
  //...addNum,removeNum,value
  render(){
    return(
     <div>
      <Counter addNum={addNum} removeNum={removeNum} value={value}/>
     </div>
    )
  }
}
```

#### 第二种组件【展示组件\(Presentational Component\)】

它主要专注于view，它本身是纯函数，通过接收父组件传递过来的props产生结果渲染页面，所以它是无状态的，。处于组件嵌套的内层，所以叫它展示组件

```js
//展示组件
import React from 'react'
class Counter extends React.Component{
  const {addNum,removeNum,value} = this.props
  render(){
    <div>
     <button onClick={addNum}>+</button>
     <button onClick={removeNum}>-</button>
     <span>{value}</span>
    </div>
  }
}
export default Counter
```

对于无状态组件还可以进行进一步优化。基于它是一种纯函数思想，传入参数返回处理后的数据。所以可以进行如下改写

```js
//展示组件改进
function Counter(props){
  const {addNum,removeNum,value} = props;
  return({
   <div>
     <button onClick={addNum}>+</button>
     <button onClick={removeNum}>-</button>
     <span>{value}</span>
   </div>
  })
}
//另一种写法，写成解构赋值
function Counter({addNum,removeNum,value}){
  //直接使用addNum,removeNum,value这些变量
}
```

所以对于`容器组件`也有人称为它为`智能组件`，对于展示`组件`也有人称它为`傻瓜组件`

---



