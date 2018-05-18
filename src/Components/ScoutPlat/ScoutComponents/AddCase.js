import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Form, Select, Input, Card, DatePicker, Button } from 'antd';

//引入自定义组件
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import ContentComponent from '../../Content/Index';
import { thirdLayout } from '../../../Util/Flexout.js';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddCase extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			initData:''
		}
	}
	componentWillMount() {
		const reqUrl = addressUrl + '/cases/initData';
		httpAjax("get", reqUrl).then(res => {
			if(res.code==='200'){
				this.setState({initData:res.data})
			}
		})
	}
	//提交
	handleSubmit = (e) => {
		e.preventDefault();
		const reqUrl = addressUrl + '/cases/insert'
		this.props.form.validateFields((err, value) => {
			if (!err) {
				httpAjax("post", reqUrl, {}).then(res => {

				})
			}
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { initData } = this.state; 
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		return (
			<ContentComponent>
				<Form onSubmit={this.handleSubmit}>
					<Card style={{ padding: '20px', background: '#fff' }} title='刑事案件基本信息'>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="案件编号"    >
									{getFieldDecorator('ajbh', {
										rules: [{ required: true, message: 'Please input your E-mail!', }],
										initialValue: initData.ajbh
									})(
										<Input disabled />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="案件名称"    >
									{getFieldDecorator('ajmc', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input  />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="主办单位"    >
									{getFieldDecorator('zbdwCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="发案开始时间"    >
									{getFieldDecorator('fasjcz', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...formItemLayout} label="发案结束时间"    >
									{getFieldDecorator('fasjzz', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...formItemLayout} label="发案地点"    >
									{getFieldDecorator('fadd', {
										//rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="发案地域"    >
									{getFieldDecorator('fadyCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="案件状态"    >
									{getFieldDecorator('bdajstateCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="受理单位"    >
									{getFieldDecorator('sljsdwCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
						</Row>
					</Card >
					<Card style={{ padding: '20px', background: '#fff' }} title='案发地点'>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="报警时间"    >
									{getFieldDecorator('sljjsj', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="接处警编号"    >
									{getFieldDecorator('sljsdw', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="报警方式"    >
									{getFieldDecorator('slJjfsCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="作案状态"    >
									{getFieldDecorator('zaztCn', {
										//  rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="案别"  >
									{getFieldDecorator('abCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="专案标识"    >
									{getFieldDecorator('zabzCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="案件来源"    >
									{getFieldDecorator('ajFromCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="立案人员"    >
									{getFieldDecorator('ajlaryCn', {
										//  rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="案件危害程度"    >
									{getFieldDecorator('ajwhcdCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="案件所属警区"    >
									{getFieldDecorator('ajssjqCn', {
										//rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="所属社区"    >
									{getFieldDecorator('sssqCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="选择部位"    >
									{getFieldDecorator('xzbwCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="选择处所"    >
									{getFieldDecorator('xzcsCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="选择对象"    >
									{getFieldDecorator('xzdxCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="选择时间"    >
									{getFieldDecorator('xzsjCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="选择物品"    >
									{getFieldDecorator('xzwpCn', {
										//  rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="作案工具"    >
									{getFieldDecorator('zagjCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="作案状态"    >
									{getFieldDecorator('zaztCn', {
										//  rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="作案人数"    >
									{getFieldDecorator('zars', {
										//  rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="发现形式"    >
									{getFieldDecorator('fxxsCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="发案地点区县"    >
									{getFieldDecorator('faddQxCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="rmb">RMB</Option>
											<Option value="dollar">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="发案地点街道"    >
									{getFieldDecorator('faddJdCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="0">RMB</Option>
											<Option value="1">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="督办级别"    >
									{getFieldDecorator('dbjbCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Select>
											<Option value="0">RMB</Option>
											<Option value="1">Dollar</Option>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="是否涉外"    >
									{getFieldDecorator('sfswCn', {
										// rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="手段特点"    >
									{getFieldDecorator('address', {
										//rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col xl={8} lg={8} md={8} sm={24} xs={24}>
								<FormItem {...thirdLayout} label="死亡人数"    >
									{getFieldDecorator('swrs', {
										//rules: [{ required: true, message: 'Please input your E-mail!', }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
						</Row>
						<div style={{ textAlign: 'center' }}>
							<Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
							<Button onClick={this.props.handleCancel}>取消</Button>
						</div>
					</Card>
				</Form>
			</ContentComponent>
		)
	}
}

export default Form.create()(AddCase)