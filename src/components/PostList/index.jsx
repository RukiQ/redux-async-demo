import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Begin_GET_POSTS, GET_ERROR } from '../../reducers';

import { Table } from 'antd'; 

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentWillMount() {
        this.props.dispatch(Begin_GET_POSTS());
    }

    render() {        
        const columns = [{
            title: '用户编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }];

        return (
            <div>
                <Table dataSource={this.props.posts} columns={columns} />
            </div>
        );
    }
}

const mapStateToProps  = (state) => ({
    posts: state.posts
});

export default connect(mapStateToProps)(PostList);