import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Icon, Modal } from 'antd';

import { httpAjax, addressUrl } from '../../Util/httpAjax';

import IntelligenceC from './IntelligenceC';
import ClueC from './ClueC';
import DemandC from './DemandC';
import FeedbackC from './FeedbackC'
import CaseItem from './CaseItem';
import HonorTable from './HonorTable';
import Gtasks from './Gtasks';
import logo from '../../images/logo.png';
import cases from '../../images/case2.png';
import '../../styles/index.less';
import '../../styles/common.less';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseData: '',
            WillBeDone: [],
            chartHeight: '280px',
            feedbackC: false
        }
    }
    componentWillMount() {
        //基础数据
        const reqUrl = addressUrl + '/dashboard/organizationDailyCaseSolveSurvey';
        httpAjax('get', reqUrl, {}).then(res => {
            if (res.code == 200) {
                this.setState({ caseData: res.data })
            }
        })
        //代办事项
        const willUrl = addressUrl + '/dashboard/getThingsWillBeDone';
        httpAjax('get', willUrl, {}).then(res => {
            if (res.code == 200) {
                this.setState({ WillBeDone: res.data })
            }
        })
    }

    //反馈线索
    feedbackC = () => {
        this.setState({ feedbackC: true })
    }
    handleCancel = () => {
        this.setState({ feedbackC: false })
    }

    render() {
        const { handleShow } = this.props;
        const { caseData, WillBeDone, chartHeight, feedbackC } = this.state;
        return (
            <div className='IndexContent'>
                <Button shape="circle" icon="shrink" onClick={handleShow} className='close_button' />
                <Row gutter={16}>
                    <Col span={6}>
                        <IntelligenceC id='intelligence' title='案件情报' chartHeight={chartHeight} />
                        <ClueC id='clue' title='线索反馈' />
                    </Col>
                    <Col span={12} style={{ textAlign: 'center' }} className='caseDetail' >
                        <div className='logo' >
                            <Row>
                                <Col span={4}>
                                    <h1 style={{ color: '#fff' }}>每日侦察</h1>
                                </Col>
                                <Col span={18}>
                                    <img src={logo} alt="" />
                                </Col>
                            </Row>
                        </div>
                        <div className='caseCount'>
                            <img src={cases} alt="" />
                            <span>{caseData.totalCase}宗案件</span>
                        </div>
                        <Row type="flex" justify="space-around" gutter={16} style={{ marginTop: '-20px' }}>
                            {
                                caseData.records && caseData.records.map((item, index) => {
                                    return <Col span={4} key={index}>
                                        <CaseItem item={item} />
                                    </Col>
                                })
                            }
                            {/* <Button onClick={this.feedbackC}>反馈</Button> */}
                        </Row>
                    </Col>
                    <Col span={6}>
                        <DemandC id='demand' title='需求情况' chartHeight={chartHeight} />
                        <FeedbackC id='feedback' title='信息发布' />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={18} >
                        <div className='chartContent' style={{ height: '300px' }}>
                            <span className='borderImage'></span>
                            <span className='borderImage'></span>
                            <span className='borderImage'></span>
                            <span className='borderImage'></span>
                            <div className='titleName'>
                                <span className='borderImage'></span>
                                <span className='borderImage'></span>
                                <span className='borderImage'></span>
                                <span className='borderImage'></span>
                                <span>2018联合作战荣誉墙</span>
                            </div>
                            <HonorTable />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='chartContent' style={{ paddingBottom: '10px' }}>
                            <span className='borderImage'></span>
                            <span className='borderImage'></span>
                            <span className='borderImage'></span>
                            <span className='borderImage'></span>
                            <div className='titleName'>
                                <span className='borderImage'></span>
                                <span className='borderImage'></span>
                                <span className='borderImage'></span>
                                <span className='borderImage'></span>
                                <span>待办事项</span>
                            </div>
                            <Gtasks WillBeDone={WillBeDone} />
                        </div>
                    </Col>
                </Row>
                {/* <Modal title='反馈线索' visible={feedbackC} onCancel={this.handleCancel}>
                    反馈线索
                </Modal> */}
            </div>
        )
    }
}