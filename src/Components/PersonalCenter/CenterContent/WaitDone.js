import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'antd';
export default class WaitDone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    mapDemandStatus = (status) => {
        switch (status) {
            case "INIT":
                return '未指派';
                break;
            case "ALLOCATED":
                return '已指派';
                break;
            case "SIGNED":
                return '已签收';
                break;
            case "FEEDBACKED":
                return '已反馈';
                break;
        }
    }
    render() {
        const { lsPersonalHandleDemand } = this.props;
        const columns = [{
            title: '创建时间',
            dataIndex: 'lrsj',
            key: 'lrsj',
        }, {
            title: '任务描述',
            dataIndex: 'xqnr',
            key: 'xqnr',
        }, {
            title: '紧急程度',
            dataIndex: 'jjcdCn',
            key: 'jjcdCn',
        }, {
            title: '创建人',
            dataIndex: 'lrrymc',
            key: 'lrrymc',
        }, {
            title: '创建单位',
            dataIndex: 'qqdw',
            key: 'qqdw',
        }, {
            title: '反馈情况',
            dataIndex: 'ccts',
            key:'id',
            render: (text) => {
                return `超过${text}天未反馈`
            }
        }, {
            title: '催办次数',
            dataIndex: 'ccts',
            key: 'ccts',
            render: (text) => {
                return  "无" //`超过${text}天未反馈`
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return <div>
                    <Button>反馈</Button>
                </div>
            }
        }];
        return (
            <Table columns={columns} dataSource={lsPersonalHandleDemand} pagination={false} rowKey='id' bordered />
        )
    }
}