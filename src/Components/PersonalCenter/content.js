import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';

//自定义组件
import ChildRouter from './ChildRouter/index';
export default class SysSetComponent extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		// const { match, location, history } = this.props
		// console.log(Match)
		//console.log(this.prop
		console.log('wohihihihihih')
	}

	render(){
		const {match}=this.props;
		return (
			<div>
				<h1>
					我是系统设置的content组建内容
				</h1>

				<ul>
		            <li>
		                <Link to={`${match.url}/我是第一个哈哈`}>
		                    列表下边的第一个
		                </Link>
		            </li>
		            <li>
		                <Link to={`${match.url}/我是第二个呵呵`}>
		                    列表下边的第二个
		                </Link>
		            </li>
				</ul>
				<Route path={`${match.path}/:id`} component={ChildRouter}/>
			</div>
		)
	}
}


