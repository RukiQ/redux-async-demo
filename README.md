本 demo 在 03_redux-router-v4-optimize 的基础上的进一步改进如下：

- 升级了 webpack 4、react 16
- 采用本地数据 mock
- 添加了路由配置文件（按照 antd 的 Menu）

> 通过路由配置来生成路由的方式是参考了 [Material-UI Theme](https://demos.creative-tim.com/material-dashboard-react/?_ga=2.55719595.10714530.1535703355-492283409.1535703355#/dashboard) 模板中的写法。 尽管在使用这个 UI 框架时，让我很抓狂，但是有些地方还是值得学习的。┐(￣ヮ￣)┌

☛ [React技术栈整套工程化流程](https://www.jianshu.com/p/088116f02b26)
☛ [Webpack4+React 项目框架从0到1](https://www.jianshu.com/p/c12d54b6974b) 

### 一、路由 config

	const dashRoutes = [
	    {
	        path: '/home',
	        name: '主菜单',
	        component: () => <h1>Home Page</h1>
	    },
	    {
	        collapse: true,
	        name: 'Nav One',
	        key: 'sub1',
	        icon: <Icon type="mail" />,
	        children: [
	            {
	                path: '/userList',
	                name: '用户列表',
	                key: 1,
	                icon: '',
	                component: UserList
	            }, 
	            {
	                path: '/postList',
	                name: '帖子列表',
	                key: 2,
	                icon: '',
	                component: PostList
	            },
	            {
	                path: '/option3',
	                name: 'Option3',
	                key: 3,
	                icon: '',
	                component: () => <h1>Option3</h1>
	            },
	            {
	                collapse: true,
	                name: 'Submenu',
	                key: 'submenu',
	                icon: '',
	                children: [
	                    {
	                        path: '/option4',
	                        name: 'Option4',
	                        key: 4,
	                        icon: '',
	                        component: () => <h1>Option4</h1>
	                    },
	                    {
	                        path: '/option5',
	                        name: 'Option5',
	                        key: 5,
	                        icon: '',
	                        component: () => <h1>Option5</h1>
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        collapse: true,
	        name: 'Nav Two',
	        key: 'sub2',
	        icon: <Icon type="appstore" />,
	        children: [
	            {
	                path: '/Option6',
	                name: 'Option6',
	                key: 6,
	                icon: '',
	                component: () => <h1>Option6</h1>
	            },
	        ]
	    },
	    { redirect: true, path: '/', to: '/home', name: '' }
	];


### 二、 根据 config 生成路由

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



### 三、 生成左侧菜单

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
    </Menu>


