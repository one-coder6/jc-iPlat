import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, Upload, Button, Icon, message, Switch } from 'antd';
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
			fileList: [],
			fileTypes: [],// 文件类型
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
				formData.append("sendMessage", value.sendMessage);
				formData.append("fileComment", value.fileComment);
				if (fileList && fileList.length) {
					fileList.map((item, index) => {
						let fileType = this.state.fileTypes[item.uid];
						formData.append("files[" + index + "].fileType", fileType);
						formData.append("files[" + index + "].file", item);
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
		// 默认设置审批文书附件类型
		this.updateFileType(file.uid);
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
		// 删除对应的附件类型
		this.delFileType(file.uid)
	}
	// 修改对应附件类型
	updateFileType = (key, val) => {
		let temp = this.state.fileTypes || {}
		temp[key] = val || '1';
		this.setState({ fileTypes: temp });
		console.log(this.state.fileTypes)
	}
	// 删除对应附件类型
	delFileType = (key) => {
		let temp = this.state.fileTypes || {}
		delete temp[key]
		this.setState({ fileTypes: temp });
		console.log(this.state.fileTypes)
	}

	render() {
		const { fileList } = this.state;
		const { getFieldDecorator } = this.props.form;
		const props = {
			action: `${addressUrl}/demand/insert`,
			onRemove: this.removeFileList,
			beforeUpload: this.beforeUpload,
			name: 'files',
			//fileList: this.state.fileList,
            showUploadList: false
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
						rules: [{ required: true, message: '请输入线索名称.' },],
					})(
						<Input placeholder='请输入线索名称' />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="线索内容">
					{getFieldDecorator('xsnr', {
						rules: [{ required: true, message: '请输入线索内容.' },],
					})(
						<TextArea placeholder='请输入线索内容' />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="短信通知">
					{getFieldDecorator('sendMessage', { valuePropName: 'checked', initialValue: false, })(
						<Switch />
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
					<div className="fileTypeSet" style={{
						display: this.state.fileList && this.state.fileList.length ? 'block' : "none"
					}}>
						{this.state.fileList && this.state.fileList.map((item) => {
							return <p>
								<select onChange={(e) => { this.updateFileType(item.uid, e.target.value) }}>
									<option value='1'>审批文书</option>
									<option value='2'>法律文书</option>
									<option value='3'>证据材料</option>
									<option value='4'>其他</option>
								</select>
								<span title={item.name}> {item.name}</span>
								<Icon title='删除' onClick={(e) => { this.removeFileList(item) }} type="close" />
							</p>
						})}
					</div>
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