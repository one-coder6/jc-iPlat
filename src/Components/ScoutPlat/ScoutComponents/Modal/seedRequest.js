import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Select, Upload, Button, Icon, DatePicker, message, TreeSelect } from 'antd';
import moment from 'moment';
import { httpAjax, addressUrl, UC_URL } from '../../../../Util/httpAjax';
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
            fileList: []
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
        const reqUrl = addressUrl + '/demand/insert';
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const beginCreateTime = moment(value.qqsj).format("YYYY-MM-DD HH:mm:ss");
                let formData = new FormData();
                const params = { ...value };
                formData.append("xqlx", value.xqlx&&value.xqlx.split("&")[0]);
                Object.keys(params).forEach((item,index)=>{
					if(params[item]!=undefined){
                        if(item!=='files'||item!=='qqsj'){
                            formData.append(item,params[item]);
                        }
					}					
                })
                formData.append("ajbh", caseRecord.ajbh);
                formData.append("qqsj",beginCreateTime);
                fileList && fileList.map((item, index) => {
                    formData.append("files", item);
                })                
                let config = {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                }
                httpAjax("post", reqUrl, formData, config).then(res => {
                    if (res.code === '200') {
                        message.success("创建需求成功");
                        this.props.handleCancel();
                    } else {
                        message.error("创建需求失败")
                        this.props.handleCancel();
                    }
                })
            }
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

        return (
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
                        >
                            {this.renderTreeNodes(treeData)}
                        </TreeSelect>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="需求类型">
                    {getFieldDecorator('xqlx', {
                        //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
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
                    <Button type='primary' htmlType="submit" style={{ marginRight: '10px' }}>提交</Button>
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </div>
            </Form>
        )
    }
}
export default Form.create()(CreateRequest)