
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function updateUser(user) {
	return {
		type : LOGIN_SUCCESS,
		user : user
	}
}