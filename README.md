本 demo 在 02_redux-router-v4-demo 的基础上对模块结构进行了优化，分离了业务组件和纯组件，提高组件复用性，模块结构更加清晰。

具体梳理请参考我的博文：[React技术栈整套工程化流程](https://www.jianshu.com/p/088116f02b26)

### 一、目录结构：

- /asset
	- /css
	- /img
- /src
	- /common --------------- 公用类库
	- /component ------------ Dumb 组件
		- /PostList
		- /Sider
		- /UserList
	- /constant ------------- 公用常量
		- /actionTypes
		- /url
	- /container ------------ Smart 组件
		- index.jsx --------- App 业务组件
		- PostList.jsx ------ 采用 Saga 获取数据
		- UserList.jsx ------ 采用 Thunk 获取数据
	- /redux
		- /reducer
		- /sagas
	- app.jsx ---------------- app入口
- .babelrc
- index.html
- package.json
- README.md
- webpack.config.js

### 二、模块间调用关系

`app.jsx` 为启动入口，配置好 **Thunk/Saga**，将 `store` 传入 `<App />`；

 `<App />` 为 **container** 中的业务组件，专门用来获取异步数据，这样就可以跟 **component** 中的纯组件解耦；

**component** 中的组件不用关心外部的情况，只需要关注传入的 `props` 进行渲染即可。

	import '../asset/css/style.scss';
	import 'antd/dist/antd.min.css';
	import React from 'react';
	import { render } from 'react-dom';
	import { Provider } from 'react-redux';
	import { createStore, applyMiddleware, combineReducers } from 'redux';
	import logger from 'redux-logger';
	import thunk from 'redux-thunk';
	import createSagaMiddleware from 'redux-saga';
	import axios from 'axios';
	
	import appReducer from './redux/reducer';
	import App from './container';
	import rootSaga from './redux/sagas';
	
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [thunk, sagaMiddleware, logger];
	
	const store = createStore(appReducer, applyMiddleware(...middlewares));
	sagaMiddleware.run(rootSaga);
	
	render(
	    <Provider store={store}>
	        <App />
	    </Provider>,
	    document.getElementById('app')
	);

#### （1）Thunk 处理流程

**/container/UserList.js**

**Thunk** 直接在业务组件中异步获取数据，并返回传入 `reducer` 进行处理。

	import { connect } from 'react-redux';
	import axios from 'axios';
	
	import UserList from 'component/UserList';

	import { 
	    GET_USERS_SUCESS, 
	    GET_USERS_FAIL 
	} from 'constant/actionTypes';
	
	import {
	    GET_USERS_URL
	} from 'constant/url';
	
	const mapStateToProps  = (state) => ({
	    users: state.users
	});
	
	const mapDispatchToProps = (dispatch) => ({
	    fetchUsers: () => {
	        dispatch(() => {
	            axios.get(GET_USERS_URL)
	                .then((response) => {
	                    dispatch({ type: GET_USERS_SUCESS, users: response.data })
	                })
	                .catch((error) => {
	                    dispatch({ type: GET_USERS_FAIL, error })
	                })
	        })
	    }
	});
	
	export default connect(mapStateToProps, mapDispatchToProps)(UserList);

#### （2）Saga 处理流程

**Saga** 在业务组件中只是发出了一个获取数据的命令，在 `saga` 中去获取数据并传入 `reducer`。

**/container/PostList.js**

	import { connect } from 'react-redux';
	import axios from 'axios';
	
	import { GET_POSTS_SAGA } from 'constant/actionTypes';
	import PostList from 'component/PostList';
	
	const mapStateToProps  = (state) => ({
	    posts: state.posts
	});
	
	const mapDispatchToProps = (dispatch) => ({
	    fetchPosts: () => dispatch({ type: GET_POSTS_SAGA })
	});
	
	export default connect(mapStateToProps, mapDispatchToProps)(PostList);

**/redux/sagas/index.js**

	import { takeEvery, takeLatest } from 'redux-saga';
	import { call, put } from 'redux-saga/effects';
	import axios from 'axios';
	
	import { 
	    GET_POSTS_SAGA, 
	    GET_POSTS_SUCCESS, 
	    GET_POSTS_FAIL 
	} from 'constant/actionTypes';
	
	import {
	    GET_POSTS_URL
	} from 'constant/url';
	
	// worker saga
	function* showPostsAsync(action) {
	    try {
	        const response = yield call(axios.get, GET_POSTS_URL);
	        yield put({ type: GET_POSTS_SUCCESS, posts: response.data });
	    } catch(e) {
	        yield put({ type: GET_POSTS_FAIL, error: e });
	    }
	}
	
	// wacther saga
	function* watchGetPosts() {
	    yield takeLatest(GET_POSTS_SAGA, showPostsAsync);
	}
	
	// root saga
	export default function* rootSaga() {
	    yield watchGetPosts()
	}