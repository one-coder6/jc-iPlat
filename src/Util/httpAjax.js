import axios from "axios";
import React from 'react';
import {
	message
} from 'antd';
import jwtDecode from 'jwt-decode';
import createHashHistory from 'history/createHashHistory';
import {
	cookieUtil
} from './common';
const history = createHashHistory();

export function httpAjax(method, url, data, config) {
	let _this = this;
	let promise = new Promise((resolve, reject) => {
		// 添加请求拦截器
		axios.interceptors.request.use(function(config) {
			// 在发送请求之前做些什么
			// config.headers={
            //     //'Content-Type': 'application/x-www-form-urlencoded'
            //     //'crossDomain': true,
            //     //withCredentials: true,
            // }
            config.withCredentials=true ;
			let token = cookieUtil.get('token');
			if (typeof token == "string") {
				config.headers.Authorization = token;
			}
			return config;
		}, function(error) {
			// 对请求错误做些什么
			console.log(error)
			return Promise.reject(error);
		});

		// 添加响应拦截器
		axios.interceptors.response.use(function(response) {
			// 对响应数据做点什么
			return response;
		}, function(error) {
			// 对响应错误做点什么
			return Promise.reject(error);
		});
		axios[method](url, data, config)
			.then(result => {
				// 后台请求返回的code=0是操作成功
				//||!result.data.code
				if (result.status==200 || result.data.code === '200') {
					// console.log(jwtDecode(result.data.data.token));
					if (result.data.data) {
						typeof result.data.data.token == "string" && cookieUtil.set('token', result.data.data.token);
					}
					resolve(result.data);
				} else if (result.data.code === 10001) {
					message.error("未登录");
					history.push('/');
				} else if (result.data.code === 20001) {
					message.warning("无权限");
				} else {
					reject(result.data);
				}
			})
			.catch(result => {
				if (result.response.data.status === 499) {
					message.error("您的账号在别的地方登录", 1);
					return;
				}
				if (result.response.data.status === 401) {
					message.error("登录过期，重新登录", 2, function() {
						history.push('/');
					});
					return;
				}
				reject(result.data);
			});
	});
	return promise;
}

//纪德伟 
// export const addressUrl = 'http://192.168.1.102:9090/cidyth-web';
// export const UC_URL = 'http://192.168.1.102:8080/hyzs-uc';

//陈铭
// export const addressUrl = 'http://192.168.1.111:8888/cidyth-web';
// export const UC_URL = 'http://192.168.1.111:9090/hyzs-uc/uc/';

//服务器
export const addressUrl = 'http://68.64.16.139:9090/cidyth-web';
export const UC_URL = 'http://68.64.16.139:9090/hyzs-uc';

/*
机构API：获取顶级机构数据：GET
http://192.168.1.108:9090/hyzs-uc/uc/getTopDepartment
*/
/*
机构API：根据父级机构获取直属机构数据：POST 
http://192.168.1.108:9090/hyzs-uc/uc/getDepartmentByAny?code=440300000000
*/

//服务器地址
//export const addressUrl = 'http://68.64.17.37:8081/cidyth-web';

// export const DemandFeedbackWSUrl  = "ws://192.168.1.102:9528/ws/chat"; // bbs论坛通讯
// export const GlobalWSUrl  = "ws://192.168.1.102:9527/ws/global"; // 全局消息

export const DemandFeedbackWSUrl  = "ws://68.64.16.139:9528/ws/chat"; // bbs论坛通讯
export const GlobalWSUrl  = "ws://68.64.16.139:9527/ws/global"; // 全局消息