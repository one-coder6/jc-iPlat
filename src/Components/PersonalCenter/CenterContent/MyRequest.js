import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Tag, Modal } from 'antd';

import RushRequest from './RushRequest'
export default class MyRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rushRequest: false,
            requestRecord: ''
        }
    }

    mapDemandStatus = (status) => {
        switch (status) {
            case "INIT":
                return <Tag color="#f50">未指派</Tag>;
                break;
            case "ALLOCATED":
                return <Tag color="#2db7f5">未指已指派派</Tag>;
                break;
            case "SIGNED":
                return <Tag color="#87d068">已签收</Tag>;
                break;
            case "FEEDBACKED":
                return <Tag color="#108ee9">已反馈</Tag>;
                break;
        }
    }

    rushRequest = (record) => {
        this.setState({ rushRequest: true, requestRecord: record })
    }

    handleCancel = () => {
        this.setState({ rushRequest:false })
    }
    render() {
        const { lsPersonalMyDemand } = this.props;
        const { rushRequest, requestRecord } = this.state;
        const columns = [{
            title: '创建时间',
            dataIndex: 'lrsj',
            key: 'lrsj',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '任务描述',
            dataIndex: 'xqnr',
            key: 'xqnr',
        }, {
            title: '处理情况',
            dataIndex: 'qszt',
            key: 'qszt',
            render: (text) => {
                return this.mapDemandStatus(text)
            }
        }, {
            title: '处理人',
            dataIndex: 'zpldCn',
            key: 'zpldCn',
        }, {
            title: '处理电话',
            dataIndex: 'zplddh',
            key: 'zplddh',
        }, {
            title: '反馈情况',
            dataIndex: 'ccts',
            key: 'ccts',
            render: (text) => {
                return `超过${text}天未反馈`
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return <div>
                    <Button size='small' onClick={() => this.rushRequest(record)}>催办</Button>
                </div>
            }
        }];
        return (
            <div>
                <Table columns={columns} dataSource={lsPersonalMyDemand} pagination={false} rowKey='id' bordered />
                <Modal title='催办' visible={rushRequest} onCancel={this.handleCancel} footer={false}>
                    <RushRequest requestRecord={requestRecord} />
                </Modal>
            </div>
        )
    }
}