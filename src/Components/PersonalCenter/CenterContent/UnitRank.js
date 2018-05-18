import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button ,Rate } from 'antd';
export default class UnitRank extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { lsPersonalMonthFeedBacked } = this.props;
        const columns = [{
            title: '单位',
            dataIndex: 'qqsj',
            key: 'qqsj',
        }, {
            title: '姓名',
            dataIndex: 'xqnr',
            key: 'xqnr',
        }, {
            title: '主办案件',
            dataIndex: 'ccts',
            key:'id',
        }, {
            title: '创建需求',
            dataIndex: 'ccts',
            key: 'ccts',
        }, {
            title: '发布信息',
            dataIndex: 'qqdwmc',
            key: 'qqdwmc',
        }, {
            title: '反馈线索',
            dataIndex: 'qqdwmc',
            key: 'qqdwmc',
        }, {
            title: '排名',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return <Rate  disabled defaultValue={2} />
            }
        }];
        return (
            <Table columns={columns} dataSource={lsPersonalMonthFeedBacked} pagination={false} rowKey='id' bordered />
        )
    }
}