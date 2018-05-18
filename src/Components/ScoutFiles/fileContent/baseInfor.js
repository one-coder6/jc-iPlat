import React from 'react';
import ReactDOM from 'react-dom';
import {
	Row,
	Col,
	Steps,
	Icon,
	Tag
} from 'antd';

const Step = Steps.Step;
export default class BaseInfor extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h3>刑事案件基本信息</h3>
				{<Steps >
					<Step status="finish" title={
						<div>
						<Tag color="magenta">magenta</Tag>
						<div>
							<p>时间</p>
							<p>地点</p>
						</div>							
						</div>
					} icon={<Icon type="clock-circle-o" />} />

					<Step status="finish" title={
						<div>
						<Tag color="magenta">magenta</Tag>
						<p>时间</p>
						<p>地点</p>							
						</div>
					} icon={<Icon type="clock-circle-o" />} />
					<Step status="finish" title={
						<div>
						<Tag color="magenta">magenta</Tag>
						<p>时间</p>
						<p>地点</p>							
						</div>
					} icon={<Icon type="clock-circle-o" />} />
				  </Steps>}				
			</div>
		)
	}
}