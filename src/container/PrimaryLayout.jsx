import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader'

import Sider from 'component/Sider';
import UserList from './UserList';
import PostList from './PostList';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import dashRoutes from '../routes/dashboard';

const switchRoutes = (
    <Switch>
        {dashRoutes.map((prop, key) => {
            if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            }

            if (prop.collapse) {
                return prop.children.map((prop, key) => {
                    if (prop.collapse) {
                        return prop.children.map((prop, key) => {
                            return <Route path={prop.path} component={prop.component} key={key} />;
                        })
                    }
    
                    return <Route path={prop.path} component={prop.component} key={key} />;
                });
            }
            
            return <Route path={prop.path} component={prop.component} key={key} />; 
        })}
    </Switch>
);

class PrimaryLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="nav">
                <Sider routes={dashRoutes} />
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />{this.state.username}</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        {switchRoutes}
                        {/* <Switch>
                            <Route path="/" exact render={() => <h1>Home Page</h1>} />
                            <Route path="/userList" exact component={UserList}></Route>
                            <Route path="/postList" exact component={PostList}></Route>
                            <Route path="/page3" exact render={() => <h1>路由测试</h1>}></Route>
                            <Route path="/page4" exact render={() => <h1>路由测试</h1>}></Route>
                            <Redirect to="/" />
                        </Switch> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(PrimaryLayout);