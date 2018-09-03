import React from 'react';
import { Icon } from 'antd';
import UserList from 'container/UserList';
import PostList from 'container/PostList';

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

export default dashRoutes;