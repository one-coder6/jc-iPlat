import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Tag, Badge, Icon, Tooltip } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
/* 侦查档案 - 物品 */
export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent: false,
            searchParam: null,
            ajbh: 'A4403035200002007010003',
            infoEnity: {}
        }
    }
    componentWillMount = () => {
        const ajbh = this.state.ajbh;
        httpAjax("get", addressUrl + '/cases/detail', { params: { ajbh: ajbh } }).then(res => {
            if (res.code == 200) {
                this.state.infoEnity = { ...res.data.casesVO };
                console.log(this.state.infoEnity)
            }
        })
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
        const columns_za = [{
            title: '物品名称',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '物品规格',
            dataIndex: 'money',
        }, {
            title: '数量',
            dataIndex: 'address',
        }, {
            title: '图片',
            dataIndex: 'address',
        }];

        const data_za = [{
            key: '1',
            name: '锤子',
            money: '20cm*5cm',
            address: '1把',
            address: '图片1',
        }, {
            key: '2',
            name: '水果刀',
            money: '10cm*3cm',
            address: '1把',
            address: '图片2',
        }];
        const columns_ys = [{
            title: '物品名称',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '品牌',
            dataIndex: 'money',
        }, {
            title: '数量',
            dataIndex: 'address',
        }, {
            title: '图片',
            dataIndex: 'address',
        }];

        const data_ys = [{
            key: '1',
            name: '手表',
            money: '劳力士',
            address: '1块',
            address: '图片3',
        }, {
            key: '2',
            name: '手提包',
            money: 'LV',
            address: '1个',
            address: '无',
        }];
        return (
            <div>
                <div>
                    <Table
                        columns={columns_za}
                        dataSource={data_za}
                        bordered
                        pagination={false}
                        title={() => "作案工具"}
                    />
                    <br/>
                    <Table
                        columns={columns_ys}
                        dataSource={data_ys}
                        pagination={false}
                        bordered
                        title={() => "遗失物品"}
                    />
                </div>
            </div>
        )
    }
}