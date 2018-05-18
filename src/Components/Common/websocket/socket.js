import React from 'react';
import {
    Icon,
    message,
    notification
} from 'antd';

export function ScoketHandler(url) {
    let SHL = {};
    if (url) {
        let that = SHL;
        that.WS = null;
        that.callback = null;
        let SLOG = true; //开启日志
        // 初始化
        that.init = () => {
            var support = "MozWebSocket" in window ? "MozWebSocket" : ('WebSocket' in window ? 'WebSocket' : null);
            if (support == null) {
                SLOG && message.info('您的浏览器不支持WebSocket！');
                return false;
            }
            that.connect();
        }
        // 进行连接
        that.connect = () => {
            try {
                let _ws = new WebSocket(url);  //, 'subprotocol'
                // _ws.binaryType = "blob";
                if (_ws.readyState === WebSocket.CONNECTING) {
                    SLOG && notification.open({
                        message: '提示：',
                        description: '正在连接WebSocket服务器...',
                        icon: <Icon type="swap" style={{ color: '#108ee9' }} />,
                    });
                }
                _ws.onopen = that.onopen;
                _ws.onmessage = that.onmessage;
                _ws.onclose = that.onclose;
                _ws.onerror = that.onerror;
                that.WS = _ws;
            } catch (e) {
                SLOG && notification.open({
                    message: '提示：',
                    description: getWebSocketState() + "【" + e + "】",
                    icon: <Icon type="close-circle" style={{ color: '#108ee9' }} />,
                });
            }
        }
        // 打开连接
        that.onopen = () => {
            let ws = that.WS;
            if (ws.readyState === WebSocket.OPEN) {
                SLOG && notification.open({
                    message: '提示：',
                    description: '已连接到WebSocket服务器...',
                    icon: <Icon type="check" style={{ color: '#108ee9' }} />,
                });
            }
        }
        // 有新消息
        that.onmessage = (ev) => {
            SLOG && notification.open({
                message: '提示：',
                description: '你有新的短消息',
                icon: <Icon type="check" style={{ color: '#108ee9' }} />,
            });
            console.log(ev.data)
            if (that.callback) {
                that.callback(ev.data)
            }
        }
        // 发送消息
        that.onsend = (msg) => {
            let ws = that.WS;
            if (ws != null && ws.readyState === WebSocket.OPEN) {
                if (msg == "" || msg == null || msg == "undefined") {
                    return false;
                }
                ws.send(msg);
                SLOG && notification.open({
                    message: '提示：',
                    description: '本条消息发送完毕：' + msg,
                    icon: <Icon type="check" style={{ color: '#108ee9' }} />,
                });
            } else {
                SLOG && notification.open({
                    message: '提示：',
                    description: '发送失败！原因：可能是WebSocket未能建立连接！',
                    icon: <Icon type="check" style={{ color: '#108ee9' }} />,
                });
            }
        }
        // 关闭连接
        that.onclose = () => {
            if (that.WS) {
                that.WS.close();
                SLOG && notification.open({
                    message: '提示：',
                    description: getWebSocketState(),
                    icon: <Icon type="close-circle" style={{ color: '#108ee9' }} />,
                });
            }
        }
        // 异常
        that.onerror = () => {
        }

        // 查询ws状态
        function getWebSocketState() {
            let ws = that.WS;
            var result = "";
            switch (ws.readyState) {
                case 0:
                    result = "连接正在进行中，但还未建立";
                    break;
                case 1:
                    result = "连接已经建立。消息可以在客户端和服务器之间传递";
                    break;
                case 2:
                    result = "连接正在进行关闭握手";
                    break;
                case 3:
                    result = "连接已经关闭，不能打开";
                    break;
            }
            return result;
        }
    }
    return SHL;
}