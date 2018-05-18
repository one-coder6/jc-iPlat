import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, HashRouter } from 'react-router-dom';
import { Table ,Button ,message} from 'antd';
import moment from 'moment';

//引入自定义组件
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
class ExtractList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pagination: {
                total: 0,
                pageSize: 10,
                pageNum: 1,
                showQuickJumper: true,
                showSizeChanger: true,
            },
            dataSource: [],
            searchValue: '',
            selectedRowKeys: [],
            submitDisabled:false
        }
    }

    componentWillMount() {
        this.setState({ loading: true });
        let { pageSize, pageNum } = this.state.pagination;
        this.getDataSource({
            pageSize: pageSize,
            pageNum: pageNum,
        });
    }

    componentWillReceiveProps(nextProps) {
        let searchValue = nextProps.searchValue;
        let { pageSize, pageNum } = this.state.pagination;
        let _this = this;
        //console.log("componentWillReceiveProps", searchValue)
        if (searchValue && searchValue.sljjsj !== undefined) {
            searchValue.beginCreateTime = moment(searchValue.sljjsj[0]).format("YYYY-MM-DD HH:mm:ss");
            searchValue.endCreateTime = moment(searchValue.sljjsj[1]).format("YYYY-MM-DD HH:mm:ss");
            delete searchValue.sljjsj;
        }
        if (searchValue && searchValue.baqk !== undefined) {
            let caseSponsor = searchValue.baqk.join();
            if (caseSponsor === '1,2') {
                searchValue.caseSponsor = "";
            } else {
                searchValue.caseSponsor = caseSponsor
            }
        }
        //delete searchValue.baqk;
        if (searchValue != this.state.searchValue) {
            this.setState({ searchValue: searchValue }, () => {
                _this.getDataSource({
                    pageSize: pageSize,
                    pageNum: pageNum,
                    ...searchValue
                });
            })
        }
    }
    getDataSource = (page) => {
        const pager = {
            ...this.state.pagination
        };
        const { searchValue } = this.state;
        const reqUrl = addressUrl + '/cases/list' //'/cases/listPickCases';// '/cases/list' 
        this.setState({loading:true})
        httpAjax("get", reqUrl, {
            params: {
                pageSize: page.pageSize,
                pageNum: page.pageNum,
                ...searchValue
            }
        }).then(res => {
            if (res.code === '200') {
                const data = res.data;
                pager.total = data.total,
                    this.setState({
                        pagination: pager,
                        loading: false,
                        dataSource: data.list
                    })
            }
        })
    }
    paginationChange = (page) => {
        this.getDataSource({
            pageSize: page.pageSize,
            pageNum: page.current
        })
    }

    rowSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys:selectedRowKeys})
    }
    //提取案件
    extractCase = () => {
        const { selectedRowKeys } = this.state;
        const ajbhs= selectedRowKeys&&selectedRowKeys.join(",");
        const reqUrl = addressUrl+`/cases/remotePickCase?ajbhs=${ajbhs}`;
        this.setState({submitDisabled:true})
        httpAjax("get",reqUrl).then(res=>{
            if(res.code==='200'){
                message.success("请求成功")
                this.props.history.push('/scoutPlat');
                this.setState({submitDisabled:false})
            }else{
                message.error("请求失败")
            }
        })
    }
    render() {
        const { loading, dataSource, submitDisabled ,selectedRowKeys} = this.state;
        const pager = { ...this.state.pagination };
        pager.showTotal = () => {
            return `共${pager.total}条`
        }
        const rowSelection = {
            onChange: this.rowSelectChange
        };
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <span >{index + 1}</span>
            }
        }, {
            title: '编号',
            dataIndex: 'ajbh',
            key: 'ajbh',
        }, {
            title: '案件名称',
            dataIndex: 'ajmc',
        }, {
            title: '受理单位',
            dataIndex: 'zbdwCn',
        }, {
            title: '案件类别',
            dataIndex: 'abCn',
        }, 
        // {
        //     title: '主要案情',
        //     dataIndex: 'zyaq',
        //     width:'20%'
        // }, {
        //     title: '详细地址',
        //     dataIndex: 'xxdz',
        // },
         {
            title: '案发时间',
            dataIndex: 'fasjcz',
        },
            //  {
            //   title: '案件状态',
            //   dataIndex: 'bdajstateCn',
            //   render: (text, record, index) => {
            //     if (text === '已侦结') {
            //       return <Tag color="green">{text}</Tag>
            //     } else if (text === '挂起') {
            //       return <Tag color="blue">{text}</Tag>
            //     } else if (text === '侦办中') {
            //       return <Tag color="gold">{text}</Tag>
            //     }
            //   }
            // },
        ]
        return (
            <div className='caseListContent'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey='ajbh'
                    pagination={pager}
                    onChange={this.paginationChange}
                    loading={loading}
                    rowSelection={rowSelection}
                />
                <div style={{ textAlign: 'center' }}>
                   {
                       dataSource&&dataSource.length>=1?
                       <Button type='primary' onClick = {this.extractCase} disabled = {(selectedRowKeys&&selectedRowKeys.length>=1)?false:true || submitDisabled }>提交</Button>:null
                   } 
                </div>
            </div>
        )
    }
}
export default withRouter(ExtractList)