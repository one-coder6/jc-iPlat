import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, HashRouter } from 'react-router-dom';
import { Row, Col, Pagination, Table, Tooltip, Icon, Button, Modal, Tag } from 'antd';
import moment from 'moment';

//引入自定义组件
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import CreateRequest from './Modal/seedRequest';
import PublishInfor from './Modal/publishInfor'
import CaseFinish from './Modal/caseFinish'
import '../../../styles/scoutPlat.less';

class CaseList extends React.Component {
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
      createRequest: false,
      publishInfor: false,
      caseFinish: false,
      caseRecord: '',
      searchValue: ''
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
    const reqUrl = addressUrl + '/cases/list';
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
  //创建需求
  createRequest = (record) => {
    this.setState({
      createRequest: true,
      caseRecord: record
    })
  }

  // 发布信息
  publishInfor = (record) => {
    this.setState({
      publishInfor: true,
      caseRecord: record
    })
  }

  // 侦结/ 破案
  caseFinish = (record) => {
    this.setState({ caseFinish: true, caseRecord: record })
  }
  handleCancel = () => {
    this.setState({ createRequest: false, publishInfor: false, caseFinish: false })
  }
  //跳转详情页
  viewDetail = (ajbh) => {
    //console.log("viewDetail",ajbh,this.props.history)
    //this.props.history.push({pathname: '/caseDetail', state: { ajbh: text }});
    sessionStorage.setItem("ajbh", ajbh)
  }

  render() {
    const { loading, dataSource, createRequest, caseRecord, publishInfor, caseFinish } = this.state;
    const pager = { ...this.state.pagination };
    pager.showTotal = () => {
      return `共${pager.total}条`
    }
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
      render: (text, record, index) => {
        return <Link to={{ pathname: '/caseDetail', query: { ajbh: text } }} onClick={() => this.viewDetail(text)}>{text}</Link>
      }
    }, {
      title: '案件名称',
      dataIndex: 'ajmc',
    }, {
      title: '受理单位',
      dataIndex: 'zbdwCn',
    }, {
      title: '案件类别',
      dataIndex: 'abCn',
    }, {
      title: '立发时间',
      dataIndex: 'sljjsj',
    }, 
    // {
    //   title: '来源',
    //   dataIndex: 'ajFromCn',
    // },
     {
      title: '主办人员',
      dataIndex: 'ajzbryCn',
    }, {
      title: '案件状态',
      dataIndex: 'bdajstateCn',
      render: (text, record, index) => {
        if (text === '已侦结') {
          return <Tag color="green">{text}</Tag>
        } else if (text === '挂起') {
          return <Tag color="blue">{text}</Tag>
        } else if (text === '侦办中') {
          return <Tag color="gold">{text}</Tag>
        }
      }
    }, 
    // {
    //   title: '审核状态',
    //   dataIndex: 'shzt',
    // },
     {
      title: '操作',
      dataIndex: 'operation',
      width: '19%',
      render: (text, record, index) => {
        return <div>
          <Button  size='small' onClick={() => this.createRequest(record)} style = {{fontSize:'10px',marginRight:'6px'}}>创建需求</Button>
          <Button  size='small' onClick={() => this.publishInfor(record)} style = {{fontSize:'10px',marginRight:'6px'}}>发布信息</Button>
          <Button  size='small' onClick={() => this.caseFinish(record)} style = {{fontSize:'10px'}}>破案/侦结</Button>
          {/* <Tooltip placement="top" title="创建需求">
						<Icon type="plus" onClick={() => this.createRequest(record)} style={{ cursor: 'pointer' }} />
					</Tooltip>
					<Tooltip placement="top" title="发布信息" onClick={() => this.publishInfor(record)} style={{ cursor: 'pointer' }}>
						<Icon type="message" />
					</Tooltip>
					<Tooltip placement="top" title="破案/侦结" onClick={() => this.caseFinish(record)}>
						<Icon type="pushpin" />
					</Tooltip> */}
        </div>
      }
    }]
    return (
      <div className='caseListContent'>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey='ajbh'
          pagination={pager}
          onChange={this.paginationChange}
          loading={loading}
        />
        {/* 创建需求弹框 */}
        <Modal visible={createRequest} title='创建需求' onCancel={this.handleCancel} footer={null} >
          <CreateRequest caseRecord={caseRecord} handleCancel={this.handleCancel} />
        </Modal>
        {/* 发布信息弹框 */}
        <Modal visible={publishInfor} title='发布信息' onCancel={this.handleCancel} footer={null}>
          <PublishInfor caseRecord={caseRecord} handleCancel={this.handleCancel} />
        </Modal>
        {/* 破案/侦结 */}
        <Modal visible={caseFinish} title='破案/侦结' onCancel={this.handleCancel} footer={null}>
          <CaseFinish caseRecord={caseRecord} handleCancel={this.handleCancel} />
        </Modal>
      </div>
    )
  }
}
export default withRouter(CaseList)