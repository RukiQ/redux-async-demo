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
        const { routes } = this.props;

        return (
            <div id="leftMenu">
                <span className="logo" style={{marginLeft: '40px'}}>
                    <Link to={routes[0].path}>{routes[0].name}</Link>
                </span>
                <Menu theme="dark"
                    style={{ width: 200 }}
                    defaultOpenKeys={['sub1', 'sub2']}
                    defaultSelectedKeys={[this.state.current]}
                    mode="inline"
                >
                        {routes.map((prop, index) => {
                            if (prop.redirect) return;
                            if (prop.collapse) {
                                return (
                                    <SubMenu key={prop.key} title={<span>{prop.icon}<span>{prop.name}</span></span>}>
                                        {prop.children.map((prop, index) => {
                                            if (prop.children) {
                                                return (
                                                    <SubMenu key={prop.key} title={<span>{prop.name}</span>}>
                                                        {prop.children.map((prop, index) => {
                                                            return <Menu.Item key={prop.key}><Link to={prop.path}>{prop.name}</Link></Menu.Item>;
                                                        })}
                                                    </SubMenu>
                                                )
                                            }
                                            return <Menu.Item key={prop.key}><Link to={prop.path}>{prop.name}</Link></Menu.Item>;
                                        })}
                                    </SubMenu>
                                )
                            }
                        })}
                        {/* <Menu.Item key="1"><Link to="/userList">用redux-thunk获取数据</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/postList">用redux-saga获取数据</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/users">测试路由</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/page4" >测试路由</Link></Menu.Item> */}
                </Menu>
            </div>
        );
    }
}

export default Sider