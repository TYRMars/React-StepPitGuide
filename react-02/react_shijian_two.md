# React 事件与数据的双向绑定

* bodyIndex.js代码

```javascript
import React from 'react';
import BodyChild from './bodychild'
export default class BodyIndex extends React.Component {
  constructor() {
    super(); //调用基类的所有的初始化方法
    this.state = {
      username: "Parry",
      age:20
    };//初始化赋值
  }

  handleChildValueChange(event){
    this.setState({age:event.target.value});//取出子页面的值
  }

  changeUserInfo(){
    this.setState({age:50});
  };

  render() {
    return (
      <div>
        <h2>页面主题内容</h2>
        <p>{this.state.username} {this.state.age} {this.props.userid} {this.props.username}</p>
        <p>age: {this.state.age}</p>
        <input type="button" value="提交" onClick={this.changeUserInfo.bind(this)}/>
        <BodyChild handleChildValueChange={this.handleChildValueChange.bind(this)}/>
      </div>
    )
  }
}
```

* bodychild.js代码

```javascript
import React from 'react';
export default class BodyChild extends React.Component{

  render() {
    return(
      <div>
        <p>子页面输入：<input type="text" onChange={this.props.handleChildValueChange}/></p>
      </div>
    )
  }
}
```

* 通过在子页面`BodyChild`设置`props`，子页面`value`改变调用`handleChildValueChange`，传值到父页面`bodyIndex`。也就是说在子页面中通过调用父页面传递过来的事件props进行组件间的参数传递。
* 思考（onChange与onBlur）的对比。
* `ES6`的语法注意
  * 函数绑定方法this ：`this.forceUpdateHander = this.forceUpdateHander.bind(this)`
  * 或者调用时绑定：`onClick={this.changeUserInfo.bind(this,50)}`

