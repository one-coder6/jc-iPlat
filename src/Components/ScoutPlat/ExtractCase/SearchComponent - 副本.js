import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Form, DatePicker, Tag, Checkbox, Input, Select, Icon } from 'antd';
//引入自适应文件
import { thirdLayout } from '../../../Util/Flexout.js';
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			caseStatus: [{
				label: '我主办',
				value: 'Apple'
			}, {
				label: '我协办',
				value: 'Pear'
			}],
			expand: true,
		}
	}

	caseTypeChange = (value) => {
		console.log("value", value)
	}

	toggle = () => {
		const {
			expand
		} = this.state;
		this.setState({
			expand: !expand
		});
	}
	//清空
	resetForm = () => {
		this.props.form.resetFields();
	}

	handleSearch = (e) => {
		e.preventDefault();
		let { Search } = this.props;
		let timeData = 'range-time-picker';
		this.props.form.validateFields((err, values) => {
			//	{timeSection:1}
			if (values.sljjsj) {
				values["timeSection"] = 1;
			}
			Search(values);
		});
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		const {
			caseStatus,
			expand
		} = this.state;
		const FormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 6,
				},
			},
		};
		// 开始时间
		const startTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
		return (
			<div style={{ padding: '20px', background: '#fff' }}>
				<Form onSubmit={this.handleSearch}>
					<Row>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<FormItem {...thirdLayout} label="案件编号" >
								{getFieldDecorator('ajbh', )(
									<Input />
								)}
							</FormItem>
						</Col>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<FormItem   {...thirdLayout} label="案件名称">
								{getFieldDecorator('ajmc', {
									// initialValue: "1"
								})(
									<Input />
								)}
							</FormItem>
						</Col>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<FormItem {...thirdLayout} label="立案时间" >
								{getFieldDecorator('lasj', )(
									<RangePicker defaultValue={[moment(startTime).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]} allowClear={false} />
								)}
							</FormItem>
						</Col>
					</Row>
					<Row style={{ display: expand ? 'none' : 'block' }}>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							{/* <FormItem {...thirdLayout} label="案件类别">
								{getFieldDecorator('abCn', {
									//initialValue:['Orange']
								})(
									<Select>
										<Option value = '1'>盗窃</Option>
										<Option value = '2'>抢劫</Option>
									</Select>
								)}
							</FormItem> */}
							<FormItem {...thirdLayout} label="办案情况">
								{getFieldDecorator('baqk', {
									//initialValue:['Orange']
								})(
									<Checkbox.Group >
										<Checkbox value="1">我主办</Checkbox>
										<Checkbox value="2">其他</Checkbox>
									</Checkbox.Group>,
								)}
							</FormItem>
						</Col>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<FormItem {...thirdLayout} label="主要案情">
								{getFieldDecorator('zyaq', {
									// initialValue: ['Orange']
								})(
									<Input />
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col xl={18} lg={18} md={16} sm={16} xs={16}></Col>
						<Col xl={6} lg={6} md={8} sm={8} xs={8} style={{ paddingLeft: "7%" }}>
							<Button type='primary' htmlType="submit" style={{ marginRight: '20px' }}>查询</Button>
							<Button onClick={this.resetForm}>清空</Button>
							<a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
								{this.state.expand ? '展开' : '收起'}  <Icon type={this.state.expand ? 'down' : 'up'} />
							</a>
						</Col>
					</Row>
				</Form>
			</div>
		)
	}
}
export default Form.create()(Search)