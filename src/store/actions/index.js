//action  

// 纯事件定义
export const ADD_COUNT = 'ADD_COUNT';
export const DEL_COUNT = 'DEL_COUNT';
export const USER = 'USER';
export const TIMENODE = 'TIMENODE';

// pure functions
export function addCount(num) {
    return {
        type : ADD_COUNT,
        num: num
    }
}

export function delCount(num) {
    return {
        type : DEL_COUNT,
        num:num
    }
}

export function updateUser(user) {
	return {
		type : USER,
		user : user
	}
}
export function getTimeNode (timeNode){
    return {
		type : TIMENODE,
		timeNode : timeNode
	}
}