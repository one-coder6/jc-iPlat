import React from 'react';
import { Form, Input, Select, Button, TreeSelect } from 'antd';
import { httpAjax, addressUrl, UC_URL } from '../../../Util/httpAjax';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class ZBDWComponent extends React.Component {
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            value: value.val, // 返回出去的value
            treeData: null
        };
    }
    componentWillMount() {
        //获取作战单位首层
        const reqUrl = UC_URL + "getTopDepartment";
        httpAjax("post", reqUrl, {}).then(res => {
            this.setState({ treeDefaultValue: res })
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: this.props.multipleVlue ? item.code + '&' + item.fullname : item.code,
                key: item.code,
            }))
            this.setState({ treeData: treeDataSource })
        })
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    //异步加载子节点
    loadTreeData = (treeNode) => {
        const reqUrl = UC_URL + "getDepartmentByAny";
        return httpAjax("post", reqUrl, { pcode: treeNode.props.eventKey }).then(res => {
            const treeDataSource = res && res.map((item, index) => ({
                title: item.fullname,
                value: this.props.multipleVlue ? item.code + '&' + item.fullname : item.code,
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
    handleCurrencyChange = (value) => {
        debugger;
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        this.triggerChange({ value });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            debugger;
           // onChange(Object.assign({}, this.state, changedValue));
           onChange(changedValue)
        }
    }
    render() {
        const { size } = this.props;
        const { treeData } = this.state;
        return (
            <TreeSelect
                //  defaultValue={this.props.defaultValue ? this.props.defaultValue : null}
                loadData={this.loadTreeData}
                dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                onSelect={this.handleCurrencyChange}
                placeholder={this.props.placeholder ? this.props.placeholder : '受理单位'}
                treeDefaultExpandAll
            >
                {this.renderTreeNodes(treeData)}
            </TreeSelect>
        );
    }
}

export default ZBDWComponent;