import React from 'react'
import {Route, Link} from 'react-router-dom'
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

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
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
    }
}

export default Dashboard
