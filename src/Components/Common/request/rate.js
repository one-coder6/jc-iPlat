import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Rate ,DatePicker} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
class ReplyClue extends React.Component {
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
                <FormItem {...formItemLayout} label="评价等级">
                    {getFieldDecorator('clueMark', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <Rate />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="评价内容">
                    {getFieldDecorator('content', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TextArea placeholder='请输入评价内容' />
                    )}
                </FormItem>                 
                <FormItem {...formItemLayout} label="回复人">
                    {getFieldDecorator('name', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <Input placeholder='请输入回复人' />
                    )}
                </FormItem>                
                <FormItem {...formItemLayout} label="回复时间">
                    {getFieldDecorator('time', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择回复时间"
                        />
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
export default Form.create()(ReplyClue)