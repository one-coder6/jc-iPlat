import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List, Button, Modal } from 'antd';

//引入自定义组件
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import AddCBA from '../AddCBA/index';
import RecordInfor from './RecordInfor'; //笔录信息
import '../../../styles/scoutPlat.less';
export default class DbaseInfor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			detailSource: '',
			visible: false
		}
	}

	componentWillMount() {
		const ajbh = sessionStorage.getItem("ajbh");
		const reqUrl = addressUrl + `/cases/detail?ajbh=${ajbh}`;
		httpAjax("get", reqUrl).then(res => {
			if (res.code === '200') {
				this.setState({ detailSource: res.data && res.data })
			}
		})
	}
	addCBA = () => {
		this.setState({ visible: true })
	}
	handleCancel = () => {
		this.setState({ visible: false })
	}
	render() {
		const { visible } = this.state;
		const data = [
			'Racing car sprays burning fuel into crowd.',
			'Japanese princess to wed commoner.',
			'Australian walks 100km after outback crash.',
			'Man charged over missing wedding girl.',
			'Los Angeles battles huge wildfires.',
		];
		const casesVO = this.state.detailSource && this.state.detailSource.casesVO;
		const lsCasesSuspectVO = this.state.detailSource && this.state.detailSource.lsCasesSuspectVO;
		const lsCasesInformantVO = this.state.detailSource && this.state.detailSource.lsCasesInformantVO;
		const lsCasesGoodsVO = this.state.detailSource && this.state.detailSource.lsCasesGoodsVO;
		const lsSceneVO = this.state.detailSource && this.state.detailSource.lsSceneVO;
		const lsCasesRecordVO = this.state.detailSource && this.state.detailSource.lsCasesRecordVO;
		const lsSceneFingerPrintVO = this.state.detailSource && this.state.detailSource.lsSceneFingerPrintVO;
		const lsSceneFootPrintVO = this.state.detailSource && this.state.detailSource.lsSceneFootPrintVO;
		return (
			<div className='detailBaseInfo'>
				<div style={{ marginBottom: 10 }}>
					{casesVO.lasj}{casesVO.ajmc}
					{/* <Link to='/addCase' > */}
					<Button type='primary' size='small' style={{ margin: '0 10px' }} onClick={this.addCBA}>添加串并案</Button>
					{/* </Link> */}
					<span>串并案件：{
						casesVO.sfcba == 1 ? casesVO.lsCasesMegerVO && casesVO.lsCasesMegerVO.map((item, index) => {
							return <span key={index}>{item.ajbh}：{item.ajmc} </span>;
						}) : '无'
					}</span>
				</div>
				<Card title="基本信息">
					<Card.Grid >案件编号</Card.Grid>
					<Card.Grid >{casesVO.ajbh ? casesVO.ajbh : '无'}</Card.Grid>
					<Card.Grid >案件名称</Card.Grid>
					<Card.Grid >{casesVO.ajmc ? casesVO.ajmc : '无'}</Card.Grid>
					<Card.Grid >主办单位</Card.Grid>
					<Card.Grid >{casesVO.zbdwCn ? casesVO.zbdwCn : '无'}</Card.Grid>
					<Card.Grid >发案开始时间</Card.Grid>
					<Card.Grid >{casesVO.fasjcz ? casesVO.fasjcz : '无'}</Card.Grid>
					<Card.Grid >发案结束时间</Card.Grid>
					<Card.Grid >{casesVO.fasjzz ? casesVO.fasjzz : '无'}</Card.Grid>
					<Card.Grid >发案地点</Card.Grid>
					<Card.Grid >{casesVO.fadd ? casesVO.fadd : '无'}</Card.Grid>
					<Card.Grid >发案地域</Card.Grid>
					<Card.Grid >{casesVO.fadyCn ? casesVO.fadyCn : '无'}</Card.Grid>
					<Card.Grid >案件状态</Card.Grid>
					<Card.Grid >{casesVO.bdajstateCn ? casesVO.bdajstateCn : '无'}</Card.Grid>
					<Card.Grid >受理单位</Card.Grid>
					<Card.Grid >{casesVO.sljsdwCn ? casesVO.sljsdwCn : '无'}</Card.Grid>
					<Card.Grid >报警时间</Card.Grid>
					<Card.Grid >{casesVO.sljjsj ? casesVO.sljjsj : '无 '}</Card.Grid>
					<Card.Grid >接处警编号</Card.Grid>
					<Card.Grid >{casesVO.sljsdw ? casesVO.sljsdw : '无'}</Card.Grid>
					<Card.Grid >报警方式</Card.Grid>
					<Card.Grid >{casesVO.slJjfsCn ? casesVO.slJjfsCn : '无'}</Card.Grid>
					<Card.Grid >作案状态</Card.Grid>
					<Card.Grid >{casesVO.zaztCn ? casesVO.zaztCn : '无'}</Card.Grid>
					<Card.Grid >案别</Card.Grid>
					<Card.Grid >{casesVO.abCn ? casesVO.abCn : '无'}</Card.Grid>
					<Card.Grid >专案标识</Card.Grid>
					<Card.Grid >{casesVO.zabzCn ? casesVO.zabzCn : '无'}</Card.Grid>
					<Card.Grid >案件来源</Card.Grid>
					<Card.Grid >{casesVO.ajFromCn ? casesVO.ajFromCn : '无'}</Card.Grid>
					<Card.Grid >立案人员</Card.Grid>
					<Card.Grid >{casesVO.ajlaryCn ? casesVO.ajlaryCn : '无'}</Card.Grid>
					<Card.Grid >案件危害程度</Card.Grid>
					<Card.Grid >{casesVO.ajwhcdCn ? casesVO.ajwhcdCn : '无'}</Card.Grid>
					<Card.Grid >案件所属警区</Card.Grid>
					<Card.Grid >{casesVO.ajssjqCn ? casesVO.ajssjqCn : '无'}</Card.Grid>
					<Card.Grid >所属社区</Card.Grid>
					<Card.Grid >{casesVO.sssqCn ? casesVO.sssqCn : '无'}</Card.Grid>
					<Card.Grid >选择部位</Card.Grid>
					<Card.Grid >{casesVO.xzbwCn ? casesVO.xzbwCn : '无'}</Card.Grid>
					<Card.Grid >选择处所</Card.Grid>
					<Card.Grid >{casesVO.xzcsCn ? casesVO.xzcsCn : '无'}</Card.Grid>
					<Card.Grid >选择对象</Card.Grid>
					<Card.Grid >{casesVO.xzdxCn ? casesVO.xzdxCn : '无'}</Card.Grid>
					<Card.Grid >选择时间</Card.Grid>
					<Card.Grid >{casesVO.xzsjCn ? casesVO.xzsjCn : '无'}</Card.Grid>
					<Card.Grid >选择物品</Card.Grid>
					<Card.Grid >{casesVO.xzwpCn ? casesVO.xzwpCn : '无'}</Card.Grid>
					<Card.Grid >作案工具</Card.Grid>
					<Card.Grid >{casesVO.zagjCn ? casesVO.zagjCn : '无'}</Card.Grid>
					<Card.Grid >作案状态</Card.Grid>
					<Card.Grid >{casesVO.zaztCn ? casesVO.zaztCn : '无'}</Card.Grid>
					<Card.Grid >作案人数</Card.Grid>
					<Card.Grid >{casesVO.zars ? casesVO.zars : '无'}</Card.Grid>
					<Card.Grid >发现形式</Card.Grid>
					<Card.Grid >{casesVO.fxxsCn ? casesVO.fxxsCn : '无'}</Card.Grid>
					<Card.Grid >发案地点区县</Card.Grid>
					<Card.Grid >{casesVO.faddQxCn ? casesVO.faddQxCn : '无'}</Card.Grid>
					<Card.Grid >发案地点街道</Card.Grid>
					<Card.Grid >{casesVO.faddJdCn ? casesVO.faddJdCn : '无'}</Card.Grid>
					<Card.Grid >督办级别</Card.Grid>
					<Card.Grid >{casesVO.dbjbCn ? casesVO.dbjbCn : '无'}</Card.Grid>
					<Card.Grid >是否涉外</Card.Grid>
					<Card.Grid >{casesVO.sfswCn ? casesVO.sfswCn : '无'}</Card.Grid>
					<Card.Grid >手段特点</Card.Grid>
					<Card.Grid >{casesVO.sdtdCn ? casesVO.sdtdCn : '无'}</Card.Grid>
					<Card.Grid >死亡人数</Card.Grid>
					<Card.Grid >{casesVO.swrs ? casesVO.swrs : '无'}</Card.Grid>
					<Card.Grid >&nbsp;</Card.Grid>
					<Card.Grid >&nbsp;</Card.Grid>
					<Card.Grid style={{ width: '16%' }}>主要案情</Card.Grid>
					<Card.Grid style={{ width: '80%' }}>{casesVO.zyaq ? casesVO.zyaq : '无'}</Card.Grid>
				</Card>
				<Card title='办案人员' style={{ marginBottom: '10px' }}  >
					<Card.Grid style={{ width: '20%' }}>主办人员</Card.Grid>
					<Card.Grid style={{ width: '20%' }}>{casesVO.ajzbryCn || ''}</Card.Grid>
					<Card.Grid style={{ width: '20%' }}>协办人员</Card.Grid>
					<Card.Grid style={{ width: '40%' }}>
						{casesVO.ajxbryCn && typeof (casesVO.ajxbryCn) == 'object' ? casesVO.ajxbryCn.join(",") : casesVO.ajxbryCn}
					</Card.Grid>
				</Card>
				<Card title='嫌疑人' style={{ marginBottom: '10px' }}>
					{
						lsCasesSuspectVO && lsCasesSuspectVO.length >= 1 ?
							<List
								size="small"
								dataSource={lsCasesSuspectVO}
								renderItem={item => (
									<List.Item>
										{item.xm}，{item.xbCn}，{item.csrq}，户籍：{item.hjdz}，手机：{item.lxdh ? item.lxdh : '无'};
                                    违法情况：{item.wfqk}；教育经历:{item.reservation10 ? item.reservation10 : '无'}
									</List.Item>
								)}
							/> : '无'
					}

				</Card>
				<Card title='报案人/受害人' style={{ marginBottom: '10px' }}>
					{
						lsCasesInformantVO && lsCasesInformantVO.length >= 1 ?
							<List
								size="small"
								dataSource={lsCasesInformantVO}
								renderItem={item => (
									<List.Item>{item.rylxCn}，{item.xm}，{item.xbCn}，{item.csrq}，户籍：{item.hjdz}，手机：{item.lxdh ? item.lxdh : '无'}</List.Item>
								)}
							/> : '无'
					}

				</Card>
				<Card title='涉案物品' style={{ marginBottom: '10px' }}>
					{
						lsCasesGoodsVO && lsCasesGoodsVO.length >= 1 ?
							<List
								size="small"
								dataSource={lsCasesGoodsVO}
								renderItem={item => (
									<List.Item>失主：{item.wpsz ? item.wpsz : '未知'}；物品名称：{item.wpmcCn}；物品类别：{item.wplbCn}</List.Item>
								)}
							/> : '无'
					}

				</Card>
				<Card title='现场勘查' style={{ marginBottom: '10px' }}>
					{
						lsSceneVO && lsSceneVO.length >= 1 ?
							<List
								size="small"
								dataSource={lsSceneVO}
								renderItem={item => (
									<List.Item>勘查人员:{item.kyjcry}；勘查情况:{item.kyjcqk}；勘验地点:{item.kydd}；</List.Item>
								)}
							/> : '无'
					}
				</Card>
				<Card title='现场勘查图片' style={{ marginBottom: '10px' }} className='sceneImages'>
					{
						(lsSceneVO && lsSceneVO).length >= 1 ?
							lsSceneVO.map((item, index) => {
								return <div key={index} style={{ height: '200px' }}>
									{
										item.lsSceneImageCidVO && item.lsSceneImageCidVO.map((i, dn) => {
											return <Card.Grid key={dn} style={{ padding: 0 }}>{i.lbCn}<img alt="example" src={addressUrl + `/cases/sceneImage?id=${i.id}`} /></Card.Grid>
										})
									}
								</div>
							}) : '暂无图片'
					}
				</Card>
				<Card title='手印' style={{ marginBottom: '10px' }}>
					{
						lsSceneFingerPrintVO && lsSceneFingerPrintVO.length >= 1 ?
							<List
								size="small"
								dataSource={lsSceneFingerPrintVO}
								renderItem={item => (
									<List.Item>提取日期:{item.tqrq}；遗留部位:{item.ylbw ? item.ylbw : '无'}；</List.Item>
								)}
							/> : '暂无记录'
					}
				</Card>
				<Card title='足迹' style={{ marginBottom: '10px' }}>
					{
						lsSceneFootPrintVO && lsSceneFootPrintVO.length >= 1 ?
							<List
								size="small"
								dataSource={lsSceneFootPrintVO}
								renderItem={item => (
									<List.Item>提取日期:{item.tqrq}；遗留部位:{item.ylbw}；</List.Item>
								)}
							/> : '暂无记录'
					}
				</Card>
				<Card title='笔录信息' style={{ marginBottom: '10px' }}>
					{
						<RecordInfor lsCasesRecordVO={lsCasesRecordVO} />
						// lsCasesRecordVO.map((item,index)=>{
						//     return <span>
						//         {index},记录地点：{item.jldd}；记录人员：{item.recorder}；笔录对象性别：{item.targetXbCn}；
						//         笔录对象名称：{item.targetXm}；开始时间：{item.starttime}；结束时间：{item.endtime}；
						//         笔录内容：{item.body}笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：笔录内容：
						//         </span>
						// }):'暂无记录'
						// RecordInfor
					}
				</Card>
				{/* 添加串并案 */}
				<Modal visible={visible} title='添加串并案' onCancel={this.handleCancel} className='extractCaseM' footer={false}>
					{/* <AddCBA handleCancel={this.handleCancel} showType='addCBA' /> */}
				</Modal>
			</div>
		)
	}
}