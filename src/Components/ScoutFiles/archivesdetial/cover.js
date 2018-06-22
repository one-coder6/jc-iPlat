import React from 'react';
import { Link, HashRouter } from 'react-router-dom';
import { Icon, List, Spin } from 'antd';
import { httpAjax, addressUrl } from '../../../Util/httpAjax'; //引入自定义组件
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
			trunObj: null,
			loading: true,
			ajbh_dang: '' // 档案案件编号
		}

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
	loadingfn = (b) => {
		setTimeout(() => {
			this.setState({ loading: b })
		}, 1000)
	}
	componentWillMount() {
		let ajbh_dang = sessionStorage.getItem("ajbh_dang") || '-',
			ajmc_dang = sessionStorage.getItem("ajmc_dang") || '-';
		this.setState({ ajbh_dang: ajbh_dang, ajmc_dang: ajmc_dang })
		this.loadShowBook();
		// 获取勘查信息和案件基本信息
		httpAjax("get", addressUrl + '/archives/surveyedSceneInfo', { params: { ajbh: ajbh_dang } }).then(res => {
			if (res.code == 200) {
				this.setState({ baseEnity: { ...res.data.casesVO } });
			}
		})
	}

	render() {
		const { baseEnity } = this.state;
		const baseInfos = baseEnity ? baseEnity.casesVO : {}; // 基本信息
		const sceneVO = baseEnity ? baseEnity.sceneVO : []; // 勘查
		const lsSceneBiologyPrintVO = baseEnity ? baseEnity.lsSceneBiologyPrintVO : []; // 手印类型
		const lsSceneFingerPrintVO = baseEnity ? baseEnity.lsSceneFingerPrintVO : []; // 指纹
		const lsSceneFootPrintVO = baseEnity ? baseEnity.lsSceneFootPrintVO : []; //足迹

		// 配置页面
		const catalogList = [
			{ name: '案件基本信息', Comp: <BaseInfo baseInfos={baseInfos} /> },
			{ name: '线索信息', Comp: <ClueInfo /> },
			{ name: '现场勘查信息', Comp: <Prospecting sceneVO={sceneVO} lsSceneBiologyPrintVO={lsSceneBiologyPrintVO} lsSceneFingerPrintVO={lsSceneFingerPrintVO} lsSceneFootPrintVO={lsSceneFootPrintVO} /> },
			{ name: '笔录信息', Comp: <Record /> },
			{ name: '涉案人员信息', Comp: <Suspect /> },
			{ name: '涉案物品信息', Comp: <Goods loadingfn={this.loadingfn} /> }
		];

		const PageDom = catalogList && catalogList.map((item, index) => {
			return <div className="archiivcont" key={index}>
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
				<div style={{ height: 800 }}>
					<div className="backToScoutFilesBtn"><Link to={{ pathname: '/scoutFile' }} title="返回侦查档案"><Icon type="arrow-left" /> 返回侦查档案列表</Link></div>
					<Spin spinning={this.state.loading}>
						<div style={{ height: 700, display: this.state.loading ? 'none' : 'block' }} >
							<div className="flipbook-viewport">
								<div className="container">
									<div className="flipbook">
										<div className="archivcover" style={{ background: '#c18e68' }}>
											<div style={{ padding: 40, textAlign: "center", fontFamily: "幼圆", fontWeight: 800 }}>
												<h1>情报超市侦查档案</h1>
												<h4>案件名称：{this.state.ajmc_dang}</h4>
												<h4>案件编号：{this.state.ajbh_dang}</h4>
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
				</div>
			</CommonLayout >
		)
	}
}