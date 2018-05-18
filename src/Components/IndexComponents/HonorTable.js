import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';

import { httpAjax  , addressUrl }from '../../Util/httpAjax';

import '../../styles/index.less';
export default class HonorTable extends React.Component{
	constructor(props){
		super(props);
		this.state={
			dataSource:[],
			loading:false					
		}
	}
	componentWillMount(){
        const reqUrl=addressUrl+'/dashboard/getHonorCanvas';
        this.setState({loading:true})
        httpAjax('get',reqUrl,{}).then(res=>{
            if(res.code==200){
                this.setState({dataSource:res.data,loading:false})
            }
        }) 		
	}
	render(){	
		const {loading,dataSource}=this.state;
		const columns = [{
		  title: '单位',
		  dataIndex: 'organizationName',
		  key: 'organizationName',
		  width:80
		}, {
		  title: '收到任务数',
		  dataIndex: 'totalAcceptedDemand',
		},{
		  title: '签收任务数',
		  dataIndex: 'totalSignedDemand',
		},{
		  title: '反馈数',
		  dataIndex: 'totalFeedBack',
		},{
		  title: '一天内反馈',
		  dataIndex: 'countOfFeedBackInOneDay',
		},{
		  title: '三天内反馈',
		  dataIndex: 'countOfFeedBackIn3Day',
		},{
		  title: '超过30天反馈',
		  dataIndex: 'countOfFeedBackIn30DayExceeded',
		},{
		  title: '反馈质量',
		  children:[
		  	{
		  		title:'优',
		  		dataIndex:'feedBackQuality',
		  		width:50,
		  		//key:"countOfFeedBackIn30DayExceeded",
		  		render:(text,record,index)=>{
		  			return text.excellent
		  		}
		  	},{
		  		title:'良',
		  		dataIndex:'feedBackQuality',
		  		//key:'countOfFeedBackIn3Day',
		  		render:(text,record,index)=>{
		  			return text.well
		  		}
		  	},{
		  		title:'好',
		  		dataIndex:'feedBackQuality',
		  		//key:'countOfFeedBackInOneDay',
		  		render:(text,record,index)=>{
		  			return text.good
		  		}
		  	},{
		  		title:'一般',
		  		dataIndex:'feedBackQuality',
		  		//key:'totalFeedBack',
		  		render:(text,record,index)=>{
		  			return text.generic
		  		}
		  	},{
		  		title:'差',
		  		dataIndex:'feedBackQuality',
		  		render:(text,record,index)=>{
		  			return text.inferior	
		  		}
		  	},
		  ]
		},{
		  title: '综合排名',
		  dataIndex: 'compositiveRank',
		}

		]; 

		return (
				<Table dataSource={dataSource} columns={columns} pagination={false} rowKey='organizationId'  loading={loading} className='honorTable' />
		)
	}
}