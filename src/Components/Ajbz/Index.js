import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon, Divider } from 'antd';
// 引入自定义组件    公共部分
import CommonLayout from '../Content/Index';
import Search from './SearchComponent';
import { httpAjax, addressUrl } from '../../Util/httpAjax';

const columns = [{
    title: '序号',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: '比中情况',
    key: 'age',
    render: (text, record) => {
        let _bzly = record.bzly == 0 ? 'DNA比中' : '指纹比中';
        return <div>
            <span>比中时间：{record.createDate}</span><br />
            <span>比中来源：{_bzly}</span><br />
            <span>提取部位：{record.tqbw}</span>
        </div>
    }
}, {
    title: '案件编号',
    dataIndex: 'ajbh',
    key: 'ajbh',
}, {/*{
    title: '案件情况',
    key: 'action',
    render: (text, record) => (
        <div>
            <span>类别：</span><br />
            <span>日期：</span><br />
            <span>地点：</span>
        </div>
    ),
}*/}, {
    title: '简要案情',
    dataIndex: 'jyaq',
    key: 'jyaq',
    width:320
}, {
    title: '人员编号',
    key: 'action',
    render: (text, record) => (
        <div>
            <span>人：{record.rybh}</span><br/>
            <span>指：{record.rybh}</span>
        </div>
    ),
}, {
    title: '人员情况',
    key: 'action',
    render: (text, record) => (
        <div>
            <span>姓名：{record.xm}</span><br />
            <span>身份证号：{record.sfzh}</span><br />
            <span>生日：{record.birthday}</span><br />
            <span>户籍地：{record.hjd}</span>
        </div>
    ),
}];


/**
 * 案件比中
 */
export default class AjbzIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            caseData: '',
            WillBeDone: [],
            chartHeight: '280px',
            feedbackC: false
        }
    }

    componentWillMount() {

        const reqUrl = addressUrl + '/cases/compareInfo';

        /* const dataSource = [{
            key: '1',
            bzly: 0,
            createDate: "2018-05-25",
            tqbw: '指纹',
            ajbh: '123456',
            jyaq: 'xxxxxxxx',
            xm: '老杨',
            sfzh: '12345678912345678',
            birthday: '2018-05-25',
            hjd: '美国'
        }]; */

        /*   this.setState({
              bzData: dataSource
          }); */
        httpAjax("get", reqUrl, { params: { pageNum: 1, pageSize: 10 } }).then(res => {
            if (res.code == 200) {
                this.setState({
                    bzData: res.data.list
                })
            }
        })
    }

    render() {

        const { bzData } = this.state;

        return (
            <CommonLayout>
                <Search/>  
                <Table columns={columns} dataSource={bzData} />
            </CommonLayout>
        );

    }
}


