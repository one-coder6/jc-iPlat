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
            show: true,
            position: "absolute",
            /*   border: "1px solid red", */
            width: 350,
            height: '100%',
            background: '#fff',
            zIndex: 9999,
            right: 0,
            top: 0,
            padding: 15,
            display: 'none'

        }
    }
    componentWillMount() {
    }

    componentWillUnmount() {
    }
    componentWillReceiveProps(nextprops) {
        alert(nextprops.showChildrenBox)
    }
    // 关闭
    closeDoor = () => {
        //alert(this.state.show)
        this.setState({ display: 'none', background: 'red' })
    }
    render() {
        const { titleCont, content, onOpen, onClose } = this.props;
        let _style = {
            position: "fixed",
            /*   border: "1px solid red", */
            width: 350,
            height: '100%',
            background: '#fff',
            zIndex: 9999,
            right: 0,
            top: 0,
            padding: 15,
         /*    display: this.state.show ? 'block' : 'none' */

        };
        console.log(this.state.show ? 'block' : 'none')
        return <RenderInBody>
            <div style={{ ...this.state }} ><QueueAnim delay={1000} className="queue-simple">
                <div>
                    <div style={{ width: '100%', borderBottom: "1px solid  #e8e8e8" }}>
                        <span style={{ padding: '5px 0px 10px 0px', display: 'inline-block' }}>
                            {titleCont}
                        </span>
                        {'内容：' + this.state.display}
                        <button aria-label="Close" className="ant-modal-close" onClick={this.closeDoor}><span className="ant-modal-close-x"></span></button>
                    </div>{content}
                </div>
            </QueueAnim>
            </div>
        </RenderInBody>;
    }
}

export default LeftRightDoor