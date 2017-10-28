import React from 'react'
import { connect } from 'react-redux'
import {add, minus, addAsync} from './index.redux'


// App = connect(mapStatetoProps,acitonCreators)(App)
@connect(state => ({num:state.counter}),{add, minus, addAsync})

class App extends React.Component {
    // constructor() {
    //
    // }
    render() {
        const num = this.props.num;
        const add = this.props.add;
        const minus = this.props.minus;
        const addAsync = this.props.addAsync;
        return (
            <div>
                <h1>展示dedux数据{num}</h1>
                <button onClick={add}>➕加1</button>
                <button onClick={minus}>➖减1</button>
                <button onClick={addAsync}>➕加1(两秒以后)</button>
            </div>
        )
    }
}

export default App
