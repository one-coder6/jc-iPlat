import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
import { Link, NavLink, } from 'react-router-dom';

//引入自定义组件
import HeaderCom from '../Common/HeaderComponent';
import BreadNav from '../Common/BreadNav';
import { footerText } from '../../Util/config';
import '../../styles/common.less';
import '../../styles/layout.less';
const { Header, Footer, Content } = Layout;

export default class ContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            changerNotice: false
        }
    }
    handleClick = (e) => {
        sessionStorage.setItem("currentMenu", e.key)
    }
    componentWillMount() {
        // 保存获取消息的开关
        window.changerNotice = () => {
            this.setState({ changerNotice: true })
        };
        let menu = sessionStorage.getItem("currentMenu") || '';
        this.setState({ current: menu });
    }
    render() {
        return (
            <Layout className='mainContent'>
                <Header>
                    <HeaderCom changerNotice={this.state.changerNotice} />
                </Header>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.state.current}
                    mode="horizontal"
                    className='menuNav'
                >
                    <Menu.Item key="index">
                        <NavLink to='/index' activeClassName="activeRouter" >
                            <Icon type="home" />首页
						</NavLink>
                    </Menu.Item>
                    <Menu.Item key="scoutPlat" >
                        <NavLink to='/scoutPlat' activeClassName="activeRouter" >
                            <Icon type="search" />侦查工作台
						</NavLink>
                    </Menu.Item>
                    <Menu.Item key="fightPlat" >
                        <NavLink to='/fightPlat' activeClassName="activeRouter" >
                            <Icon type="team" />融合作战工作台
						</NavLink>
                    </Menu.Item>
                    <Menu.Item key="scoutFile" >
                        <NavLink to='/scoutFile' activeClassName="activeRouter" >
                            <Icon type="profile" />侦查档案
						</NavLink>
                    </Menu.Item>
                    <Menu.Item key="userCenter" >
                        <NavLink to='/userCenter' activeClassName="activeRouter" >
                            <Icon type="user" />我的档案
						</NavLink>
                    </Menu.Item>
                </Menu>
                {/* <BreadNav /> */}
                <Content>
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center', background: '#3ba0e9', color: '#fff' }}>
                    {/* {footerText} */}
                    <p>制作单位：深圳市刑事侦查局</p>
                    <p>研发单位：深圳市华云中盛科技有限公司</p>
                    <p>维护电话：13537883060（刘）</p>
                </Footer>
            </Layout>
        )
    }
}