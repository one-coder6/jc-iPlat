import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';

import { chartStyle } from '../../Util/config';
import { httpAjax , addressUrl } from '../../Util/httpAjax';

import '../../styles/common.less';
import '../../styles/chart.less';
var echarts = require('echarts');
export default class DemandC extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const {id,chartType}=this.props;
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
            tooltip:{
                trigger: 'axis',
            } ,
            legend: {
                top: 30,
                align: 'left',
                left: 10,
                data:[],
                type:'plain',
                textStyle:{
                    color :"#fff"
                },
                // itemWidth:30,
                // itemGap :8
            },
		    xAxis: {
		        type: 'category',
		        data:[],
                axisLine:{
                    lineStyle:{
                        color:'#fff',
                    }
                }                
		    },
		    yAxis: {
		        type: 'value'
		    },
            series:[],
            color:chartStyle.chartColor
        });
        const reqUrl=addressUrl+'/dashboard/getMonthlyDemandOfOrganization';
        httpAjax('get',reqUrl,{}).then(res=>{
            if(res.code==200){
                const optionData=res.data;
                optionData.series&&optionData.series.map(item=>{
                    item.type ='bar'
                })
                myChart.setOption({
                    legend:{
                        data:optionData.legend
                    },
                    xAxis: {
                        data: optionData.xAxis,
                    },
                    series:optionData.series
                });
            }
        })          		
	}
	handleResize(){
		// const myChart = echarts.init(document.getElementById('main'));
  //       window.onresize(function(){
  //           myChart.resize();    
  //        });		
	}
	render(){
		const {id,chartHeight}=this.props;
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
				<div id={id} style={{height:chartHeight}} >
				
				</div>
			</div>
		)
	}
}