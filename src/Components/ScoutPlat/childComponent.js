
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { delCount } from '../../store/actions/index';

class TestComponent extends React.Component{
	delCount = () => {
		let { dispatch, count } = this.props;
    dispatch(delCount(5));
	}
	render(){
		return (
			<div onClick={this.delCount}>
				<h2>我是子组件 点击我也可以改变store中state的值</h2>
				<p>
				ps:因为store中的值在页面中的共享的，只要一个地方触发了store中的state改变，那么页面中所有用来store中state的页面都会更新state的值
				</p>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
        count : state.count,
    }
}
export default connect(mapStateToProps)(TestComponent);