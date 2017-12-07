# React生命周期
* 每个生物😯都有它的生命周期，从出生🐣、少年、成年再到死亡。同理组件也有它特定的生命周期，React用不同的方法来描述它的整个生命周期。现在，要稍微修改一下组件的代码，当组件加载完毕1秒以后，使`like`的值自动加1

```JavaScript
...
componentDidMount(){
  setTimeout(()=>{
    this.likeCallback();
  },1000);
}
...
```

* `componentDidMount`这个方法就是在`render`完成并且组件装载完成之后调用的方法，所以界面中先显示为0，1秒以后此方法被调用，界面被重新渲染，`like`值变成了1

#### 1.组件首次加载

* `getDefaultProps`只会在装载之前调用一次，在组件中赋值的数据会被设置到`this.props`中。
* `getInitialState`只会在装载之前调用一次，这个函数的返回值会被设置到`this.state`中，需要注意的是，在ES6的写法，只需写在`constructor`中即可，如下

```JavaScript
class MyCompoment extends React.Component{
  constructor(props) {
    super(props);
    //在这里声明state
    this.state = {count: 0};
  }
}
```

* `componentWillMount`在render之前被调用，可以在渲染之前做一些准备工作。
* `render`这个方法是组件的一个必要方法。当这个方法被调用的时候，应返回一个`ReactElement`对象。`render`是一个纯函数，它的意义就是在给定相同的条件时，它的🔙返回结果应该每次都完全一致的。不应该有任何修改组件`state`的代码或者修改组件state 的代码或者是和浏览器交互的情况。

* `componentDidMount`只会在装载完成之后调用一次，在`render`之后调用，从这里开始获取组件的`DOM结构`。如果想让组件加载完毕后做一些额外的操作（比如`AJAX`请求等），可以在这个方法中添加相应代码。

#### 2.组件props更新

* 当组件接收到新的`props`的时候，会依次触发下列方法。
  * `componentWillReceiveProps(object nextProps)`，在组件接收到新的props的时候被触发，参数nextProps就是传入的新的props，你可以用它和this.props比较，来决定是否用`this.setState`实现`UI`重新渲染。
  * shouldCompentUpdate，在重新render之前被调用，可以返回一个布尔值来决定一个组件是否更新，如果返回`false`，那么前面的流程都不会被触发。这个方法默认的返回值都是`true`。
  * `render`，和组件首次加载的方法相同
  * `componentDidUpdate`，重新渲染完成以后立即调用，和`componentDidMount`类似

#### 3.组件卸载

* `componentWillUnmount`，在组件被卸载和销毁之前调用的方法，可以在这里做一些清理的工作。

---

![](http://www.kejiganhuo.tech/wp-content/uploads/2017/06/React生命周期.png)

* 探索`BodyIndex`的`componentWillMount`和`componentDidMount`生命周期

```JavaScript
import React from 'react';
export default class BodyIndex extends React.Component{
  componentWillMount(){
    //定义你的逻辑即可
    console.log("BodyIndex - componentWillMount");
  }

  componentDidMount(){
    console.log("BodyIndex - componentDidMount");
  }
  render(){
    ...
    return(
      ...
    )
  }
}

```
* 在浏览器的开发者工具中就可以看到`console`
* 再来查看Index的的`componentWillMount`和`componentDidMount`生命周期，`BodyIndex`包含在`Index`中

```JavaScript
var React = require('react');
var ReactDOM = require('react-dom');
import CompomentHeader from './components/header';
import CompomentFooter from './components/footer';
import BodyIndex from './components/bodyIndex';
class Index extends React.Component {
  componentWillMount(){
    //定义你的逻辑即可
    console.log("Index - componentWillMount");
  }
  componentDidMount(){
    console.log("Index - componentDidMount");
  }
  render() {
    return (
      <div>
      <CompomentHeader/>
      <BodyIndex/>
      <CompomentFooter/>
      </div>
    )
  }
}

// 入口
ReactDOM.render( <Index /> , document.getElementById('example'));
```

* 在浏览器的开发者工具中就可以看到`console`,如下图
