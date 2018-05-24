import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Badge, message, Icon, Menu, Input, Dropdown, Tooltip, Button, Modal, Form } from 'antd';
import { httpAjax, addressUrl, GlobalWSUrl, UC_URL } from '../../Util/httpAjax';
import { ScoketHandler } from './websocket/socket.js';
import '../../styles/content/header.less';
const FormItem = Form.Item;
let Goloal_WS = null;
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            newNoticeList: [],
            viewModifePwd: false
        }
    }
    componentWillMount() {
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ user: user })
        //console.log("user",this.props.user)
        const reqUrl = addressUrl + '/notice/loadNotReadNotice';
        httpAjax("get", reqUrl, {}).then(res => {
            if (res.code === '200') {
                let data = res.data;
                this.setState({ newNoticeList: data })
                // 保存起来 noticelist
                sessionStorage.setItem("noticelistobj", JSON.stringify(data));
                this.connSocket();
            }
        })
    }
    componentWillUnmount() {
        Goloal_WS && Goloal_WS.onclose();
    }
    //退出
    logout = () => {
        console.log("props", this.props)
        const reqUrl = addressUrl + '/user/logout';
        httpAjax("get", reqUrl).then(res => {
            if (res.code === '200') {
                this.props.history.push('/')
            }
        })
    }
    // 修改密码
    updatePwd = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                debugger;
                if (values.newPwd != values.newPwd2) {
                    message.warning('2次输入的新密码不一致，请重试。', 10);
                    return false;
                } else if (values.oldPwd == values.newPwd) {
                    message.warning('新密码和旧密码不能一样，请重试。', 10);
                    return false;
                }
                else {
                    const reqUrl = UC_URL + '/uc/changePassword';
                    var user = JSON.parse(sessionStorage.getItem("user"));
                    let params = {
                        account: user.account,
                        oldPassword: values.oldPwd,
                        newPassword: values.newPwd
                    };
                    /*    httpAjax("post", reqUrl, params).then(res => {
                           if (res.code == 200) {
                               message.success('密码修改成功', 10);
                           } else {
                               message.error('密码修改失败【' + res.message + '】', 10);
                           }
                       }) */
                }
            }
        });
    }
    // 连接回话
    connSocket = () => {
        const { newNoticeList } = this.state;
        var user = JSON.parse(sessionStorage.getItem("user"));
        let shl = ScoketHandler(GlobalWSUrl + "?account=" + user.account);
        shl.init();
        // callback里面写websocket有新消息的逻辑
        shl.callback = (d) => {
            let data = d && JSON.parse(d).data;
            let _data = this.state.newNoticeList || [];
            _data.push(data);
            this.setState({ newNoticeList: _data });
            // 更新noticelist
            sessionStorage.setItem("noticelistobj", JSON.stringify(data));
        }
        Goloal_WS = shl;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { user } = this.state;
        user = user || JSON.parse(sessionStorage.getItem("user"));
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="">退出</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="">修改</a>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to='/systemSet'>个人中心</Link>
                </Menu.Item>
            </Menu>
        );
        let _tempList = this.state.newNoticeList || [];
        // 消息list
        const noticeList = (<Menu>
            {_tempList.map((item, i) => {
                let temp = item.anchor || "";
                let arr = temp.split('_');
                if (arr.length == 0) return false;
                //`/scoutPlat:${new Date().valueOf()}`
                return <Menu.Item>
                    <Link style={{ fontSize: 12 }} to={{ pathname: '/caseDetail', query: { ajbh: arr[0] } }} onClick={() => {
                        sessionStorage.setItem("ajbh", arr[0]);
                        sessionStorage.setItem("notic-anchor", temp);
                    }}>{(i + 1) + '.' + item.tznr || '-'}</Link>
                </Menu.Item>
            })
            }
        </Menu>
        );

        const logoutMenu = (<Menu>
            <Menu.Item key="0" style={{ display: 'none' }}>
                <a href="javaScript:void(0)" onClick={() => { this.setState({ viewModifePwd: true }) }} style={{ cursor: 'pointer' }} >修改密码</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="#" onClick={this.logout} style={{ cursor: 'pointer', textAlign: "center" }}>退 出</a>
            </Menu.Item>
        </Menu>
        )
        return (
            <div>
                <Row className='header'>
                    <Col xl={6} lg={8} md={8} sm={8} xs={6} className='logo'>
                        {/*<img src={logo} alt=""/>*/}
                        <div></div>
                    </Col>
                    <Col xl={12} lg={8} md={8} sm={8} xs={6} className='slogan' >
                        <h3>新时代  新挑战 新侦查</h3>
                    </Col>
                    <Col xl={6} lg={8} md={8} sm={8} xs={6}>
                        <Row>
                            {/* <Col xl={4} lg={3} md={3} sm={2} xs={2}>
                            <Badge count={5}>
                                <Icon type="mail" size='big' />
                            </Badge>
                        </Col> */}
                            <Col xl={4} lg={3} md={3} sm={2} xs={2}>
                                <Dropdown overlay={noticeList}>
                                    <Badge count={this.state.newNoticeList.length || 0}>
                                        <Icon type="message" />
                                    </Badge>
                                </Dropdown>
                            </Col>
                            <Col xl={16} lg={18} md={16} sm={18} xs={18}>
                                {/* <Dropdown overlay={menu} trigger={['click']}>
								<div style={{cursor: 'pointer'}}>
									<span>{user.name}  {user.account}</span> <Icon type="caret-down" />									
								</div>
                            </Dropdown>*/}
                                {/* <Tooltip title="退出">
                            </Tooltip> */}
                                <span>{user.name || '-'}  {user.account || '-'} </span>
                                <Dropdown overlay={logoutMenu}>
                                    <Icon type="logout" />
                                </Dropdown>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal
                    title={<span><Icon type="tool" /> 修改密码</span>}
                    wrapClassName="vertical-center-modal"
                    visible={this.state.viewModifePwd}
                    onOk={this.updatePwd}
                    onCancel={() => { this.setState({ viewModifePwd: false }) }}
                    footer={null}
                >
                    <Form /*  layout="inline" */ onSubmit={this.updatePwd} className="login-form">
                        <FormItem label="原密码">
                            {getFieldDecorator('oldPwd', {
                                rules: [{ required: true, message: '原密码不能为空' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入原密码" />
                            )}
                        </FormItem>
                        <FormItem label="新密码">
                            {getFieldDecorator('newPwd', {
                                rules: [{ required: true, message: '新密码不能为空' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" />
                            )}
                        </FormItem>
                        <FormItem label="新密码">
                            {getFieldDecorator('newPwd2', {
                                rules: [{ required: true, message: '新密码不能为空', validateFields: (e) => { alert(e) } }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" />
                            )}
                        </FormItem>
                        <FormItem style={{ textAlign: 'right' }}>
                            <Button onClick={() => { this.setState({ viewModifePwd: false }) }} style={{ marginRight: '10px' }}>取消</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(Header);
function mapStateToProps(state) {
    return { user: state.user }
}
export default withRouter(connect(mapStateToProps)(WrappedNormalLoginForm));
