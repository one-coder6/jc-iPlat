import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Table, Icon, Button, Modal, Tooltip } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
class RecordInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                total: 0,
                pageSize: 10,
                pageNum: 1,
                showQuickJumper: true,
                // showSizeChanger: true
            },
            dataSource: []
        }
    }

    componentWillMount() {
        this.ajaxLoadData();
        //this.machiningData();
    }
    // 请求
    ajaxLoadData = () => {
        const reqUrl = addressUrl + '/cases/compareInfo';
        let ajbh = sessionStorage.getItem("ajbh");
        if (ajbh) {
            httpAjax("get", reqUrl, { params: { bh: ajbh, pageNum: 1, pageSize: 10 } }).then(res => {
                if (res.code == 200) {
                    this.machiningData(res.data.list)
                }
            })
        } else {
            console.log("案件编号为空。");
        }
    }
    // 加工数据
    machiningData = (data) => {
        let list = [
            {
                bzly: "比中来源(数据来源) 0-DNA比中，1-指纹比中1",
                birthday: "生日1",
                createDate: "比中时间1",
                xchjbh: "现场痕迹编号1",
                tqbw: "提取部位1",
                jqbh: "警情编号1",
                ajbh: "案件编号1",
                xkbh: "现勘编号1",
                zwbh: "指纹编号1",
                dna: "DNA1",
                ajlb: "案件类别1",
                afsj: "发案时间1",
                afdd: "案发地点1",
                jyaq: "简要案情1",
                rybh: "人员编号1",
                rywzbh: "人员采样作业编号1",
                xm: "姓名1",
                birthday: "生日1",
                sfzh: "身份证号1",
                hjd: "户籍地1"
            },
            {
                bzly: "比中来源(数据来源) 0-DNA比中，1-指纹比中2",
                birthday: "生日",
                createDate: "比中时间2",
                xchjbh: "现场痕迹编号2",
                tqbw: "提取部位2",
                jqbh: "警情编号2",
                ajbh: "案件编号2",
                xkbh: "现勘编号2",
                zwbh: "指纹编号2",
                dna: "DNA2",
                ajlb: "案件类别2",
                afsj: "发案时间2",
                afdd: "案发地点2",
                jyaq: "简要案情2",
                rybh: "人员编号2",
                rywzbh: "人员采样作业编号2",
                xm: "姓名2",
                birthday: "生日2",
                sfzh: "身份证号2",
                hjd: "户籍地2"
            }
        ]

        // 加工
        //  let list = data || [];
        let targetSource = [];
        let pageIndex = this.state.pagination.pageNum;
        let alreadyData = data || list;
        alreadyData && alreadyData.forEach((item, index) => {
            let tempObj = {};
            tempObj.id = JSON.stringify({
                id: (pageIndex * index) + 1
            });

            tempObj.BZQK = JSON.stringify({
                createDate: item.createDate || '-',
                bzly: item.bzly || '-',
                tqbw: item.tqbw || '-'
            })

            tempObj.AJBH = JSON.stringify({
                z: ''
            })

            tempObj.AJQK = JSON.stringify({
                ajlb: item.ajlb,
                afsj: item.afsj,
                afdd: item.afdd
            })

            tempObj.JYAQ = JSON.stringify({
                createDate: item.createDate || '-',
                jyaq: item.jyaq || '-'
            })

            tempObj.RYBH = JSON.stringify({
                rybh: item.rybh || '-',
                rywzbh: item.rywzbh || '-'
            })

            tempObj.RYQK = JSON.stringify({
                xm: item.xm || '-',
                sfzh: item.sfzh || '-',
                birthday: item.birthday || '-',
                hjd: item.hjd || '-'
            })

            targetSource.push(tempObj);
        })

        this.setState({
            dataSource: targetSource
        })
    }

    render() {
        const { lsCasesRecordVO } = this.props;
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <div className="cont-header-div"><span>{index + 1}</span></div>
            }
        }, {
            title: '比中情况',
            dataIndex: 'BZQK',
            key: 'BZQK',
            render: (text, record, index) => {
                let temp = JSON.parse(text);
                return <div className="cont-header-div">
                    <span>比中时间：{temp.createDate}</span>
                    <span>比中来源：{temp.bzly}</span>
                    <span>提取部位：{temp.tqbw}</span>
                </div>
            }
        }, {
            title: '案件编号',
            dataIndex: 'AJBH',
            key: 'AJBH',
            render: (text, record, index) => {
                let temp = JSON.parse(text);
                return <div className="cont-header-div">
                    <span>指：{temp.z}</span>
                </div>
            }
        }, {
            title: '案件情况',
            dataIndex: 'AJQK',
            key: 'AJQK',
            render: (text, record, index) => {
                let temp = JSON.parse(text);
                return <div className="cont-header-div">
                    <span>类别：{temp.ajlb}</span>
                    <span>日期：{temp.afsj}</span>
                    <span>地点：{temp.afdd}</span>
                </div>
            }
        }, {
            title: '简要案情',
            dataIndex: 'JYAQ',
            key: 'JYAQ',
            render: (text, record, index) => {
                let temp = JSON.parse(text);
                return <div className="cont-header-div">
                    <span>案情：{temp.createDate}</span>
                </div>
            }
        }, {
            title: '人员编号',
            dataIndex: 'RYBH',
            key: 'RYBH',
            render: (text, record, index) => {
                let temp = JSON.parse(text);
                return <div className="cont-header-div">
                    <span>人：{temp.rybh}</span>
                    <span>指：{temp.rywzbh}</span>
                </div>
            }
        }, {
            title: '人员情况',
            dataIndex: 'RYQK',
            key: "RYBH",
            render: (text, record, index) => {
                let temp = JSON.parse(text);
                return <div className="cont-header-div">
                    <span>姓名：{temp.xm}</span>
                    <span>身份证号：{temp.sfzh}</span>
                    <span>生日：{temp.birthday}</span>
                    <span>户籍地：{temp.hjd}</span>
                </div>
            }
        }];
        const source = this.state.dataSource;
        return (<div>
            <Table title={() => '比对信息'} className="bztable" columns={columns} dataSource={this.state.dataSource} pagination={this.state.pagination} rowKey='id' bordered />
        </div>
        )
    }
}

export default RecordInfor;