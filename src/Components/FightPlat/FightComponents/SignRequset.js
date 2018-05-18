import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Select, Button, Icon, Radio, Input, message } from 'antd';


import { httpAjax, addressUrl, UC_URL } from '../../../Util/httpAjax';
import { thirdLayout } from '../../../Util/Flexout';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class SignRequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberList: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { requestRecord } = this.props;
        this.props.form.validateFields((err, value) => {
            console.log("valie", value)
            if (!err) {
                const reqUrl = addressUrl + '/demand/sign';
                httpAjax("post", reqUrl, { id: requestRecord.id }).then(res => {
                    if (res.code === '200') {
                        message.success("指派成功");
                        this.props.handleCancel();
                        this.props.getDataSource(10, 1)
                    } else {
                        message.error("指派失败");
                        this.props.handleCancel();
                        this.props.getDataSource(10, 1)
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...thirdLayout} label="业务类型">
                    {getFieldDecorator('level', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <RadioGroup >
                            <Radio value={1}>签收</Radio>
                            <Radio value={2}>退回</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...thirdLayout} label="备注">
                    {getFieldDecorator('remark', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TextArea />
                    )}
                </FormItem>
                <div style={{ textAlign: 'center' }}>
                    <Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </div>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
const SignRequest = Form.create()(SignRequestForm)
export default connect(mapStateToProps)(SignRequest);