import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, Upload, Button, Icon } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class SeedMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagColor: '#108ee9',
            tagBack: '#fff',
            requestModal: false
        }
    }

    render() {
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
        return (
            <Form>
                {/* <FormItem {...formItemLayout} label="线索名称">
		          {getFieldDecorator('clueName', {
		            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
		          })(
		            <Input placeholder='请输入线索名称' />
		          )}
		        </FormItem> */}
                <FormItem {...formItemLayout} label="留言内容">
                    {getFieldDecorator('clueMark', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TextArea placeholder='请输入留言内容' />
                    )}
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(SeedMessage)