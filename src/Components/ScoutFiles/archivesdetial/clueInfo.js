import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Tag, Badge, Icon, Card, Tooltip, Divider, List } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const Panel = Collapse.Panel;
/* 侦查档案 - 线索 */
export default class ClueInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent: false,
            searchParam: null,
            ajbh: 'A4403035200002007010003',
            infoEnity: {}
        }
    }
    componentWillMount = () => {
        const ajbh = this.state.ajbh;
        httpAjax("get", addressUrl + '/cases/detail', { params: { ajbh: ajbh } }).then(res => {
            if (res.code == 200) {
                this.state.infoEnity = { ...res.data.casesVO };
                console.log(this.state.infoEnity)
            }
        })
    }
    componentWillReceiveProps = (nextProps) => {
        let pp = nextProps;
    }
    componentDidMount = () => {

    }

    handleSearch = (value) => {
        this.setState({ searchParam: value });
    }
    render() {
        const { showContent } = this.state;
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 15,
            border: 0,
            overflow: 'hidden',
        };
        const requestSource = ["内容1", "内容2"]
        return (
            <div>
                <div>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header={
                            <div>
                                <div>
                                    <Tag color="#87d068">需求一</Tag>
                                    <span>主题：张三被盗案案案案ddddddddd案</span>
                                </div>
                                <div>
                                    <span> 主办人： 张三</span>
                                    <span> 创建时间 ：2018-04-111</span>
                                    <div>
                                        案件描述内容内容内容
                                    </div>
                                </div>
                            </div>
                        } key="1" style={customPanelStyle}>
                            <div >
                                <Divider dashed />
                                {/*  回复列表  */}
                                <List
                                    dataSource={requestSource}
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta style={{ width: "100%", display: "table", padding: "0 24px" }}
                                                title={
                                                    <div >
                                                        <span style={{ color: 'blue' }}>凌晨思思：</span>
                                                        <span style={{ color: '#999' }}>2018-02-02  </span>
                                                        <span style={{ color: 'red' }}> 反馈线索  </span>
                                                    </div>
                                                }
                                                description="案件的一些反馈信息，也许会很长。内容是一些但系。所以我们需要努力在努力。"
                                            />
                                            <div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Panel>
                        <Panel header={
                            <div>
                                <div>
                                    <Tag color="#87d068">需求二</Tag>
                                    <span>主题：张某某入室盗窃案</span>
                                </div>
                                <div>
                                    <span> 主办人： 张三</span>
                                    <span> 创建时间 ：2018-04-111</span>
                                    <div>
                                        入室盗窃案的内容说明
                                    </div>
                                </div>
                            </div>
                        } key="2" style={customPanelStyle}>
                            <div >
                                <Divider dashed />
                                {/*  回复列表  */}
                                <List
                                    dataSource={requestSource}
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta style={{ width: "100%", flex: "auto", padding: "0 24px" }}
                                                title={
                                                    <div >
                                                        <span style={{ color: 'blue' }}>凌晨思思：</span>
                                                        <span style={{ color: '#999' }}>2018-02-02  </span>
                                                        <span style={{ color: 'red' }}> 反馈线索  </span>
                                                    </div>
                                                }
                                                description="案件的一些反馈信息，也许会很长。内容是一些但系。所以我们需要努力在努力。"
                                            />
                                            <div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Panel>
                        <Panel header={
                            <div>
                                <div>
                                    <Tag color="#87d068">需求三</Tag>
                                    <span>主题：顺风路抢劫案</span>
                                </div>
                                <div>
                                    <span> 主办人： 张三</span>
                                    <span> 创建时间 ：2018-04-111</span>
                                    <div>
                                        抢劫案的文字说明
                                    </div>
                                </div>
                            </div>
                        } key="3" style={customPanelStyle}>
                            <div >
                                <Divider dashed />
                                {/*  回复列表  */}
                                <List
                                    dataSource={requestSource}
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta style={{ width: "100%", display: "table", padding: "0 24px" }}
                                                title={
                                                    <div >
                                                        <span style={{ color: 'blue' }}>凌晨思思：</span>
                                                        <span style={{ color: '#999' }}>2018-02-02  </span>
                                                        <span style={{ color: 'red' }}> 反馈线索  </span>
                                                    </div>
                                                }
                                                description="案件的一些反馈信息，也许会很长。内容是一些但系。所以我们需要努力在努力。"
                                            />
                                            <div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    }
}