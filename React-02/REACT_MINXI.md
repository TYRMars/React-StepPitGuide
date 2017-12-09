# React 独立组件间共享 Mixins

* ES6不支持Mixin，所以需要相插件来进行支持，`npm install --save react-mixin@2`
* 测试一下Mixin是如何运行的
* 在`src/js/components`下创建`mixins.js`

```JavaScript
const MixinLog = {
    componentDidMount(){
    console.log("MixinLog componentDidMount");//查看Mixin生命周期
    }
    ,log(){console.log("tyrmars")}
};

export default MixinLog//向外输出
```

* 在bodyIndex.js中

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import BodyChild from './bodychild';
import ReactMixin from 'react-mixin';
import MixinLog from './mixins';
changeUserInfo() {
    MixinLog.log();
};
render() {
  return(
    <input id="submitButton" ref="submitButton" type="button" value="提交" onClick{this.changeUserInfo.bind(this, 99)}/>
  )
}
BodyIndex.defaultProps = defaultProps;
ReactMixin(BodyIndex.propTypes,MixinLog);
```

* 点击页面上的提交按钮🔘在`console.log`中会出现`MixinLog componentDidMount`和`tyrmars`





