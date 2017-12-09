# React高阶组件

* 装饰器模式

```JavaScript
function hello() {
  console.log('hello YueYue');
}

function WrapperHello(fn) {
  return function () {
    console.log('before hello');
    fn()
    console.log('after hello');
  }
}
hello = WrapperHello(hello)
hello()
```

* 便捷写法

```JavaScript
@connect()
```

### React使用

* 高阶组件属性代理

```JavaScript
class Hello extends React.component {
  render(){
    return(<h2>hello YueYue</h2>)
  }
}

function WrapperHello(Comp) {
  class WrapComp extends React.Component{
    render(){
      return (
        <div>
         <p>这是HOC高阶组件特有元素</p>
         <Camp {...this.props}></Camp>
        </div>
      )
    }
  }
  return WrapComp
}

hello = WrapperHello(Hello)
```

* HOC，给出的组件外面包装一层

  * 属性代理
  * 反向继承:渲染劫持

* 高阶组件反向继承

```JavaScript
function WrapperHello(Comp) {
  class WrapComp extends Comp {
    componentDidMount(){
      console.log('高阶组件新增的生命周期，加载完成');
    }
    render(){
      return <Comp></Comp>
    }
  }
  return WrapComp
}

@WrapperHello
```



