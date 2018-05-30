import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Table, Icon, Button, Modal, Tooltip, Card } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
/* 笔录信息和对比信息 */
class RecordInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            testTxt: ""
        }
    }

    componentWillMount() {
        /*   debugger;
          httpAjax("get", addressUrl + '/cases/getBL', {}).then(res => {
              debugger;
              let aaa = this.convertText(res.data[0].body)
              this.setState({ testTxt: aaa })
          }); */
    }

    convertText = (txt) => {
        let resultHtml = "暂无记录"
        if (txt) {
            resultHtml = "<pre>" + txt + "</pre>"
        }
        return resultHtml;
    }
    render() {
        // 笔录
        const columns_bl = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        }, {
            title: '记录地点',
            dataIndex: 'jldd',
            key: 'jldd',
        }, {
            title: '记录人员',
            dataIndex: 'recorder',
            key: 'recorder',
        }, {
            title: '笔录对象性别',
            dataIndex: 'targetXbCn',
            key: 'targetXbCn',
        }, {
            title: '笔录对象名称',
            dataIndex: 'targetXm',
            key: 'targetXm',
        }, {
            title: '开始时间',
            dataIndex: 'starttime',
            key: 'starttime',
        }, {
            title: '结束时间',
            dataIndex: 'endtime',
        }, {
            title: '笔录内容',
            dataIndex: 'body',
            render: (text) => {
                return <Tooltip placement="bottom" title={text}><span>{text.toString().length > 6 ? text.toString().substring(0, 26) + '...' : text}</span></Tooltip>
            }
        }];
        const { lsCasesRecordVO } = this.props;
        /*   const lsCasesRecordVO = [
              { recorder: "张三", jldd: "宝钢派出所1", starttime: "2018-12-11", body: "宝钢派出所记录很多内容" },
              { recorder: "李四", jldd: "宝钢派出所2", starttime: "2018-10-11", body: "问：宝钢派出所记录很多内容4↲答：是的↲问：多大了4↵答：18岁" },
              { recorder: "王五", jldd: "宝钢派出所3", starttime: "2018-09-11", body: "宝钢派出所记录很多内容3" },
              { recorder: "张柳", jldd: "宝钢派出所4", starttime: "2018-04-11", body: "asdas" }
          ] 
          */
        return (<div>
            {/* <div dangerouslySetInnerHTML={{ __html: this.state.testTxt }}  ></div> */}
            {
                lsCasesRecordVO && lsCasesRecordVO.map((item, index) => {
                    return <Card style={{ marginBottom: 10 }}
                        title={<p style={{ position: 'absolute', marginTop: 10, fontSize: 12, color: '#1890ff' }}>
                            <span style={{ marginRight: 15 }}>记录人: {item.recorder || '-'}</span>
                            {/*   <span style={{ marginRight: 15 }}>记录地点: {item.jldd || '-'}</span> */}
                            <span style={{ marginRight: 15 }}>　时间: {item.starttime || '-'}</span>
                        </p>}
                    /*  extra={<a href="#">记录时间：{item.starttime || '-'}</a>} */
                    >
                        <div style={{ padding: "1px 28px" }} dangerouslySetInnerHTML={{ __html: "<pre>" + (item.body || '无') + "</pre>" }} ></div>
                    </Card>
                })
            }
        </div>
        )
    }
}

export default RecordInfor;