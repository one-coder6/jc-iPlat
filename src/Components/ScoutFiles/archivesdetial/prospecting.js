import React from 'react';
import ReactDOM from 'react-dom';
import { List, Tag, Badge, Icon, Card, Table, Modal } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const { Meta } = Card;
/* 侦查档案 - 勘查 */
export default class Prospecting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '', // 图片src
            previewImageTitle: "" // 图片标题
        }
    }

    componentWillMount() {
        let ajbh_dang = sessionStorage.getItem("ajbh_dang") || '-';
        this.setState({ ajbh_dang: ajbh_dang })
    }

    handleCancel = () => {
        this.setState({ previewVisible: false })
    }

    showPic = (e) => {
        if (e) {
            this.setState({ previewVisible: true, previewImage: e.target.src, previewImageTitle: e.target.title })
        }
    }
    render() {

        const { sceneVO, lsSceneBiologyPrintVO, lsSceneFingerPrintVO, lsSceneFootPrintVO } = this.props;

        // 手印
        const sy_columns = [{
            title: '序号',
            align: "center",
            dataIndex: 'name',
            render: (text, record, index) => {
                return <a href="javascript:;">{index + 1}</a>
            }
        }, {
            title: '提取部位',
            align: "center",
            className: 'column-money',
            dataIndex: 'ylbw',
        }, {
            title: '提取日期',
            align: "center",
            className: 'column-money',
            dataIndex: 'tqrq'
        }];

        // 足迹
        const zj_columns = [{
            title: '序号',
            align: "center",
            dataIndex: 'name',
            render: (text, record, index) => {
                return <a href="javascript:;">{index + 1}</a>
            }
        }, {
            title: '提取部位',
            align: "center",
            className: 'column-money',
            dataIndex: 'ylbw',
        }, {
            title: '提取日期',
            align: "center",
            className: 'column-money',
            dataIndex: 'tqrq'
        }];
        // 生物痕迹（DNA）
        const dna_columns = [{
            title: '序号',
            align: "center",
            dataIndex: 'name',
            render: (text, record, index) => {
                return <a href="javascript:;">{index + 1}</a>
            }
        }, {
            title: '提取部位',
            align: "center",
            className: 'column-money',
            dataIndex: 'ylbw',
        }, {
            title: '提取日期',
            align: "center",
            className: 'column-money',
            dataIndex: 'tqrq'
        }];

        return (
            <div>
                <div>
                    <div style={{ padding: 10 }}>
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> 勘查信息</p>
                        {
                            sceneVO && sceneVO.map((item, index) => {
                                return <Card key={index} style={{ marginBottom: 10, minHeight: 200 }}
                                    title={<p style={{ position: 'absolute', fontSize: 12, color: '#1890ff' }}>
                                        <span style={{ marginRight: 15 }}>勘查人员: {item.kyjcry || '-'}</span>
                                        <span style={{ marginRight: 15 }}>地点: {item.kydd || '-'}</span>
                                        <span style={{ marginRight: 15 }}>开始时间: {item.kysjks || '-'}</span>
                                        <span style={{ marginRight: 15 }}>结束时间: {item.kysjjs || '-'}</span>
                                    </p>}
                                >
                                    <div> {item.kyjcqk || '-'}</div>
                                </Card>
                            })
                        }
                        {
                            !sceneVO || !sceneVO.length ? <p className="p-nothing-data">暂无勘查数据</p> : ''
                        }
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> 勘查图片</p>
                        {sceneVO && sceneVO.length >= 1 ?
                            sceneVO.map((item, index) => {
                                return <div key={index}>
                                    {
                                        item.lsSceneImageCidVO && item.lsSceneImageCidVO.map((i, j) => {
                                            return <div key={j} className='dang-imgCss' style={{ display: 'none ' }}>
                                                <img onClick={this.showPic} alt={i.lbCn} title={i.lbCn} src={addressUrl + `/archives/sceneImage?id=${i.id}`} />
                                            </div>
                                        })
                                    }
                                </div>
                            }) : <p className="p-nothing-data">暂无勘查图片</p>
                        }
                        <div className='dang-imgCss' style={{ display: 'none' }}>
                            <img onClick={this.showPic} alt="example" title="图片标题1" src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题2" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题3" src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题4" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题5" src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题6" src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题7" src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题8" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
                            <img onClick={this.showPic} alt="example" title="图片标题7" src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />
                        </div>
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> 指纹</p>
                        <Card bordered={false} hoverable={false} key='1'>
                            <Table columns={sy_columns}
                                dataSource={lsSceneFingerPrintVO}
                                bordered
                                pagination={false}
                                title={null}
                                footer={null} />
                        </Card>
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> 足迹</p>
                        <Card bordered={false} hoverable={false} key='2'>
                            <Table columns={zj_columns}
                                dataSource={lsSceneFootPrintVO}
                                bordered
                                pagination={false}
                                title={null}
                                footer={null}
                            />
                        </Card>
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> DNA</p>
                        <Card bordered={false} hoverable={false} key='3'>
                            <Table columns={dna_columns}
                                dataSource={lsSceneBiologyPrintVO}
                                bordered
                                pagination={false}
                                title={null}
                                footer={null}
                            />
                        </Card>
                        <Modal visible={this.state.previewVisible} title={this.state.previewImageTitle} footer={null} onCancel={this.handleCancel}>
                            <div> <img style={{ width: '100%' }} src={this.state.previewImage} /></div>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}