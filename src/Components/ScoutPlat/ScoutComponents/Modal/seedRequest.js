import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Input, Select, Radio, List, Table, Upload, Badge, Button, Icon, Modal, DatePicker, message, TreeSelect, Switch, Spin, Alert } from 'antd';
import moment from 'moment';
import { httpAjax, addressUrl, UC_URL } from '../../../../Util/httpAjax';
import { debug } from 'util';
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
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
            requestTypeCn: '', // 需求类型
            requestContent: '',// 需求内容
            remarkContent: '',// 说明内容
            treeDefaultValue: [],
            fileList: [],
            tempRequestData: [], // 保存多个需求
            tempListLoading: false, // 列表的loading
            tempListShow: false, // 多个需求组件的显示状态
            fileTypes: [],// 文件类型
            pagination: {
                pageSize: 100,
                hideOnSinglePage: true,
                showTotal: () => {
                    return `共 ${this.state.tempRequestData.length} 条`
                }
            }
        }
    }
    componentWillMount() {
        //获取作战单位首层
        const reqUrl = UC_URL + "getTopDepartment";
        httpAjax("post", reqUrl, {}).then(res => {
            this.setState({ treeDefaultValue: res })
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: item.code + '|' + item.fullname,
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
            //return <Option value={item.zdj} key={index}>{item.zdz}</Option>
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
                let formData = new FormData();
                const params = { ...value };
                let tempPush = {}
                Object.keys(params).forEach((item, index) => {
                    // 文件过滤掉
                    if (item !== 'files') {
                        let val = params[item];
                        // 加工需求类型
                        if (item == 'xqlx' && val) {
                            val = val.split("&")[0];
                        }
                        // 加工接收单位
                        if (item == 'jsdwbh' && val) {
                            val = val.split("|")[0];
                        }
                        // 加工需求说明
                        if (item == 'smbz') {
                            val = (val || '') + (params.fkts || '');
                        }
                        if (val) {
                            formData.append(item, val);

                        }
                        if (params[item]) {
                            tempPush[item] = params[item];
                        }
                    }
                })

                // 传递 caseRecord 过来的为null？
                let ajbh = caseRecord ? caseRecord.ajbh : sessionStorage.getItem('ajbh');
                formData.append("ajbh", ajbh);
                if (fileList && fileList.length) {
                    fileList.map((item, index) => {
                        let fileType = this.state.fileTypes[item.uid];
                        formData.append("files[" + index + "].fileType", fileType);
                        formData.append("files[" + index + "].file", item);
                    })
                }
                let temp = this.state.tempRequestData || [];
                tempPush.timekey = new Date().valueOf();
                tempPush.index = temp.length + 1;
                tempPush.fd = formData;
                temp.push(tempPush)
                /*   temp.push({
                      timekey: timekey,
                      index: temp.length + 1,
                      jsdwbh: value.jsdwbh.split('|')[1],
                      fkts: (value.fkts.toString().split('').map((i) => { if (!isNaN(parseInt(i))) { return i; } })).join(''),
                      fd: formData
                  }); */
                // this.ajaxLoad(formData)
                debugger;
                this.setState({ tempRequestData: temp, tempListLoading: true, tempListShow: true }, () => {
                    setTimeout(() => {
                        this.setState({ tempListLoading: false })
                    }, 500)
                })
            }
        })
    }
    // 请求接口获取数据
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

    // 多个需求循环发送
    multipleForm = () => {
        let params = this.state.tempRequestData;
        if (params && params.length) {
            params.forEach((item) => {
                this.ajaxLoad(item.fd)
            })
        } else {
            message.info("请先添加需求。")
        }
    }

    //异步加载子节点
    loadTreeData = (treeNode) => {
        const reqUrl = UC_URL + "getDepartmentByAny";
        return httpAjax("post", reqUrl, { pcode: treeNode.props.eventKey }).then(res => {
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: item.code + '|' + item.fullname,
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

    // 上传文件之前，选择文件之后
    beforeUpload = (file) => {
        debugger;
        // 赋值文件
        this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
        }));
        // 默认设置审批文书附件类型
        this.updateFileType(file.uid);
        return false;
    }
    //删除上传文件
    removeFileList = (file) => {
        // 删除文件
        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        });
        // 删除对应的附件类型
        this.delFileType(file.uid)
    }
    // 修改对应附件类型
    updateFileType = (key, val) => {
        let temp = this.state.fileTypes || {}
        temp[key] = val || '1';
        this.setState({ fileTypes: temp });
        console.log(this.state.fileTypes)
    }
    // 删除对应附件类型
    delFileType = (key) => {
        let temp = this.state.fileTypes || {}
        delete temp[key]
        this.setState({ fileTypes: temp });
        console.log(this.state.fileTypes)
    }
    
    onPreview = (e) => {
        console.log(e)
        debugger;
    }
    render() {
        const { demandType, treeSelectKeys, requestTypeCn, requestContent,
            treeDefaultValue, treeData, fileList, pagination } = this.state;
        const { getFieldDecorator } = this.props.form;
        const props = {
            action: `${addressUrl}/demand/insert`,
            onRemove: this.removeFileList,
            beforeUpload: this.beforeUpload,
            name: 'files',
            onPreview: this.onPreview,
            showUploadList: false,
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

        let toggleDelBtn = (e, t) => {
            // e.nativeEvent.stopImmediatePropagation()
            let dom = document.getElementById(e);
            //  let dom = e.target.nextElementSibling; // 下一个节点
            dom.style.display = t == 'hide' ? 'none' : 'inline-block'
        }
        // 修改一条临时需求
        let updateBytemp = (record) => {
            debugger;
            let temp = this.state.tempRequestData,
                cur = temp[record.index - 1],
                target = {
                    xqmc: record.xqmc,
                    xqnr: record.xqnr,
                    smbz: record.smbz,
                    sendMessage: record.sendMessage,
                    //  qqsj: moment(record.qqsj).format('YYYY-MM-dd HH:mm:ss')
                }
            // 赋值
            cur.fd.forEach((i, j) => {
                if (i && j) {
                    if (j == 'fkts') {
                        target[j] = i;
                    }
                }
            })
            debugger;
            // setFieldsValue
            this.props.form.setFieldsValue(target)
        }
        let delAloneList = (index) => {
            if (window.confirm("确定移除吗？")) {
                this.setState({ tempListLoading: true })
                let temp = this.state.tempRequestData;
                temp.splice(temp.findIndex(() => temp[index]), 1);
                this.setState({ tempRequestData: temp }, () => {
                    this.setState({ tempListLoading: false });
                });
            }
        }
        const columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '需求名称',
            dataIndex: 'xqmc',
            key: 'xqmc',
        }, {
            title: '融合作战单位',
            dataIndex: 'jsdwbh',
            key: 'jsdwbh',
            render: (text, record, index) => {
                return text ? text.toString().split('|')[1] : '-';
            }
        }, {
            title: '反馈天数',
            align: 'center',
            dataIndex: 'fkts',
            key: 'fkts',
            render: (text, record, index) => {
                return text ? (text.toString().split('').map((i) => { if (!isNaN(parseInt(i))) { return i; } })).join('') : '-'
            }
        }, {
            title: '删除',
            align: 'center',
            dataIndex: 'address',
            key: 'address',
            render: (text, record, index) => {
                return <span><a href='javascript:' title='修改' onClick={() => { updateBytemp(record) }} style={{ marginRight: 10, display: 'none' }}><Icon type="form" /></a>
                    <a href='javascript:' title='删除' onClick={() => { delAloneList(record.index) }} ><Icon type="close-square-o" /></a></span>
            }
        }];

        return (
            <div>
                {/*   <Animate showProp="visible" transitionAppear='true' transitionName="fade">
                    {this.state.show ? <div visible key="1">示例</div> : null}
                </Animate> */}
                {/* 弹出层 */}
                <div style={{
                    width: 363,
                    opacity:/*  this.state.tempListShow ? 1 : */ 0,
                    height: 792,
                    //  height: this.state.tempListShow ? 792 : 0,
                    top: 0,
                    background: '#fff',
                    position: 'absolute',
                    zIndex: 1,
                    right: -364,
                    padding: 10,
                    border: '1px solid #ededed',
                    borderRadius: 5,
                    /*     display: this.state.tempListShow ? 'block' : 'none', */
                    transition: 'height 0.7s,opacity 0.3s'
                }} key="1">
                    <div style={{ width: '100%', borderBottom: "1px solid  #e8e8e8" }}>
                        <span style={{ padding: '8px 0px 14px', display: 'inline-block' }}>
                            <span> <Icon type="pushpin" /> 已添加的需求</span>
                        </span>
                        <button aria-label="Close" className="ant-modal-close" onClick={() => { this.setState({ tempListShow: false }) }}><span className="ant-modal-close-x"></span></button>
                    </div>
                    <div><List
                        style={{
                            maxHeight: 659,
                            overflow: "auto",
                            padding: '0 10px'
                        }}
                        loading={this.state.tempListLoading}
                        itemLayout="horizontal"
                        dataSource={this.state.tempRequestData}
                        renderItem={(item, index) => (
                            <QueueAnim type='left'>
                                <List.Item style={{ borderBottom: "1px dashed #e8e8e8" }} key={index}>
                                    <List.Item.Meta onMouseMove={() => { toggleDelBtn('tempLi' + item.timekey, 'show') }} onMouseLeave={() => { toggleDelBtn('tempLi' + item.timekey, 'hide') }}
                                        title={<span>
                                            <span title={item.title} style={{ display: 'inline-block', width: 290, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{index + 1}.{item.title}</span>
                                            <a id={'tempLi' + item.timekey} style={{ display: 'none', float: 'right' }} href="javascript:"><Icon type="delete" title="移除" onClick={() => { delAloneList(index) }} /></a>
                                        </span>}
                                        description={<span>{item.cont}</span>}
                                    />
                                </List.Item>
                            </QueueAnim>
                        )}
                    />
                        <p style={{ padding: 20, textAlign: "center" }}><Button style={{ width: "80%" }} type="primary">确认提交</Button></p>
                    </div>
                </div>
                {/* 数量提示 */}
                <div style={{ zIndex: 2, position: 'absolute', top: 55, right: 17, display:/*  !this.state.tempListShow && this.state.tempRequestData && this.state.tempRequestData.length ? 'block' :  */'none' }}>
                    <div style={{ height: 30, width: 1, background: '#52c41a', margin: '0 auto', marginBottom: -5 }}></div>
                    <div style={{ cursor: 'pointer' }} onClick={() => { this.setState({ tempListShow: true }) }}><Badge count={this.state.tempRequestData.length} style={{ backgroundColor: '#52c41a' }} /></div>
                </div>
                {/* 表单 */}
                <Form onSubmit={this.handleSubmit} method="post">
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="需求类型">
                                {getFieldDecorator('xqlx', {
                                    rules: [{ required: true, message: '请选择需求类型' },],
                                })(
                                    <Select placeholder='请选择需求类型' onChange={this.selectType}>
                                        {this.renderOption(demandType)}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="需求内容">
                                {getFieldDecorator('xqnr', {
                                    rules: [{ required: true, message: '请输入需求内容.' },],
                                })(
                                    <Input placeholder='请输入需求内容' onChange={this.changeXqnr} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="需求名称">
                                {getFieldDecorator('xqmc', {
                                    initialValue: `${requestTypeCn}${requestContent}`,
                                    //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                                })(
                                    <Input placeholder='请输入需求名称' />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="需求说明">
                                {getFieldDecorator('smbz', {
                                    //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                                })(
                                    <TextArea placeholder='请输入需求说明' />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="融合作战单位" >
                                {getFieldDecorator('jsdwbh', {
                                    initialValue: '' /* treeDefaultValue && treeDefaultValue[0] && treeDefaultValue[0].code */,
                                    rules: [{ required: true, message: '请选择融合作战单位' },],
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
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="反馈天数">
                                {getFieldDecorator('fkts', {
                                    rules: [{ required: true, message: '请选择反馈天数' },],
                                })(
                                    <RadioGroup >
                                        <Radio value="（请在 1 天内反馈）">1天</Radio>
                                        <Radio value="（请在 3 天内反馈）">3天</Radio>
                                        <Radio value="（请在 5 天内反馈）">5天</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
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
                                        allowClear={false}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="短信通知">
                                {getFieldDecorator('sendMessage', { valuePropName: 'checked', initialValue: false, })(
                                    <Switch />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
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
                                <div className="fileTypeSet" style={{
                                    display: this.state.fileList && this.state.fileList.length ? 'block' : "none"
                                }}>
                                    {this.state.fileList && this.state.fileList.map((item) => {
                                        return <p>
                                            <select onChange={(e) => { this.updateFileType(item.uid, e.target.value) }}>
                                                <option value='1'>审批文书</option>
                                                <option value='2'>法律文书</option>
                                                <option value='3'>证据材料</option>
                                                <option value='4'>其他</option>
                                            </select>
                                            <span title={item.name}> {item.name}</span>
                                            <Icon title='删除' onClick={(e) => { this.removeFileList(item) }} type="close" />
                                        </p>
                                    })}
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="附件说明">
                                {getFieldDecorator('fileComment', {
                                    //rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' },],
                                })(
                                    <TextArea placeholder='请输入附件说明' />
                                )}
                            </FormItem>
                        </Col>

                    </Row>
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
                    <Table loading={this.state.tempListLoading} style={{ border: '0px solid red', maxHeight: 324, overflow: 'auto' }}
                        dataSource={this.state.tempRequestData}
                        pagination={pagination}
                        columns={columns}
                    /*     title={() => '已添加的需求'} */
                    />
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>添加</Button>
                        <Button type='primary' onClick={this.multipleForm} style={{ marginRight: '10px' }}>提交</Button>
                        <Button onClick={() => { this.props.form.resetFields() }}>清空</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(CreateRequest)