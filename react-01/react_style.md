# React CSS內联式样

* 通过header.js演示JSX样式控制,直接內联到标签中的style

  ```javascript
  import React from 'react';
  export default class CompomentHeader extends React.Component{

  render(){
    const styleComponentHeader = {
      header: {
        backgroundColor: "#333333",
        color: "#ffffff",
        "padding-top": "15px",
        paddingBottom: "15px"
      }
      //还可以定义其他的样式
    }
    return(
      <header style={styleComponentHeader.header}>
        <h1>这里是表头</h1>
      </header>
    )
  }
  }
  ```

* 在`React`上不是很适合此方法，`hover`等一些动画或者伪类，但在移动开发`ReactNative`中会常用。

  **采用原始引用方式**

* `header`添加为`<header style={styleComponentHeader.header} className="smallFintSize">`，并在`index.html`引用相关`css`
* 不好在于污染全局

## 09-02

### 內联式样中的表达式

```javascript
import React from 'react';
export default class CompomentHeader extends React.Component{

  constructor(){
    super();
    this.state ={
      miniHeader:false //默认加载的时候还是高（不是mini）的头部
    };
  };

  switchHeader(){
    this.setState({
      miniHeader: !this.state.miniHeader //对state进行取反
    });
  };

  render(){
    const styleComponentHeader = {
      header: {
        backgroundColor: "#333333",
        color: "#ffffff",
        "padding-top": (this.state.miniHeader) ? "3px" : "15px",
        paddingBottom: (this.state.miniHeader) ? "3px" : "15px"
      },
      //还可以定义其他的样式
    };
    return(
      <header style={styleComponentHeader.header} className="smallFintSize" onClick={this.switchHeader.bind(this)}>
        <h1>这里是表头</h1>
      </header>
    )
  }
}
```

