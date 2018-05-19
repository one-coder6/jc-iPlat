import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Table, Icon, Button, Modal ,Tooltip} from 'antd';

class RecordInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
    }

    render() {
        const { lsCasesRecordVO } = this.props;
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '记录地点',
            dataIndex: 'jldd',
            key: 'jldd',
        }, {
            title: '记录人员',
            dataIndex: 'recorder',
            key: 'recorder',
        }, {
            title: '笔录对象性别',
            dataIndex: 'targetXbCn',
            key: 'targetXbCn',
        }, {
            title: '笔录对象名称',
            dataIndex: 'targetXm',
            key: 'targetXm',
        }, {
            title: '开始时间',
            dataIndex: 'starttime',
            key: 'starttime',
        }, {
            title: '结束时间',
            dataIndex: 'endtime',
        }, {
            title: '笔录内容',
            dataIndex: 'body',
            render:(text)=>{
                return <Tooltip placement="bottom" title={text}><span>{text.toString().length > 6 ? text.toString().substring(0, 26) + '...' : text}</span></Tooltip>
            }
        }];
        return (
            <div>
                <Table columns={columns} dataSource={lsCasesRecordVO} pagination={false} rowKey='id' bordered />
            </div>
        )
    }
}

export default RecordInfor;