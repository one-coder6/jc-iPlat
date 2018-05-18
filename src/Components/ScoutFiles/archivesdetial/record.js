import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Tag, Badge, Icon, Card, Tooltip, Divider } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const Panel = Collapse.Panel;
/* 侦查档案 - 笔录 */
export default class Record extends React.Component {
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
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };

        return (
            <div>
                <div>
                    <div style={{ width: "100%", minHeight: 300, background: "#fafafa", borderRadius: 5,padding:10 }}>
                        笔录内容很长，很长。
                   </div>
                </div>
            </div>
        )
    }
}