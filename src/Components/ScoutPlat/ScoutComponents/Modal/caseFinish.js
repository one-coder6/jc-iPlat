import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, Upload, Button, Icon, DatePicker, Radio, Card, Table ,message} from 'antd';
import { httpAjax, addressUrl } from '../../../../Util/httpAjax';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class CaseFinish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagColor: '#108ee9',
            tagBack: '#fff',
            requestModal: false,
            options: [
                { label: '破案', value: 'Apple' },
                { label: '侦结', value: 'finish' },
                { label: '挂起', value: 'hangUp' },
            ],
            dataSource: [{ id: '11', name: '深圳深圳', age: '张二二二地' }, { id: '22', name: '上海线', age: '张辊 国是地' }],
            selectedRowKeys: [],
            operationType: ''
        }
    }

    //上传附件
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    clueSelectChange = (selectedRowKeys) => {
        console.log("selectedRowKeys", selectedRowKeys)
    }

    operationType = (e) => {
        //console.log("key",e.target.value)
        if (e.target.value === 'finish') {
            this.setState({ operationType: "/cases/finish" })
        } else if (e.target.value === 'hangUp') {
            this.setState({ operationType: "/cases/abort" })
        }
    }
    //创建需求
    handleSubmit = (e) => {
        e.preventDefault();
        const { operationType } = this.state;
        const { caseRecord } = this.props;
        const reqUrl = addressUrl + operationType;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                httpAjax("get", reqUrl, {
                    params: {
                        ajbh:caseRecord.ajbh,
                        bdajstatebz: value.bdajstatebz
                    }
                }).then(res => {
                    if(res.code==='200'){
                        message.success("破案/侦结成功");
                        this.props.handleCancel();
                    }else{
                        message.error("破案/侦结失败")
                        this.props.handleCancel();
                    }
                })
            }
            console.log("value", value)
        })
    }

    render() {
        const { options, dataSource } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const columns = [{
            title: '线索描述',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '提供人',
            dataIndex: 'age',
            key: 'age',
        }];
        const rowSelection = {
            onChange: this.clueSelectChange
        };
        return (
            <div>
                {/* <Card title="请选择破案关键线索" style={{ width: '100%' }} className='solveCaseList'>
                    <Table
                        rowKey='id'
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        bordered rowSelection={rowSelection} />
                </Card> */}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="办理业务类型">
                        {getFieldDecorator('xqnr', {
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <RadioGroup options={options} onChange={this.operationType} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="备注">
                        {getFieldDecorator('bdajstatebz', {
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <TextArea placeholder='请输入备注内容' />
                        )}
                    </FormItem>
                    <div style={{ textAlign: 'center' }}>
                        <Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
                        <Button onClick={this.props.handleCancel}>取消</Button>
                    </div>
                </Form>
            </div>

        )
    }
}
export default Form.create()(CaseFinish)