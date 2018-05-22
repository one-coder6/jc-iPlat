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
			requestModal: false,
			fileList: []
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { fileList } = this.state;
		const { requestRecord } = this.props;
		this.props.form.validateFields((err, value) => {
			console.log("valie", value)
			if (!err) {
				const reqUrl = addressUrl + '/clue/insert';
				let formData = new FormData();
				formData.append("demandId", requestRecord.id);
				formData.append("ajbh", requestRecord.ajbh);
				formData.append("theme", value.theme);
				formData.append("xsnr", value.xsnr);
				formData.append("fileComment", value.fileComment);
				if (fileList && fileList.length) {
					fileList.map((item, index) => {
						formData.append("files", item);
					})
				}
				let config = {
					headers: {
						"Content-Type": 'multipart/form-data'
					}
				}
				httpAjax("post", reqUrl, formData, config).then(res => {
					if (res.code === '200') {
						message.success("反馈成功");
						this.props.form.resetFields();
						this.props.handleCancel();
					} else {
						message.error("反馈失败");
						this.props.handleCancel();
					}
				})
			}
		})
	}
	beforeUpload = (file) => {
		this.setState(({ fileList }) => ({
			fileList: [...fileList, file],
		}));
		return false;

	}
	//删除上传文件
	removeFileList = (file) => {
		this.setState(({ fileList }) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			return {
				fileList: newFileList,
			};
		});
	}
	render() {
		const { fileList } = this.state;
		const { getFieldDecorator } = this.props.form;
		const props = {
			action: `${addressUrl}/demand/insert`,
			onRemove: this.removeFileList,
			beforeUpload: this.beforeUpload,
			name: 'files'
			//fileList: this.state.fileList,
		};
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
						// valuePropName: 'fileList',
						// getValueFromEvent: this.normFile,
						initialValue: fileList
					})(
						<Upload {...props} multiple >
							<Button>
								<Icon type="upload" /> 添加附件
		                     </Button>
						</Upload>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="附件说明">
					{getFieldDecorator('fileComment', {
						//rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
					})(
						<TextArea placeholder='请输入附件说明' />
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
export default Form.create()(FeedfackClue)