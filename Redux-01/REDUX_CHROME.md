# Redux Chrome插件使用

* 🆕新建store的时候判断window.devToolsExtension
* 使用compose结合thunk和winows.devToolsExtension
* 调试窗的redux选项卡，实时看到state

```JavaScript
import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware ,compose} from 'redux'
import {counter,add,reduce,addAsync} from './index.redux'
import App from './App'

const store = createStore(counter,compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension():()=>{}
))

function render() {
  ReactDom.render(<App store={store} addAsync={addAsync} add={add} reduce={reduce} />
  ,document.getElementById('root'));
}
render();

store.subscribe(render)
```



