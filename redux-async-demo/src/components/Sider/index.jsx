import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

// 引入Antd的导航组件
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class Sider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="leftMenu">
                <span className="logo" style={{marginLeft: '40px'}}>主菜单</span>
                <Menu theme="dark"
                    style={{ width: 200 }}
                    defaultOpenKeys={['sub1', 'sub2']}
                    defaultSelectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="bars" /><span>子菜单</span></span>}>
                        <Menu.Item key="1"><Link to="/page1" replace>用redux-thunk获取数据</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/page2" replace>用redux-saga获取数据</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/page3" replace>测试路由</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/page4" >测试路由</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default Sider