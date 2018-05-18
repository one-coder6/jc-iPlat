import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
export default class TestComponent extends React.Component{

	constructor(props) {
		super(props);
	}

	render(){
		return (
				<Row gutter={16}>
					<Col span={8}>col-12</Col>
      				<Col span={8}>col-12</Col>
      				<Col span={8}>col-12</Col>
				</Row>
		)
	}
}