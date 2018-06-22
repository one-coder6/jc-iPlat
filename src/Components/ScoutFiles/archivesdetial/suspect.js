import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Tag, Badge, Icon, Card, Tooltip, Divider } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const Panel = Collapse.Panel;
/* 侦查档案 - 嫌疑人信息 */
export default class Suspect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseSufferer: [],
            caseSuspects: [],
        }
    }
    componentWillMount() {
        // 获取勘查信息和案件基本信息
        let ajbh_dang = sessionStorage.getItem("ajbh_dang") || '-';
        // 受害人和报案人
        httpAjax("get", addressUrl + '/archives/caseSufferer', { params: { ajbh: ajbh_dang } }).then(res => {
            if (res.code == 200) {
                this.setState({ caseSufferer: res.data });
            }
        })
        // 嫌疑人
        httpAjax("get", addressUrl + '/archives/caseSuspects', { params: { ajbh: ajbh_dang } }).then(res => {
            if (res.code == 200) {
                this.setState({ caseSuspects: res.data });
            }
        })
    }

    render() {
        const { baseInfos, caseSufferer, caseSuspects } = this.state;
        const tbodycss = { borderBottom: '1px solid #e8e8e8' }
        const tbodyLast = { paddingBottom: 10 }
        const tbodyfirst = { paddingTop: 10, width: 280 }
        const tbodyNothing = { textIndent: 18, padding: '10px 0', color: 'rgba(0, 0, 0, 0.45)' }
        return (
            <div>
                <div>
                    <div>
                        <Card bordered={false} hoverable={false} key='1'>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 报案人/受害人</td></tr></thead>
                                {
                                    caseSufferer && caseSufferer.map((item, i) => {
                                        return <tbody key={i} style={tbodycss}><tr><td style={tbodyfirst} >人员类型：{item.rylxCn || '-'}</td><td>姓名：{item.xm || '-'}</td></tr>
                                            <tr><td>性别：{item.xbCn || '-'}  </td><td>出生日期：{item.csrq || '-'}</td></tr>
                                            <tr><td>联系电话：{item.lxdh || '-'}</td><td>人员编号：{item.rybh || '-'}</td></tr>
                                            <tr><td style={tbodyLast} colSpan='2'>地址：{item.xxdzms || '-'} </td></tr>
                                        </tbody>
                                    })
                                }
                                {
                                    !caseSufferer || !caseSufferer.length ? <tbody><tr><td style={tbodyNothing} colSpan='2'>暂无数据</td></tr></tbody> : ''
                                }
                            </table>
                        </Card>
                        <Card bordered={false} hoverable={false} key='2'>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 嫌疑人</td></tr></thead>
                                {
                                    caseSuspects && caseSuspects.map((item, i) => {
                                        return <tbody key={i} style={tbodycss}><tr><td style={tbodyfirst} >人员类型：嫌疑人}</td><td>姓名：{item.xm || '-'}</td></tr>
                                            <tr><td>性别：{item.xbCn || '-'}  </td><td>出生日期：{item.csrq || '-'}</td></tr>
                                            <tr><td>联系电话：{item.lxdh || '-'}</td><td>人员编号：{item.rybh || '-'}</td></tr>
                                            <tr><td style={tbodyLast} colSpan='2'>地址：{item.xxdzms || '-'} </td></tr>
                                        </tbody>
                                    })
                                }
                                {
                                    !caseSuspects || !caseSuspects.length ? <tbody><tr><td style={tbodyNothing} colSpan='2'>暂无数据</td></tr></tbody> : ''
                                }
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}