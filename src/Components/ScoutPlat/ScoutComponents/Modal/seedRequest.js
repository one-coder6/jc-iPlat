import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, List, Avatar, Upload, Button, Icon, DatePicker, message, TreeSelect, notification, Switch } from 'antd';
import moment from 'moment';
import { httpAjax, addressUrl, UC_URL } from '../../../../Util/httpAjax';
import LeftRightDoor from '../../../Common/LeftRightDoor/leftrightdoor'
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class CreateRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagColor: '#108ee9',
            tagBack: '#fff',
            requestModal: false,
            treeData: [],
            demandType: [],
            treeSelectKeys: "",
            requestTypeCn: '',
            requestContent: '',
            treeDefaultValue: [],
            fileList: [],
            tempRequestData: [], // 保存多个需求
            tempListLoading: false, // 列表的loading
        }
    }
    componentWillMount() {

        //获取作战单位首层
        const reqUrl = UC_URL + "getTopDepartment";
        httpAjax("post", reqUrl, {}).then(res => {
            this.setState({ treeDefaultValue: res })
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: item.code,
                key: item.code,
            }))
            this.setState({ treeData: treeDataSource })
        })

        //获取需求类型
        let damandUrl = addressUrl + '/dic/listByDemandType';
        httpAjax("get", damandUrl).then(result => {
            if (result.code == 200) {
                this.setState({ demandType: result.data })
            }
        })
    }

    //渲染下拉框
    renderOption = (selectArr) => {
        const options = selectArr && selectArr.map((item, index) => {
            return <Option value={item.zdj + "&" + item.zdz} key={index}>{item.zdz}</Option>
        })
        return options;
    }
    // 选择需求类型
    selectType = (value) => {
        this.setState({ requestTypeCn: value.split("&")[1] })
    }

    //获取更新的需求内容
    changeXqnr = (e) => {
        this.setState({ requestContent: e.target.value })
    }
    //提交创建需求
    handleSubmit = (e) => {
        e.preventDefault();
        const { treeSelectKeys, fileList } = this.state;
        const { caseRecord } = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                debugger;
                const beginCreateTime = moment(value.qqsj).format("YYYY-MM-DD HH:mm:ss");
                let formData = new FormData();
                const params = { ...value };
                formData.append("xqlx", value.xqlx && value.xqlx.split("&")[0]);

                Object.keys(params).forEach((item, index) => {
                    if (params[item] != undefined) {
                        if (item !== 'files') {
                            formData.append(item, params[item]);
                        }
                    }
                })
                // 传递 caseRecord 过来的为null？
                let ajbh = caseRecord ? caseRecord.ajbh : sessionStorage.getItem('ajbh');
                formData.append("ajbh", ajbh);
                formData.append("qqsj", beginCreateTime);
                if (fileList && fileList.length) {
                    fileList.map((item, index) => {
                        formData.append("files", item);
                    })
                }
                let temp = this.state.tempRequestData || [],
                    timekey = new Date().valueOf();
                temp.push({ title: value.xqmc, cont: value.xqnr, fd: formData });
                this.setState({ tempRequestData: temp, /* tempListLoading: true  */ }, () => {

                    this.openNotification();
                    // this.ajaxLoad(formData)
                })

            }
        })
    }
    ajaxLoad = (formData) => {
        const reqUrl = addressUrl + '/demand/insert';
        let config = {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }
        httpAjax("post", reqUrl, formData, config).then(res => {
            if (res.code === '200') {
                message.success("创建需求成功");
                this.props.form.resetFields();
                this.props.handleCancel();
            } else {
                message.error("创建需求失败")
                this.props.handleCancel();
            }
        })
    }
    // 列表
    list = () => {
        return <div><List
            style={{
                maxHeight: 700,
                overflow: "auto"
            }}
            loading={this.state.tempListLoading}
            itemLayout="horizontal"
            dataSource={this.state.tempRequestData}
            renderItem={(item, index) => (
                <List.Item style={{ borderBottom: "1px dashed #e8e8e8" }}>
                    <List.Item.Meta
                        title={<span ><a href="#"><Icon type="delete" title="移除" onClick={() => { alert(index) }} /> {item.title}</a></span>}
                        description={item.cont}
                    />
                </List.Item>
            )}
        />
            <p style={{ padding: 20, textAlign: "center" }}><Button style={{ width: "80%" }} type="primary">确认提交</Button></p>
        </div>
    }
    // 右侧显示临时多个需求
    openNotification = () => {
        notification.open({
            message: <div style={{ width: '356px', padding: "10px 0", borderBottom: "1px solid  #e8e8e8" }}><Icon type="appstore" /> 已添加的需求</div>,
            duration: null,
            description: <div>{this.list()}</div>,
            style: {
                marginRight: 0,
                marginRight: '-25px',
                bordeRadius: 0,
                marginTop: '-21px',
                /*  height: '1200px', */
                marginLeft: 0,
            }
        });
        this.setState({ tempListLoading: false })
    };

    //异步加载子节点
    loadTreeData = (treeNode) => {
        const reqUrl = UC_URL + "getDepartmentByAny";
        return httpAjax("post", reqUrl, { pcode: treeNode.props.eventKey }).then(res => {
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: item.code,
                key: item.code,
            }))
            treeNode.props.dataRef.children = treeDataSource;
            this.setState({ treeData: [...this.state.treeData] });
        })
    }
    //获取树节点的Key
    treeSelectKeys = (value) => {
        this.setState({ treeSelectKeys: value })
    }
    //渲染树子节点
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} value={item.value} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />
        });
    }

    beforeUpload = (file) => {
        this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
        }));
        return false;

    }
    //删除上传文件
    removeFileList = (file) => {
        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        });
    }
    render() {
        const { demandType, treeSelectKeys, requestTypeCn, requestContent, treeDefaultValue, treeData, fileList } = this.state;
        const { getFieldDecorator } = this.props.form;
        const props = {
            action: `${addressUrl}/demand/insert`,
            onRemove: this.removeFileList,
            beforeUpload: this.beforeUpload,
            name: 'files'
            //fileList: this.state.fileList,
        };
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 5
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 12
                },
            },
        };
        const ContentBody = <div style={{ border: '1px solid red' }}><p>标题</p><p>内容</p></div>
        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            }, {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            }
        ];

        return (
            <div>
                <LeftRightDoor
                    titleCont={<span><Icon type="appstore" /> 已添加的需求</span>}
                    content={<p>一个标签</p>}
                    onOpen={true}
                    onClose={true}></LeftRightDoor>
                <Form onSubmit={this.handleSubmit} method="post">
                    <FormItem {...formItemLayout} label="融合作战单位" className='fightTeamForm'>
                        {getFieldDecorator('jsdwbh', {
                            initialValue: treeDefaultValue && treeDefaultValue[0] && treeDefaultValue[0].code,
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <TreeSelect
                                loadData={this.loadTreeData}
                                dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                                onSelect={this.treeSelectKeys}
                                searchPlaceholder='融合作战单位'
                                treeDefaultExpandAll
                            >
                                {this.renderTreeNodes(treeData)}
                            </TreeSelect>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="需求类型">
                        {getFieldDecorator('xqlx', {
                            rules: [{ required: true, message: '请选择需求类型' },],
                        })(
                            <Select placeholder='请选择需求类型' onChange={this.selectType}>
                                {this.renderOption(demandType)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="需求内容">
                        {getFieldDecorator('xqnr', {
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <Input placeholder='请输入需求内容' onChange={this.changeXqnr} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="需求说明">
                        {getFieldDecorator('smbz', {
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <TextArea placeholder='请输入需求说明' />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="需求名称">
                        {getFieldDecorator('xqmc', {
                            initialValue: `${requestTypeCn}${requestContent}`,
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <Input placeholder='请输入需求名称' />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="创建时间">
                        {getFieldDecorator('qqsj', {
                            initialValue: moment(new Date()),
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="请选择创建时间"
                                onChange={this.onChange}
                                onOk={this.onOk}
                            />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="短信通知">
                        {getFieldDecorator('sendMessage', { valuePropName: 'checked', initialValue: false, })(
                            <Switch />
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label="附件">
                        {getFieldDecorator('files', {
                            // valuePropName: 'fileList',
                            // getValueFromEvent: this.normFile,
                            initialValue: fileList
                        })(
                            <Upload {...props} multiple >
                                <Button>
                                    <Icon type="upload" /> 添加附件
		                     </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="附件说明">
                        {getFieldDecorator('fileComment', {
                            //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                        })(
                            <TextArea placeholder='请输入附件说明' />
                        )}
                    </FormItem>
                    {/*<FormItem {...formItemLayout} label="审批文书">
				  {getFieldDecorator('isApprove', {
				    //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
				  })(
				    <Select placeholder='请选择审批文书'>
				      <Option value="1">是</Option>
				      <Option value="2">否</Option>
				    </Select>
				  )}
				</FormItem>*/}
                    <div style={{ textAlign: 'center' }}>
                        {/*   <Button type="primary" style={{ marginRight: '10px' }} onClick={openNotification}>添加</Button> */}
                        <Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
                        <Button onClick={this.props.handleCancel}>取消</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(CreateRequest)