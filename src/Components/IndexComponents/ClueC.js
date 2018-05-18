import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';

import {chartStyle} from '../../Util/config';
import { httpAjax ,addressUrl } from '../../Util/httpAjax';

import '../../styles/common.less';
import '../../styles/chart.less';
var echarts = require('echarts');
export default class ClueC extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const {id,chartType}=this.props;
         const myChart = echarts.init(document.getElementById(id));
         myChart.setOption({
			title: {
		        text: this.props.title,
                textStyle:{
                    color:'#fff'
                },
                left:'10',
                top:'6',
                backgroundColor:chartStyle.backgroundColor,
                borderRadius:4,
       //          show:true,
       //          shadowColor: 'rgba(0, 0, 0, 0.5)',
    			// shadowBlur: 10,
    			// shadowOffsetX:10,
    			// shadowOffsetY:10
		    },
            tooltip:{
                //trigger: 'axis',
            } ,		    
		    legend: {
		        data: [],
		        bottom:0,
		        textStyle:{
                    color :"#fff"
                },
		    },
		    radar: {
		        name: {
		            textStyle: {
		                color: '#fff',
		                borderRadius: 3,
		           }
		        },	
		        indicator:[]	    	
		    },
		    color:chartStyle.chartColor,
		    series: []
        });
        const reqUrl=addressUrl+'/dashboard/getMonthlyPublishedInfoOfOrganization';
        httpAjax('get',reqUrl,{}).then(res=>{
            if(res.code==200){
                const optionData=res.data;
                myChart.setOption({
                    legend:{
                        data:optionData.legend
                    },
                    radar:{
                    	indicator:optionData.indicator
                    },                                       
				    series: [{
				        name: '预算 vs 开销（Budget vs spending）',
				        type: 'radar',
				        // areaStyle: {normal: {}},
				        data : optionData.series
				    }]                    
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