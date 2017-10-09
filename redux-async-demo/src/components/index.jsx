import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Sider from './Sider';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="nav">
                <Sider />
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        {this.props.children}
                    </div>
                </div> 
            </div>
        );
    }
}

export default App;