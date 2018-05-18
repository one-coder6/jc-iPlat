import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Card,Steps,Icon,Tag} from 'antd';

import { httpAjax, addressUrl } from '../../../Util/httpAjax';
//引入redux
//import { getTimeNode } from '../../store/actions/index.js';
import { getTimeNode } from '../../../store/actions/index';
const Step = Steps.Step;
class CaseProgress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stepsSource: []
        }
    }
    componentWillMount() {
        const ajbh = sessionStorage.getItem("ajbh");
        const reqUrl = addressUrl + `/timeNode/list?ajbh=${ajbh}`;
        let { dispatch, timeNode } = this.props;        
        httpAjax("get", reqUrl, ).then(res => {
            if (res.code === '200') {
                dispatch(getTimeNode({
                    timeNode: res.data,
                }))
                this.setState({ stepsSource: res.data })
            }
        })
    }
    render() {
        const { stepsSource } = this.state;
        return (                
                <Card className='progressContent'>
                {
                    stepsSource&&stepsSource.length>=1?
                
                <Steps className='pItem' style={{ width: '800px', height: '160px' }}>
                    {stepsSource && stepsSource.map((item, index) => {
                        if (index % 2 == 1) {
                            return <Step
                                status="finish"
                                title={
                                    <div className='stepTitle stepTitles'>
                                        <div className='caesDescrition'>标题：{item.title}</div>
                                        <div className='caesDescrition'>发送单位：{item.sendOrgName}</div>
                                        <div className='caesDescrition'>接收单位：{item.receiveOrgName}</div>
                                        <div className='caesDescrition'>说明：{item.content}</div>
                                        <Tag color="red">{item && item.lrsj}</Tag>
                                    </div>
                                }
                                icon={<Icon type="right-circle-o" />} key={index}>
                            </Step>
                        } else {
                            return <Step
                                status="finish"
                                title={
                                    <div className='stepTitle stepTitles'>
                                        <Tag color="green">{item && item.lrsj}</Tag>
                                        <div className='caesDescrition'>标题：{item.title}</div>
                                        <div className='caesDescrition'>发送单位：{item.sendOrgName}</div>
                                        <div className='caesDescrition'>接收单位：{item.receiveOrgName}</div>
                                        <div className='caesDescrition'>说明：{item.content}</div>
                                    </div>
                                }
                                icon={<Icon type="right-circle-o" />} key={index}>
                            </Step>
                        }
                    })
                    }
                </Steps>:null
                }
            </Card>
        )
    }
}
function mapStateToProps(state) {
    return {
        timeNode: state.timeNode
    }
}
export default connect(mapStateToProps)(CaseProgress);