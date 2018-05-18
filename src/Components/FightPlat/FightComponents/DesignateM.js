import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Select, Button, Icon, Radio, Input, message } from 'antd';


import { httpAjax, addressUrl, UC_URL } from '../../../Util/httpAjax';
import { thirdLayout } from '../../../Util/Flexout';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class DesignateMemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberList: []
        }
    }

    componentWillMount() {
        const deptCode =JSON.parse(sessionStorage.getItem("user")).department.code;
        const reqUrl = UC_URL + `/getUsersByDepartmentCode?deptCode=${deptCode}`;
        httpAjax("get", reqUrl).then(res => {
            this.setState({ memberList: res })
        })
    }

    //指派人员
    mapMemberList = (list) => {
        return list && list.map((item, index) => {
            return <Option value={item.account} key={index}>{item.name}</Option>
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { requestRecord } = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const reqUrl = addressUrl + '/demand/allocate';
                const options = {
                    jsrybh: '',
                    xqid: '',

                }
                const jsrybh = value.jsrybh.join(",")
                httpAjax("post", reqUrl, { jsrybh: jsrybh, xqid: requestRecord.id ,jjcd:value.jjcd}).then(res => {
                    if (res.code === '200') {
                        message.success("指派成功");
                        this.props.handleCancel();
                        this.props.getDataSource(10, 1)
                    } else {
                        message.error("指派失败");
                        this.props.handleCancel();
                        this.props.getDataSource(10, 1)
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { memberList } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...thirdLayout} label="重要程度">
                    {getFieldDecorator('jjcd', {
                        initialValue:2,
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <RadioGroup >
                            <Radio value={1}>高</Radio>
                            <Radio value={2}>中</Radio>
                            <Radio value={3}>低</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...thirdLayout} label="指派人员">
                    {getFieldDecorator('jsrybh', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <Select placeholder='请选择作战人员' showSearch mode="multiple" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                            {this.mapMemberList(memberList)}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...thirdLayout} label="备注">
                    {getFieldDecorator('remark', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TextArea />
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

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
const DesignateMember = Form.create()(DesignateMemberForm)
export default connect(mapStateToProps)(DesignateMember);