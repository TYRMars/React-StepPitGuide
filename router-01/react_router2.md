# React-Router2

## React Router2

* 由于对于新版的`Router`的不熟悉，这节开始转向`Router2`和`webpack1`，等待`React-Router4`理解后，我会更新这几章
* [Router](https://github.com/ReactTraining/react-router)
* 以上`Router`采用的是`Router2`
* `Router`中文是路由的意思。
* 路由库`React-Router`。它是官方维护的，事实上也是唯一可选的路由库。它通过管理 `URL`，实现组件的切换和状态的变化，开发复杂的应用几乎肯定会用到。

### 基本用法

* `$ npm install  react-router`安装`React-Router`，最新的为`React-Router4`。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';
import ComponentList from './components/list';
import ComponentDetails from './components/details';
import {Router,Route,hashHistory} from 'react-router';

export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的 Index，变成了程序的入口
      <Router history={hashHistory}>

        <Route component={Index} path="/">
          <Route component={ComponentDetails} path="details"></Route>
        </Route>

        <Route component={ComponentList} path="list"></Route>

      </Router>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('example'));
```

* 跳转时使用`<Link>`进行跳转

  **使用案例**

* 在`src/js`创建入口文件`root.js`
* 在webpack中把

## React Router参数传递

* 从`Header`中跳转到`list`传递数值。
* 利用在`root.js`中设置`<Route component={ComponentList} path="list"></Route>`中`path="list/id:"`。这个为定义的方法
* 在`list`中用`{this.props.params.id}`获取从`Header`路由传递过来的值
* `Header`中使用```<Link to={``/list/12341234``}>```

