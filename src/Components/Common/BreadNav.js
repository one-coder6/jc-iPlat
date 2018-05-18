import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
class BreadNav extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			breadcrumbName:''
		}
	}
	componentWillMount() {
		const pathname = this.props.location.pathname;
		this.setState({breadcrumbName:this.mapPath(pathname)})
		//this.mapPath(pathname)
		//console.log("props", this.props.location)

	}
	mapPath = (path) => {
		switch (path) {
			case "/scoutPlat":
				return '侦查工作台';
			// 	break;
			// 	x = "Today it's Friday";
			// 	break;
			// case 6:
			// 	x = "Today it's Saturday";
			// 	break;
		}
	}
	render() {
		const { breadcrumbName } = this.state;
		return (
			<Breadcrumb>
				<Breadcrumb.Item><Icon type="home" />{breadcrumbName}</Breadcrumb.Item>
				{/* <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
				<Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
				<Breadcrumb.Item>An Application</Breadcrumb.Item> */}
			</Breadcrumb>
		)
	}
}
export default withRouter(BreadNav)