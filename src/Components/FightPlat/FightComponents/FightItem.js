import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Link,
    withRouter
} from 'react-router-dom';
import {
    Row,
    Col,
    Badge,
    Tag,
    Modal,
    Button,
    Divider,
    Icon
} from 'antd';

import '../../../styles/fightPlat.less';
//引入自定义组件
import ReplyClue from '../../Common/request/requestList';
import FeedfackClue from '../../Common/feedbackClue';
import DesignateMember from './DesignateM';
import SignRequest from './SignRequset';
class FightItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replyClue: false,
            feedbakClue: false,
            designateMember: false,
            signRequest: false,
            requestRecord: ''
        }
    }
    //回复线索
    replyClue = (record) => {
        this.setState({
            replyClue: !this.state.replyClue,
            requestRecord: record
        })
        //sessionStorage.setItem("ajbh",record.ajbh)
    }

    handleCancel = () => {
        this.setState({
            replyClue: false,
            feedbakClue: false,
            designateMember: false,
            signRequest: false,
        })
    }

    //反馈线索
    feedbakClue = (record) => {
        this.setState({
            feedbakClue: true,
            requestRecord: record
        })
    }

    //指派
    designateMember = (record) => {
        this.setState({
            designateMember: true,
            requestRecord: record
        })
    }

    //签收
    signRequest = (record) => {
        this.setState({ signRequest: true, requestRecord: record })
    }

    render() {
        const { replyClue, feedbakClue, designateMember, signRequest, requestRecord } = this.state;
        const { record } = this.props;

        return (
            <div className='caseItem'>
                <Row gutter={16} >
                    <Col span={22}>
                        <Row style={{ marginTop: '10px' }}>
                            <Col xl={2} lg={2} md={2} sm={4} xs={4}>
                                【<span style={{ color: 'red' }}>需求</span>】
							</Col>
                            <Col xl={6} lg={6} md={6} sm={10} xs={10}>
                                <span style={{ color: '#108ee9', margin: '0 10px' }}>{record.xqmc}</span>
                            </Col>
                            {
                                record.operationStatus === 'INIT' ? <Col xl={1} lg={1} md={1} sm={2} xs={2}>
                                    <Tag className='tagTitle' onClick={() => this.designateMember(record)}>指派</Tag>
                                </Col> : null
                            }
                            {
                                record.operationStatus === 'ALLOCATED' ? <Col xl={1} lg={1} md={1} sm={2} xs={2}>
                                    <Tag className='tagTitle' onClick={() => this.signRequest(record)}>签收</Tag>
                                </Col> : null
                            }
                            {
                                record.operationStatus === 'FEEDBACKED' ?
                                    <Col xl={1} lg={1} md={1} sm={2} xs={2}>
                                        <Tag className='tagTitle' onClick={() => this.feedbakClue(record)}>反馈</Tag>
                                    </Col> : null
                            }
                        </Row>
                    </Col>
                </Row>
                <Row style={{ margin: '10px 0 0' }} gutter={16}>
                    <Col xl={17} lg={17} md={17} sm={24} xs={24} style={{ textIndent: '2em' }}>
                        <span >
                            {record.xqnr}
                        </span>
                    </Col>
                    <Col xl={7} lg={7} md={7} sm={24} xs={24}>
                        <p>{record.lrrymc}，{record.qqdw}，{record.qqsj}</p>
                        <div>
                            <Tag color="red">已超过10天未反馈</Tag> |  &nbsp;&nbsp;
							<Button type='primary' size='small' onClick={() => this.replyClue(record)}>
                                回复线索：{record.clueCount}条{replyClue ?<Icon type="up" /> :<Icon type="down" />}
                            </Button>
                        </div>
                    </Col>
                </Row>
                {replyClue ? <ReplyClue record={record} showType='fightPlat' /> : null}
                <Divider dashed />
                {/* 上传线索 */}
                <Modal title='上传线索'
                    visible={feedbakClue}
                    onCancel={this.handleCancel}
                    className='requestModal'
                    footer={false}
                >
                    <FeedfackClue requestRecord={requestRecord} handleCancel={this.handleCancel} getDataSource={this.props.getDataSource} />
                </Modal>
                {/*   指派 */}
                <Modal title='指定融合作战人员'
                    visible={designateMember}
                    footer={false}
                    onCancel={this.handleCancel}
                    className='requestModal'>
                    <DesignateMember requestRecord={requestRecord} handleCancel={this.handleCancel} getDataSource={this.props.getDataSource} />
                </Modal>
                {/* 签收需求 */}
                <Modal title='签收' visible={signRequest} onCancel={this.handleCancel} footer={false} >
                    <SignRequest requestRecord={requestRecord} handleCancel={this.handleCancel} getDataSource={this.props.getDataSource} />
                </Modal>
            </div>
        )
    }
}

export default withRouter(FightItem)