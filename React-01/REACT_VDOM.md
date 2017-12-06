# React虚拟DOM概念

## 虚拟DOM的结构
* 在传统的 Web 应用中，我们往往会把数据的变化实时地更新到用户界面中，于是每次数据的微小变动都会引起 DOM 树的重新渲染。如果当前 DOM 结构较为复杂，频繁的操作很可能会引发性能问题。React 为了解决这个问题，引入了虚拟 DOM 技术。

<p align="center"><img src="https://www.ibm.com/developerworks/cn/web/1509_dongyue_react/index6639.png" /></p>

* 虚拟 DOM 是一个 JavaScript 的树形结构，包含了 React 元素和模块。组件的 DOM 结构就是映射到对应的虚拟 DOM 上，React 通过渲染虚拟 DOM 到浏览器，使得用户界面得以显示。与此同时，React 在虚拟的 DOM 上实现了一个 diff 算法，当要更新组件的时候，会通过 diff 寻找到要变更的 DOM 节点，再把这个修改更新到浏览器实际的 DOM 节点上，所以在 React 中，当页面发生变化时实际上不是真的渲染整个 DOM
* React 虚拟 DOM 中的诸多如 div 一类的标签与实际 DOM 中的 div 是相互独立的两个概念，它是一个纯粹的 JS 数据结构，它只是提供了一个与 DOM 类似的 Tag 和 API。React 会通过自身的逻辑和算法，转化为真正的 DOM 节点。也正是因为这样的结构，虚拟 DOM 的性能要比原生 DOM 快很多。

# React 虚拟DOM+components+生命周期的联系
### React-虚拟DOM分析

* 从浏览器渲染角度说React为什么会使用虚拟DOM
* 虚拟DOM的原理

* 以下是综各个资料后的个人理解，如有问题请指出

####  从浏览器渲染角度说React

* 首先要知道`React`是由`Facebook`对现有业务进行改进提升的时候提出来的。`DOM`是很慢的，其元素非常庞大，页面的性能问题鲜有由JS引起的，大部分都是由DOM操作引起的。所有`Facebook`在`React`中引入了页面UI组件化、虚拟DOM，来解决这些问题。
* React.js对常用组建进行了优化,它算是一个components组件库。ReactDom.js是React版本优化的虚拟DOM
* 如果要渲染到最后Display显示，需要经过很长过程，浏览器会先收集到HTML和CSS，对HTML和CSS分别经过Parser剖析器，分别生成DOMTree和CSSRuleTree。 DOM和CSSOM合并后生成Render Tree。
* React.js希望用JSX语言写出HTML和CSS还有页面逻辑混合在一起成为一个component，（在react编写的时候就是通过class继承的react.component这个类），直接通过JS对象的形式生成了`ReactRenderTree`。
* 我觉得这是原型链的🌲树状结构化，`ReactRenderTree`（React生命周期）在通过虚拟DOM（ReactDom.js），首次生成给到浏览器的时候就是一个浏览器直接可以识别的RenderTree，浏览器直接Painting，然后显示在页面上。
* 虚拟的DOM的核心思想是：对复杂的文档DOM结构，提供一种方便的工具，进行最小化地DOM操作

##### 当需要重排时Reflow

* `React`会通过虚拟`DOM`对新生成的DOM和原来的DOM树进行对比，改变页面

#### 虚拟DOM的原理

* 虚拟`DOM`类似于（自动化控制的网页生成器）通过`Node`节点`render`生成相对应的网页，但主要功能在于网页更新时候，对于Node节点的更新，虚拟DOM会比较两棵DOM树的区别，保证最小化的DOM操作，使得执行效率得到保证。
* 由于计算两棵树的常规算法是`O(n^3)`级别，DOM结构达到成百个节点在实际项目中很正常，所以需要优化深度遍历的算法。

##### React diff 策略

* `Web UI` 中 `DOM` 节点跨层级的移动操作特别少，可以忽略不计。
* 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
* 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。
* 基于以上三个前提策略，`React` 分别对 `tree diff`、`component diff` 以及 `element diff` 进行算法优化，事实也证明这三个前提策略是合理且准确的，它保证了整体界面构建的性能。

* React的局限性，不适合每个页面使用率很低网站，（每个页面页面逻辑不同）;

<p align="center"><img src="https://pic3.zhimg.com/74a86fbcc8bb4ad74e19b72a72b26c56_r.png" /></p>

[知乎-React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)

### React-生命周期

* `ReactNode`节点是由JS制作而成，本身是死的，要赋予其活性，就需要像现实事物一样有生命周期。通过生命周期函数，来间接控制事件与DOM的操作！！！
* 为了方便这样的操作React有了JSX这种语法融合了`HTML`和`CSS`，不难看出使用这种语法能极大的提高React性能（从浏览器渲染的角度）

<p align="center"><img src="http://upload-images.jianshu.io/upload_images/1814354-4bf62e54553a32b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" /></p>
