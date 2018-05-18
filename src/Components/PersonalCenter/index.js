import React from 'react';
import ReactDOM from 'react-dom';
// 引入antd组件
import { Row, Col } from 'antd';
// 引入公用头部组件
import CommonLayout from '../Content/Index';
//引入自定义组件
//import Content from './content'
import CenterContent from './CenterContent/index';


export default class PersonalCenter extends React.Component{
	componentWillMount(){
		//console.log(this.props)
	}
	render(){
		const { match } = this.props
		return (
			<div>
				<CommonLayout>
					<CenterContent match={match} />
 				</CommonLayout>
			</div>

		)
	}
}