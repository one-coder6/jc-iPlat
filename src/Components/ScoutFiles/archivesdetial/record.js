import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Tag, Badge, Icon, Card, Tooltip, Divider } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const Panel = Collapse.Panel;
/* 侦查档案 - 笔录 */
export default class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ajbh: 'A4403035200002007010003',
            RecordInfo: []
        }
    }
    componentWillMount() {
        let ajbh_dang = sessionStorage.getItem("ajbh_dang") || '-';
        // 笔录信息
        httpAjax("get", addressUrl + '/archives/oralConfession', { params: { ajbh: ajbh_dang } }).then(res => {
            if (res.code == 200) {
                this.setState({ RecordInfo: res.data });
            }
        })

    }
    render() {
        let { RecordInfo } = this.state;
        /*  RecordInfo = [
             { recorder: "张三", targetXm: '刘青云', targetXbCn: '男', jldd: "宝钢派出所1", starttime: "2018-12-11", body: "宝钢派出所记录很多内容" },
             {
                 recorder: "李四", targetXm: '张青云', targetXbCn: '女', jldd: "宝钢派出所2", starttime: "2018-10-11", body: ""
             }
         ]; */
        return (
            <div>
                <div>
                    <div style={{ width: "100%", minHeight: 300, /* background: "#fafafa", */ borderRadius: 5, padding: 10 }}>
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> 笔录信息</p>
                        {
                            RecordInfo && RecordInfo.map((item, index) => {
                                return <Card style={{ marginBottom: 10 }}
                                    title={<div>
                                        <span style={{ marginTop: 10, display: 'inherit', fontSize: 12, color: '#1890ff' }}>
                                            <span style={{ marginRight: 15 }}>被询问人: {item.targetXm || '-'}</span>
                                            <span style={{ marginRight: 15 }}>性别: {item.targetXbCn || '-'}</span>
                                            <span style={{ marginRight: 15 }}>人员类型: {item.rylx || '-'}</span>
                                            <span style={{ marginRight: 15 }}>记录人: {item.recorder || '-'}</span>
                                        </span>
                                        <span style={{ marginTop: 10, display: 'inherit', fontSize: 12, color: '#1890ff' }}>
                                            <span style={{ marginRight: 15 }}>记录时间: {item.starttime || '-'}</span>
                                            <span style={{ marginRight: 15 }}>记录地点: {item.jldd || '-'}</span>
                                            <span style={{ marginRight: 15 }}>来源: {item.blly || '-'}</span>
                                        </span>
                                    </div>
                                    }
                                >
                                    <div dangerouslySetInnerHTML={{ __html: "<pre>" + (item.body || '无') + "</pre>" }} ></div>
                                </Card>
                            })
                        }
                        {
                            !RecordInfo || RecordInfo.length == 0 ? <p className="p-nothing-data">暂无数据</p> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}