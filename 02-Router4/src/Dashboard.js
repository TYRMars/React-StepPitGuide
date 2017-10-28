import React from 'react'
import {Route, Link,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './Auth.redux'
import App from "./App";

function News() {
    return (
        <div>
            <h2>News</h2>
        </div>
    )
}

function Video() {
    return (
        <div>
            <h2>Video</h2>
        </div>
    )
}

@connect(
  state=>state.auth,
  {logout}
)

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
      console.log(this.props);
      const redirectToLogin = <Redirect to='/login'></Redirect>
      const app = (
          <div>
          <h1>欢迎{this.props.user}</h1>
          {this.props.isAuths ? null : <button onClick={this.props.logout}>注销</button>}
              <ul>
                  <li>
                      <Link to='/dashboard/'>首页</Link>
                  </li>
                  <li>
                      <Link to='/dashboard/news'>新闻</Link>
                  </li>
                  <li>
                      <Link to='/dashboard/video'>视频</Link>
                  </li>
              </ul>
              <Route path='/dashboard/' exact component={App}></Route>
              <Route path='/dashboard/news' component={News}></Route>
              <Route path='/dashboard/video' component={Video}></Route>
          </div>
      )
        return this.props.isAuth ? app: redirectToLogin
    }
}

export default Dashboard
