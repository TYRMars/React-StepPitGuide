# ReactChrome插件使用

* Chrome react插件 需要进行翻墙安装！！！
* 另外可以用FireFox进行代替，FireFox不用翻墙也可以安装此插件
* 测试一下这个工具，`src/js/index.js`如下：

```javascript
var React = require('react');
var ReactDOM = require('react-dom');

var ExampleApplication = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message =
      'React has been successfully running for ' + seconds + ' seconds.';

    return React.DOM.p(null, message);
  }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);

var start = new Date().getTime();
setInterval(function() {
  ReactDOM.render(
    ExampleApplicationFactory({elapsed: new Date().getTime() - start}),
    document.getElementById('example')
  );
}, 50);
```

* `index.html`如下

  ```html
  <div id="example">123</div>
  <script src="bundle.js"></script>
  ```

* 具体的效果如下

---

![React-tools](http://www.kejiganhuo.tech/wp-content/uploads/2017/06/React-tools-e1496323191745.png)

