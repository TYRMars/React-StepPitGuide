## Reducer合并

通过一个combineReducers合并所有的reducers

```js
//合并所有reducer
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'

export default combineReducers({user,chatuser,chat})
```

在index中使用reducers来进行数据管理

```js
import reducers from './reducer'
const store = createStore(reducers)
```



