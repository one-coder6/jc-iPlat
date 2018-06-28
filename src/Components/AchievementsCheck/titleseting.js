import React from 'react';
import { Layout, Table, Input, Button, Breadcrumb, Icon, Tag, Modal, message } from 'antd'
import CommonLayout from '../Content/Index'
import '../../styles/achievementscheck.less';
import { httpAjax, addressUrl } from '../../Util/httpAjax'; //引入自定义组件
import TitleForm from './editTitle'
const { Header, Footer, Sider, Content } = Layout;
const InputGroup = Input.Group;
/* 头衔设置 - 首页 */
export default class ScoutFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touxianlist: null,
            visible: false,
            delModalVisible: false,
            record: null,
            iconType: '',
            operationType: ''
        }
    }

    fetch = () => {
        httpAjax("get", addressUrl + '/integralTitle/list').then(res => {
            if (res.code == 200) {
                this.setState({ touxianlist: res.data.list })
                console.log(res.data.list)
            }
        })
    }

    componentWillMount() {
        //  请求头衔列表
        this.fetch();
    }

    componentWillReceiveProps = (nextProps) => {
        let pp = nextProps;
    }

    componentDidMount() {
    }

    addTitle = () =>{
        this.setState({ record: {},iconType: 'plus-circle-o', operationType: '添加', visible: true, });
    }

    updateRecord = (record) => {
        console.log(record)
        this.setState({ record: record, iconType: 'setting', operationType: '修改', visible: true, });
    }

    handleCancel = () => {
        this.setState({ visible: false});
    }

    handleUpdate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if(!err){
                let operationType = this.state.operationType;
                let url= '';
                if(operationType == '修改' ){
                    url = addressUrl + "/integralTitle/update";
                }else if(operationType == '添加'){
                    url = addressUrl + "/integralTitle/insert";
                }
                
                httpAjax("post", url, {...values}).then((res) =>{
                    if(res.code == 200){
                        message.success(operationType+"成功。");
                        this.setState({ visible: false });
                        form.resetFields();
                        this.fetch();
                    }else{
                        message.error(operationType+"失败，请重试或者联系管理员。");
                    }
                });
            }
        });
    }

    deleteRecord = (record) => {
        this.setState({ record: record,delModalVisible: true });
    }

    handleDelete = () => {
        console.log("delete");
        httpAjax("post", addressUrl + "/integralTitle/delete", {...this.state.record}).then((res) =>{
            if(res.code == 200){
                message.success("删除成功。");
                this.setState({ delModalVisible: false });
                this.fetch();
            }else{
                message.error("删除失败，请重试或者联系管理员。");
            }
        });
    }

    handleCancelDel = () => {
        this.setState({ delModalVisible: false });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const { touxianlist } = this.state;
        const columns_txdj = [{
            title: '头衔等级名称',
            align: 'center',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '门槛',
            align: "center",
            dataIndex: 'upperLimit',
            render: (text, record, index) => {
                return text == "1" ? ((record.lowerLimit || '') + '-' + (record.upperLimit || '') + ' 名') : ((record.upperLimit || '-') + ' 名')
            }
        }, {
            align: 'center',
            title: '操作',
            dataIndex: 'opera',
            render: (text, record) => {
                return <p><span onClick={() => { this.updateRecord(record) }} ><Tag color="cyan"><Icon type='edit' /> 修改</Tag></span><span onClick={() => { this.deleteRecord(record) }}><Tag color="cyan"><Icon type='delete' /> 删除</Tag></span></p>
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
                                <p><Button onClick={this.addTitle} type="primary"><Icon type="plus-circle-o" />添加头衔</Button></p>
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
                {
                    this.state.visible ? <TitleForm
                        record={this.state.record}
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleUpdate}
                        iconType={this.state.iconType} 
                        operationType={this.state.operationType}
                    /> : ''
                }
                <Modal
                    closable={false}
                    visible={this.state.delModalVisible}
                    onOk={this.handleDelete}
                    onCancel={this.handleCancelDel}
                >
                    <p>确认删除吗？</p>
                </Modal>
            </CommonLayout>
        )
    }
}