import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Form, DatePicker, Tag, Checkbox, Input, Select, Icon, Radio } from 'antd';
//引入自适应文件
import { thirdLayout } from '../../../Util/Flexout.js';
import ZBDW from '../../../Components/Common/organization/zbdw';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import moment from 'moment'
import { Certificate } from 'crypto';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.RadioGroup;

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

        }
    }
    componentWillMount() {
        const reqUrl = addressUrl + '/cases/initData';
        httpAjax("get", reqUrl).then(res => {
            if (res.code == 200) {
                sessionStorage.setItem('jcdata', JSON.stringify(res.data))
                this.setState({ ...res.data })
                console.log(res.data)
            }
        })
    }
    caseTypeChange = (value) => {
        console.log("value", value)
    }

    //清空
    resetForm = () => {
        this.props.form.resetFields();
        this.props.form.setFieldsValue({
            lasj: undefined
        });
    }

    handleSearch = (e) => {
        e.preventDefault();
        let { Search } = this.props;
        let timeData = 'range-time-picker';
        this.props.form.validateFields((err, values) => {
            Search(values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { caseStatus } = this.state;
        // 开始时间
        const startTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        const zbdwDecorator = getFieldDecorator('zbdw');
        return (
            <div style={{ padding: '20px', background: '#fff' }}>
                <Form onSubmit={this.handleSearch}>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案件编号" >
                                {getFieldDecorator('ajbh', { initialValue: this.state.ajbh || '' })(
                                    <Input disabled />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="案件名称">
                                {getFieldDecorator('ajmc', {
                                    rules: [
                                        { required: true, message: '请输入案件名称' },
                                    ], initialValue: ''
                                })(
                                    <Input  placeholder='请输入案件名称' />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="主要案情" >
                                {getFieldDecorator('zyaq', {
                                    rules: [
                                        { required: true, message: '请输入主要案情' },
                                    ], initialValue: ''
                                })(
                                    <Input  placeholder='请输入主要案情'  />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案发开始时间" >
                                {getFieldDecorator('fasjcz', )(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="案发结束时间">
                                {getFieldDecorator('fasjzz', {
                                    // initialValue: "1"
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案发地点" >
                                {getFieldDecorator('fadd', {
                                    initialValue: ''
                                })(
                                    <Input  placeholder='请输入案发地点' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="发案地域" >
                                {getFieldDecorator('fady', {
                                    rules: [
                                        { required: false, message: '请输入发案地域' },
                                    ],
                                    initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入发案地域">
                                        {this.state.fady && this.state.fady.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="案件状态">
                                {getFieldDecorator('bdajstate', {
                                    // initialValue: "1"
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="受理单位" >
                                {getFieldDecorator('sljsdw', {
                                    initialValue: ''
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="报警时间" >
                                {getFieldDecorator('sljjsj', )(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="接处警编号">
                                {getFieldDecorator('sljsdw', {
                                    // initialValue: "1"
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="报警方式" >
                                {getFieldDecorator('slJjfs', {
                                    initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入报警方式">
                                        {this.state.slJjfs && this.state.slJjfs.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="主办单位" >
                                {getFieldDecorator('zbdw', {
                                    initialValue: ''
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="案别">
                                {getFieldDecorator('ab', {
                                    // initialValue: "1"
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="专案标识" >
                                {getFieldDecorator('zabz', {
                                    initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入专案标识">
                                        {this.state.zabz && this.state.zabz.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案件来源" >
                                {getFieldDecorator('ajFrom', )(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="立案人员">
                                {getFieldDecorator('ajlary', {
                                    // initialValue: "1"
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案件危害程度" >
                                {getFieldDecorator('ajwhcd', {
                                    rules: [
                                        { required: false, message: '请输入案件危害程度' },
                                    ], initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入案件危害程度">
                                        {this.state.ajwhcd && this.state.ajwhcd.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案件所属警区" >
                                {getFieldDecorator('ajssjq', {
                                    rules: [
                                        { required: false, message: '请输入案件所属警区!' },
                                    ],
                                })( // 后期单独接口
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入案件所属警区">
                                        {this.state.ajssjq && this.state.ajssjq.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="所属社区">
                                {getFieldDecorator('sssq', {
                                    // initialValue: "1"
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="选择部位" >
                                {getFieldDecorator('xzbw', {
                                    initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入选择部位">
                                        {this.state.xzbw && this.state.xzbw.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="选择处所" >
                                {getFieldDecorator('xzcs', )(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入住所">
                                        {this.state.xzcs && this.state.xzcs.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="选择对象">
                                {getFieldDecorator('xzdx', {
                                    // initialValue: "1"
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入选择对象">
                                        {this.state.xzdx && this.state.xzdx.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="选择时机" >
                                {getFieldDecorator('xzsj', {
                                    initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入选择时机">
                                        {this.state.xzsj && this.state.xzsj.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="选择物品" >
                                {getFieldDecorator('xzwp', )(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入选择物品">
                                        {this.state.xzwp && this.state.xzwp.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="作案工具">
                                {getFieldDecorator('zagj', {
                                    // initialValue: "1"
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入作案工具">
                                        {this.state.zagj && this.state.zagj.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="作案状态" >
                                {getFieldDecorator('zazt', )(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入作案状态">
                                        {this.state.zazt && this.state.zazt.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="作案人数" >
                                {getFieldDecorator('zars', )(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="发现形式">
                                {getFieldDecorator('fxxs', {
                                    rules: [
                                        { required: false, message: '请输入发现形式' },
                                    ], initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入发现形式">
                                        {this.state.fxxs && this.state.fxxs.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="发案地点区县" >
                                {getFieldDecorator('faddQx', {
                                    initialValue: ''
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="发案地点街道" >
                                {getFieldDecorator('faddJd', )(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="督办级别">
                                {getFieldDecorator('dbjb', {
                                    rules: [
                                        { required: false, message: '请输入案件所属警区!' },
                                    ],
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入督办级别">
                                        {this.state.dbjb && this.state.dbjb.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="是否涉外" >
                                {getFieldDecorator('sfsw', {
                                    initialValue: ''
                                })(
                                    /*  <RadioGroup>
                                         <Radio value="YES" key='1'>是 </Radio>
                                         <Radio value="NO" key='0'>否</Radio>
                                     </RadioGroup> */
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入是否涉外">
                                        {this.state.sfsw && this.state.sfsw.map((item, i) => {
                                            return <Option value={item} key={i}>{item == 'YES' ? '是' : '否'}</Option>
                                        })}
                                    </Select>

                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="手段特点" >
                                {getFieldDecorator('sdtd', {
                                    rules: [
                                        { required: false, message: '请输入手段特点' },
                                    ], initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入手段特点">
                                        {this.state.sdtd && this.state.sdtd.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="死亡人数">
                                {getFieldDecorator('swrs', {
                                    // initialValue: "1"
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="犯罪主体类型" >
                                {getFieldDecorator('fzztlx', {
                                    initialValue: ''
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入案件危害程度">
                                        {this.state.ajwhcd && this.state.ajwhcd.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>

                                )}
                            </FormItem>
                        </Col>
                    </Row>


                    <Row>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ paddingLeft: "7%", textAlign: 'center' }} >
                            <Button type='primary' htmlType="submit" style={{ marginRight: '20px' }}>新增</Button>
                            <Button onClick={this.resetForm}>清空</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default Form.create()(Search)