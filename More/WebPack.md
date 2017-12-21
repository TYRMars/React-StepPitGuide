# WebPack 热加载配置\(上\)

* 创建index.html

```html
<div id="example">123</div>
<script src="bundle.js"></script>
```

* （这里会出现一个问题就是关于src中的bundle.js地址的问题，如果是使用`src/bundle.js`就会出现`webpack-server`无法更新的情况，我想原因是在与WebPack配置文件中我们定义了文件读取的绝对路径）
* 在项目目录下建立src文件，用于存放未编译的js与编译好的bundle.js
* 在src/js/目录下建立一个index.js用于存放未编译的js代码

```JavaScript
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>hello world ！！</h1>,
  document.getElementById('example')
);
```

* 基本的文档就写好了，下一节是WebPack打包📦

---

# WebPack 热加载配置\(中\)

* 采用`WebPack2`进行打包
* `WebPack2`安装`sudo npm install -g webpack`
* `WebPack-dev-server`安装`sudo npm install -g webpack-dev-server`
* 全局安装完后进行项目目录下的安装！！！！（安装的时候最好在前面加上sudo，有时权限不够会安装失败）

```shell
$ sudo npm install  webpack --save
$ sudo npm install  webpack-dev-server --save
```

* 出现问题可以看[React配置必踩坑](http://www.kejiganhuo.tech/?p=374)！！！
* 在目录文件下建立一个`webpack.config.js`
* 很多参考都是采用`WebPack1`进行打包，对于`webpack2`更新后的讲解很少
* 不过还是可以通过官方文档，加上对`webpack1`的学习，自己还是琢磨出了`webpack2`如何配置，`\(^o^)/~`，如下

* **WebPack2配置信息**

```js
// webpack.config.js
var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, "src"),
    entry: "./js/index.js",
    output: {
        path: path.resolve(__dirname, "src"),
        filename: 'bundle.js' // 打包输出的文件
    },
    module: {
        rules: [{
            test: /\.js$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
            exclude: /(node_modules)/,
            use: [{
                  loader: 'babel-loader',
                  //配置参数;
                  options: { presets: ['es2015','react'] }
                }],
        }]
    },
};
```

#### 接下来运行WebPack打包

* 在Mac终端中，项目的根目录下，`webpack`进行打包，成功打包后会在src目录下生成bundle.js，在浏览器中查看
* 原本页面上的`123`覆盖成了`hello world ！！`

---

# WebPack 热加载配置\(下\)

#### webpack-dev-server的使用

* 不用每次都去用`WebPack`一遍
* `webpack -watch`自动监听编译，但是需要手动刷新浏览器
* 如果采用在Mac终端中项目根目录下`webpack-dev-server`这样可以`浏览器中`自动刷新，一边写代码，保存后自动刷新。
* （我发现在webpack2中`http://localhost:8080/`也可以自动加载不用`-hot`，不知道是不是自己的原因，有错误，请指出！！！）



