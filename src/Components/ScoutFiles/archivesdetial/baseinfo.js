import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Tag, Badge, Icon, Card, Tooltip } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
/* 侦查档案 - 基本信息 */
export default class BaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent: false,
            searchParam: null,
            ajbh: 'A4403035200002007010003',
            infoEnity: {}
        }
    }
    componentWillMount = () => {
        const ajbh = this.state.ajbh;
        httpAjax("get", addressUrl + '/cases/detail', { params: { ajbh: ajbh } }).then(res => {
            if (res.code == 200) {
                this.state.infoEnity = { ...res.data.casesVO };
                console.log(this.state.infoEnity)
            }
        })
    }
    componentWillReceiveProps = (nextProps) => {
        let pp = nextProps;
    }
    componentDidMount = () => {

    }

    handleSearch = (value) => {
        this.setState({ searchParam: value });
    }
    render() {
        const { showContent } = this.state;
        return (
            <div>
                <div>
                    <div>
                        <Card bordered={false} hoverable={false}>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 基本信息</td></tr></thead>
                                <tbody>
                                    <tr><td style={{ width: '280px' }}>案件编号：A4403035200002007010003</td><td>受理单位：-</td></tr>
                                    <tr><td>案件状态：{/* <Tag color="#87d068">处理中</Tag> */}  <Badge status="processing" text="处理中" /> </td><td>接处警编号：-</td></tr>
                                    <tr><td>报警方式：-</td><td>作案状态：-</td></tr>
                                    <tr><td>案别：案别属性</td><td>案件名称：曾文斌被殴打案<Tooltip placement="bottomRight" title="曾文斌被殴打案,正文内容很长a。曾文斌被殴打案,正文内容很长a。曾文斌被殴打案,正文内容很长a">
                                        <Icon type="tags" /></Tooltip></td></tr>
                                    <tr><td>专案标识：-</td><td>报警时间：2017-01-01</td></tr>
                                    <tr><td colSpan="2">发案时间：2017-01-01至2017-05-09</td><td></td></tr>
                                </tbody>
                            </table>
                        </Card>
                        <Card bordered={false} hoverable={false}>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 发案地点</td></tr></thead>
                                <tbody>
                                    <tr><td style={{ width: '280px' }}>区县：龙岗区</td><td>所属社区：某社区</td></tr>
                                    <tr><td colSpan="2">街道/村/路：创业东路18号</td></tr>
                                    <tr><td colSpan="2">详细地址：龙岗区某社区创业东路18号</td></tr>
                                    <tr><td>发现形式：群众举报</td><td>危害程度：普通</td></tr>
                                    <tr><td>补立原因：-</td><td>发案地域：-</td></tr>
                                    <tr><td>证据：-</td><td>初步审查结果：-</td></tr>
                                    <tr><td>保密级别：普通</td><td>督办级别：-</td></tr>
                                    <tr><td>犯罪主体：单位自然人</td><td>案情是否涉外：否</td></tr>
                                    <tr><td>案情涉及国家地区：中国</td><td> </td></tr>
                                </tbody>
                            </table>
                        </Card>
                        <Card bordered={false} hoverable={false}>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 主要案情</td></tr></thead>
                                <tbody>
                                    <tr><td>正文内容部分所属社区，一些长文字。正文内容部分所。哈哈哈哈哈哈哈哈哈哈哈的哈的。</td></tr>
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}