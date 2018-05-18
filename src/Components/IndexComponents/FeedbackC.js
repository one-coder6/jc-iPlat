import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';

import {chartStyle} from '../../Util/config';
import { httpAjax , addressUrl } from '../../Util/httpAjax';

import '../../styles/common.less';
import '../../styles/chart.less';
var echarts = require('echarts');
export default class FeedbackC extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const {id}=this.props;
         const myChart = echarts.init(document.getElementById(id));
         myChart.setOption({
            title:{
                text:this.props.title,
                textStyle:{
                    color:'#fff'
                },
                left:'10',
                top:'6',
                backgroundColor:chartStyle.backgroundColor,
                borderRadius:4,
            },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
            legend: {
		        bottom: '0',
                textStyle:{
                    color :"#fff"
                },
            },
		    series : [],
            color:chartStyle.chartColor
        });
        const reqUrl=addressUrl+'/dashboard/getMonthlyFeedBackOfOrganization';
        httpAjax('get',reqUrl,{}).then(res=>{
            if(res.code==200){
                const optionData=res.data;
                // optionData.series&&optionData.series.map(item=>{
                //     item.type ='bar'
                // })
                myChart.setOption({
                    legend:{
                        data:optionData.legend
                    },
				    series : [
				        {
				            name: '访问来源',
				            type: 'pie',
				            radius : '55%',
				            //center: ['50%', '60%'],
				            data:optionData.series,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ],
                });
            }
        })          		
	}        		
	render(){
		const {id,title}=this.props;
		return (
			<div className='chartContent'>
				<span className='borderImage'></span>
				<span className='borderImage'></span>
				<span className='borderImage'></span>
				<span className='borderImage'></span>
				{/*<div className='titleName'>
					<span className='borderImage'></span>
					<span className='borderImage'></span>
					<span className='borderImage'></span>
					<span className='borderImage'></span>				
					<span>{title}</span>
				</div>*/}
				<div id={id} style={{height:'300px'}} >
				
				</div>
			</div>
		)
	}
}