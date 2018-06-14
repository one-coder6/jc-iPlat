import React from 'react';
import { Icon, TreeSelect } from 'antd';
import { httpAjax, addressUrl, UC_URL } from '../../../Util/httpAjax';
const TreeNode = TreeSelect.TreeNode;
class fileAddType extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            treeData: null
        }
    }
    componentWillMount() {
        //获取作战单位首层
        const reqUrl = UC_URL + "getTopDepartment";
        httpAjax("post", reqUrl, {}).then(res => {
            this.setState({ treeDefaultValue: res })
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: item.code,
                key: item.code,
            }))
            this.setState({ treeData: treeDataSource })
        })
    }

    //异步加载子节点
    loadTreeData = (treeNode) => {
        const reqUrl = UC_URL + "getDepartmentByAny";
        return httpAjax("post", reqUrl, { pcode: treeNode.props.eventKey }).then(res => {
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: item.code,
                key: item.code,
            }))

            treeNode.props.dataRef.children = treeDataSource;
            this.setState({ treeData: [...this.state.treeData] });
        })
    }
    //获取树节点的Key
    treeSelectKeys = (value) => {
        const { onChange } = this.props
        // const newValue = [...value]
        // newValue[index] = target.value
        onChange(value)

    }
    //渲染树子节点
    renderTreeNodes = (data) => {
        return data && data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} value={item.value} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />
        });
    }
    render() {
        const { treeData } = this.state;
        return <TreeSelect
            loadData={this.loadTreeData}
            dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
            onSelect={this.treeSelectKeys}
            searchPlaceholder='受理单位'
            treeDefaultExpandAll
        >
            {this.renderTreeNodes(treeData)}
        </TreeSelect>
    }
}
export default fileAddType