# React CSS模块化

* `"babel-plugin-react-html-attrs": "^2.0.0"`让JSX中`className`能变回原来`class`

* webpack要重新配置

```js
// webpack.config.js
var webpack = require("webpack");
var path = require("path");

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, "src"),
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js' // 打包输出的文件
  },
  module: {
    rules: [{
        test: /\.js$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          //配置参数;
          options: {
            presets: ['es2015', 'react'],
            plugins: ['react-html-attrs']
          }
        }, ]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }]
      },
    ]
  },
};
```

* 在`src/css`下，创建一个`footer.css`，此`css`设置初衷是为了单独去渲染`footer`，希望`footer.css`不会污染全局，但通常情况下全局引用`css`是会污染全局的，内容如下

```css
.miniFooter {
  background: #333333;
  color: #ffffff;
  padding-left: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.miniFooter h1 {
  font-size: 15px;
}
```

* 在footer.js下写

```JavaScript
import React from 'react';

var footerCss = require("../../css/footer.css");//引入css

export default class CompomentFooter extends React.Component{
  render(){
    console.log(footerCss);
    return(
      <footer class={footerCss.miniFooter}>//通过var footerCss 选取footer.css中miniFooter
      <h1>这里是尾部</h1>
      </footer>
    );
  }
}
```

* 因为我们在打包时设置了`localIdentName:'[path][name]__[local]--[hash:base64:5]'`，这地方就是引用css的路径限制。

* 默认情况下，CSS 将所有的类名暴露到全局的选择器作用域中。样式可以在局部作用域中，避免全局作用域的样。详细🔎请查看官方文档[官方文档式](https://doc.webpack-china.org/loaders/css-loader/#scope)

* 所以在浏览器中`console`出了`Object {miniFooter: "css-footer__miniFooter--2W_7G"}`



