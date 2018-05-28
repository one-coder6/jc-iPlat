import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Form, DatePicker, Tag, Checkbox, Input, Select, Icon, TreeSelect } from 'antd';
//引入自适应文件
import { thirdLayout } from '../../../Util/Flexout.js';
import { httpAjax, addressUrl, UC_URL } from '../../../Util/httpAjax';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;
const TreeNode = TreeSelect.TreeNode;

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
			treeDefaultValue: [],
			treeData: [],
		}
	}

	componentWillMount() {
		//获取作战单位首层
		const reqUrl = UC_URL + "getTopDepartment";
		httpAjax("post", reqUrl, {}).then(res => {
			this.setState({ treeDefaultValue: res })
			const treeDataSource = res && res.map((item, index) => ({
				title: item.fullname,
				value: item.code,
				key: item.code,
			}))
			this.setState({ treeData: treeDataSource })
		})
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
		let {
			Search
		} = this.props;
		let timeData = 'range-time-picker';
		this.props.form.validateFields((err, values) => {
			Search(values);
		});
	}
	//异步加载子节点
	loadTreeData = (treeNode) => {
		const reqUrl = UC_URL + "getDepartmentByAny";
		return httpAjax("post", reqUrl, { pcode: treeNode.props.eventKey }).then(res => {
			const treeDataSource = res && res.map((item, index) => ({
				title: item.fullname,
				value: item.code,
				key: item.code,
			}))
			treeNode.props.dataRef.children = treeDataSource;
			this.setState({ treeData: [...this.state.treeData] });
		})
	}
	//获取树节点的Key
	treeSelectKeys = (value) => {
		this.setState({ treeSelectKeys: value })
	}
	//渲染树子节点
	renderTreeNodes = (data) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<TreeNode title={item.title} key={item.key} value={item.value} dataRef={item}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode {...item} dataRef={item} />
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { caseStatus, expand, treeDefaultValue, treeData } = this.state;
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
		return (
			<div style={{ padding: '20px', background: '#fff' }}>
				{/*<Row gutter={8} >
					<Col span={2}>
						<Button type="primary">提取案件</Button>
					</Col>
					<Col span={2}>
						<Button type="primary">提取警情</Button>
					</Col>
					<Col span={2}>
						<Button type="primary">创建案件</Button>
					</Col>
					<Col span={15}></Col>
				</Row>
				<hr />
				*/}
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
							<FormItem {...thirdLayout} label="案发时间" >
								{getFieldDecorator('sljjsj', )(
									<RangePicker />
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
					{/* 	<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<FormItem {...thirdLayout} label="立案时间">
								{getFieldDecorator('lasj', {
									// initialValue: ['Orange']
								})(
									<RangePicker />
								)}
							</FormItem>
						</Col> */}
					</Row>
				{/* 	<Row style={{ display: expand ? 'none' : 'block' }}>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<FormItem {...thirdLayout} label="主办单位">
								{getFieldDecorator('zbdw', {
									initialValue: treeDefaultValue && treeDefaultValue[0] && treeDefaultValue[0].code,
									//rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
								})(
									<TreeSelect
										loadData={this.loadTreeData}
										dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
										onSelect={this.treeSelectKeys}
										searchPlaceholder='主办单位'
										treeDefaultExpandAll
									>
										{this.renderTreeNodes(treeData)}
									</TreeSelect>
								)}
							</FormItem>
						</Col>
					</Row> */}
					<Row>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
						</Col>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
						</Col>
						<Col xl={8} lg={8} md={8} sm={24} xs={24} style={{ paddingLeft: "17%" }}>
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