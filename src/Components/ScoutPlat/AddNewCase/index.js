import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
// 引入antd组件
import { Row, Col, Tag, Button } from 'antd';
// 引入自定义组件    公共部分
import CommonLayout from '../../Content/Index';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
//引入自定义组件
import Search from './search.js';
/* import ExtractList from './ExtractList'; */
export default class ExtractCase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
    }

    render() {
        const { countGroup } = this.state;
        return (
            <div>
                <Search handelInsertCase={this.props.handelInsertCase} />
            </div>

        )
    }
}