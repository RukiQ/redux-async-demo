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