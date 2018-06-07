import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Select, Button, Icon, Radio, Input, message } from 'antd';
import { httpAjax, addressUrl, UC_URL } from '../../../Util/httpAjax';
import { thirdLayout } from '../../../Util/Flexout';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class ApplyDelayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { requestRecord } = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const reqUrl = addressUrl + '/demand/delayApply';
                debugger;
                httpAjax("post", reqUrl, {xqid: requestRecord.id,  fksqyy: value.fksqyy }).then(res => {
                    if (res.code === '200') {
                        message.success("提交成功");
                        this.props.handleCancel();
                        // this.props.getDataSource(10, 1)
                    } else {
                        message.error("提交失败，请重试");
                        this.props.handleCancel();
                        // this.props.getDataSource(10, 1)
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...thirdLayout} label="延期原因">
                    {getFieldDecorator('fksqyy', {
                        rules: [{ required: true, message: '请输入延期原因' },],
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
const ApplyDelay = Form.create()(ApplyDelayForm)
export default connect(mapStateToProps)(ApplyDelay);