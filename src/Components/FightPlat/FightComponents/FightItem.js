import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, withRouter } from 'react-router-dom';
import { Row, Col, Badge, Tag, Modal, Button, Divider, Icon } from 'antd';
import '../../../styles/fightPlat.less';
//引入自定义组件
import ReplyClue from '../../Common/request/requestList';
import FeedfackClue from '../../Common/feedbackClue';
import DesignateMember from './DesignateM';
import SignRequest from './SignRequset';
import ApplyDelay from './ApplyDelay';

class FightItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replyClue: false,
            feedbakClue: false,
            designateMember: false,
            signRequest: false,
            applyDelayView: false,// 申请延期
            requestRecord: '',
            Attachment: [
                { filename: "需求文档1.doc", url: '' },
                { filename: "需求文档2.doc", url: '' },
                { filename: "需求文档3.doc", url: '' }]
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
            applyDelayView: false,
        })
    }

    //反馈线索
    feedbakClue = (record) => {
        this.setState({ feedbakClue: true, requestRecord: record })
    }

    //指派
    designateMember = (record) => {
        this.setState({ designateMember: true,  requestRecord: record  })
    }

    //签收
    signRequest = (record) => {
        this.setState({ signRequest: true, requestRecord: record })
    }
    // 申请延期
    applyDelay=(record)=>{
        this.setState({ applyDelayView: true, requestRecord: record })
    }
    render() {
        const { replyClue, feedbakClue, designateMember, signRequest, requestRecord, lsAttachment,applyDelayView } = this.state;
        const { record } = this.props;
        const list = (<div>
            {lsAttachment && lsAttachment.map((item, i) => {
                return <a href="#">{item.filename}</a>
            })}
        </div>)
        return (
            <div className='caseItem'>
                <Row gutter={16} style={{marginTop:20}}>
                    <Col span={18}>
                        <Row>
                            <Col xl={8} lg={8} md={8} sm={14} xs={14}>
                                【<span style={{ color: 'red' }}>需求{record.qsztCn?'（'+record.qsztCn+'）':''}</span>】<Link to={{ pathname: '/caseDetail', query: { ajbh: record.ajbh } }} onClick={() => sessionStorage.setItem("ajbh", record.ajbh)}>{record.xqmc}</Link>
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
                            {
                                record.operationStatus === 'DELAY' ?
                                    <Col xl={1} lg={1} md={1} sm={2} xs={2}>
                                        <Tag className='tagTitle' onClick={() => this.applyDelay(record)}>申请延期</Tag>
                                    </Col> : null
                            }
                        </Row>
                    </Col>
                    <Col span={6} style={{textAlign:'right'}}>
                    {record.lsDemandFlowHisVO&&record.lsDemandFlowHisVO.map((item)=>{
                        return  <Tag style={{borderRadius:0}}  color="purple">{ item.qsztCn+'：'+item.jsrymc  }</Tag> 
                         })
                    }
                   {/*   已退回：王五 已反馈：赵柳 */}
                    </Col>
                </Row>
                <Row style={{ margin: '10px 0' }} gutter={16}>
                    <Col xl={17} lg={17} md={17} sm={24} xs={24} style={{ textIndent: '2em' }}>
                        <span >  {record.xqnr}  </span>
                    </Col>
                    <Col xl={17} lg={17} md={17} sm={24} xs={24} style={{ marginTop: 38 }}>
                      {record.smbz ? <span  style={{ marginLeft: '2em' }}>说明：{record.smbz}</span> : ''}
                    </Col>
                    <Col xl={17} lg={17} md={17} sm={24} xs={24} >
                        {record.lsAttachment ? <span style={{ marginLeft: '2em' }}>附件：</span> : ''}
                        {record.lsAttachment && record.lsAttachment.map((item) => {
                            return <a title='点击下载' href={'/attachment/download?id=' + item.fileId}><Icon type="paper-clip" />{item.fileName}　</a>
                        })}
                    </Col>
                    <Col xl={7} lg={7} md={7} sm={24} xs={24} >
                        <p style={{ textAlign:'right'} }>{record.lrrymc}，{record.qqdw}，{record.qqsj}</p>
                        <div>
                        <Button style={{float:'right',marginBottom:5}} type='primary' size='small' onClick={() => this.replyClue(record)}>
                                回复线索：{record.clueCount}条{replyClue ? <Icon type="up" /> : <Icon type="down" />}
                        </Button>
                          {/* operationStatusTip */}
                       { record.ccts ? <Tag style={{float:'right',marginBottom:5}} color="red">已超过{record.ccts}天未反馈</Tag> :''}
                       { record.operationStatusTip ? <Tag style={{float:'right'}} color="red"> {record.operationStatusTip}</Tag> :''}
                        </div>
                    </Col>
                </Row>
                {replyClue ? <ReplyClue record={record} showType='fightPlat' /> : null}
                <Divider dashed />
                {/* 上传线索 */}
                <Modal title='反馈线索'
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
                     {/* 申请延期 */}
                     <Modal title='申请延期' visible={applyDelayView} onCancel={this.handleCancel} footer={false} >
                    <ApplyDelay requestRecord={requestRecord} handleCancel={this.handleCancel}   />
                </Modal>
            </div>
        )
    }
}

export default withRouter(FightItem)