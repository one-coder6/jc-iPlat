import React from 'react';
import ReactDOM from 'react-dom';
import {
	Row,
	Col,
	List
} from 'antd';

//引入自定义组件
import BaseInfor from './baseInfor'

import '../../../styles/scoutFile.less';

export default class FileContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			catalogList: [
				'案件基本信息',
				'需求列表信息',
				'线索列表信息',
				'案件思维导图',
				'案件综合轨迹',
				'人员轨迹信息',
				'车辆轨迹信息',
				'通信轨迹信息',
			],
			contentData: '案件基本信息'
		}
	}

	//获取案件数据
	getCaseData = (item, index) => {
		this.setState({
			contentData: item
		})
	}

	render() {
		const {
			catalogList,
			contentData
		} = this.state;
		return (
			<Row>
					<Col span={2}></Col>
      				<Col span={20}>
      					<div className='fileContent'>
      						<Row>
      							
      							<Col span={11}>
								    <List
								      size="small"
								      header={<h2 style = {{textAlign:'center'}}>目  录</h2>}
									  footer={<div></div>}
								      dataSource={ catalogList }
								      renderItem={
								      	(item,index) => (
								      		<List.Item style = {{ cursor: "pointer" }} onClick = { ()=>this.getCaseData(item,index) }>
								      			{index+1}   {item}  ----------- {index+1}  
								      		</List.Item>
								      	)
								      }
								    /> 
      							</Col>
      							<Col span={2}></Col>
      							<Col span={11}>
      								<BaseInfor />
      								{contentData}
      							</Col>
      						</Row>
      					</div>
      				</Col>
      				<Col span={2}></Col>
      				{/* <BaseInfor /> */}
				</Row>
		)
	}
}