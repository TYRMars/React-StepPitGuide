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



