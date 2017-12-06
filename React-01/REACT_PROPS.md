# Props属性

#### Props事例
* index.js代码
```JavaScript
...
render() {
  return (
    <div>
    <CompomentHeader/>
    <BodyIndex userid={123456} username={"nick"}/>
    <CompomentFooter/>
    </div>
  )
}
...
```
* bodyIndex.js代码
```JavaScript
import React from 'react';
export default class BodyIndex extends React.Component {
  constructor() {
    super(); //调用基类的所有的初始化方法
    this.state = {
      username: "Parry",
      age:20
    };//初始化赋值
  }
  render() {

    setTimeout(() => {
      //更改state的时候
      this.setState({username: "IMOOC",age:30})
    }, 4000);

    return (
      <div>
        <h2>页面主题内容</h2>
        <p>{this.state.username} {this.state.age} {this.props.userid} {this.props.username}</p>
      </div>
    )
  }
}
```
* 可以用`Chorme React`组件中查看到，`Props`相当于跨组件传值，而且优点在于不会影响其他模块的值。`Props`对于模块本身来说属于外来属性。
