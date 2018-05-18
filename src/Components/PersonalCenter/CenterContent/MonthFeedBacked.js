import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button ,Rate } from 'antd';
export default class MonthFeedBacked extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { lsPersonalMonthFeedBacked } = this.props;
        const columns = [{
            title: '创建时间',
            dataIndex: 'qqsj',
            key: 'qqsj',
        }, {
            title: '任务描述',
            dataIndex: 'xqnr',
            key: 'xqnr',
        }, {
            title: '反馈情况',
            dataIndex: 'ccts',
            key:'id',
            render: (text) => {
                return `超过${text}天未反馈`
            }
        }, {
            title: '点评',
            dataIndex: 'pfnr',
            key: 'pfnr',

        }, {
            title: '评价',
            dataIndex: 'pffzCn',
            key: 'pffzCn',
        }, {
            title: '星级评价',
            dataIndex: 'pffz',
            render: (text, record, index) => {
                return <Rate  disabled defaultValue={text} />
            }
        }];
        return (
            <Table columns={columns} dataSource={lsPersonalMonthFeedBacked} pagination={false} rowKey='id' bordered />
        )
    }
}