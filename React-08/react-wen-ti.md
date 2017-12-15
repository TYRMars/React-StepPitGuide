### 题目一

补全代码，使得如下代码可以实现获取文件夹内文件列表功能（Loading 和 FileList 组件可以不用具体实现，只需补全 Folder 组件的代码）：

```js
/**
 * 使用样例：
 * <Folder id="17">
 *  {(files) => !files
 *    ? <Loading />
 *    : <FileList files={files} />}
 * </Folder>
 */

import React, { Component, PropTypes } from 'react'

// fetchChildFilesByFolderId 接受一个文件夹 ID 的参数，
// 返回 Promise<Array>，即文件列表。
import fetchChildFilesByFolderId from '@shimo/api'

class Folder extends Component {
  constructor(props){
    super(props)
    this.state = {
      files:''
    }
  }
  componentDidMount(){
    fetchChildFilesByFolderId(this.props.id)
    .then(v => this.setState({files:v}))
  }
  render(){
    const child = this.props.children(this.state.files)
    return(
      <div>{child}</div>
    );
  }
}

Folder.propType = {
  children: React.PropTypes.element.isRequired
}
```



