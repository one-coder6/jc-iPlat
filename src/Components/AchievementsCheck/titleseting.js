import React from 'react';
import { Layout, Table, Input,Button, Breadcrumb, Icon, Tag } from 'antd'
import CommonLayout from '../Content/Index'
import '../../styles/achievementscheck.less';
import { httpAjax, addressUrl } from '../../Util/httpAjax'; //引入自定义组件
const { Header, Footer, Sider, Content } = Layout;
const InputGroup = Input.Group;
/* 头衔设置 - 首页 */
export default class ScoutFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touxianlist: null,
            searchParam: null
        }
    }

    componentWillMount() {
        /*   /integralTitle/list */
        // 获取勘查信息和案件基本信息
        httpAjax("get", addressUrl + '/integralTitle/list').then(res => {
            if (res.code == 200) {
                this.setState({ touxianlist: res.data.list })
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
        const { touxianlist } = this.state;
        const columns_txdj = [{
            title: '头衔等级名称',
            align:'center',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '门槛',
            align: "center",
            dataIndex: 'upperLimit',
            render: (text, record, index) => {
                return <InputGroup compact>
                    <Input style={{ width: 100, textAlign: 'center' }} defaultValue={record.upperLimit} />
                    <Input style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="-" disabled />
                    <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} defaultValue={record.lowerLimit} />
                </InputGroup>
            }
        }, {
            align: 'center',
            title: '操作',
            dataIndex: 'opera',
            render: () => {
                return <span><Tag color="#108ee9">保存</Tag> <Tag color="#108ee9">删除</Tag></span>
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
                                    <Breadcrumb.Item><a href="void(0)">头衔设置</a></Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="point-content">
                                <p> 一、头衔等级</p>
                                <p><Button type="primary"><Icon type="plus-circle-o" />添加头衔</Button></p>
                                <div>
                                    <Table
                                        rowKey="key"
                                        columns={columns_txdj}
                                        dataSource={touxianlist}
                                        bordered
                                        pagination={false}
                                        title={null}
                                        footer={null}
                                    />
                                </div>
                                <div className="point-footer">
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </CommonLayout>
        )
    }
}