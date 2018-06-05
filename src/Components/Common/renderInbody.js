import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

class renderInBody extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        this.popup = document.createElement("div");
        document.body.appendChild(this.popup);
        this._renderLayer();
        /* 
        let div = document.createElement('div');
        document.body.appendChild(div);
        ReactDOM.render(
            <div style={{ border: '1px solid red', width: 100, height: 300, position: 'absolute', top: 0, zIndex: 9999999, background: '#fff' }}>我是弹出层</div>
            , div); */
    }

    componentWillUnmount(){
        alert("clear")
        //在组件卸载的时候，保证弹层也被卸载掉
        ReactDOM.unmountComponentAtNode(this.popup);
        document.body.removeChild(this.popup);
    }

    _renderLayer(){
        //将弹层渲染到body下的div标签
        ReactDOM.render(this.props.children, this.popup);
    }

    render() {
        return null;
    }
}

export default renderInBody