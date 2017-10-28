import React from 'react'
import { connect } from 'react-redux'
import { login } from './Auth.redux'

//两个reducers 每个reducers都有一个state
//合并reducer
@connect(
    state=>state
)

class Auth extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <h2>Auth page</h2>
    )
  }
}

export default Auth
