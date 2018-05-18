import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Tag, Badge, Icon, Card, Tooltip, Divider } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
const Panel = Collapse.Panel;
/* 侦查档案 - 嫌疑人信息 */
export default class Suspect extends React.Component {
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
        return (
            <div>
                <div>
                    <div>
                        <img style={{width:400,height:300}} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                        <img style={{width:400,height:300}} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                </div>
            </div>
        )
    }
}