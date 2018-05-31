import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Table, Icon, Button, Modal, Tooltip, Card, List, Avatar } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
/* 笔录信息和对比信息 */
class RecordInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            testTxt: "",
            viewImportRecord: false,
            selectedRowKeys: [] //选择的项
        }
    }

    componentWillMount() {

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
        console.log(source)
        alert("正在提交")
    }
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
        const { lsCasesRecordVO } = this.props;
        /*   const lsCasesRecordVO = [
              { recorder: "张三", jldd: "宝钢派出所1", starttime: "2018-12-11", body: "宝钢派出所记录很多内容" },
              { recorder: "李四", jldd: "宝钢派出所2", starttime: "2018-10-11", body: "问：宝钢派出所记录很多内容4↲答：是的↲问：多大了4↵答：18岁" },
              { recorder: "王五", jldd: "宝钢派出所3", starttime: "2018-09-11", body: "宝钢派出所记录很多内容3" },
              { recorder: "张柳", jldd: "宝钢派出所4", starttime: "2018-04-11", body: "asdas" }
          ] 
          */
        const columns = [{
            dataIndex: 'age',
        }, {
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            dataIndex: 'address',
        }];
        const data = [{
            key: '1',
            name: '张三',
            age: '嫌疑人',
            address: '44031234567891',
        }, {
            key: '2',
            name: '李四',
            age: '报案人',
            address: '44031234567892',
        }, {
            key: '3',
            name: '王五',
            age: '受害人',
            address: '44031234567893',
        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            hideDefaultSelections: false,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys: selectedRows })
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }/* ,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }) */,
        };
        return (<div>
            {/* <div dangerouslySetInnerHTML={{ __html: this.state.testTxt }}  ></div> */}
            <Button onClick={() => { this.setState({ viewImportRecord: true }) }} type="primary"><Icon type="tool" />手动提取</Button>
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
            <Modal
                title={<span><Icon type="setting" /> 选择人员</span>}
                wrapClassName="vertical-center-modal"
                visible={this.state.viewImportRecord}
                //  onOk={this.submitRecord}
                onCancel={this.canelModal}
                footer={null}
            >
                <Table style={{ marginTop: 10 }} size="middle" rowKey="key"
                    // showHeader={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
                <p style={{ padding: '31px 0px 0px 0px', textAlign: 'center' }}>
                    <Button size="large" style={{ marginRight: 20 }} type="primary" onClick={this.submitRecord}>确定</Button>
                    <Button size="large" onClick={this.canelModal} >取消</Button></p>
            </Modal>
        </div>
        )
    }
}

export default RecordInfor;