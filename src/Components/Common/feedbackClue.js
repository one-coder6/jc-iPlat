import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, Upload, Button, Icon, message } from 'antd';
import { httpAjax, addressUrl, UC_URL } from '../../Util/httpAjax';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class FeedfackClue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tagColor: '#108ee9',
			tagBack: '#fff',
			requestModal: false
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
	handleSubmit = (e) => {
		e.preventDefault();
		const { requestRecord } = this.props;
		this.props.form.validateFields((err, value) => {
			console.log("valie", value)
			if (!err) {
				const reqUrl = addressUrl + '/clue/insert';
				httpAjax("post", reqUrl, { demandId: requestRecord.id, ajbh: requestRecord.ajbh, theme: value.theme, xsnr: value.xsnr }).then(res => {
					if (res.code === '200') {
						message.success("反馈成功");
						this.props.handleCancel();
					} else {
						message.error("反馈失败");
						this.props.handleCancel();
					}
				})
			}
		})
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
			<Form onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout} label="线索名称">
					{getFieldDecorator('theme', {
						//rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
					})(
						<Input placeholder='请输入线索名称' />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="线索内容">
					{getFieldDecorator('xsnr', {
						//rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
					})(
						<TextArea placeholder='请输入线索内容' />
					)}
				</FormItem>
				<FormItem  {...formItemLayout} label="附件">
					{getFieldDecorator('files', {
						valuePropName: 'fileList',
						getValueFromEvent: this.normFile,
					})(
						<Upload name="logo" action="/upload.do" listType="picture">
							<Button>
								<Icon type="upload" /> 添加附件
		              </Button>
						</Upload>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="附件说明">
					{getFieldDecorator('attachmentDesc', {
						//rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
					})(
						<TextArea placeholder='请输入附件说明' />
					)}
				</FormItem>
				<div style={{ textAlign: 'center' }}>
					<Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
					<Button onClick={this.props.handleCancel }>取消</Button>
				</div>
			</Form>
		)
	}
}
export default Form.create()(FeedfackClue)