import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Steps, Icon, Tag, Timeline } from 'antd';

import '../../../styles/scoutPlat.less';
const Step = Steps.Step;
export default class Dprogress extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Timeline className='progressVer'>
                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="red">
                        <p>Solve initial network problems 1</p>
                        <p>Solve initial network problems 2</p>
                        <p>Solve initial network problems 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p>Technical testing 1</p>
                        <p>Technical testing 2</p>
                        <p>Technical testing 3 2015-09-01</p>
                    </Timeline.Item>
                </Timeline>
            </Card>
        )
    }
}