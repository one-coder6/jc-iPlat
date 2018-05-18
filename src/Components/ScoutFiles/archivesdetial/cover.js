import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, List, Spin } from 'antd';
//引入公用部分
import CommonLayout from '../../Content/Index'
import $ from 'jquery'
// 页面
import BaseInfo from './baseinfo'; // 基本信息
import ClueInfo from './clueInfo'; // 线索
import Prospecting from './prospecting'  // 勘查
import Record from './record'  // 笔录
import Suspect from './suspect'  // 嫌疑人
import Goods from './goods'  // 涉案物品

/* 档案信息 - 封面 */
export default class ScoutFile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showContent: false,
			searchParam: null,
			trunObj: null,
			loading: false
		}
		this.loadShowBook();
	}
	// 引入翻书组件
	loadShowBook = () => {
		window.$tempJq = $;
		require(['../../../plugin/turn/turn.js'], () => {
			$('.flipbook').turn({
				// Width
				width: 1200,
				// Height
				height: 700,
				// Elevation
				elevation: 50,
				// Enable gradients
				gradients: true,
				// Auto center this flipbook
				autoCenter: true
			});
			this.state.trunObj = $('.flipbook')
		})
	}
	// 目录跳转
	catalogclick = (e) => {
		let t = e || 0;
		this.state.trunObj.turn("page", t + 3);
	}
	componentWillReceiveProps = (nextProps) => {
		let pp = nextProps;
	}
	componentDidMount = () => {
	}

	handleSearch = (value) => {
		this.setState({ searchParam: value });
	}
	render() {
		const { showContent } = this.state;
		// 配置页面
		const catalogList = [
			{ name: '案件基本信息', Comp: <BaseInfo /> },
			{ name: '线索信息', Comp: <ClueInfo /> },
			{ name: '现场勘查信息', Comp: <Prospecting /> },
			{ name: '笔录信息', Comp: <Record /> },
			{ name: '嫌疑人信息', Comp: <Suspect /> },
			{ name: '涉案物品信息', Comp: <Goods finishState={this.state.loading} /> }
		];

		const PageDom = catalogList && catalogList.map((item, index) => {
			return <div className="archiivcont">
				<div className={index % 2 != 0 ? "cont-bookpage-even" : "cont-bookpage-odd"}>
					<div>
						<div className="bookpage-body">
							<p style={{ fontWeight: 800, paddingTop: 35 }}>{item.name}</p>
							{item.Comp}
							<p style={{ fontSize: '12px', paddingTop: '10px' }}>—— {(index + 1) + ' ' + item.name} ——</p>
						</div>
					</div>
				</div>
			</div>
		})
		return (
			<CommonLayout>
				<Spin spinning={this.state.loading}>
					<div>
						<div className="flipbook-viewport">
							<div className="container">
								<div className="flipbook">
									<div className="archivcover" style={{ background: '#c18e68' }}>
										<div style={{ padding: 40, textAlign: "center", fontFamily: "幼圆", fontWeight: 800 }}>
											<h1>情报超市侦查档案</h1>
											<h4>编号：A4403035200002007010003</h4>
										</div>
									</div>
									<div className="archiivcont">
										<div className="cont-bookpage-odd">
											<div>
												<h1 style={{ width: '100%', display: 'block', textAlign: 'center', paddingTop: "25px" }}>目       录</h1>
												<List style={{ padding: 25 }}
													dataSource={catalogList}
													renderItem={(item, index) => (<List.Item style={{ border: '0px' }}>
														<span style={{ cursor: 'pointer' }} onClick={() => { return this.catalogclick(index) }}>{item.name}</span>.......................................................................................................{index + 1}
													</List.Item>)}
												/>
											</div>
										</div>
									</div>
									{PageDom}
									<div className="archiivcont">
										<div className="cont-bookpage-odd">
											<div>
												<div style={{ width: "100%", textAlign: "center", padding: "20px auto" }}>
													<h1>情报超市侦查档案</h1>
													<h3>结束</h3>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Spin>
			</CommonLayout >
		)
	}
}