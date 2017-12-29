# React 组件优化

* 属性传递优化
* 多组件优化
* key

### 属性传递

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

这样就是通过在构造函数里声明。不会在每次render的时候重复生成。这个是因为类通过构造函数实例化，在constructor里进行绑定，只用生成一次，后面就可以直接调用。

### 组件数据传递

```js
import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      num:1,
      title:'tyrmars',
      name:'zhang'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState({
      num:this.state.num+1
    })
  }
  render() {
    const
    return (
      <div>
       <h2>I am App</h2>
       <button onClick={this.handleClick}>b1</button>
       <Demo style={{color:'red'}} title={this.state.title}></Demo>
      </div>
    )
  }
}

class Demo extends React.Component {
  render() {
    return (<h2>I am Demo</h2>)
  }
}

export default App
```

每次对Demo进行数据传递的时候都会生成一个新的对象

```js
<Demo style={{color:'red'}} title={this.state.title}></Demo>
```

传递数据时，不要全部state都传递过去，需要哪些数据传递哪些数据

```js
<Demo {...this.state}></Demo>
```



