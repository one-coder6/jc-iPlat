import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Card, Steps, Icon, Tag } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import moment from 'moment'
//引入redux
//import { getTimeNode } from '../../store/actions/index.js';
import { getTimeNode } from '../../../store/actions/index';
const Step = Steps.Step;
class CaseProgress extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			stepsSource: []
		}
	}
	componentWillMount() {
		const ajbh = sessionStorage.getItem("ajbh");
		const reqUrl = addressUrl + `/timeNode/list?ajbh=${ajbh}`;
		let { dispatch, timeNode } = this.props;
		httpAjax("get", reqUrl, ).then(res => {
			if (res.code === '200') {
				debugger;
				dispatch(getTimeNode({
					timeNode: res.data,
				}))
				this.setState({ stepsSource: res.data })
			}
		})
	}
	mapTitleType = (type) => {
		switch (type) {
			case "CREATE_INFO":
				return '发布信息';
				break;
			case "CASE_CREATE":
				return '案件创建';
				break;
			case "CASE_PICK":
				return '案件提取';
				break;
			case "CASE_MERGE":
				return '案件串并';
				break;
			case "CREATE_DEMAND":
				return '发布需求';
				break;
			case "CLUE_RETURN":
				return '反馈线索';
				break;
			case "REPLY":
				return '回复';
				break;
		}
	}
	mapTimeColor = (time) => {
		switch (time) {
			case "CREATE_INFO":
				return "#f50";
				break;
			case "CASE_CREATE":
				return "#2db7f5";
				break;
			case "CASE_PICK":
				return "#3ba0e9";
				//return "#215968";
				break;
			case "CASE_MERGE":
				return "#108ee9";
				break;
			case "CREATE_DEMAND":
				//	return "#3ba0e9";
				return "rgb(224,0,0)";
				break;
			case "CLUE_RETURN":
				return "#009900";
				break;
			case "REPLY":
				return "#E066FF";
				break;
		}
	}
	render() {
		const { stepsSource } = this.state;
		return (
			<Card className='progressContent'>
				{
					stepsSource && stepsSource.length >= 1 ?
						<Steps className='pItem' style={{ width: '800px', height: '160px' }}>
							{stepsSource && stepsSource.map((item, index) => {
								if (index % 2 == 1) {
									return <Step
										status="finish"
										title={
											<div className='stepTitle stepTitles'>
												<div className='caesDescrition'>标题：<span style={{ color: 'blue' }}>{this.mapTitleType(item.referenceType)}</span></div>
												<div className='caesDescrition'>发送单位：{item.sendOrgName || '-'}</div>
												<div className='caesDescrition'>接收单位：{item.receiveOrgName || '-'}</div>
												<div className='caesDescrition'>说明：{item.content || '-'}</div>
												<Tag color={this.mapTimeColor(item.referenceType)}>{item.lrsj ? moment(item.lrsj).format("YYYY/MM/DD HH:mm") : '-'}</Tag>
											</div>
										}
										icon={<Icon type="right-circle-o" />} key={index}>
									</Step>
								} else {
									return <Step
										status="finish"
										title={
											<div className='stepTitle stepTitles'>
												<Tag color={this.mapTimeColor(item.referenceType)}>{item.lrsj ? moment(item.lrsj).format("YYYY/MM/DD HH:mm") : '-'}</Tag>
												<div className='caesDescrition'>标题：<span style={{ color: 'blue' }}>{item.referenceType?this.mapTitleType(item.referenceType):'-'}</span></div>
												<div className='caesDescrition'>发送单位：{item.sendOrgName || '-'}</div>
												<div className='caesDescrition'>接收单位：{item.receiveOrgName || '-'}</div>
												<div className='caesDescrition'>说明：{item.content || '-'}</div>
											</div>
										}
										icon={<Icon type="right-circle-o" />} key={index}>
									</Step>
								}
							})
							}
						</Steps> : '暂无'
				}
			</Card>
		)
	}
}
function mapStateToProps(state) {
	return {
		timeNode: state.timeNode
	}
}
export default connect(mapStateToProps)(CaseProgress);