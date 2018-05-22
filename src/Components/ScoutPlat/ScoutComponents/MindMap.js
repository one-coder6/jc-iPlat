import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import { MindMapUrl } from '../../../Util/httpAjax';


export default class MindMap extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div >
                <iframe style={{ border: '1px solid #fff', width: '100%', height: '850px' }} src={MindMapUrl}></iframe>
            </div>
        )
    }
}