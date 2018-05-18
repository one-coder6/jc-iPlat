// import React from 'react';
// import {HashRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';


// import AppComponent from 'containers/admin/main/AppComponent';

// import LoginComponent from 'containers/login/login';

// import ViewComponent from 'containers/view/main/ViewComponent';
// import Sysset from '../Components/SystemSet/Index';
// 路由配置
// const routes = () => (
//   <Router>
//     <div className="app">
//       <Switch>
//         <Route path="/sysset" component={Sysset} />
//         { /*       
//           <Route exact path="/" render={() => <Redirect to="/login" push />} />        
//           <Route path="/app" component={AppComponent} />
//           <Route path="/login" component={LoginComponent} />
//           <Route path="/view" component={ViewComponent} />
//         */}
//       </Switch>
//     </div>
//   </Router>
// );
// export default routes;

import React from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import {
    Provider
} from 'react-redux';

//引入antd 汉化包
import {
    LocaleProvider
} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';


// 引入自定义组件
import Index from '../Components/Index'; //首页
import Login from '../Components/login/login';
import PersonalCenter from '../Components/PersonalCenter/index' //个人工作台
import ScoutPlat from '../Components/ScoutPlat/index' // 侦查平台 
import FightPlat from '../Components/FightPlat/index' //  融合作战平台
import ScoutFile from '../Components/ScoutFiles/index'; //侦查档案

//二级
import CaseDetail from '../Components/ScoutPlat/ScoutComponents/CaseDetail' //侦查列表详情
import ExtractCase from '../Components/ScoutPlat/ExtractCase';   //提取案件
import AddCase from '../Components/ScoutPlat/ScoutComponents/AddCase';      //创建案件
import ContentComponent from '../Components/Content/Index'; //中间主内容

//----------jc start-----
import ArchivesDetial from '../Components/ScoutFiles/archivesdetial/cover' //档案列表详情
//----------jc end-----

// 引入store
import store from '../store/index';
const routes = (App) => {
    return (<HashRouter>
        <Provider store={store}>
            <LocaleProvider locale={zh_CN}>
                <App>
                    <Switch>
                        {/* 登录 */}
                        <Route exact path="/" component={Login} />
                        <Route exact path="/" render={() => (
                            false ? (
                                <Redirect to="/ScoutPlat" />
                            ) : (
                                    <Login />
                                )
                        )} />
                        <Route path="/index" component={Index} />
                        <Route path="/userCenter" component={PersonalCenter} />
                        <Route path="/fightPlat" component={FightPlat} />
                        <Route path="/scoutPlat" component={ScoutPlat} />
                        <Route path='/scoutFile' component={ScoutFile} />
                        <Route path='/caseDetail' component={CaseDetail} />
                        <Route path='/addCase' component={AddCase} />
                        <Route path='/archivesdetial' component={ArchivesDetial} />
                        <Route path='/extractCase' component={ExtractCase} />
                        {/* 没有匹配到的路由重定向到首页或者是自己写一个404提示页面 */}
                        <Redirect to="/" />
                    </Switch>
                </App>
            </LocaleProvider>
        </Provider>
    </HashRouter>)
}
export default routes;