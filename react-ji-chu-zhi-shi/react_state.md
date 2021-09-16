# State属性

## state状态

* `state` 是组件内部的属性。组件本事是一个`状态机`，它可以在`constructor`中通过`this.state`直接定义它的值，然后根据这些值来渲染不同的UI。当`state`的值发生改变时，可以通过`this.setState`方法让组件再次调用`render`方法，来渲染新的UI。当`state`的值发生改变时，可以通过`this.setState`方法再次调用`render`方法，来渲染新的UI。

## state设计原则

* 什么组件应该有`State`，而且应该遵循最小化`state`的准则？那就是尽量让大多数的组件都是无状态的。为了实现这样的结构，因该尽量把状态分离在一些特定的组件中，来降低组件的复杂程度。最常见的做法就是创建尽力那个多的无状态组件，这些组件唯一要关心的事情就是渲染数据。而在这些组件的外层，应该有一个包含`state`的父级的组件。这个组件用于处理各种事件、交流逻辑、修改`state`、对应的子组件要关心的只是传入的属性而已
* `state` 应该包含什么数据？ `state`中应该包含组件的事件回调函数可能引发UI更新的这类数据。在实际的项目中，这些应该是轻量化的JSON数据，应该尽量把数据的表现设计到最小，而更多的数据可以在render方法通过各种计算来得到。这里举一个例子，比如说现在有一个商品列表，还有一个用户已经选购的商品列表，最直观的设计方法如下：

```javascript
{
  goods:[
    {
      "id":1,
      "name":"paper"
    },
    {
      "id":2,
      "name":"pencil"
    }
    ...
  ],
  selectedGoods:[
    {
      "id":1,
      "name":"hello world"
    }
  ],
}
```

* 这样做当然可以，但根据最小化设计`state`原则，还是有更好的方法！！！
* `selectedGoods` 的商品就是goods里面的几项，数据是完全一致的，所以说这里只需要保存`ID`，就可以完成同样的功能。所以可以修改成如下。

```javascript
selectedGoods:[1,2,3]
```

* 在渲染这个组件的时候，只需要把要渲染的条目从goods中取出来就可以了。
* `state`不应该包含什么数据？就像上面的例子所描述的一样，为了达到`state`的最小化，下面👇几种数据不应该包含在`state`中
  * 可以由state计算出的数据。就像selectedGoods一样，可以由goods列表计算得出。
  * 组件。组件不需要保存到state中，只需要在`render`方法中渲染。
  * `props`中的数据。`props`可以看作是组件的数据来源，它不需要保存在`state`中。

## state 使用事例

```javascript
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
        <p>{this.state.username} {this.state.age}</p>
      </div>
    )
  }
}
```

* 可以用Chorme React组件中查看到`state`只会在相应的模块中有值，不会影响到其他模块。它属于模块自身属性。

