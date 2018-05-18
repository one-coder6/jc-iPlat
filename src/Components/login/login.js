import React from 'react';
import ReactDOM from 'react-dom';
import {
    connect
} from 'react-redux';
import { withRouter, } from 'react-router-dom';
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Icon
} from 'antd';

//引入redux
import {
    updateUser
} from '../../store/actions/index.js';

import {
    footerText
} from '../../Util/config';
import {
    httpAjax,
    addressUrl
} from '../../Util/httpAjax';

import '../../styles/login.less';
import LoginBg from '../../images/login_01.jpg'
const FormItem = Form.Item;
class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {
            history
        } = this.props;
        let reqUrl = addressUrl + '/user/login';
        this.props.form.validateFields((err, value) => {
            if (!err) {
                httpAjax('post', reqUrl, {
                    account: value.userName,
                    password: value.password
                }).then(res => {
                    let data = res.data;
                    sessionStorage.setItem("user", JSON.stringify(data));
                    let {
                        dispatch,
                        user
                    } = this.props;
                    // dispatch(updateUser({
                    //     userName: data.name,
                    //     account: data.account
                    // }))
                   history.push('/scoutPlat')
                })
            }
        })
    }
    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <div className='loginContent'>
                <div className='bg'>
                    {/*<img src={LoginBg} alt=""/>*/}
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xl={8} lg={8} md={4} sm={0} xs={0}></Col>
                        <Col xl={8} lg={8} md={16} sm={24} xs={24} style={{ marginTop: '20px' }}>
                            <Row gutter={16}>
                                <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: '请输入用户名' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入密码' }],
                                            initialValue: 123456
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                    <Button type="primary" htmlType="submit" style={{ marginTop: '4px', height: '30px' }}>登录</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={8} lg={8} md={4} sm={24} xs={24}></Col>
                    </Row>
                </Form>
                <footer style={{ textAlign: 'center', marginTop: '6%' }}>{footerText}</footer>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const Login = Form.create()(LoginForm)
export default withRouter(connect(mapStateToProps)(Login));