# React 组件优化

* 属性传递优化
* 多组件优化
* key

##### Example

```js
import React from 'react'

class App extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        num:1
      }
   }
   handleClick(){
     this.setState({
       num:this.state.num+1
     })
   }
   render(){
     return(
       <div>
         <h2>App</h2>
         <button onClick={this.handleClick.bind(this)}>b1</button>
         <button onClick={()=>this.handleClick()}>b2</button>
       </div>
     )
   }
}

export default App;
```

此处的性能优化点在于`onClick`所触发的函数，是想在JavaScript中，如下

```js
1 == 1 //true
{c:1} == {c:1} //这种情况下是false，因为每次生成的对象，存入到内存的地址是不同的
```

所以在这函数会重复的生成，导致重复render，这个地方就是要优化的点，优化方法如下

```js
import React from 'react'

class App extends React.Component{
   constructor(props){
      super(props)
      this.state = {
        num:1
      }
      this.handleClick = this.handleClick.bind(this)
   }
   handleClick(){
     this.setState({
       num:this.state.num+1
     })
   }
   render(){
     return(
       <div>
         <h2>App</h2>
         <button onClick={this.handleClick}>b1</button>
       </div>
     )
   }
}

export default App;
```



