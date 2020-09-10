# React 多组件嵌套

* `webpack-dev-server`环境运行起来,这里主要是明白了React如何做嵌套
* `src/js/components`下创建`header.js`书写代码✍️

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
export default class CompomentHeader extends React.Component{
  render(){
    return(
      <header>
      <h1>这里是表头</h1>
      </header>
    )
  }
}
```

* `src/js/components`下创建`footer.js`书写代码✍️

```javascript
import React from 'react';
export default class CompomentFooter extends React.Component{
  render(){
    return(
      <footer>
      <h1>这里是尾部</h1>
      </footer>
    );
  }
}
```

