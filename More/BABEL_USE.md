# 利用babel把ES6转化为ES5

* 安装`babel`
* `sudo npm install --save-dev babel-cli babel-preset-env`
* ES6语法，因为很多浏览器还不支持ES6所以需要进行转换

```js
add(items){
  items.map(item => item + 1)
}
```

* 在`package.json`中，通过以下设置来实现转换

```
{
   ...
   "script":{
      build:"babel index.js --out --file bundel.js"
   }
   ...
}
```

* 然后通过执行\`npm run build\`,编译成功后就会出现如下,打开\`bundel.js\`\(命名可自己拟定\)

```
  "use strict"
  add(items)(items.map(function(){
    return item + 1;
  }));
```

* 此时就完成了转换！！！
* [ES5浏览器支持](http://kangax.github.io/compat-table/es5/)
* [ES6浏览器支持](http://kangax.github.io/compat-table/es6/)



