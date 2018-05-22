import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd';
//引入自适应文件
import { thirdLayout } from '../../Util/Flexout.js';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
/* 档案侦查主页- 查询条件 */
class AdvancedSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: true
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
    //清空
    resetForm = () => {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { expand, } = this.state;
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
                <Form onSubmit={this.handleSearch}>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案件开始时间" >
                                {getFieldDecorator('range-picker', )(
                                    <RangePicker />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案件名称" >
                                {getFieldDecorator('ajmc', )(
                                    <Input placeholder="请输入案件名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案件编号">
                                {getFieldDecorator('ajbh', {
                                    //initialValue:['Orange']
                                })(
                                    <Input placeholder="请输入案件编号" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{ display: expand ? 'none' : 'block' }}>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="主办民警">
                                {getFieldDecorator('ajzbryCn', {
                                    //initialValue:"1"
                                })(
                                    <Input placeholder="请输入主办民警" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="主办单位">
                                {getFieldDecorator('zbdw', {
                                    //initialValue:['Orange']
                                })(
                                    <Input placeholder="请输入主办单位" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    {/* <Row style={{display:expand?'none':'block'}}>
                          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                              <FormItem   {...thirdLayout} label="签收情况">
                                {getFieldDecorator('qszt',{
                                    //initialValue:"1"
                                })(
                                  <CheckboxGroup options={ receiveStatus }  onChange={this.caseTypeChange} />
                                )}
                              </FormItem>
                          </Col>					
                          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                              <FormItem {...thirdLayout} label="反馈情况">
                                {getFieldDecorator('feedback',{
                                    //initialValue:['Orange']
                                })(
                                  <CheckboxGroup options={ feedbackStatus }  onChange={this.caseTypeChange} />
                                )}
                              </FormItem>
                          </Col>													
                      </Row>					 */}
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
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;