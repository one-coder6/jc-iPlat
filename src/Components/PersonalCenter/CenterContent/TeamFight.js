import React from 'react';
import { Table, Modal, Button } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax';

export default class TeamFight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            loading: true,
            cases: '',
            scoreRankList: ''
        }
    }

    componentWillMount(){
        httpAjax("get", addressUrl + "/cases/listCasesByMonth",{}).then((res) => {
            if(res.code === "200"){
                this.setState({
                    cases: res.data.list,
                    loading: false
                });
            }
        });
    }

    handleScore = (record) => {
        const reqUrl =  addressUrl + '/integralHis/casesScoreRank?ajbh=' + record.ajbh;
        httpAjax("get", reqUrl,).then( (res) => {
            if(res.code === "200"){
                this.setState({
                    scoreRankList: res.data
                });
            }
        });
        this.setState({
            visible: true
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    render(){
        const columns = [{
            title: '案件编号',
            dataIndex: 'ajbh',
            key: 'ajbh'
        }, {
            title: '案件名称',
            dataIndex: 'ajmc',
            key: 'ajmc'
        }, {
            title: '主办民警',
            dataIndex: 'ajzbryCn',
            key: 'ajzbryCn'
        }, {
            title: '主办单位',
            dataIndex: 'zbdwCn',
            key: 'zbdwCn'
        }, {
            title: '案件状态',
            dataIndex: 'bdajstateCn',
            key: 'bdajstateCn'
        }, { 
            title: '本案得分',
            dataIndex: 'score',
            key: 'score'
        }, {
            title: '本案积分排名',
            dataIndex: 'scoreRank',
            key: 'scoreRank'
        }, {
            title: '参与人数',
            dataIndex: 'joinPersonNum',
            key: 'joinPersonNum',
            render: (text, record, index) => {
                return  <span style={{cursor: 'pointer',color: '#3ba0e9'}} onClick={() => { this.handleScore(record) }}>{text}</span>
            }
        }];
        const scoreColumns = [{
            title: '姓名',
            dataIndex: 'jlrymc',
            key: 'jlrymc'
            
        }, {
            title: '单位',
            dataIndex: 'jlryjgmc',
            key: 'jlryjgmc'
        }, {
            title: '头衔',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '本案得分',
            dataIndex: 'score',
            key: 'score',
            align: 'center'
        }, {
            title: '排名',
            dataIndex: 'rank',
            key: 'rank',
            align: 'center'
        },{
            title: '得分比重',
            dataIndex: 'scoreRatio',
            key: 'scoreRatio',
            align: 'center'
        }];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.cases} pagination={false} loading={this.state.loading} rowkey='id' bordered />
                <Modal 
                    title='参与人得分情况'
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Table columns={scoreColumns} dataSource={this.state.scoreRankList} pagination={false} size="small"/>

                </Modal>
            </div>
        )
            
    }
} 