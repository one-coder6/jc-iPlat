import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, Upload, Button, Icon, TreeSelect, message } from 'antd';

import { httpAjax, addressUrl, UC_URL } from '../../../../Util/httpAjax';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const TreeNode = TreeSelect.TreeNode;
class PublishInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestModal: false,
            treeData: [],
            treeSelectKeys: [],
            treeDefaultValue: [],
            fileList: []
        }
    }

    componentWillMount() {
        //获取作战单位首层
        const reqUrl = UC_URL + "getTopDepartment";
        httpAjax("get", reqUrl, {}).then(res => {
            this.setState({ treeDefaultValue: res })
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: item.code,
                key: item.code,
            }))
            this.setState({ treeData: treeDataSource })
        })
    }
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

    getSelectKey = (value) => {
        const keyArr = [];
        value && value.map((item) => {
            keyArr.push(item.value)
        })
        this.setState({ treeSelectKeys: keyArr })
    }
    //点击提交
    handleSubmit = (e) => {
        e.preventDefault();
        const { treeSelectKeys ,fileList} = this.state;
        const { caseRecord } = this.props;
        const reqUrl = addressUrl + '/info/insert';
        this.props.form.validateFields((err, value) => {
            if (!err) {
                let formData = new FormData();
                const params = { ...value };
                //params.ajbh = caseRecord.ajbh;
                //params.fbfw = treeSelectKeys.join(",");
                Object.keys(params).forEach((item,index)=>{
					if(params[item]!=undefined){
                        if(item!=='files'||item!=='jsdwbh'){
                            formData.append(item,params[item]);
                        }						
					}					
                })
                fileList && fileList.map((item, index) => {
                    formData.append("files", item);
                })     
                formData.append("ajbh",caseRecord.ajbh) ;
                formData.append("jsdwbh" , treeSelectKeys&&treeSelectKeys.join(","))
                let config = {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                }
                httpAjax("post", reqUrl, formData, config).then(res => {
                    if (res.code === '200') {
                        message.success("发布消息成功");
                        this.props.handleCancel();
                    } else {
                        message.error("发布消息失败")
                        this.props.handleCancel();
                    }
                })
            }
        })
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
        const { treeData, treeDefaultValue, fileList } = this.state;
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
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="发布标题">
                    {getFieldDecorator('xxzt', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <Input placeholder='请输入发布标题' />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="可见单位" className='fightTeamForm'>
                    {getFieldDecorator('jsdwbh', {
                        // initialValue:[{ value: treeDefaultValue[0]&&treeDefaultValue[0].code, key:treeDefaultValue[0]&&treeDefaultValue[0].code,label: treeDefaultValue[0]&&treeDefaultValue[0].fullname }],
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TreeSelect
                            loadData={this.loadTreeData}
                            dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                            multiple
                            treeCheckable
                            treeCheckStrictly
                            onChange={this.getSelectKey}
                            searchPlaceholder='请选择单位'
                        >
                            {this.renderTreeNodes(treeData)}
                        </TreeSelect>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="发布内容">
                    {getFieldDecorator('fbnr', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TextArea placeholder='请输入发布内容' />
                    )}
                </FormItem>
                {/* <FormItem {...formItemLayout} label="发布类型">
                    {getFieldDecorator('inforType', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <Select placeholder='请选择发布类型'>
                            <Option value="1">手机号</Option>
                            <Option value="2">地址</Option>
                            <Option value="3">公安局</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="类型说明">
                    {getFieldDecorator('descition', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                    })(
                        <TextArea placeholder='请输入类型说明' />
                    )}
                </FormItem> */}
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
                <div style={{ textAlign: 'center' }}>
                    <Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </div>
            </Form>
        )
    }
}
export default Form.create()(PublishInfor)