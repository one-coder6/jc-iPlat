import React from 'react';
import { Form, Input, Select, Button, InputNumber, Radio, Card, Table, message } from 'antd';
import { httpAjax, addressUrl } from '../../../../Util/httpAjax';
const Option = Select.Option;
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
                { label: '破案', value: 'finish' },
                // { label: '侦结', value: 'finish' },
                { label: '挂起', value: 'hangUp' },
            ],
            dataSource: [],
            selectedRowKeys: [],
            operationType: '', // 选择操作的类型
            selectOption: [], // 积分原因option
            tableLoading: true, // 
            listEvaluate: [], // 线索列表
            listType: [], // 加分原因
            inputMax: 0, // 最大积分
            inputMin: 0, // 最小积分
            pointerInputCollect: [], // 积分dom对象 
        }
    }

    componentWillMount() {
        /* POST /clue/uploadClue */
        const { caseRecord } = this.props;

        httpAjax("get", addressUrl + '/clue/listEvaluate', { params: { ajbh: caseRecord.ajbh } }).then((res) => {
            debugger;
            if (res.code == '200') {
                let d = res.data;
                this.setState({
                    listEvaluate: d.lsClueMain, // 线索列表
                    listType: d.lsIntegralRuleOption, // 加分原因
                    selectOption: d.lsIntegralRuleOption && d.lsIntegralRuleOption.map((item, key) => {
                        return <Option key={key} value={JSON.stringify(item)}>{item.ruleName}</Option>
                    })
                }, () => {
                    setTimeout(() => {
                        this.setState({ tableLoading: false })
                    }, 1000)
                })
            }
        })
    }

    // 上传附件
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
    // 提交
    handleSubmit = (e) => {
        e.preventDefault();
        const { operationType } = this.state;
        const { caseRecord } = this.props;
        const reqUrl = addressUrl + operationType;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                // 增加线索积分参数
                let pointerInputCollect = this.state.pointerInputCollect;
                let ClueAppraiseSave = [];
                pointerInputCollect && pointerInputCollect.forEach((item) => {
                    let temp = item,
                        val = temp.dom.value,
                        result = { clueId: temp.clueId, ruleType: temp.ruleType, score: val }
                    if (val)
                        ClueAppraiseSave.push(result)
                })
                /*  httpAjax("post", reqUrl, {
                     ajbh: caseRecord.ajbh,
                     bdajstatebz: value.bdajstatebz,
                     ClueAppraiseSave: ClueAppraiseSave
                 }).then(res => {
                     if (res.code === '200') {
                         message.success("破案/侦结成功");
                         this.props.handleCancel();
                         this.props.form.resetFields();
                         this.props.getDataSource({
                             pageSize: 10,
                             pageNum: 1,
                         });
                     } else {
                         message.error("破案/侦结失败")
                         this.props.handleCancel();
                     }
                 }) */
            }
            console.log("value", value)
        })
    }
    // 切换下拉菜单
    listTypeChange = (_e, record) => {
        console.log(_e, record)
        /*
        1、找到文本框
        2、定值则不能输入
        3、非定值设置max和min分值
        4、提交之前获取所有文本框的值组合成数组
        */
        let dom = document.querySelector('#p_p' + record.id),
            e = JSON.parse(_e);
        if (e && e.integralType == '0') {
            // 定值积分
            dom.value = e.upperLimit;
            dom.setAttribute('disabled', true);
            dom.setAttribute('title', '定值积分，无需输入')
            dom.parentNode.previousElementSibling.style.display = 'none'
        } else {
            dom.value = 0;
            dom.removeAttribute('disabled');
            dom.setAttribute('title', '')
            dom.parentNode.previousElementSibling.style.display = 'block'
            this.setState({ inputMax: e.upperLimit, inputMin: e.lowerLimit })
        }
        // 保存起来
        this.state.pointerInputCollect.push({ dom: dom, clueId: record.id, ruleType: e.ruleType })
    }
    render() {
        const { options, listEvaluate, tableLoading } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };

        const columns = [{
            title: '序号',
            align: 'center',
            width: 90,
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1
        }, {
            title: '描述',
            align: 'left',
            width: 300,
            dataIndex: 'xsnr',
            key: 'xsnr',
            render: text => <a href="javascript:;" title={text}>{text}</a>,
        }, {
            title: '提供者',
            align: 'left',
            width: 60,
            dataIndex: 'lrrymc',
            key: 'lrrymc',
        }, {
            align: 'left',
            title: '反馈单位',
            width: 190,
            dataIndex: 'fkdw',
            key: 'fkdw',
        }, {
            title: '奖励理由',
            align: 'left',
            dataIndex: 'reason',
            key: 'reason',
            width: 180,
            render: (text, record) => {
                let item = this.state.selectOption;
                return <Select onSelect={(e) => { this.listTypeChange(e, record) }}>
                    {item}
                </Select>
            }
        }, {
            title: '分值',
            align: 'left',
            key: 'action3',
            render: (text, record) => (
                <span>
                    <InputNumber id={'p_p' + record.id} min={this.state.inputMin} max={this.state.inputMax} />
                </span>
            ),
        }];

        return (
            <div style={{ border: '0px solid red' }}>

                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="案件状态">
                        {getFieldDecorator('xqnr', {
                            rules: [{ required: true, message: '请选择案件状态.' },],
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
                    {
                        this.state.operationType == '/cases/finish' ?
                            <FormItem {...formItemLayout} label="线索积分">
                                {getFieldDecorator('tab', {
                                    //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                                })(
                                    <Table scroll={{ y: 350 }} loading={tableLoading} rowKey="key"
                                        pagination={false} columns={columns} dataSource={listEvaluate} size="small" />
                                )}
                            </FormItem> : ''
                    }
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