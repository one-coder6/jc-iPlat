import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';

// 引入自定义组件    公共部分
import CommonLayout from '../Content/Index';
//引入自定义组件
import Search from './FightComponents/SearchComponent';
import FightList from './FightComponents/FightList';
import { httpAjax , addressUrl } from '../../Util/httpAjax';
export default class FightPlat extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      searchValue:null,
      countGroup:''
    }
  }
	handleSearch= (value)=>{
	    this.setState({searchValue:value});
	}
	render(){
		return (
				<div>
					<CommonLayout>
						<Search Search={this.handleSearch}/>
						<FightList searchValue={this.state.searchValue}/>
					</CommonLayout>
				</div>
		)
	}
}

