# 定制shouldComponentUpdate

### 多组件优化

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
       <Demo title={this.state.title}></Demo>
      </div>
    )
  }
}

class Demo extends React.Component {
  render() {
    return (<h2>I am Demo，{this.props.title}</h2>)
  }
}

export default App
```



---

## React16性能检测

通过在浏览器中在链接上加入`/?react_pref`。

![](/assets/微信截图_20171230202738.png)

通过此方法可以在浏览器默认的性能监视器Performance中查看性能改变

![](/assets/微信截图_20171230201617.png)![](/assets/微信截图_20171230201653.png)test

---

通过定制shouldComponentUpdate来减少组件的render从而优化性能

主要就是对比现有的props和state与改变后的不同，如果相同就不会再次渲染

```js
shouldComponentUpdate(nextProps, nextState){
  if(nextProps.title === this.props.title){
    return false
  }
  return true
}
```



