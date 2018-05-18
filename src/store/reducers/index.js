import { combineReducers } from 'redux';
import { ADD_COUNT, DEL_COUNT, USER, TIMENODE } from '../actions/index'

//preject

import { LOGIN_SUCCESS } from '../actions/login';

// store中可以定义页面中的初始状态
const userInfo = JSON.parse(sessionStorage.getItem("user"));
const initialState = {
    count: 0,      // count = 0
    user: userInfo,
    timeNode: []
    // user: {
    // 	userName: userInfo&&userInfo.name,
    // 	account: userInfo&&userInfo.account
    // },
};


// count的初始状态以及处理之后返回的state值
function count(state = initialState.count, action) {
    switch (action.type) {
        case ADD_COUNT:
            return state + action.num;
        case DEL_COUNT:
            return state - action.num;
        default:
            return state;
    }
}

function user(state = initialState.user, action) {
    switch (action.type) {
        case USER:
            return Object.assign({}, ...state, Object.assign(state, action.user))
        default:
            return state;
    }
}

//获取时间轴数据
function getTimeNode(state = initialState.timeNode, action) {
    switch (action.type) {
        case TIMENODE:
            return action.timeNode
        default:
            return state;
    }
}

const reducers = combineReducers({
    count,
    user,
    getTimeNode
});

export default reducers;