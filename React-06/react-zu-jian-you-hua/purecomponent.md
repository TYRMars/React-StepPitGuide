# PureComponent

还有就是通过使用React.PureComponent来对组件进行优化，这个也是React16官方新加入的，意思类似于纯组件

使用的地方一般是在只接收从父组件传递过来数据的组件，也就是只接受props的组件

```js
class Demo extends React.PureComponent{
  //....
}
```



