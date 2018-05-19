import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
// 引入antd组件
import {
    Row,
    Col,
    Tag,
    Button
} from 'antd';
// 引入自定义组件    公共部分
import CommonLayout from '../../Content/Index';
import {
    httpAjax,
    addressUrl
} from '../../../Util/httpAjax';
//引入自定义组件
import Search from './SearchComponent';
import ExtractList from './ExtractList';

export default class ExtractCase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
            countGroup: ''
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
    render() {
        const {
            countGroup
        } = this.state;
        return (
            <div>
                <Search Search={this.handleSearch} />
                <ExtractList searchValue={this.state.searchValue} showType={this.props.showType} handleCancel={this.props.handleCancel}/>

                {/* <CommonLayout>
                    <Search Search={this.handleSearch} />
                    <ExtractList searchValue={this.state.searchValue} />
                </CommonLayout> */}
            </div>

        )
    }
}