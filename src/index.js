import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import registerServiceWorker from './registerServiceWorker';
import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// 引入路由
import routes from './router/index'
// 引入ui组件库
import 'antd/dist/antd.css';
class App extends Component {
  render() {
    return (
    	<div style={{height:'100%'}}>
    		{this.props.children}
    	</div>
    );
  }
}



ReactDOM.render(
  routes(App),
  document.getElementById('root')
);


