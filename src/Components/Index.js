import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  Redirect
} from "react-router-dom";
import {
  Row,
  Col
} from 'antd';

import CommonLayout from './Content/Index';
import SynopsisIndex from './IndexComponents/SynopsisIndex'
import Spokesperson from '../images/spokesperson.png';
import '../styles/home.less';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPic: false,
    }
  }

  componentWillMount() {
    // 判断是否登陆 记错了 不能这样用 需要自己写一个组件来进行权限控制和跳转。

  }

  showPandect = () => {
    let _this = this;
    this.setState({
      showPic: !this.state.showPic
    }, function() {
      _this.state.showPic ? _this.requestFullScreen() : _this.exitFull();
    })
  }

  requestFullScreen() {
    // 判断各种浏览器，找到正确的方法
    let element = document.documentElement;
    let requestMethod = element.requestFullScreen || //W3C
      element.webkitRequestFullScreen || //Chrome等
      element.mozRequestFullScreen || //FireFox
      element.msRequestFullScreen; //IE11
    if (requestMethod) { 
      requestMethod.call(element);
    }
    // else if (typeof window.ActiveXObject&&window.ActiveXObject !== "undefined") {//for Internet Explorer 
    //  let wscript = new ActiveXObject("WScript.Shell");
    //  if (wscript !== null) {
    //   wscript.SendKeys("{F11}");
    //  }
    // }
  }

  exitFull() {
    // 判断各种浏览器，找到正确的方法
    var exitMethod = document.exitFullscreen || //W3C
      document.mozCancelFullScreen || //Chrome等
      document.webkitExitFullscreen || //FireFox
      document.webkitExitFullscreen; //IE11
    if (exitMethod) {
      exitMethod.call(document);
    }
    // else if (typeof window.ActiveXObject&&window.ActiveXObject !== "undefined") {//for Internet Explorer
    //   var wscript = new ActiveXObject("WScript.Shell");
    //   if (wscript !== null) {
    //     wscript.SendKeys("{F11}");
    //   }
    // }

  }

  render() {
    const {
      showPic 
    } = this.state;
    return (
      <CommonLayout>
          {/* 首页 */}
        <SynopsisIndex  handleShow = {this.showPandect}/>
      </CommonLayout>

    )
  }
}