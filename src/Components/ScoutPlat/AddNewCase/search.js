import React from 'react';
import { Row, Col, Button, Form, DatePicker, Tag, Checkbox, Input, Select, Icon, message, Radio } from 'antd';
//引入自适应文件
import { thirdLayout } from '../../../Util/Flexout.js';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import ZBDW from '../../../Components/Common/organization/zbdw';
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.RadioGroup;
const { TextArea } = Input;
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
            department: {}
        }
    }
    componentWillMount() {
        const reqUrl = addressUrl + '/cases/initData';
        httpAjax("get", reqUrl).then(res => {
            if (res.code == 200) {
                sessionStorage.setItem('jcdata', JSON.stringify(res.data))
                this.setState({ ...res.data })
            }
        })
        // 单独取这3个字段
        /* 
        1、案别：ab
        2、所属警区：ajssjq
        3、所属社区：sssq 
        */
        let arr = [{ lxbh: 'ab' }, { lxbh: 'ajssjq' }, { lxbh: 'sssq' }];
        arr.forEach((item) => {
            this.ajaxLoadOther(item)
        })
        const user = JSON.parse(sessionStorage.getItem("user"));
        let department = user.department;
        this.setState({ department: department })
    }

    // 加载其它字段
    ajaxLoadOther = (params) => {
        const reqUrl = addressUrl + '/dic/listByLxbh';
        httpAjax("get", reqUrl, { params: params }).then(res => {
            if (res.code == 200) {
                // 动态属性名称
                //  let key = Object.keys(params)[0];
                this.setState({ [params.lxbh]: res.data || [] })
            }
        })
    }

    //清空
    resetForm = () => {
        this.props.form.resetFields();
        /*   this.props.form.setFieldsValue({
          }); */
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { handelInsertCase } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = {};
                Object.keys(values).forEach((item, i) => {
                    let val = values[item];
                    if (val) {
                        params[item] = val
                    }
                })
                const reqUrl = addressUrl + '/cases/insert';
                httpAjax("post", reqUrl, { ...params }).then(res => {
                    if (res.code == 200) {
                        message.success('创建成功。', 10)
                        handelInsertCase()
                    } else {
                        message.error('创建失败青重试。', 10);
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { caseStatus } = this.state;
        // 开始时间
        const startTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        return (
            <div style={{ padding: '20px', background: '#fff' }}>
                <Form onSubmit={this.handleSubmit}>
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
                                    ],
                                })(
                                    <Input placeholder='请输入案件名称' />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="案发地点" >
                                {getFieldDecorator('fadd', {

                                })(
                                    <Input placeholder='请输入案发地点' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="主要案情" >
                                {getFieldDecorator('zyaq', {
                                    rules: [
                                        { required: true, message: '请输入主要案情' },
                                    ],
                                })(
                                    <TextArea rows={3} />
                                )}
                            </FormItem>
                        </Col>
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

                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="发案地域" >
                                {getFieldDecorator('fady', {
                                    rules: [
                                        { required: false, message: '请输入发案地域' },
                                    ],
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
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入案件状态">
                                        {this.state.ajstate && this.state.ajstate.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="受理单位" >
                                {getFieldDecorator('sljsdw', { initialValue: this.state.department.code })(
                                    <ZBDW placeholder="请输入受理单位" />
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
                            <FormItem {...thirdLayout} label="报警方式" >
                                {getFieldDecorator('slJjfs', {
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
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="主办单位" >
                                {getFieldDecorator('zbdw', {

                                })(
                                    <ZBDW placeholder="请输入主办单位" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="案别">
                                {getFieldDecorator('ab', {
                                    // initialValue: "1"
                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请选择案别">
                                        {this.state.ab && this.state.ab.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="专案标识" >
                                {getFieldDecorator('zabz', {

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
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="立案人员">
                                {getFieldDecorator('ajlary', {
                                    // initialValue: "1"
                                })(
                                    <Input placeholder="请输入立案人员" />
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
                                    // 后期单独接口
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入案件所属警区">
                                        {this.state.sssq && this.state.sssq.map((item, i) => {
                                            return <Option value={item.zdj} key={i}>{item.zdz}</Option>
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="选择部位" >
                                {getFieldDecorator('xzbw', {

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
                                    <Input placeholder="请输入作案人数" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="发现形式">
                                {getFieldDecorator('fxxs', {
                                    rules: [
                                        { required: false, message: '请输入发现形式' },
                                    ],
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

                                })(
                                    <Input placeholder="请输入发案地点区县" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="发案地点街道" >
                                {getFieldDecorator('faddJd', )(
                                    <Input placeholder="请输入发案地点街道" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem   {...thirdLayout} label="督办级别">
                                {getFieldDecorator('dbjb', {
                                    rules: [
                                        { required: false, message: '请输入督办级别!' },
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

                                })(

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
                                    ],
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
                                    <Input placeholder="请输入死亡人数" />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                            <FormItem {...thirdLayout} label="犯罪主体类型" >
                                {getFieldDecorator('fzztlx', {

                                })(
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        placeholder="请输入犯罪主体类型">
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
                            <FormItem {...thirdLayout} label="案件危害程度" >
                                {getFieldDecorator('ajwhcd', {
                                    rules: [
                                        { required: false, message: '请输入案件危害程度' },
                                    ],
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
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>

                        </Col>
                        <Col xl={8} lg={8} md={8} sm={24} xs={24}>

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