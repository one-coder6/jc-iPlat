import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, HashRouter } from 'react-router-dom';
import { Table, Button, message } from 'antd';
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
            searchValue: {
                // 默认需要7天之内的立案时间
                beginLasj: moment(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'),
                endLasj: moment(new Date()).format('YYYY-MM-DD')
            },
            selectedRowKeys: [],
            submitDisabled: false
        }
    }

    componentWillMount() {
        this.setState({ loading: true });
        let { pageSize, pageNum } = this.state.pagination;

        this.getDataSource({
            pageSize: pageSize,
            pageNum: pageNum
        });
    }

    componentWillReceiveProps(nextProps) {
        let userInfor = JSON.parse(sessionStorage.getItem("user"));
        let searchValue = nextProps.searchValue;
        let { pageSize, pageNum } = this.state.pagination;
        let _this = this;
        // 立案时间
        if (searchValue && searchValue.lasj !== undefined) {
            searchValue.beginLasj = moment(searchValue.lasj[0]).format("YYYY-MM-DD");
            searchValue.endLasj = moment(searchValue.lasj[1]).format("YYYY-MM-DD");
            delete searchValue.lasj;
        }

        // 案发时间
        if (searchValue && searchValue.sljjsj !== undefined) {
            searchValue.fasjcz = moment(searchValue.sljjsj[0]).format("YYYY-MM-DD HH:mm:ss");
            searchValue.fasjzz = moment(searchValue.sljjsj[1]).format("YYYY-MM-DD HH:mm:ss");
            delete searchValue.sljjsj;
        }

        // 办案情况
        if (searchValue && searchValue.baqk !== undefined) {
            if (searchValue.baqk.length) {
                searchValue.ajzbry = userInfor.account;
            }
            // 
            delete searchValue.baqk;
        }

        this.setState({ searchValue: searchValue }, () => {
            _this.getDataSource({
                pageSize: pageSize,
                pageNum: pageNum,
                ...searchValue
            });
        })

        if (this.props.searchLoading) {
            this.setState({ loading: true })
        }
    }
    getDataSource = (page) => {
        const pager = {
            ...this.state.pagination
        };
        const { searchValue } = this.state;
        const reqUrl = addressUrl + '/cases/listPickCases'  //'/cases/listPickCases' // '/cases/list' 
        //this.setState({ loading: true })
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
        this.setState({ selectedRowKeys: selectedRowKeys })
    }
    //提取案件
    extractCase = () => {
        const hide = message.info('提取中，请稍后...', 0);
        const { selectedRowKeys } = this.state;
        const ajbhs = selectedRowKeys && selectedRowKeys.join(",");
        const reqUrl = addressUrl + `/cases/remotePickCase?ajbhs=${ajbhs}`;
        this.setState({ submitDisabled: true, loading: true })
        httpAjax("get", reqUrl).then(res => {
            if (res.code === '200') {
                message.success("提取成功")
                this.setState({ submitDisabled: false, loading: false });
                hide();
                this.props.handelExtra();
                this.props.reloadFn();
                //   this.props.history.push(`/scoutPlat:${new Date().valueOf()}`);
            } else {
                message.error("提取失败");
                this.props.handelExtra();
            }
        })
    }
    gotoFn = () => {
        // this.props.handleCancel();
        // this.props.history.push('/scoutPlat');
    }
    render() {
        const { loading, dataSource, submitDisabled, selectedRowKeys } = this.state;
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
            dataIndex: 'sljsdwCn',
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
            title: '立案时间',
            dataIndex: 'lasj',
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
                {/*     <button onClick={() => {
                    console.log(this.props.reloadFns)
                    this.props.reloadFns();
                }}>确定</button> */}
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
                        dataSource && dataSource.length >= 1 ?
                            <Button type='primary' onClick={this.extractCase} disabled={(selectedRowKeys && selectedRowKeys.length >= 1) ? false : true || submitDisabled}>提交</Button> : null
                    }
                </div>
            </div>
        )
    }
}
export default withRouter(ExtractList)