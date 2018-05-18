import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
export default class ChildRouter extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		// const { match, location, history } = this.props
		// console.log(Match)
		console.log(this.props.match.params.id)
		console.log('获取路由传递的参数')
	}
	render(){
		return (
				<div> 
					<h1>{ this.props.match.params.id }</h1>
				 </div>
		)
	}
}