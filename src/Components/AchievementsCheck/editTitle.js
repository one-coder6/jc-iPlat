import React from 'react';
import { InputNumber, Icon, Modal, Form, Input,} from 'antd'
import '../../styles/achievementscheck.less';
const FormItem = Form.Item;
const InputGroup = Input.Group;

// 绩效考核 - 头衔设置 - 编辑
const TitleForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            const { visible, onCancel, onCreate, form, record, iconType, operationType } = this.props;
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
                    title={<span><Icon type={iconType} /> {operationType}</span>}
                    okText="提交"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem style={{ display: 'none' }} {...formItemLayout} label="记录id：">
                            {getFieldDecorator('id', {
                                initialValue: record.id
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="头衔等级名称：">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '' }],
                                initialValue: record.name
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="名次：">
                            <InputGroup compact>
                                {getFieldDecorator('upperLimit', {
                                    initialValue: record.upperLimit
                                })(
                                    <InputNumber min={0} max={100} />
                                )}
                                <Input style={{ width: 30, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="-" disabled />
                                {getFieldDecorator('lowerLimit', {
                                    initialValue: record.lowerLimit
                                })(
                                    <InputNumber min={0} max={100} />
                                )}
                            </InputGroup>
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

export default TitleForm;