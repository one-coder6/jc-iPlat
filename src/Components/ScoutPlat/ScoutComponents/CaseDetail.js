import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, Tabs, Button, Modal } from 'antd';

//引入公共组件
import ContentComponent from '../../Content/Index';
//引入自定义组件
import CaseProgress from './CaseProgress';   //案件进度
import DbaseInfor from './DbaseInfor';       //案件基本信息
import RequestList from '../../Common/request/requestList';   //需求/反馈
import CaseMember from './DcaseMember';        //专案成员
import ScoutLog from './DscoutLog';           //侦查日志
import MindMap from './MindMap';              //思维导图
import Dprogress from './DprogressList'        //进度列表
import PublishInfor from './Modal/publishInfor';
import CreateRequest from './Modal/seedRequest';
import '../../../styles/scoutPlat.less';
const TabPane = Tabs.TabPane;
class CaseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createDemand: false,
            publishInfor: false,
            showTabsIndex: "1", //显示tab的索引
            caseProgressKey: "" // 跳转到需求和回复列表的key
        }
    }

    componentWillMount() {
        //console.log("session",sessionStorage.getItem("ajbh"))
        let sessionanchor = sessionStorage.getItem("notic-anchor");
        if (sessionanchor) {
            // 如果是消息点击进来
            this.setState({ showTabsIndex: "2" })
        }
    }

    componentWillUnmount() {
        // 离开了 需要clear
        sessionStorage.removeItem("notic-anchor")
    }

    // 进度图点击跳转到需求
    fromProgress = (id) => {
        /*  传递一个id跳转到需求和反馈的列表  */
        this.setState({
            showTabsIndex: "2",
            caseProgressKey: id
        })
    }
    removeCaseKey = () => {
        this.setState({ caseProgressKey: "" })
    }

    createDemand = () => {
        this.setState({ createDemand: true })
    }

    publishInfor = () => {
        this.setState({ publishInfor: true })
    }

    handleCancel = () => {
        this.setState({ createDemand: false, publishInfor: false })
    }

    render() {
        const { createDemand, publishInfor } = this.state;
        return (
            <ContentComponent>
                <div className='detailContent'>
                    <Card title="案件进度" style={{ width: '100%' }}>
                        <CaseProgress fromProgress={this.fromProgress} />
                    </Card>
                    <Tabs defaultActiveKey="1" activeKey={this.state.showTabsIndex} onChange={(e) => { this.setState({ showTabsIndex: e.toString(),caseProgressKey:'' }); }} style={{ padding: '0 20px ' }}>
                        <TabPane tab="案件基本信息" key="1">
                            <DbaseInfor />
                        </TabPane>
                        <TabPane tab="需求/反馈" key="2">
                            <div style={{ textAlign: 'right', padding: "0px 0px 10px 0px" }}>
                                <Button size='small' style={{ marginRight: '10px' }} onClick={this.createDemand}>创建需求</Button>
                                <Button size='small' style={{ marginRight: '10px' }} onClick={this.publishInfor}>发布信息</Button>
                            </div>
                            <RequestList showType='scoutPlat' caseProgressKey={this.state.caseProgressKey} showTabsIndex={this.state.showTabsIndex} removeCaseKey={this.removeCaseKey} />
                        </TabPane>
                        <TabPane tab="合成作战小组" key="3" style={{ paddingBottom: 20 }}>
                            <CaseMember />
                        </TabPane>
                        <TabPane tab="侦查日志" key="4" style={{ paddingBottom: 20 }}>
                            <ScoutLog />
                        </TabPane>
                        <TabPane tab="思维导图" key="5" style={{ paddingBottom: 20 }}>
                            <MindMap />
                        </TabPane>
                        <TabPane tab="进度列表" key="6" style={{ paddingBottom: 20 }}>
                            <Dprogress />
                        </TabPane>
                    </Tabs>
                    <Modal width='1089px' title='创建需求' visible={createDemand} onCancel={this.handleCancel} footer={null}>
                        <CreateRequest handleCancel={this.handleCancel} />
                    </Modal>
                    <Modal title='发布信息' visible={publishInfor} onCancel={this.handleCancel} footer={null}>
                        <PublishInfor handleCancel={this.handleCancel} />
                    </Modal>
                </div>
            </ContentComponent>
        )
    }
}
export default withRouter(CaseDetail)