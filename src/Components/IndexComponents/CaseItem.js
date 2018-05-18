import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import policeShield from '../../images/policeShield.png'
import '../../styles/index.less';
export default class CaseItem extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
        const {item}=this.props;
		return (
			<div>
				<div className='itemCount'>
					<span>收到请求：{item.demand}条</span>
					<span>签收请求：{item.signedDemand}条</span>
					<span>反馈数量：{item.replied}条</span>
				</div>
				<div className='itemLogo'>
					<img src={policeShield} alt=""/>
					<span>{item.orgTypeName}</span>
				</div>
			</div>
		)
	}
}