import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Tag, Badge, Icon, Tooltip } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
/* 侦查档案 - 物品 */
export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            finishState: this.props.finishState
        }
    }
    componentWillMount() {
        let ajbh_dang = sessionStorage.getItem("ajbh_dang") || '-';
        this.setState({ ajbh_dang: ajbh_dang })
        httpAjax("get", addressUrl + '/archives/caseGoods', { params: { ajbh: ajbh_dang } }).then(res => {
            if (res.code == 200) {
                this.setState({
                    total: res.data && res.data.length ? res.data.length : 0,
                    dataSource: res.data
                })
            }
        })
        let { loadingfn } = this.props;
        loadingfn(false)
    }

    render() {
        const columns_ys = [{
            title: '序号',
            align: "center",
            dataIndex: 'name',
            render: (text, record, index) => {
                return <a href="javascript:;">{index + 1}</a>
            }
        }, {
            title: '物品名称',
            align: "center",
            className: 'column-money',
            dataIndex: 'wpmcCn',
        }, {
            title: '物品类别',
            align: "center",
            dataIndex: 'wplbCn',
        }];

        const data_ys = [{
            key: '1',
            wplbCn: '手表',
            wpmcCn: '劳力士',
        }, {
            key: '2',
            wplbCn: '手提包',
            wpmcCn: 'LV',
        }];
        return (
            <div>
                <div>
                    <div style={{ padding: 10 }}>
                        <p><Icon type="bars" style={{ color: '#50afff' }} /> 涉案物品信息</p>
                        <Table
                            columns={columns_ys}
                            dataSource={this.state.dataSource}
                            pagination={{
                                pageSize: 40,
                                showTotal: () => {
                                    return `共 ${this.state.total} 条`
                                }
                            }}
                            bordered
                            rowKey="key"
                            title={null}
                        />
                    </div>
                </div>
            </div>
        )
    }
}