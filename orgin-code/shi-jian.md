# 事件

## 设计动机

利用合成事件：可以先看一下[W3C标准](https://www.w3.org/TR/DOM-Level-3-Events/)

W3C 标准约定了一个事件的传播过程要经过以下 3 个阶段：

1. 事件捕获阶段
2. 目标阶段
3. 事件冒泡阶段

DOM 事件流下的性能优化思路：事件委托

`e.target` 这个属性，它指的是触发事件的具体目标，它记录着**事件的源头**。所以说，不管咱们的监听函数在哪一层执行，只要我拿到这个 `e.target`，就相当于拿到了真正触发事件的那个元素。
