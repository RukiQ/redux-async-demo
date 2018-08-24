import { 
    GET_USERS_SUCESS, 
    GET_USERS_FAIL,
} from 'constant/actionTypes';

const userReducer = (state = {
    fetched: false,
    users: [{
        key: '1',
        name: '张三',
        email: 'zhangsan@126.com'
    }],
    error: null
}, action) => {
    switch(action.type) {
        case GET_USERS_SUCESS:
            return {...state, fetched: true, users: action.users} 
        case GET_USERS_FAIL:
            return {...state, error: action.error}
    }
    return state;
};

export default userReducer;