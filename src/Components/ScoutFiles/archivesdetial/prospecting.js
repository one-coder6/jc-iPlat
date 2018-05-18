import React from 'react';
import ReactDOM from 'react-dom';
import { List, Tag, Badge, Icon, Card, Tooltip } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const { Meta } = Card;
/* 侦查档案 - 勘查 */
export default class Prospecting extends React.Component {
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
        const data = [
            {
                title: 'Title 1',
            },
            {
                title: 'Title 2',
            },
            {
                title: 'Title 3',
            },
            {
                title: 'Title 4',
            },
        ];

        return (
            <div>
                <div>
                    <div>
                        <Card bordered={false} hoverable={false}>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 指纹</td></tr></thead>
                                <tbody>
                                    <tr><td style={{ width: '280px' }}>指纹编号：A4403035200002007010003</td></tr>
                                    <tr><td>描述：嫌疑人李某左手指纹</td></tr>
                                    <tr>
                                        <td><List
                                            grid={{ gutter: 16, column: 3 }}
                                            dataSource={data}
                                            renderItem={item => (
                                                <List.Item>
                                                    <Card cover={<img alt="example" style={{ width: 90, height: 90 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} >
                                                        <Meta description="图片1" />
                                                    </Card>
                                                </List.Item>
                                            )}
                                        /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                        <Card bordered={false} hoverable={false}>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> DNA</td></tr></thead>
                                <tbody>
                                    <tr><td style={{ width: '280px' }}>DNA编号：A4403035200002007010003</td></tr>
                                    <tr><td>描述：嫌疑人李某DNA信息</td></tr>
                                    <tr>
                                        <td><List
                                            grid={{ gutter: 16, column: 3 }}
                                            dataSource={data}
                                            renderItem={item => (
                                                <List.Item>
                                                    <Card cover={<img alt="example" style={{ width: 90, height: 90 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} >
                                                        <Meta description="图片1" />
                                                    </Card>
                                                </List.Item>
                                            )}
                                        /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                        <Card bordered={false} hoverable={false}>
                            <table>
                                <thead><tr><td colSpan="2"><Icon type="bars" style={{ color: '#50afff' }} /> 足迹</td></tr></thead>
                                <tbody>
                                    <tr><td style={{ width: '280px' }}>足迹编号：A4403035200002007010003</td></tr>
                                    <tr><td>描述：嫌疑人李某DNA信息</td></tr>
                                    <tr>
                                        <td><List
                                            grid={{ gutter: 16, column: 3 }}
                                            dataSource={data}
                                            renderItem={item => (
                                                <List.Item>
                                                    <Card cover={<img alt="example" style={{ width: 90, height: 90 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} >
                                                        <Meta description="图片4" />
                                                    </Card>
                                                </List.Item>
                                            )}
                                        /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}