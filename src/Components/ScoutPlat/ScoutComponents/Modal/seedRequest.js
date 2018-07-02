import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Input, Select, Radio, List, Table, Upload, Badge, Button, Icon, Modal, DatePicker, message, TreeSelect, Switch, Spin, Alert } from 'antd';
import moment from 'moment';
import { httpAjax, addressUrl, UC_URL } from '../../../../Util/httpAjax';
import ZBDW from '../../../../Components/Common/organization/zbdw';
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
            demandType: [],
            requestTypeCn: '', // 需求类型
            requestContent: '',// 需求内容
            remarkContent: '',// 说明内容
            fileList: [],
            tempRequestData: [], // 保存多个需求
            tempListLoading: false, // 列表的loading
            tempListShow: false, // 多个需求组件的显示状态
            fileTypes: [],// 文件类型
            diyValue: "",// 融合作战单位 key
            pagination: {
                pageSize: 100,
                hideOnSinglePage: true,
                showTotal: () => {
                    return `共 ${this.state.tempRequestData.length} 条`
                }
            },
            xqnrPlaceholder: "请输入需求内容"
        }
    }
    componentWillMount() {
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
        let text = value.split("&");
        this.setState({ requestTypeCn: text[1], xqnrPlaceholder: '请输入' + text[1] })
    }

    //获取更新的需求内容
    changeXqnr = (e) => {
        this.setState({ requestContent: e.target.value })
    }

    //提交创建需求
    handleSubmit = (e, fn) => {
        e && e.preventDefault();
        const { fileList } = this.state;
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
                            val = val.split("&")[0];
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
                if (!fn) {
                    // 多个需求
                    let temp = this.state.tempRequestData || [];
                    tempPush.timekey = new Date().valueOf();
                    tempPush.index = temp.length + 1;
                    tempPush.fd = formData;
                    temp.push(tempPush);
                    /*   temp.push({
                          timekey: timekey,
                          index: temp.length + 1,
                          jsdwbh: value.jsdwbh.split('|')[1],
                          fkts: (value.fkts.toString().split('').map((i) => { if (!isNaN(parseInt(i))) { return i; } })).join(''),
                          fd: formData
                      }); */
                    // this.ajaxLoad(formData)
                    this.setState({ tempRequestData: temp, tempListLoading: true, tempListShow: true }, () => {
                        setTimeout(() => {
                            this.setState({ tempListLoading: false })
                        }, 500)
                    })
                } else {
                    // 单个表单需求 构造一个param数组参数
                    this.ajaxLoad(formData);

                    /*   let param = [{ fd: formData }];
                      this.beforeSendAjax(param) */


                }
            }
        })
    }

    // 请求接口获取数据
    ajaxLoad = (formData) => {
        // const reqUrl = addressUrl + '/demand/insert';
        const reqUrl = addressUrl + '/demand/insertOld';
        let config = {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }
        httpAjax("post", reqUrl, formData, config).then(res => {
            if (res.code === '200') {
                message.success("创建需求成功");
                this.props.form.resetFields();
                this.props.form.setFieldsValue({
                    xqmc: ''
                });
                this.setState({ tempRequestData: [] })
                this.props.handleCancel();
                this.multipleForm.state = true;
                // 更新积分
                message.success(`恭喜您,获得了${res.data.score}积分！`);
                window.getTotalCredits();
            } else {
                message.error("创建需求失败")
                this.props.handleCancel();
            }
        })
    }

    multipleForm = () => {
        let params = this.state.tempRequestData;
        if (params && params.length) {
            // 第一版 将多个formdata 排队依次发送
            this.multipleForm.state = true; // 是否发生请求的开关
            let index = 0,
                timerSend = setInterval(() => {
                    if (this.multipleForm.state) {
                        this.multipleForm.state = false;
                        let fd = params[index].fd;
                        this.ajaxLoad(fd);
                        index++;
                        if (index == params.length) {
                            clearInterval(timerSend); // 清除定时器
                        }
                    }
                }, 500)

            // 第二版 将多个formdata合并成一个formdata（2018.6.26这个方式取消因为在谷歌49版本中的formData不提供遍历等api）
            // this.beforeSendAjax(params)
        } else {
            /* 
            如果是没有多个需求分2种情况
            a:填了一个
            b:啥也没填 */
            this.handleSubmit(0, 1)
            // message.info("请先添加需求。")
        }
    }
    // 发送ajax之前将多个formdata转化成一个大的formdata;
    beforeSendAjax = (params) => {
        let bigFormData = new FormData();
        params.forEach((item, index) => {
            item.fd.forEach((jtem, jndex) => {
                if (jtem && jndex) {
                    bigFormData.append("lsDemandVO[" + index + "]." + jndex, jtem);
                }
            })
        })
        this.ajaxLoad(bigFormData);
        // bigFormData.forEach((item, index) => { console.log(item, index) })
    }

    // 上传文件之前，选择文件之后
    beforeUpload = (file) => {
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
    }
    // 删除对应附件类型
    delFileType = (key) => {
        let temp = this.state.fileTypes || {}
        delete temp[key]
        this.setState({ fileTypes: temp });
    }

    render() {
        const { demandType, fileList, pagination } = this.state;
        const { getFieldDecorator } = this.props.form;
        const props = {
            action: `${addressUrl}/demand/insert`,
            onRemove: this.removeFileList,
            beforeUpload: this.beforeUpload,
            name: 'files',
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

        // 修改一条临时需求
        let updateBytemp = (record) => {
            let temp = this.state.tempRequestData,
                cur = temp[record.index - 1],
                target = {
                    xqmc: record.xqmc,
                    xqnr: record.xqnr,
                    smbz: record.smbz,
                    sendMessage: record.sendMessage,
                    qqsj: moment(record.qqsj, 'YYYY-MM-dd HH:mm:ss'), //.format('YYYY-MM-dd HH:mm:ss')
                    xqlx: record.xqlx
                }
            this.setState({ diyValue: record.jsdwbh })
            // 赋值
            cur.fd.forEach((i, j) => {
                if (i && j) {
                    if (j == 'fkts') {
                        target[j] = i;
                    }
                }
            })
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
            width: 90,
            dataIndex: 'index',
            key: 'index'
        }, {
            title: '需求名称',
            width: 150,
            dataIndex: 'xqmc',
            key: 'xqmc',
        }, {
            title: '融合作战单位',
            width: 100,
            dataIndex: 'jsdwbh',
            key: 'jsdwbh',
            render: (text, record, index) => {
                return text ? text.toString().split('&')[1] : '-';
            }
        }, {
            title: '反馈天数',
            width: 90,
            align: 'center',
            dataIndex: 'fkts',
            key: 'fkts',
            render: (text, record, index) => {
                return text ? (text.toString().split('').map((i) => { if (!isNaN(parseInt(i))) { return i; } })).join('') : '-'
            }
        }, {
            title: '删除',
            width: 90,
            align: 'center',
            dataIndex: 'address',
            key: 'address',
            render: (text, record, index) => {
                return <span><a href='javascript:' title='修改' onClick={() => { updateBytemp(record) }} style={{ marginRight: 10, display: 'none' }}><Icon type="form" /></a>
                    <a href='javascript:' title='删除' onClick={() => { delAloneList(record.index) }} >{/* <Icon type="close" /> */}<Icon type="close-square-o" /></a></span>
            }
        }];
        // 校验需求内容
        let checkXqnrType = (e, v, f) => {
            let types = this.state.requestTypeCn,
                reg = "",
                secondReg = ""
            switch (types) {
                case '手机号码':
                    reg = /^1[3|4|5|7|8][0-9]{9}$/;
                    break;
                case '座机号码':
                    reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
                    break;
                case '手机串号':
                    reg = /^\d{15}$/;
                    break;
                case 'MAC地址':
                    reg = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
                    break;
                case 'QQ群号码':
                    reg = /^[0-9]*$/;
                    break;
                case '身份证件号码':
                    reg = /^\d{15}|\d{}18$/;
                    break;
                case '银行卡号、账号':
                    reg = /^[0-9]*$/;
                    break;
                case '车牌号':
                    // 普通汽车
                    reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
                    // 新能源车
                    secondReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
                    break;
                case 'QQ号码':
                    reg = /^[0-9]*$/;
                    break;
                case 'EMAIL地址':
                    reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    break;
                case 'IP地址':
                    reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
                    break;
                case '网站链接地址':
                    reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
                    break;
                case '电话号码':
                    reg = /^[0-9]*$/;
                    break;
                case '短号反查':
                    reg = /^[0-9]*$/;
                    break;
                case '身份证反查':
                    reg = /^[0-9]*$/;
                    break;
                default:
                    break;
            }

            if (reg && reg.test(v)) {
                if (!secondReg) {
                    // 只需要验证一次
                    f()
                } else {
                    // 验证第二次
                    if (secondReg.text(v)) {
                        f()
                    }
                }
            } else {
                f("验证失败")
            }
        }

        return (
            <div>
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
                                    rules: [{ required: true, message: this.state.xqnrPlaceholder, validator: checkXqnrType },],
                                })(
                                    <Input placeholder={this.state.xqnrPlaceholder} onChange={this.changeXqnr} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="需求名称">
                                {getFieldDecorator('xqmc', {
                                    initialValue: this.state.requestTypeCn + this.state.requestContent,
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
                                    rules: [{ required: true, message: '请选择融合作战单位' },],
                                    // initialValue: { val: "440303530000" }
                                })(
                                    <ZBDW multipleVlue='true' placeholder='请选择融合作战单位' />
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
                                        <Radio value="（请在 10 天内反馈）">10天</Radio>
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
                    <Table loading={this.state.tempListLoading}
                        style={{
                            border: '0px solid red', maxHeight: 324, overflow: 'auto',
                            display: this.state.tempRequestData && this.state.tempRequestData.length ? 'block' : 'none'
                        }}
                        dataSource={this.state.tempRequestData}
                        pagination={pagination}
                        columns={columns}
                        rowKey='timeKey'
                        scroll={{ y: 240 }}
                    /*     title={() => '已添加的需求'} */
                    />
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}><Icon type="shopping-cart" />添加</Button>
                        <Button type='primary' onClick={this.multipleForm} style={{ marginRight: '10px' }}><Icon type="check" />提交</Button>
                        <Button onClick={() => {
                            this.props.form.resetFields();
                            this.setState({
                                requestTypeCn: '',
                                requestContent: ''
                            })
                        }}><Icon type="rollback" />清空</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(CreateRequest)