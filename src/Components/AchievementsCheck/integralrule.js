import React from 'react';
import { Layout, Table, Button, Breadcrumb, Icon, Tag, Modal, message } from 'antd'
import CommonLayout from '../Content/Index'
import '../../styles/achievementscheck.less';
import { httpAjax, addressUrl } from '../../Util/httpAjax'; //引入自定义组件
import CollectionCreateForm from './editIntegralRule' // 编辑
import { debug } from 'util';
const { Header, Footer, Sider, Content } = Layout;


/* 绩效考核 - 积分设置 */
export default class ScoutFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touxianlist: null,
            visible: false,
            record: null
        }
    }

    componentWillMount() {
        /*   /integralTitle/list */
        // 获取勘查信息和案件基本信息
        httpAjax("get", addressUrl + '/integralConfig/initData').then(res => {
            if (res.code == 200) {
                this.setState({ touxianlist: res.data.initData })
                console.log(res.data.initData)
            }
        })

    }
    componentWillReceiveProps = (nextProps) => {
        let pp = nextProps;
    }

    componentDidMount() {

    }

    // 修改一条记录
    updateRecord = (record) => {
        console.log(record)
        this.setState({ record: record, visible: true, });
    }

    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleUpdate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                httpAjax("post", addressUrl + "/integralConfig/insert", { ...values }).then((res) => {
                    if (res.code == 200) {
                        message.success("修改成功。")
                        this.setState({ visible: false });
                        form.resetFields();

                    } else {
                        message.error("修改失败，请重试或者联系管理员。")
                    }
                })
            }
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    render() {
        const { touxianlist } = this.state;
        const columns_jfgz = [{
            title: '用户行为',
            dataIndex: 'ruleName',
            align: 'center',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            align: 'center',
            title: '周期内最多奖励次数',
            dataIndex: 'awardLimit',
        }, {
            align: 'center',
            title: '积分类型',
            dataIndex: 'integralTypeCn',
        }, {
            align: 'center',
            title: '分数',
            dataIndex: 'integralType',
            render: (text, record, index) => {
                return text == "1" ? ((record.lowerLimit || '') + '-' + (record.upperLimit || '') + ' 分') : ((record.upperLimit || '-') + ' 分')
            }
        },
        {
            align: 'center',
            title: '操作',
            dataIndex: 'opera',
            render: (text, record) => {
                return <span onClick={() => { this.updateRecord(record) }}><Tag color="cyan"><Icon type='edit' /> 修改</Tag></span>
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
                                    <Breadcrumb.Item><a href="void(0)">积分设置</a></Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="point-content">
                                <p> 一、主办积分规则</p>
                                <div>
                                    <Table
                                        rowKey="key"
                                        columns={columns_jfgz}
                                        dataSource={touxianlist}
                                        bordered
                                        pagination={false}
                                        title={null}
                                        footer={null}
                                    />
                                </div>
                                <div className="point-footer" >
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
                {
                    this.state.visible ? <CollectionCreateForm
                        record={this.state.record}
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleUpdate}
                    /> : ''
                }

            </CommonLayout>
        )
    }
}