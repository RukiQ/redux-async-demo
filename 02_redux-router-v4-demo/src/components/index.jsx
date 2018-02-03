import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

import Sider from './Sider';
import UserList from './UserList';
import PostList from './PostList';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HashRouter basename="/" >
                <div id="nav">
                    <Sider />
                    <div id="rightWrap">
                        <Menu mode="horizontal">
                            <SubMenu title={<span><Icon type="user" />{this.state.username}</span>}>
                                <Menu.Item key="setting:1">退出</Menu.Item>
                            </SubMenu>
                        </Menu>
                        <div className="right-box">
                            <Switch>
                                <Route path="/" exact render={() => <h1>Home Page</h1>} />
                                <Route path="/page1" exact component={UserList}></Route>
                                <Route path="/page2" exact component={PostList}></Route>
                                <Route path="/page3" exact render={() => <h1>路由测试</h1>}></Route>
                                <Route path="/page4" exact render={() => <h1>路由测试</h1>}></Route>
                                {/* <Route path="/users" exact component={BrowseUsersPage} />
                                <Route path="/users/:userId" component={UserProfilePage} /> */}
                                <Route path="/users" component={UserSubLayout} />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

const UserSubLayout = (props) => {
    return (
        <div className="user-sub-layout">
            <h1 style={{marginBottom: '10px'}}>请参考博文： <a href="http://www.jianshu.com/p/bf6b45ce5bcc">React Router 4：痛过之后的豁然开朗</a></h1>
            <aside>
                <UserNav />
            </aside>
            <div className="primary-content">
                <Switch>
                    <Route path={props.match.path} exact component={BrowseUserTable} />
                    <Route path={`${props.match.url}/:userId`} component={UserProfilePage} />
                </Switch>
            </div>
        </div>
    )
}

/* const UserProfilePage = ({match}) => {
    console.log(match.path); // output: "/users/:userId"
    console.log(match.url); // output: "/users/bob"
    return <UserProfile userId={match.params.userId} />
} */

const UserComments = ({ match }) => {
    //console.log(match.params);  // output: {}
    return <div>UserId: {match.params.userId}</div>
}

const UserSettings = ({ match }) => {
    //console.log(match.params);  // output: {userId: "5"}
    return <div>UserId: {match.params.userId}</div>
}

const UserProfilePage = ({ match }) => {
    //   console.log(match)
    return (
        <div>
            User Profile:
      <Route path={`${match.url}/comments`} component={UserComments} />
            <Route path={`${match.path}/settings`} component={UserSettings} />
        </div>
    )
}


/* const BrowseUsersPage = () => (
    <div className="user-sub-layout">
        <aside>
            <UserNav />
        </aside>
        <div className="primary-content">
            <BrowseUserTable />
        </div>
    </div>
)


const UserProfilePage = props => (
    <div className="user-sub-layout">
        <aside>
            <UserNav />
        </aside>
        <div className="primary-content">
            <UserProfile userId={props.match.params.userId} />
        </div>
    </div>
) */

const UserNav = () => (
    <div>User Nav</div>
)

const BrowseUserTable = ({ match }) => {
    return (
        <ul>
            <li><Link to={`${match.path}/comments`}>comments</Link></li>
            <li><Link to={`${match.path}/settings`}>settings</Link></li>
        </ul>
    )
}

const UserProfile = ({ userId }) => <div>User: {userId}</div>;

export default App;