import React from 'react';
import { Layout, Table, Breadcrumb } from 'antd'
import CommonLayout from '../Content/Index'
import '../../styles/achievementscheck.less';
import { httpAjax, addressUrl } from '../../Util/httpAjax'; //引入自定义组件
const { Header, Footer, Sider, Content } = Layout;

/* 绩效考核 - 首页 */
export default class ScoutFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            integralTitle: null,
            integralRule: null
        }
    }

    componentWillMount() {
        /*   /integralTitle/list */
        // 头衔
        httpAjax("get", addressUrl + '/integralTitle/list').then(res => {
            if (res.code == 200) {
                this.setState({ integralTitle: res.data.list })
                console.log(res.data.list)
            }
        })

        // 积分规则
        httpAjax("get", addressUrl + '/integralConfig/list').then(res => {
            if (res.code == 200) {
                this.setState({ integralRule: res.data.list })
                console.log(res.data.list)
            }
        })
    }
    componentWillReceiveProps = (nextProps) => {
        let pp = nextProps;
    }

    componentDidMount() {
    }

    render() {
        const { integralTitle, integralRule } = this.state;
        const columns_jfgz = [{
            title: '用户行为',
            align: "center",
            dataIndex: 'ruleName',
            render: text => <a title={text} href="javascript:;">{text}</a>,
        }, {
            align: "center",
            title: '周期内最多奖励次数',
            dataIndex: 'awardLimit',
            render: (text) => {
                return text + ' 次';
            }
        }, {
            align: "center",
            title: '分数',
            dataIndex: 'integralType',
            render: (text, record, index) => {
                return text == "1" ? (record.lowerLimit + '-' + record.upperLimit + ' 分') : (record.upperLimit + ' 分')
            }
        }
        ];

        const columns_txdj = [{
            title: '头衔等级名称',
            align: "center",
            dataIndex: 'name',
            render: text => <a title={text} href="javascript:;">{text}</a>,
        }, {
            title: '门槛',
            align: "center",
            dataIndex: 'upperLimit',
            render: (text, record, index) => {
                return <span>{record.upperLimit + '-' + record.lowerLimit+' 名'}</span>
            }
        }
        ];


        return (
            <CommonLayout>
                <Layout>
                    <Content>
                        <div className="point-body">
                            <div className="point-title">
                                <Breadcrumb>
                                    <Breadcrumb.Item>绩效考核</Breadcrumb.Item>
                                    <Breadcrumb.Item><a href="void(0)">积分规则</a></Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="point-content">
                                <p> 一、积分介绍</p>
                                <div>
                                    主办积分是根据主办侦查员在案件审查过程中的“提取案件、提取警情、自创案件、创建需求、发布信息、破案、串并案”等行为综合得出。
                                </div>
                            </div>
                            <div className="point-content">
                                <p> 二、积分规则</p>
                                <div>
                                    <Table
                                        style={{ width: '50%' }}
                                        rowKey="key"
                                        columns={columns_jfgz}
                                        dataSource={integralRule}
                                        bordered
                                        pagination={false}
                                    />
                                </div>
                            </div>
                            <div className="point-content">
                                <p> 三、头衔等级</p>
                                <div>
                                    <Table
                                        style={{ width: '25%' }}
                                        rowKey="key"
                                        columns={columns_txdj}
                                        dataSource={integralTitle}
                                        bordered
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </CommonLayout>
        )
    }
}