# Flux

![](../.gitbook/assets/bg2016011501.png)

Facebook在制作React的同时，也同时制作出了新的开发框架Flux。推翻了原有的MVC框架，采用一种新的思维方式来管理数据流。

总的来说Flux在管理数据流上更加严格

## Flux框架大致包含四个部分

* Dispatcher，处理动作分发，维持Store之间的依赖关系；
* Store，负责存储数据和处理数据相关逻辑；
* Action，驱动Dispatcher的JS对象；
* View，视图部分，负责显示用户界面。

## Flux使用

首先在项目下安装Flux

`npm install flux --save`

### 1.Dispatcher

首先引入dispatcher类，因为它负责了处理动作的分发

```javascript
import {Dispatcher} from 'flux'
export default new Dispatcher();
```

这样就有了全局唯一的Dispatcher

### 2.action

action可以算是一个纯数据对象

