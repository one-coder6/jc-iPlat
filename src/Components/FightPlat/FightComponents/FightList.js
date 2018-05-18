import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Pagination, Spin } from 'antd';
import moment from 'moment';

import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import FightItem from './FightItem';
export default class FightList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pageSize: 10,
			pageNum: 1,
			total: 0,
            dataSource: [],
            searchValue:''
		}
	}

	componentWillMount() {
		this.setState({ loading: true });
		let { pageSize, pageNum } = this.state;
		this.getDataSource(pageSize,pageNum);
	}

	componentWillReceiveProps(nextProps) {
		let searchValue = nextProps.searchValue;
		let { pageSize, pageNum } = this.state;
		let _this = this;
		//console.log("componentWillReceiveProps", searchValue)
		if (searchValue && searchValue.sljjsj !== undefined) {
			searchValue.beginCreateTime = moment(searchValue.sljjsj[0]).format("YYYY-MM-DD HH:mm:ss");
            searchValue.endCreateTime = moment(searchValue.sljjsj[1]).format("YYYY-MM-DD HH:mm:ss");
            searchValue.timeSection = 0;
            delete searchValue.sljjsj;
		}
		if (searchValue != this.state.searchValue) {
			this.setState({ searchValue: searchValue }, () => {
				_this.getDataSource(
					pageSize,
					pageNum,
					// ...searchValue
				);
			})
		}
	}
	getDataSource = (Size,Num) => {
		const { total ,searchValue} = this.state;
		const reqUrl = addressUrl +"/demand/list";
		httpAjax("get", reqUrl,{
			params: {
				pageSize: Size,
                pageNum: Num,
                orderBy:'id desc',                
				...searchValue
			}
		}).then(res => {
			if (res.code === '200') {
				const data = res.data;
				this.setState({
					total: data.total,
					loading: false,
					dataSource: data.list
				})
			}
		})
	}
	paginationChange = (page, pageSize) => {
		this.getDataSource(pageSize,page);
	}
	render() {
		const { total, loading, dataSource } = this.state
		return (
			<div className='fightListContent'>
				{
					loading ? <Spin size="large" style = {{margin:'6% 0 0 40%'}} /> :
					dataSource.map((item, index) => {
						return <FightItem record={item} key={index} getDataSource = {this.getDataSource} />
					})
				}
				<Pagination
					defaultCurrent={1}
					total={total}
					showTotal={total => `共 ${total} 条`}
					showSizeChanger
					showQuickJumper
					onChange={this.paginationChange}
					style={{ marginTop: '20px', textAlign: 'center' }}
				/>
				{/*        { loading ? <Spin size="large"  className = 'listLoading' /> : null }*/}
			</div>
		)
	}
}