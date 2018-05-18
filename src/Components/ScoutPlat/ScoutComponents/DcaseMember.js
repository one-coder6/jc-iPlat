import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon, Button, Modal } from 'antd';

//引入自定义组件
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import FeedfackClue from './Modal/feedbackClue';
import SeedMessage from './Modal/seedMessage';
export default class CaseMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            feedBackM: false,
            seedMessageM: false
        }
    }
    componentWillMount() {
        const ajbh = 'A4403035200002007010003' // sessionStorage.getItem("ajbh");
        const reqUrl = addressUrl + `/cases/memberGroup?ajbh=${ajbh}`
        httpAjax("get", reqUrl, ).then(res => {
            if (res.code === '200') {
                this.setState({ dataSource: res.data })
            }
        })
    }
    //反馈线索
    feedBackClue = () => {
        this.setState({ feedBackM: true })
    }
    // 留言
    seedMessage = () => {
        this.setState({ seedMessageM: true })
    }
    handleCancle = () => {
        this.setState({ feedBackM: false, seedMessageM: false })
    }

    render() {
        const { dataSource, feedBackM, seedMessageM } = this.state;
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '警 号',
            dataIndex: 'account',
            key: 'account',
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '角色',
            dataIndex: 'roleName',
            key: 'roleName',
        }, {
            title: '单位',
            dataIndex: 'deptName',
            key: 'deptName',
        }, {
            title: '积分',
            dataIndex: 'score',
            key: 'score',
        },
        //  {
        //     title: '操作',
        //     dataIndex: 'address',
        //     render: (text, record, index) => {
        //         return <div>
        //             <Button size='small' style={{ marginRight: '20px' }} onClick={() => this.feedBackClue(record)}>反馈</Button>
        //             <Button size='small' onClick={() => this.seedMessage(record)}>留言</Button>
        //         </div>
        //     }
        // }
    ];
        return (
            <div>
                <Table columns={columns} dataSource={dataSource} pagination={false} bordered rowKey="account" />
                {/* 反馈弹框 */}
                <Modal title='回填线索' visible={feedBackM} onCancel={this.handleCancle} >
                    <FeedfackClue />
                </Modal>
                {/* 留言 */}
                <Modal title='留言' visible={seedMessageM} onCancel={this.handleCancle} >
                    <SeedMessage />
                </Modal>
            </div>
        )
    }
}