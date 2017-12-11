## 知识复习

```JavaScript
import React from 'react';
import {Button,List} from 'antd-mobile';

class App extends React.Component {
  render(){
    const boss = 'JavaScript';
    return (
      <div>
        <h1>React is {boss}</h1>
        <First use='React'/>
      </div>
    )
  }
}

class First extends React.Component {
  constructor(){
    super();
    this.state = {
      things:['C++','PHP','Python']
    }
  }
  componentWillMount(){
    console.log('组件马上开始加载');
  }
  componentDidMount(){
    console.log('组件加载完毕');
  }
  componentWillReceiveProps(){
    console.log('组件要接受父组件的值');
  }
  shouldComponentUpdate(){
    console.log('判断是不是要更新组件');
    return true;
  }
  componentWillUpdate(){
    console.log('马上要更新组件了');
  }
  componentDidUpdate(){
    console.log("组件更新完毕");
  }
  componentWillUnmount(){
    console.log('组件卸载');
  }
  addthings(){
    console.log('hello world');
    this.setState({
      things:[...this.state.things,'love'+ Math.random()]
    })
  }
  render(){
    console.log('组件加载');
    return (
      <div>
        <h2>Component is {this.props.use}</h2>
        <Button type='primary' onClick={()=>this.addthings()}>hello</Button>
        <Rd list = 'Router'/>
        <List renderHeader={()=>'语言列表'}>{this.state.things.map(v=><List.Item key={v}>{v}</List.Item>)}</List>
      </div>
    );
  }
}

function Rd(props) {
  return (
    <div>
      <h3>Redux and {props.list}</h3>
    </div>
  );
}

export default App;
```



