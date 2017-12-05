import React from 'react'
import { connect } from 'react-redux'
import { addNUM,removeNUM,addAsyncNUM} from './index.redux'

class App extends React.Component {
  render() {
    return (
    <div>
      <div>现有数字{this.props.num}</div>
      <button onClick={this.props.addNUM}>+1</button>
      <button onClick={this.props.removeNUM}>-1</button>
      <button onClick={this.props.addAsyncNUM}>2秒后+1</button>
    </div>)
  }
}

const mapStatetoProps = (state)=>{
  return {num:state}
}

const acitonCreators = {addNUM,removeNUM,addAsyncNUM}

App = connect(mapStatetoProps,acitonCreators)(App)
export default App
