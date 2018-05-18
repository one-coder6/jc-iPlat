import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
//引入公用部分
import CommonLayout from '../Content/Index'
import FileContent from './fileContent/index';
import '../../styles/scoutFile.less';
import InvestigationSearch from './search.js'
import InvestigationList from './list.js'
/* 档案信息 - 首页 */
export default class ScoutFile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showContent: false,
			searchParam: null
		}
	}

	componentWillReceiveProps = (nextProps) => {
		let pp = nextProps;
	}
	componentDidMount = () => {

	}

	handleSearch = (value) => {
		this.setState({ searchParam: value });
	}
	render() {
		const { showContent } = this.state;
		return (
			<CommonLayout>
				<InvestigationSearch   handleSearch={this.handleSearch} />
				<div className="search-result-list">
					<InvestigationList searchParam={this.state.searchParam} />
				</div>
			</CommonLayout>
		)
	}
}