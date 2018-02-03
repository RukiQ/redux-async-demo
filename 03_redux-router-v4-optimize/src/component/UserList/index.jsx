import React, { Component } from 'react';
import PropTypes from 'prop-types';
const { func } = PropTypes;

import { Table } from 'antd'; 

class UserList extends Component {
    static propTypes = {
        fetchUsers: func
    }

    static defaultProps = {
        users: []
    }

    state = {

    }

    componentWillMount() {
        this.props.fetchUsers();
    }

    render() {
        const { users } = this.props;

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        }];

        return (
            <div>
                <Table rowKey="id" dataSource={users} columns={columns} />
            </div>
        );
    }
}

export default UserList;