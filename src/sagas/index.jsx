import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { BEGIN_GET_POSTS, GET_POSTS, GET_POSTS_ERROR } from '../reducers';

// worker saga
function* showPostsAsync(action) {
    try {
        const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts');
        yield put(GET_POSTS(response.data));
    } catch(e) {
        yield put(GET_ERROR(e));
    }
}

// wacther saga
function* watchGetPosts() {
    yield takeLatest(BEGIN_GET_POSTS, showPostsAsync);
}

// root saga
export default function* rootSaga() {
    yield watchGetPosts()
} 