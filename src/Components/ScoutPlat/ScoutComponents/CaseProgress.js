import React from 'react';
import { connect } from 'react-redux';
import { Card, Steps, Icon, Tag, Modal, DatePicker, message, Spin } from 'antd';
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
			stepsSource: [],
			visible: false, // 模态窗的状态
			defaultTime: "", // 默认时间
			updateTime: '', // 修改后的时间
			updateId: '', // 修改记录的id
		}
	}
	componentWillMount() {
		this.ajaxLoad();
	}
	// 请求数据
	ajaxLoad = () => {
		const ajbh = sessionStorage.getItem("ajbh");
		const reqUrl = addressUrl + `/timeNode/list?ajbh=${ajbh}`;
		let { dispatch, timeNode } = this.props;
		httpAjax("get", reqUrl, ).then(res => {
			if (res.code === '200') {
				dispatch(getTimeNode({
					timeNode: res.data,
				}))
				this.setState({ stepsSource: res.data })
			}
		})
		return this;
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

	//  设置时间轴颜色
	mapTimeColor = (time, org) => {
		let resultColor = "";
		if (time == "CASE_CREATE" || time == "CASE_PICK" || time == "CASE_MERGE") {
			// 红色
			resultColor = "#ff0000"
		} else {
			let b = org.indexOf('技') > -1 || org.indexOf('网') > -1 || org.indexOf('视') > -1 || org.indexOf('技术') > -1;
			if (b) {
				// 紫色
				resultColor = "#9900ff"
			} else {
				// 蓝色
				resultColor = "#40a9ff"
			}
		}
		return resultColor;
	}
	// 点击跳转到需求和回复列表
	fromProgress = (id) => {
		if (id) {
			const { fromProgress } = this.props;
			fromProgress(id)
		}
	}
	// 显示修改框
	showModal = (r) => {
		this.setState({ defaultTime: r.lrsj, updateId: r.id, visible: true })
	}
	// 模态框的提交事件
	handleOk = () => {
		let id = this.state.updateId,
			lrsj = this.state.updateTime;
		if (id && lrsj) {
			httpAjax("post", addressUrl + '/timeNode/update', { id: id, lrsj: lrsj }).then((res) => {
				if (res.code == 200) {
					message.success("修改成功。")
					this.ajaxLoad().handleCancel()
				} else {
					message.error("修改失败，请重试或者联系管理员。")
				}
			})
		} else {
			this.setState({ visible: false })
		}
	}
	// 时间控件的确定按钮
	updateTime = (e) => {
		let _time = e.format('YYYY-MM-DD HH:mm:ss')
		this.setState({ updateTime: _time })
	}
	// 关闭修改框
	handleCancel = () => {
		this.setState({ visible: false })
	}
	render() {
		const { stepsSource } = this.state;
		return (
			<div>
				<Card className='progressContent'>
					{
						stepsSource && stepsSource.length >= 1 ?
							<Steps className='pItem' style={{ width: '800px', height: '160px' }}>
								{stepsSource && stepsSource.map((item, index) => {
									if (index % 2 == 1) {
										return <Step status="finish"
											title={
												<div className='stepTitle stepTitles'>
													{/* <div className='caesDescrition'>标题：<span style={{ color: 'blue' }}>{this.mapTitleType(item.referenceType)}</span></div>  */}
													<div className='caesDescrition'>标题：<span style={{ color: 'blue' }}>{item.referenceTypeCn || '-'}</span></div>
													<div className='caesDescrition' title={item.sendOrgName ? item.sendOrgName : ''}>发送单位：{item.sendOrgName || '-'}</div>
													<div className='caesDescrition' title={item.receiveOrgName ? item.receiveOrgName : ''}>接收单位：{item.receiveOrgName || '-'}</div>
													<div onClick={() => { this.fromProgress(item.contentType) }} className='caesDescrition tocaesDescrition' title={item.content ? item.content : ''}>说明：{item.content ? item.content : '-'}</div>
													<Tag title="点击修改" onClick={() => { this.showModal(item) }} color={this.mapTimeColor(item.referenceType, item.sendOrgName)}>{item.lrsj ? moment(item.lrsj).format("YYYY/MM/DD HH:mm") : '-'}</Tag>

												</div>
											}
											icon={<Icon type="right-circle-o" />} key={index}>
										</Step>
									} else {
										return <Step status="finish"
											title={
												<div className='stepTitle stepTitles'>
													<Tag onClick={() => { this.showModal(item) }} color={this.mapTimeColor(item.referenceType, item.sendOrgName)}>{item.lrsj ? moment(item.lrsj).format("YYYY/MM/DD HH:mm") : '-'}</Tag>
													{/* <div className='caesDescrition'>标题：<span style={{ color: 'blue' }}>{item.referenceType ? this.mapTitleType(item.referenceType) : '-'}</span></div> */}
													<div className='caesDescrition'>标题：<span style={{ color: 'blue' }}>{item.referenceTypeCn || '-'}</span></div>
													<div className='caesDescrition' title={item.sendOrgName ? item.sendOrgName : ''} >发送单位：{item.sendOrgName || '-'}</div>
													<div className='caesDescrition' title={item.receiveOrgName ? item.receiveOrgName : ''}>接收单位：{item.receiveOrgName || '-'}</div>
													<div title="点击修改" onClick={() => { this.fromProgress(item.contentType) }} className='caesDescrition tocaesDescrition' title={item.content ? item.content : ''}>说明：{item.content ? item.content : '-'}</div>
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
				<Modal
					title="修改时间"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					{
						this.state.visible ? <div><DatePicker
							showTime
							disabled
							format="YYYY/MM/DD HH:mm"
							placeholder="Select Time"
							defaultValue={moment(this.state.defaultTime, 'YYYY/MM/DD HH:mm')}
						/> => <DatePicker
								showTime
								allowClear={false}
								format="YYYY/MM/DD HH:mm"
								placeholder="请输入时间"
								showToday={false}
								defaultValue={moment(this.state.defaultTime, 'YYYY/MM/DD HH:mm')}
								onOk={this.updateTime}
							/></div> : ''
					}
				</Modal>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		timeNode: state.timeNode
	}
}
export default connect(mapStateToProps)(CaseProgress);