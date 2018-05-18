import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
/* 档案侦查主页- 查询条件 */
class AdvancedSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        let {
            handleSearch
        } = this.props;
        let timeData = 'range-time-picker';
        this.props.form.validateFields((err, values) => {
            handleSearch(values);
        });
    }
    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline"
                className="ant-advanced-search-form blockDefaut"
                style={{padding:'15px'}}
                onSubmit={this.handleSearch} >
                <Row gutter={8}>
                    <Col span={8}>
                        <FormItem label="案件名称">
                            {getFieldDecorator('ajmc', {
                                //initialValue:"1"
                            })(
                                <Input placeholder="请输入案件名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="案件编号">
                            {getFieldDecorator('ajbh', {
                                //initialValue:"1"
                            })(
                                <Input placeholder="请输入案件编号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="主办民警">
                            {getFieldDecorator('ajzbryCn', {
                                //initialValue:"1"
                            })(
                                <Input placeholder="请输入主办民警" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="案件开始时间">
                            {getFieldDecorator('range-picker', {
                                rules: [{ type: 'array', required: false }],
                            })(
                                <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="主办单位">
                            {getFieldDecorator('zbdw', {
                                //initialValue:"1"
                            })(
                                <Input placeholder="请输入主办单位" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleSearch}>
                            清空
                       </Button>
                        {/*       <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a> */}
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;