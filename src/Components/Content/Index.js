import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link, NavLink, } from 'react-router-dom';

//引入自定义组件
import HeaderCom from '../Common/HeaderComponent';
import BreadNav from '../Common/BreadNav';
import '../../styles/common.less';
import '../../styles/layout.less';
const { Header, Footer, Content } = Layout;

export default class ContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'index',
        }
    }
    handleClick = (e) => {
        //console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Layout className='mainContent'>
                <Header>
                    <HeaderCom />
                </Header>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className = 'menuNav'
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
                    <Menu.Item key="userCenter" >
                        <NavLink to='/userCenter' activeClassName="activeRouter" >
                            <Icon type="user" />个人工作台
						</NavLink>
                    </Menu.Item>
                    <Menu.Item key="scoutFile" >
                        <NavLink to='/scoutFile' activeClassName="activeRouter" >
                            <Icon type="profile" />侦查档案
						</NavLink>
                    </Menu.Item>
                </Menu>
                {/* <BreadNav /> */}
                <Content>
                    {this.props.children}
                </Content>
                {/*<Footer>Footer</Footer>*/}
            </Layout>
        )
    }
}