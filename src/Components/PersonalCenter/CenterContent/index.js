import React from 'react';
import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import { Row, Col, Card, Avatar, Tag } from 'antd';

import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import MyRequest from './MyRequest';  //我的请求
import WaitDone from './WaitDone';    //待办事项
//import TeamFight from './TeamFight'   //合成作战
import MonthFeedBacked from './MonthFeedBacked' //需求反馈情况
import UnitRank from './UnitRank'; //本单位排名
import '../../../styles/personalCenter.less';
export default class CenterContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfor: ''
        }
    }
    componentWillMount() {
        const reqUrl = addressUrl + "/personal/detail";
        httpAjax("get", reqUrl, ).then(res => {
            if (res.code === '200') {
                this.setState({ userInfor: res.data })
            }
        })
    }
    render() {
        const baseInfo = this.state.userInfor && this.state.userInfor.user;
        const lsPersonalMyDemand = this.state.userInfor && this.state.userInfor.lsPersonalMyDemand;
        const lsPersonalHandleDemand = this.state.userInfor && this.state.userInfor.lsPersonalHandleDemand;
        const lsPersonalMonthFeedBacked = this.state.userInfor && this.state.userInfor.lsPersonalMonthFeedBacked
        const personalRankVO = this.state.userInfor && this.state.userInfor.personalRankVO;
        return (
            <div className='personalCenter'>
                <Card style={{ width: '100%' }}>
                    <Row gutter={16}>
                        <Col xl={2} lg={4} md={4} sm={24} xs={24}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" className='avatar' />
                            <p style={{ marginTop: '20px', textAlign: 'center' }}>{baseInfo.name}</p>
                        </Col>
                        <Col xl={6} lg={8} md={8} sm={24} xs={24}>
                            <Card style={{ width: '100%' }} bordered={false}>
                                <p>姓名：{baseInfo.name}</p>
                                <p>警号： {baseInfo.account}</p>
                                <p>单位：{baseInfo.department && baseInfo.department.fullname}</p>
                                <p>积分：{baseInfo.avalible}</p>
                            </Card>
                        </Col>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24} style={{ marginTop: '3%' }}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Tag color="gray">主办案件</Tag>  {personalRankVO.mainHandleCount}宗
                                </Col>
                                <Col span={6}>
                                    <Tag color="gray">创建需求</Tag>  {personalRankVO.createDemandCount}条
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: '10px' }}>
                                <Col span={6}>
                                    <Tag color="gray">单位排名</Tag>  第{personalRankVO.deptBureauRank}名
                                </Col>
                                <Col span={6}>
                                    <Tag color="gray">分局排名</Tag>  第{personalRankVO.branchBureauRank}名
                                </Col>
                                <Col span={6}>
                                    <Tag color="gray">市局排名</Tag>  第{personalRankVO.cityBureauRank}名
                                </Col>
                                <Col span={6}></Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Card title="我的请求"  >
                    <MyRequest lsPersonalMyDemand={lsPersonalMyDemand} />
                </Card>
                <Card title="待办任务"  >
                    <WaitDone lsPersonalHandleDemand={lsPersonalHandleDemand} />
                </Card>
                {/* <Card title="本月合成作战案件情况" >
                    <TeamFight />
                </Card> */}
                <Card title="本月需求反馈情况" >
                    <MonthFeedBacked lsPersonalMonthFeedBacked={lsPersonalMonthFeedBacked} />
                </Card>
                {/* <Card title="本单位积分排名情况" >
                    <UnitRank personalRankVO = { personalRankVO }/>
                </Card> */}
            </div>
        )
    }
}