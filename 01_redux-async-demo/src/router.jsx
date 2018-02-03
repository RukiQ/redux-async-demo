import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import App from './components';
import UserList from './components/UserList';
import PostList from './components/PostList';

const AppRouter = ({dispatch}) => (
    <HashRouter basename="/" >
        <App>
            <Route exact path="/page1" component={UserList}></Route>
            <Route exact path="/page2" component={PostList}></Route>
            <Route exact path="/page3" render={() => <h1>路由测试</h1>}></Route>
            <Route exact path="/page4" render={() => <h1>路由测试</h1>}></Route>
        </App>
    </HashRouter>
);

export default AppRouter;