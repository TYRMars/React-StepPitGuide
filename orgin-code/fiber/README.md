# Fiber

React 从 原有的stack reconciler 变成了现有的 Fiber reconciler。

### Fiber出现原因

![](../../.gitbook/assets/image%20%281%29.png)

js引擎和页面渲染引擎是在同一个渲染线程之内，两者是互斥关系。

### Fiber执行原理

从根节点开始渲染和调度的过程可以分为两个阶段：render 阶段、commit 阶段。

* render 阶段：这个阶段是可中断的，会找出所有节点的变更
* commit 阶段：这个阶段是不可中断的，会执行所有的变更



{% embed url="https://zh-hans.reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html" %}

{% embed url="https://zh-hans.reactjs.org/docs/reconciliation.html" %}

{% embed url="https://github.com/reactjs/react-basic" %}

[https://github.com/acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)

[https://juejin.cn/post/6943896410987659277](https://juejin.cn/post/6943896410987659277)

