import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { GET_USERS, GET_ERROR } from '../../reducers';
import reducer from '../../reducers';

import { Table } from 'antd'; 

class UserList extends Component {
    static defaultProps = {
        users: null
    }

    constructor(props) {
        console.log(props);
        super(props);
    }

    componentWillMount() {
        this.props.dispatch((dispatch) => {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    dispatch(GET_USERS(response.data))
                })
                .catch((error) => {
                    dispatch(GET_ERROR(error))
                })
        });
    }

    render() {
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
                <Table dataSource={this.props.users} columns={columns} />
            </div>
        );
    }
}

const mapStateToProps  = (state) => ({
    users: state.users
});

export default connect(mapStateToProps)(UserList);