import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Tag, Badge, Icon, Spin, Card, Tooltip, Divider, List } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const Panel = Collapse.Panel;
/* 侦查档案 - 线索 */
export default class ClueInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestSource: [], // 父级的数据源
            contentList: {},  // 键为父级数据源的id，值为contentList
            showCollapseIndex: '0'
        }
    }
    componentWillMount() {
        this.getRequestSource();
    }
    // 获取需求和信息的detail
    getRequestSource = () => {
        let ajbh_dang = sessionStorage.getItem("ajbh_dang") || '-';
        let reqUrl = addressUrl + `/demand/getDemandByCase?ajbh=${ajbh_dang}`;
        httpAjax("get", reqUrl).then(res => {
            if (res.code === '200') {
                this.setState({ requestSource: res.data })
                this.machiningData(res.data)
            }
        })
    }
    // 加工数据，分离需求和对应的回复信息
    machiningData = (d) => {
        if (d) {
            let childList = {};
            d.map((item, i) => {
                let key = item.contentType + "_" + item.id, val = item.contentList || [];
                childList[key] = val;
            })
            this.setState({ contentList: childList });
        }
    }
    // 回复信息
    renderChild = (id, contentType) => {
        let contentList = this.state.contentList;
        let key = contentType + '_' + id
        let tempData = contentList[key] || [];
        return <List
            dataSource={tempData}
            locale={{ emptyText: '无数据' }}
            renderItem={(ele, index) => {
                return <List.Item key={index} style={{ padding: "10px 25px", borderBottom: '1px dashed #e8e8e8' }} >
                    <List.Item.Meta style={{ flex: 'auto' }}
                        title={
                            <div>
                                <span >{ele.fromUserName || '-'} &nbsp;</span>
                                <span >{ele.date || '-'}  &nbsp;</span>
                                <span style={{ color: 'orange' }}> {this.mapReplyType(ele.type)}</span>
                            </div>
                        }
                        description={<div>
                            <span>{(ele.toUserName) ? (`${ele.fromUserName}  回复 ${ele.toUserName}：${ele.content}`) : ele.content}</span>
                            <div>
                                {ele.attachment ? '附件：' : ''}
                                {ele.attachment && ele.attachment.map((jtem) => {
                                    return <a title='点击下载' href={'/attachment/download?id=' + jtem.fileId}><Icon type="paper-clip" />{jtem.fileName}；</a>
                                })}
                            </div>
                        </div>
                        }
                    />
                    <div>
                    </div>
                </List.Item>
            }
            }
        />
    }

    // 关键字翻译
    mapReplyType = (type) => {
        if (type === "CLUE") {
            return '反馈线索'
        } else if (type === "RESP") {
            return '回复'
        }
    }
    render() {
        const { requestSource } = this.state;
        return (
            <div>
                <div>
                    <div style={{ padding: 10 }}>
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> 线索信息</p>
                        <Collapse defaultActiveKey={['0']} activeKey={this.state.showCollapseIndex} onChange={(e, c) => { this.setState({ showCollapseIndex: e.pop() }) }}>
                            {
                                requestSource && requestSource.map((item, index) => {
                                    return <Panel header={
                                        <div id={item.ajbh + '_' + item.id + '_' + item.contentType}>
                                            <div>
                                                <Tag color="#87d068">{item.contentType == 'DEMAND' ? '需求 ' : '信息 '}{index + 1}</Tag>
                                                <span style={{ color: 'red' }}>主题：{item.xqmc || '-'}；</span>
                                                <span> 主办人：{item.lrrymc || '-'} ；</span>
                                                <span> 创建时间 ：{item.qqsj || '2018-10-01'}</span>
                                            </div>
                                            <div>主要描述：{item.xqnr}</div>
                                            <div>
                                                {item.attacments ? '附件：' : ''}
                                                {item.attacments && item.attacments.map((jtem, jndex) => {
                                                    return <a title='点击下载' href={'/attachment/download?id=' + jtem.fileId} key={jndex}><Icon type="paper-clip" />{jtem.fileName}；</a>
                                                })}
                                            </div>
                                        </div>} key={index}>
                                        <div>
                                            {/* 回复列表   */}
                                            {this.renderChild(item.id, item.contentType, item.ajbh)}
                                        </div>
                                    </Panel>
                                })
                            }
                        </Collapse>
                        {!requestSource||!requestSource.length?<p className="p-nothing-data">暂无数据</p>:''}
                    </div>
                </div>
            </div>
        )
    }
}