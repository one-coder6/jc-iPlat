import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter } from 'react-router-dom';
import { Pagination, Table, Tooltip, Icon, Button, Modal } from 'antd';
import { httpAjax, addressUrl } from '../../Util/httpAjax';//引入自定义组件
import '../../styles/scoutPlat.less';
/* 档案侦查主页- 数据列表 */
class CaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pagination: {
                total: 200,
                pageSize: 10,
                pageNum: 1,
                showQuickJumper: true,
                showSizeChanger: true,
                onShowSizeChange: (current, pageSize) => {
                    // 切换每页数目量
                    let showSizeChanger = this.state.pagination;
                    showSizeChanger["pageSize"] = pageSize;
                    this.setState({ pagination: showSizeChanger, itemPageNum: pageSize });
                }
            },
            dataSource: [],
            caseRecord: '',
            itemPageNum: 1  // 后台未返回数据序号，所以前台需要处理
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

    // 父组件的属性发生改变
    componentWillReceiveProps(nextProps) {
        let filter = nextProps.searchParam;
        this.setState({ filter: filter }, () => {
            this.getDataSource({
                pageSize: this.state.pagination.pageSize,
                currPage: 1,
                ...filter
            });
        })
    }
    getDataSource = (page) => {
        const pager = {
            ...this.state.pagination
        };

        httpAjax("get", addressUrl + '/archives/caseList', { params: { ...page } }).then(res => {
            if (res.code == 200) {
                const data = res.data;
                pager.total = data.total,
                    console.log(pager);
                this.setState({
                    pagination: pager,
                    loading: false,
                    dataSource: data.list
                })
            }
        })

        /*  const data = {
                  total: 2,
                  list: [
                      {
                          ajbh: '	A4403035900002018020025', ajmc: '2.20特大入室盗窃案', zyaq: '张三被盗窃案的主要案情', abCn: '被盗窃案',
                          beginLasj: '2018-04-10', endLasj: '2018-04-11', ajzbryCn: '张三三', zbdwCn: '沙头派出所'
                      },
                      {
                          ajbh: 'A4403035300002018050117', ajmc: '曾凡芬被诈骗案', zyaq: '张四被抢劫案的主要案情', abCn: '被抢劫案',
                          beginLasj: '2018-03-10', endLasj: '2018-05-21', ajzbryCn: '张思思', zbdwCn: '宝钢派出所'
                      }
                  ]
              };
              pager.total = data.total,
              this.setState({
                  pagination: pager,
                  loading: false,
                  dataSource: data.list
              }) 
        */
    }
    paginationChange = (page) => {
        this.setState({ loading: true, itemPageNum: page.current })
        this.getDataSource({
            pageSize: page.pageSize,
            pageNum: page.current
        })
    }

    //跳转详情页
    viewDetail = (record) => {
        //console.log("viewDetail",ajbh,this.props.history)
        //this.props.history.push({pathname: '/caseDetail', state: { ajbh: text }});
        sessionStorage.setItem("ajbh_dang", record.ajbh)
        sessionStorage.setItem("ajmc_dang", record.ajmc)
    }

    render() {
        const { total, loading, dataSource, pagination, caseRecord } = this.state;
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return <span >{this.state.pagination.pageSize * (this.state.itemPageNum - 1) + (index + 1)}</span>
            }
        }, {
            title: '案件编号',
            dataIndex: 'ajbh',
            key: 'ajbh',
            render: (text, record, index) => {
                return <div>
                    <Link to={{ pathname: '/archivesdetial', query: { ajbh: text } }} onClick={() => this.viewDetail(record)}>{text}</Link>
                    {/* <Link  to='/caseDetail' params = {{userId:text}}>{text}</Link> */}
                    {/* <Button onClick = { () =>this.viewDetail(text)}>{text} </Button> */}
                </div>
            }
        }, {
            title: '案件名称',
            dataIndex: 'ajmc',
        }, {
            title: '主要案情',
            dataIndex: 'zyaq',
            key: "zyaq",
            render: (text, record, index) => {
                //return <Tooltip placement="bottom" title={text}><span>{text.toString().length > 6 ? text.toString().substring(0, 26) + '...' : text}</span></Tooltip>
                return <span title={text}>{text.toString().length > 26 ? text.toString().substring(0, 26) + '...' : text}</span>
            }
        }, {
            title: '案件类别',
            dataIndex: 'abCn',
        }, {
            title: '立案开始时间',
            dataIndex: 'beginLasj',
        }, {
            title: '立案结束时间',
            dataIndex: 'endLasj',
        }, {
            title: '案件主办人员名称',
            dataIndex: 'ajzbryCn',
        }, {
            title: '主办单位',
            dataIndex: 'zbdwCn',
        }]
        return (
            <div className='caseListContent blockDefaut'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey='ajbh'
                    pagination={pagination}
                    onChange={this.paginationChange}
                    loading={loading}
                />
            </div>
        )
    }
}
export default CaseList