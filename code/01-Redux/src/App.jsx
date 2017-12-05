import React from 'react'
import {connect} from 'react-redux'
import {add,reduce,addAsync} from './index.redux'

const mapStatetoProps = (state) => {
  return {num:state}
}
const acitonCreators = {add,reduce,addAsync}

// App = connect(mapStatetoProps,acitonCreators)(App)
@connect(mapStatetoProps,acitonCreators)

class App extends React.Component {
  // constructor() {
  //
  // }
  render(){
    const num = this.props.num
    const add = this.props.add
    const reduce = this.props.reduce
    const addAsync = this.props.addAsync
    return(
      <div>
      <h1>展示dedux数据{num}</h1>
      <button onClick={add}>➕加1</button>
      <button onClick={reduce}>➖减1</button>
      <button onClick={addAsync}>➕加1(两秒以后)</button>
      </div>
    )
  }
}

export default App
