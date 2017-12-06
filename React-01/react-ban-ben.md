# React15 简介

* React 是近期非常热门的一个前端开发框架，其本身作为 MVC 中的 View 层可以用来构建 UI，也可以以插件的形式应用到 Web 应用非 UI 部分的构建中，轻松实现与其他 JS 框架的整合，比如 AngularJS。同时，React 通过对虚拟 DOM 中的微操作来实对现实际 DOM 的局部更新，提高性能。其组件的模块化开发提高了代码的可维护性。单向数据流的特点，让每个模块根据数据量自动更新，让开发者可以只专注于数据部分，改善程序的可预测性。
* Facebook内部用来开发Instagram
* JavaScript MVC框架
* 2013年开源React
* 随后发布React Native
* React Github [React](http://www.github.com/facebook/react)

# React版本选择

* 查看历史版本
* [React历史版本](http://facebook.github.io/react/blog/all.html)
* 安装采用NPM的方法`npm install react`
* 如果要安装在项目目录下`cd react／`下面，然后`npm install react --save`
* 如果想在电脑全局进行安装则`npm install react  -g`
* 会自动安装最新的版本，我用的是`React 15.5.4`

# React Starter Pack 下载使用与React初体验

* 新版的React没有演示文件，03-02是使用的`React 15.3.2`
* 03-02中有一些举例
* 在examples／basic／下index.html是一个事例可以研究一下,这个地方体现了React在页面上的高性能的优点

```js
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
    document.getElementById('container')
  );
}, 50);

```



