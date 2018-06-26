import React from 'react';
import { Layout, Button, Select, InputNumber, Icon, Tag, Modal, Form, Input, Radio } from 'antd'
import '../../styles/achievementscheck.less';
import { httpAjax, addressUrl } from '../../Util/httpAjax'; //引入自定义组件
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

// 绩效考核 - 积分设置 - 编辑
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                curRadioType: 0
            }
        }
        radioHandle = (e) => {
            this.setState({ curRadioType: e.target.value })
        }
        render() {
            const { visible, onCancel, onCreate, form, record } = this.props;
            const { getFieldDecorator } = form;
            const formItemLayout = {
                labelCol: {
                    span: 6,
                    style: {
                        textAlign: 'right'
                    }
                },
                wrapperCol: { span: 14 },

            };
            return (
                <Modal
                    maskClosable={false}
                    visible={visible}
                    title={<span><Icon type="setting" /> 修改</span>}
                    okText="提交"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem style={{ display: 'none' }} {...formItemLayout} label="记录id：">
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: '' }],
                                initialValue: record.id
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem style={{ display: 'none' }} {...formItemLayout} label="规则类型：">
                            {getFieldDecorator('ruleType', {
                                rules: [{ required: true, message: '' }],
                                initialValue: record.ruleType
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="用户行为：">
                            {getFieldDecorator('ruleName', {
                                rules: [{ required: true, message: '' }],
                                initialValue: record.ruleName
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="最多奖励次数：">
                            {getFieldDecorator('awardLimit', {
                                initialValue: record.awardLimit
                            })(
                                <InputNumber min={0} max={100} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="积分类型：">
                            {getFieldDecorator('integralType', {
                                initialValue: record.integralType == 1 ? '1' : '0'
                            })(
                                <RadioGroup onChange={this.radioHandle}>
                                    <Radio value="0">定值积分</Radio>
                                    <Radio value="1">非定值积分</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        {record.integralType == "0" && this.state.curRadioType == "0" ?
                            <FormItem {...formItemLayout} label="分数：">
                                {getFieldDecorator('upperLimit',
                                    {
                                        initialValue: record.upperLimit
                                    })(<InputNumber min={0} max={100} />)}
                            </FormItem> :
                            <FormItem {...formItemLayout} label="分数：">
                                <InputGroup compact>
                                    {getFieldDecorator('lowerLimit', {
                                        initialValue: record.lowerLimit
                                    })(
                                        <InputNumber min={0} max={100} />
                                    )}
                                    <Input style={{ width: 30, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="-" disabled />
                                    {getFieldDecorator('upperLimit', {
                                        initialValue: record.upperLimit
                                    })(
                                        <InputNumber min={0} max={100} />
                                    )}
                                </InputGroup>
                            </FormItem>
                        }
                    </Form>
                </Modal>
            );
        }
    }
);

export default CollectionCreateForm;