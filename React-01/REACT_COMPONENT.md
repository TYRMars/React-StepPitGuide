# React组件

* 组件是`React`的基石，所有的`React`应用程序都是基于组件的。
* 之前`React`组件，使用`React.createClass`来进行声明

```JavaScript
var List = React.createClass({
  getInitialState: function(){
    return['a','b','c']
  },
  render: function(){
    return(...);
  }
});
```

* `React`官方第一时间就支持了ES6 class 的方法，这种写法可读性更强，一个直观的表现就是不用写`getInitialState`方法了，可以直接在`constructor`里面定义`this.state`的值。所以以后代码采用以下格式。

```JavaScript
import React from 'react';

class List extends React.components{
  constructor(){
    super();
    this.state = ['a','b','c'];
  }
  render(){
    return(...);
  }
}
```

---

* 这一节里测试一下`React`的组件
* 在`src/js/`下创建文件夹`components`创建一个`header.js`
* `header.js`如下

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
export default class CompomentHeader extends React.Component{
  render(){
    return(
      <header>
      <h1>这里是表头</h1>
      </header>
    );
  }
}
```

* `index.js`如下

```JavaScript
var React = require('react');
var ReactDOM = require('react-dom');
import CompomentHeader from './components/header';

class Index extends React.Component {
  render() {
    return (
      <div>
      <CompomentHeader/>
      <h1>页面主题内容</h1>
      </div>
    );
  }
}

// 入口
ReactDOM.render( < Index / > , document.getElementById('example'));
```

#### HTML标签与React组件

* React可以直接渲染HTML类型的标签，也可以渲染React的组件
* HTML类型的标签第一个字母用小写来写表示。

```JavaScript
import React from 'react';
//当一个标签里面为空的时候，可以直接使用自闭和标签
//注意class是一个JavaScript保留字，所以如果class应该替换成className
let divElement = <div className="foo"/>;
//等同于
let divElement = React.createElement('div',{className:'foo'});
```

* React组件标签第一个字母大写。

```JavaScript
import React from 'react';
class Headline extends React.component{
  ...
  render(){
    //直接return JSX语法
    return <h1>Hello React</h1>
  }
}
let Headline = <Headline />;
let headline = React.createElement(Headline);
```

* `JSX`语法使用第一个字母大小写来区分是一个普通的`HTML`标签还是一个`React`组件
* 注意：因为`JSX`本身是`JavaScript`语法，所以一些`JavaScript`中的保留字要用其他的方式书写，比如第一个例子中`class`要写成`className`





