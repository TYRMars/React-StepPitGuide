# NodeJS简介

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513001497136&di=14517a52b5d34a4015325b77af8be688&imgtype=0&src=http%3A%2F%2Fstatic.open-open.com%2Fnews%2FuploadImg%2F20140123%2F20140123090127_450.png)

* [Node.js®](https://nodejs.org/en/)是一个基于Chrome V8 JavaScript引擎构建的JavaScript运行时。 Node.js使用事件驱动的非阻塞I / O模型，使其轻便且高效。 Node.js的包生态系统，npm，是世界上最大的开源生态系统。
* NPM命令，NPMJS有强大的库，存放着各种必备的开源文件，日常所需的基本上都能通过它找到，并安装。——[NPM.JS](https://www.npmjs.com)

# NodeJS安装

* 如果想要稳定开发使用 LTS版
* 如果想要体验NodeJS新功能可以使用 Current版
* 建议使用 LTS版本，因为Current版本更新会删除之前的功能，使用前值得思考一下!!!!!
* `node -v` 检测一下自己Node的版本
* `npm -v`  检测一下自己NPM的版本

# NPM配置国内源

* 如果你不会翻墙，或者经常NPM装不上东西，可以试一下国内的NPM镜像
* 这是一个完整 `npmjs.org` 镜像，你可以用此代替官方版本\(只读\)，同步频率目前为 `10分钟` 一次以保证尽量与官方服务同步。
* 方法一,定制的 `cnpm` \(gzip 压缩支持\) 命令行工具代替默认的 `npm`
* `$ npm install -g cnpm --registry=https://registry.npm.taobao.org`
* 方法二,直接通过添加 `npm` 参数 `alias` 一个新命令:

```shell
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

# Or alias it in .bashrc or .zshrc
$ echo '\n#alias for cnpm\nalias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc
```

* 使用第一种方法`taobaoNPM`使用的时候写成`$ cnpm install [name]`，就可以安装了！！！
* 使用第二种方法`NPM`按照原来的方法`$ npm install [name]`就可以了！！！
* 如果想了解更多点击-&gt;[cnpm](http://blog.parryqiu.com/2016/08/18/ionic_installation)

# 使用NPM配置React

* 建立项目后，`cd`到项目目录，用`npm init`做项目的初始化，会在目录下产生一个`package.json`文件
* 然后开始安装React`$ sudo npm install --save react react-dom babelify babel-preset-react`
* 安装完后，项目之下就有了`node_modules`这个文件夹，这个文件夹存放着以后`NPM`安装的文件
* 下一步安装 `$ sudo npm install babel-preset-es2015 --save`
* 全部安装完毕后就会是像我这个`package.json`一样。
* 以下我使用的版本

```json
{
  "name": "05-01",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-loader": "^7.0.0",
    "babel-preset-react": "^6.24.1",
    "babelify": "^7.3.0",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "webpack": "^2.5.1",
    "webpack-dev-server": "^2.4.5"
  }
}
```

* 在说热加载之前，先看一下我遇到过的问题，[React配置必踩坑](http://www.kejiganhuo.tech/?p=374)

---

![error01](http://www.kejiganhuo.tech/wp-content/uploads/2017/06/error01-e1496323125786.png)

* 需要注意的 ---- NPM安装的时候最好`$ sudo npm install babel-loader -–save`很多人无法后面webpack无法打包，就是因为没有安装babel加载器。



