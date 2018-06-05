import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import RenderInBody from '../renderInbody'
import QueueAnim from 'rc-queue-anim';
class LeftRightDoor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            breadcrumbName: '',
            show: true
        }
    }
    componentWillMount() {
    }

    componentWillUnmount() {
    }

    // 关闭
    closeDoor = () => {
        alert(this.state.show)
        this.setState({ show: !this.state.show })
    }
    render() {
        const { titleCont, content, onOpen, onClose } = this.props;
        let _style = {
            position: "absolute",
            /*   border: "1px solid red", */
            width: 350,
            height: '100%',
            background: '#fff',
            zIndex: 9999,
            right: 0,
            top: 0,
            padding: 15,
            display: this.state.show ? 'block' : 'none'

        };
        console.log(this.state.show ? 'block' : 'none')
        return <RenderInBody>
            <div style={_style} ><QueueAnim delay={1000} className="queue-simple">
                {this.state.show ?
                    <div>
                        <div style={{ width: '100%', borderBottom: "1px solid  #e8e8e8" }}>
                            <span style={{ padding: '5px 0px 10px 0px', display: 'inline-block' }}>
                                {titleCont}
                            </span>
                            <button aria-label="Close" className="ant-modal-close" onClick={this.closeDoor}><span className="ant-modal-close-x"></span></button>
                        </div>{content}
                    </div>
                    : '123'
                }
            </QueueAnim>
            </div>
        </RenderInBody>;
    }
}

export default LeftRightDoor