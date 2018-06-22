import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Tag, Badge, Icon, Card, Tooltip } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
/* 侦查档案 - 基本信息 */
export default class BaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
    }

    render() {
        const { showContent } = this.state;
        const { baseInfos } = this.props;
        return (
            <div>
                <div>
                    <div>
                        <Card bordered={false} hoverable={false} key='1'>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 基本信息</td></tr></thead>
                                <tbody>
                                    <tr><td style={{ width: '280px' }}>案件编号：{baseInfos.ajbh || '-'}</td><td>受理接收单位：{baseInfos.sljsdwCn || '-'}</td></tr>
                                    <tr><td>案件状态：{baseInfos.bdajstateCn || '-'}  {/* <Badge status="processing" text="处理中" /> */} </td><td>主办单位：{baseInfos.zbdwCn || '-'}</td></tr>
                                    <tr><td>报警方式：{baseInfos.slJjfsCn || '-'}</td><td>作案状态：{baseInfos.zaztCn || '-'}</td></tr>
                                    <tr><td>案别：{baseInfos.abCn || '-'}</td><td>案件名称：<span title={baseInfos.ajmc}>{baseInfos.ajmc || ''}</span> </td></tr>
                                    <tr><td>作案工具：{baseInfos.zagjCn || '-'}</td><td>专案标识：{baseInfos.zabzCn || '-'}  </td></tr>
                                    <tr><td>报警时间：{baseInfos.sljjsj || '-'}</td><td>发案开始时间：{baseInfos.fasjcz || '-'} </td></tr>
                                    <tr><td>发案结束时间：{baseInfos.fasjzz || '-'} </td><td></td></tr>
                                </tbody>
                            </table>
                        </Card>
                        <Card bordered={false} hoverable={false} key='2'>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 发案地点</td></tr></thead>
                                <tbody>
                                    <tr><td style={{ width: '280px' }}>区县：{baseInfos.faddQxCn || '-'}</td><td>所属社区：{baseInfos.sssqCn || '-'}</td></tr>
                                    <tr><td colSpan="2">街道/村/路：{baseInfos.faddJdCn || '-'}</td></tr>
                                    {/*   <tr><td colSpan="2">详细地址：龙岗区某社区创业东路18号</td></tr> */}
                                    <tr><td>发现形式：{baseInfos.fxxsCn || '-'}</td><td>危害程度：{baseInfos.ajwhcdCn || '-'}</td></tr>
                                    <tr><td>补立原因：{baseInfos.blyy || '-'}</td><td>发案地域：{baseInfos.fadyCn || '-'}</td></tr>
                                    {/*  <tr><td>证据：{baseInfos.fxxsCn || '-'}</td><td>初步审查结果：{baseInfos.fxxsCn || '-'}</td></tr> */}
                                    <tr><td>保密级别：{baseInfos.securitygradeCn || '-'}</td><td>督办级别：{baseInfos.dbjbCn || '-'}</td></tr>
                                    <tr><td>犯罪主体：{baseInfos.fzztlxCn || '-'}</td><td>案情是否涉外：{baseInfos.sfswCn || '-'}</td></tr>
                                    <tr><td>案情涉及国家地区：{baseInfos.sjgjdqCn || '-'}</td><td> </td></tr>
                                </tbody>
                            </table>
                        </Card>
                        <Card bordered={false} hoverable={false} key='3'>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 主要案情</td></tr></thead>
                                <tbody>
                                    <tr><td>{baseInfos.zyaq || '暂无数据'}</td></tr>
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}