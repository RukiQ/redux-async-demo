'use strict';

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

import appReducer from './reducers';
import App from './components';
import rootSaga from './sagas';

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