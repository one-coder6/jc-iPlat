import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Table, Icon, Button, Modal, Tooltip, Card, List, Avatar, Divider, message } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import { debug } from 'util';
/* 笔录信息和对比信息 */
class RecordInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],// 笔录数据源
            peopleSource: [],// 涉案人员数据源
            testTxt: "",
            loading: false, // 确定按钮的loading
            viewImportRecord: false,
            selectedRowKeys: [] //选择的项
        }
    }

    componentWillMount() {
        /*    const ajbh = sessionStorage.getItem("ajbh");
           const reqUrl = addressUrl + `/cases/detail?ajbh=${ajbh}`;
           httpAjax("get", reqUrl).then(res => {
               if (res.code === '200') {
                   this.setState({ detailSource: res.data && res.data, loading: false });
               }
           }) */

        const { lsCasesRecordVO } = this.props;
        this.setState({ dataSource: lsCasesRecordVO })
        // 嫌疑人和受害人作为查询条件
        let { xyr, shr } = this.props,
            params = [];
        if (xyr && xyr.length) {
            xyr.forEach((item) => {
                params.push(item)
            })
        }
        if (shr && shr.length) {
            shr.forEach((item) => {
                item.rylxCn = "嫌疑人";
                params.push(item)
            })
        }
        this.setState({ peopleSource: params })

    }
    convertText = (txt) => {
        let resultHtml = "暂无记录"
        if (txt) {
            resultHtml = "<pre>" + txt + "</pre>"
        }
        return resultHtml;
    }
    // 提交笔录信息
    submitRecord = () => {
        let source = this.state.selectedRowKeys || [];
        let ajbh = sessionStorage.getItem("ajbh");
        console.log(source)
        if (source && source.length) {
            this.setState({ loading: true })
            let params = [];
            source && source.forEach((item) => {
                params.push({
                    "ajbh": ajbh,
                    "rybh": item.rybh,
                    "sfzh": item.zjhm
                })
            })

            params = JSON.stringify(params);
            /*      let b = [
                     { recorder: "张三", jldd: "宝钢派出所1", starttime: "2018-12-11", body: "宝钢派出所记录很多内容" },
                     { recorder: "李四", jldd: "宝钢派出所2", starttime: "2018-10-11", body: "问：宝钢派出所记录很多内容4↲答：是的↲问：多大了4↵答：18岁" }
                 ];
           */
            httpAjax("post", addressUrl + '/cases/listRecordKL', params, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(res => {
                if (res.code == 200) {
                    if (res.data && res.data.length) {
                        // 返回了data 更新父组件的数据源
                        this.props.reloadData();
                        this.canelModal()
                    } else {
                        // 为空
                        message.success("返回笔录信息为空", () => { this.canelModal() });
                    }
                }
                this.setState({ loading: false })
            })
        } else {
            message.warning("请先选择人员.")
        }
    }
    // 关闭模态窗
    canelModal = () => {
        this.setState({ viewImportRecord: false })
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

        const columns = [{
            dataIndex: 'rylxCn',
            title: '人员类型',
        }, {
            dataIndex: 'xm',
            title: '姓名',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '人员编号',
            dataIndex: 'rybh',
        }, {
            title: '证件编号',
            dataIndex: 'zjhm',
        }];

        /*   const data = [{
              key: '1',
              xm: '张三',
              rylxCn: '嫌疑人',
              address: '44031234567891',
          }, {
              key: '2',
              xm: '李四',
              rylxCn: '报案人',
              address: '44031234567892',
          }, {
              key: '3',
              xm: '王五',
              rylxCn: '受害人',
              address: '44031234567893',
          }]; */

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            hideDefaultSelections: false,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys: selectedRows })
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        const showData = this.state.dataSource || [];
        // console.log(this.state.peopleSource)
        return (<div>
            {/* <div dangerouslySetInnerHTML={{ __html: this.state.testTxt }}  ></div> */}
            <Button style={{ marginBottom: 10 }} onClick={() => { this.setState({ viewImportRecord: true }) }} type="primary"><Icon type="tool" />手动提取</Button>
            <Divider />
            <p style={{ marginBottom: 10 }}></p>
            {
                this.state.dataSource && this.state.dataSource.map((item, index) => {
                    return <Card style={{ marginBottom: 10 }}
                        title={<p style={{ position: 'absolute', marginTop: 10, fontSize: 12, color: '#1890ff' }}>
                            <span style={{ marginRight: 15 }}>被询问人: {item.targetXm || '-'}</span>
                            <span style={{ marginRight: 15 }}>　性别: {item.targetXbCn || '-'}</span>
                            <span style={{ marginRight: 15 }}>　人员类型: {item.rylx || '-'}</span>
                            <span style={{ marginRight: 15 }}>　记录人: {item.recorder || '-'}</span>
                            <span style={{ marginRight: 15 }}>　记录时间: {item.starttime || '-'}</span>
                            <span style={{ marginRight: 15 }}>　记录地点: {item.jldd || '-'}</span>
                            <span style={{ marginRight: 15 }}>　来源: {item.blly || '-'}</span>
                        </p>}
                    >
                        <div style={{ padding: "1px 28px" }} dangerouslySetInnerHTML={{ __html: "<pre>" + (item.body || '无') + "</pre>" }} ></div>
                    </Card>
                })
            }
            {
                !this.state.dataSource || !this.state.dataSource.length ? <p style={{ padding: 10 }}>暂无记录</p> : ''
            }
            <Modal
                width="700px"
                title={<span><Icon type="setting" /> 选择人员</span>}
                visible={this.state.viewImportRecord}
                //  onOk={this.submitRecord}
                onCancel={this.canelModal}
                footer={null}
            >
                <Table style={{ marginTop: 10 }} size="middle" rowKey="key"
                    // showHeader={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.peopleSource}
                    pagination={false}
                />
                <p style={{ padding: '31px 0px 0px 0px', textAlign: 'center' }}>
                    <Button size="large" style={{ marginRight: 20 }} type="primary" onClick={this.submitRecord} loading={this.state.loading} >确定</Button>
                    <Button size="large" onClick={this.canelModal} >取消</Button></p>
            </Modal>
        </div>
        )
    }
}

export default RecordInfor;