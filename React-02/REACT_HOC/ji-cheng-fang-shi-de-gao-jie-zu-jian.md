# 继承方式的高阶组件

继承方式的高阶组件采用继承关系关联作为参数的组件和返回的组件

```js
function doingThings (BaseComponent){
  return class DoingThingsComponent extends BaseComponent{
    render(){
      const {user, ...other} = this.props;
      this.props = otherProps;
      return super.render();
    }
  }
}
```

继承组件可以应用一下两个场景：

* 操纵props；
* 操纵函数生命周期



