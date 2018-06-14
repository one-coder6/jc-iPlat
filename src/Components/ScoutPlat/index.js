import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
// 引入antd组件
import { Row, Col, Icon, Tag, Button, Modal } from 'antd';
// 引入自定义组件    公共部分
import CommonLayout from '../Content/Index';
import { httpAjax, addressUrl } from '../../Util/httpAjax';
//引入自定义组件
import Search from './ScoutComponents/SearchComponent';
import CaseList from './ScoutComponents/CaseList';
import ExtractList from './ExtractCase/index';
// 新增案件
import InsertCase from './AddNewCase/index.js';

import '../../styles/scoutPlat.less';
export default class ScoutPlat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: null,
			countGroup: '',
			extractCase: false,
			reload: false,
			viewInsertCase: false
		}
	}
	componentWillMount() {
		const reqUrl = addressUrl + '/cases/countGroup';
		// httpAjax("get", reqUrl).then(res => {
		// 	if (res.code == 200) {
		// 		this.setState({
		// 			countGroup: res.data
		// 		})
		// 	}
		// })
	}
	handleSearch = (value) => {
		this.setState({
			searchValue: value
		});
	}

	reloadFn = () => {
		this.setState({ reload: true })
	}
	extractCase = () => {
		this.setState({ extractCase: true })
	}
	handleCancel = () => {
		//	this.setState({ reload: true })
	}
	handelExtra = () => {
		this.setState({ extractCase: false })
	}
	// 新增案件-提交
	handelInsertCase = (e) => {
		this.setState({ viewInsertCase: false })
		this.setState({ reload: true })
	}
	// 新增案件-显示
	InsertCaseShow = () => {
		this.setState({ viewInsertCase: true })
	}
	// 新增案件-关闭
	InsertCaseHide = () => {
		this.setState({ viewInsertCase: false })
	}
	render() {
		const { countGroup, extractCase, viewInsertCase } = this.state;
		return (
			<CommonLayout>
				{/*<Row style={{padding:'20px 0',background:'#fff'}}>
					<Col xl={16} lg={14} md={10} sm={24} xs={24}></Col>
					<Col xl={8} lg={10} md={14} sm={24} xs={24}>
						<span>案件总数 ：{ parseInt(countGroup.FINISH) + parseInt(countGroup.ABORT) + parseInt(countGroup.EXECUTE) }</span>
						<Tag color="#108ee9" style={{marginLeft:'8px'}}>已侦办</Tag> {countGroup.FINISH}
						<Tag color="#999" style={{marginLeft:'8px'}}>未侦破</Tag> {countGroup.ABORT}
						<Tag color="orange" style={{marginLeft:'8px'}}>侦办中</Tag> {countGroup.EXECUTE} 
					</Col>	
				</Row>	*/}
				<Search Search={this.handleSearch} />
				<Row style={{ padding: '20px 0', background: '#fff', margin: '10px 0', textAlign: 'right' }} gutter={16}>
					<Col xl={16} lg={16} md={10} sm={24} xs={24}></Col>
					{/* <Col xl={2} lg={14} md={10} sm={24} xs={24}>
                        <Button type='primary' style={{ marginLeft: '8px' }}>提取案件</Button>
                    </Col>
                    <Col xl={2} lg={10} md={14} sm={24} xs={24}>
                        <Button type='primary' style={{ marginLeft: '8px' }}>提取警情</Button>
                    </Col> */}
					<Col xl={8} lg={8} md={14} sm={24} xs={24} style={{ paddingRight: 100 }}>
						{/* <Link to='/extractCase' >
                            <Button type='primary' size='small' style={{ margin: '0 10px' }}>提取案件</Button>
                        </Link> */}
						<Button type='primary' size='small' style={{ marginRight: '5px' }} onClick={this.InsertCaseShow}>新增案件</Button>
						<Button type='primary' size='small' style={{ marginRight: '5px' }} onClick={this.extractCase}>提取案件</Button>
						<Link to='/ajbz' >
							<Button type="primary" size='small'>比中信息</Button>
						</Link>
					</Col>
				</Row>
				<CaseList searchValue={this.state.searchValue} reload={this.state.reload} />
				<Modal style={{ top: 5, width: '100%' }} visible={viewInsertCase} title={<span><Icon type="file-add" /> 新增案件</span>} onCancel={this.InsertCaseHide} className='extractCaseM' footer={false}>
					<InsertCase reloadFn={this.reloadFn} handelInsertCase={this.handelInsertCase} />
				</Modal> <Icon type="share-alt" />
				<Modal visible={extractCase} title={<span><Icon type="share-alt" /> 提取案件</span>} onCancel={this.handelExtra} className='extractCaseM' footer={false}>
					<ExtractList reloadFn={this.reloadFn} handelExtra={this.handelExtra} showType='extractCase' />
				</Modal>
			</CommonLayout>
		)
	}
}