import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Collapse, Input, Button, Rate, List, Divider, Tag, Modal, Spin } from 'antd';
import { httpAjax, addressUrl, DemandFeedbackWSUrl } from '../../../Util/httpAjax';
import ReplyClue from './relayRequest'; // 回复评论
import FeedbackClue from '../feedbackClue'; //反馈线索
import RateCom from './rate'; //评价
import { ScoketHandler } from '../websocket/socket.js';

const Panel = Collapse.Panel;
let WS = null;
export default class RequestList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAppraise: false, // 是否显示评价对话框
			showReply: false, // 是否显示回复对话框
			showClue: false, // 是否显示反馈线索对话框
			requestSource: [], // 父级的数据源
			contentList: {},  // 键为父级数据源的id，值为contentList
			replyRecord: '',
			loading: false,
			loadbacklist: false, // 通讯更新数据的状态loading
			isFirstGet: true, // 首次是通过api请求数据，完了之后是通过建立的websocket通讯更新新数据
			showCollapseIndex: "0" // 显示Collapse的索引
		}
	}
	componentWillMount() {
		this.getRequestSource();
		//console.log("this.record", this.props.showType)
	}
	componentWillUnmount() {
		WS && WS.onclose();
	}
	// 连接回话
	connSocket = () => {
		const ajbh = sessionStorage.getItem("ajbh");
		var user = JSON.parse(sessionStorage.getItem("user"));
		let shl = ScoketHandler(DemandFeedbackWSUrl + "?ajbh=" + ajbh + "&account=" + user.account);
		shl.init();
		// callback里面写websocket有新消息的逻辑
		shl.callback = (d) => {
			let td = d && JSON.parse(d).data;
			let resultSource = null;
			/*  获取返回类型，获取类型给对应的数据源新增 */
			//1、回复线索或者恢复对话
			let topMessageIdentifer = td.topMessageIdentifer || "";
			if (topMessageIdentifer.toString().indexOf("DEMAND") > -1 || topMessageIdentifer.toString().indexOf("INFO") > -1) {
				let tempList = this.state.contentList;
				tempList[topMessageIdentifer].push(td);
				//this.setState({ contentList: tempList })
				resultSource = { contentList: tempList }
			}
			//2、新增需求
			let contentType = td.contentType || "";
			if (contentType) {
				let tempList = this.state.requestSource;
				tempList.push(td);
				//this.setState({ requestSource: tempList })
				resultSource = { requestSource: tempList }
			}
			this.setState({ loadbacklist: true }, () => {
				this.setState(resultSource, () => { this.setState({ loadbacklist: false }) });
			})
		}
		WS = shl;
	}
	// 加工数据，分离需求和对应的回复信息
	machiningData = (d) => {
		if (d) {
			let childList = {};
			d.map((item, i) => {
				let key = item.contentType + "_" + item.id, val = item.contentList;
				childList[key] = val;
			})
			this.setState({ contentList: childList });
		}
	}
	//回复评论
	relayRequestClue = (record, pid) => {
		record["topMessageIdentifer"] = pid;
		this.setState({ showReply: true, replyRecord: record })
	}

	//反馈线索
	feedbackClue = (record, pid) => {
		record["topMessageIdentifer"] = pid;
		this.setState({ showClue: true, replyRecord: record })
	}

	//评价
	appraiseRequest = (record) => {
		this.setState({ showAppraise: true })
	}

	//取消评价
	handleCancel = () => {
		this.setState({ showReply: false, showAppraise: false, showClue: false })
	}
	// 获取需求和信息的detail
	getRequestSource = () => {
		this.setState({ loading: true });
		const { showType, record } = this.props;
		const ajbh = sessionStorage.getItem("ajbh"); //this.props.record.ajbh //"A4403085000002007010001" //
		let reqUrl = "";
		if (showType === "scoutPlat") {
			reqUrl = addressUrl + `/demand/getDemandByCase?ajbh=${ajbh}`;
			//reqUrl = addressUrl + `/demand/getDemandByCase?ajbh=A4403085000002007010001`;
		} else {
			reqUrl = addressUrl + `/reply/getDemandInteractionContent?referenceId=${record.id}&type=DEMAND`;
		}
		httpAjax("get", reqUrl).then(res => {
			if (res.code === '200') {
				this.setState({ requestSource: res.data, loading: false })
				this.machiningData(res.data)
				if (this.props.showType === 'scoutPlat' && this.state.isFirstGet) {
					// 侦查工作台 需要建立通信
					this.connSocket();
					this.setState({ isFirstGet: false })
				}
			}
		})
	}

	mapReplyType = (type) => {
		if (type === "CLUE") {
			return '反馈线索'
		} else if (type === "RESP") {
			return '回复'
		}
	}
	// 跳转到指定焦点
	toscrollView = () => {
		this.setState({ currentPage: "2", currentPageChild: "2" }, () => {
			let anchorElement = document.getElementById("mmy");
			if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
		})
	}
	//提交评价
	submitAppraise = () => {
		this.setState({ showAppraise: false })
	}

	// 回复信息
	renderChild = (id, contentType) => {
		let contentList = this.state.contentList;
		let key = contentType + '_' + id
		let tempData = contentList[key] || [];
		return <Spin spinning={this.state.loadbacklist}>
			<List
				dataSource={tempData}
				locale={{ emptyText: '无数据' }}
				renderItem={(ele, index) => (
					<List.Item style={{ padding: "10px 25px" }}   >
						<List.Item.Meta
							title={
								<div >
									<span >{ele.fromUserName || '-'} &nbsp;</span>
									<span >{ele.date || '-'}  &nbsp;</span>
									<span style={{ color: 'orange' }}> {this.mapReplyType(ele.type)}</span>
								</div>
							}
							description={
								(ele.toUserName) ? (`${ele.fromUserName}  回复 ${ele.toUserName}：${ele.content}`) : ele.content
							}
						/>
						<div>
							<Button onClick={() => this.relayRequestClue(ele, key)} size='small' style={{ marginRight: '10px' }}>回复</Button>
							<Button onClick={() => this.appraiseRequest(ele)} size='small'> 评价 </Button>
						</div>
					</List.Item>
				)}
			/>
		</Spin>
	}

	render() {
		const { showReply, showAppraise, showClue, requestSource, replyRecord, loading } = this.state;
		const { showType } = this.props;
		return (<div>
			{
				showType === 'scoutPlat' ?
					<Collapse defaultActiveKey={['0']} activeKey={this.state.showCollapseIndex} onChange={(e, c) => { this.setState({ showCollapseIndex: e.pop() }) }}>
						{
							requestSource && requestSource.map((item, index) => {
								return <Panel header={
									<div >
										<div>
											<Tag color="#87d068">{item.contentType == 'DEMAND' ? '需求 ' : '信息 '}{index + 1}</Tag>
											<span style={{ color: 'red' }}>主题：{item.xqmc}；</span>
											<span> 主办人：{item.lrrymc} ；</span>
											<span> 创建时间 ：{item.lrsj}</span>
										</div>
										<div>主要描述：{item.xqnr}</div>
									</div>
								} key={index}>
									<div >
										<div style={{ textAlign: 'right', marginBottom: 10 }}>
											{item.contentType == 'DEMAND' ? <Button type='primary' onClick={() => this.feedbackClue(item)} size='small'>反馈线索</Button> : ""}
											<Button type='primary' onClick={() => this.relayRequestClue(item, item.contentType + "_" + item.id)} size='small' style={{ marginLeft: '20px' }}>回复</Button>
										</div>
										<Divider dashed />
										{/* 回复列表   */}
										{this.renderChild(item.id, item.contentType)}
									</div>
								</Panel>
							})
						}
					</Collapse>
					: <div style={{ background: '#e5e5e5', padding: '10px', marginTop: '10px' }}>
						<h3>回复列表</h3>
						< List dataSource={requestSource}
							renderItem={(ele, index) => (
								<List.Item   >
									<List.Item.Meta
										title={
											<div >
												<span >{ele.fromUserName} &nbsp;</span>
												<span >{ele.date}  &nbsp;</span>
												<span style={{ color: 'orange' }}> {this.mapReplyType(ele.type)}</span>
											</div>
										}
										description={
											(ele.toUserName) ? (`${ele.fromUserName}  回复 ${ele.toUserName}：${ele.content}`) : ele.content
										}
									/>
									<div>
										<Button onClick={() => this.relayRequestClue(ele)} size='small' style={{ marginRight: '10px' }}>回复</Button>
										<Button onClick={() => this.appraiseRequest(ele)} size='small'> 评价 </Button>
									</div>
								</List.Item>
							)}
						/>
					</div>
			}
			{/* locale={{ emptyText: '加载中' }} */}
			{/* 侦查工作平台详细展示对应需求 */}
			<Modal title='反馈线索' visible={showClue} onCancel={this.handleCancel} footer={null}>
				<FeedbackClue handleCancel={this.handleCancel} requestRecord={replyRecord} />
			</Modal>
			{/* 回复线索 */}
			<Modal title='回复' visible={showReply} onCancel={this.handleCancel} footer={null}>
				<ReplyClue handleCancel={this.handleCancel} replyRecord={replyRecord} getRequestSource={this.getRequestSource} />
			</Modal>
			{/* 评价 */}
			<Modal title='评价' visible={showAppraise} onCancel={this.handleCancel} footer={null}>
				<RateCom />
			</Modal>
		</div>
		)
	}
}
