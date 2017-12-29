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



