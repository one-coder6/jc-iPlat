import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, HashRouter } from 'react-router-dom';
import { Table, Button, message, Upload, Icon } from 'antd';
import moment from 'moment';

//引入自定义组件
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
class ExtractListMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            fileList: []
        }
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }
    handleUpload = () => {
        const { fileList } = this.state;
        let formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
        });

        this.setState({
            uploading: true,
        });

        let config = {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }

        httpAjax("post", addressUrl + '/cases/batchPick', formData, config).then((res) => {
            if (res.code == 200) {
                message.success("上传成功！", )
                this.props.handelExtraMultiple();
                this.props.reloadFn();
                this.setState({
                    uploading: false,
                });
            } else {
                message.error("上传失败，请重试或者联系管理员。")
            }
        })
    }

    render() {
        const { uploading } = this.state;
        const props = {
            // action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                if (file && file.name.indexOf('.xls') > -1) {
                    this.setState(({ fileList }) => ({
                        fileList: [...fileList, file],
                    }));
                } else {
                    message.error("您选择文件的格式不正确，请使用.xls后缀格式的文件")
                }
                return false;
            },
            fileList: this.state.fileList,
        };
        const stateText = {
            margin: '15px 0'
        }
        return (
            <div className="point-content">
                <p> 一、下载模板.（下载后完成后您需要按照模板格式填充数据）</p>
                <div>
                    <Icon type="download" /> <a href={'/cases/batchTemplate'} title="点击下载" >批量提取案件.xls</a>
                </div>
                <p> 二、上传附件.</p>
                <div>
                    <div>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> 选择附件
                          </Button>
                        </Upload>
                        <Button
                            className="upload-demo-start"
                            style={stateText}
                            type="primary"
                            onClick={this.handleUpload}
                            disabled={this.state.fileList.length === 0}
                            loading={uploading}
                        >
                            {uploading ? '正在上传...' : '开始上传'}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ExtractListMultiple)