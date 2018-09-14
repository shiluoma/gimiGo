import React from "react";
import { Route } from "react-router-dom";
import { Toast } from "antd-mobile";
import copy from 'copy-to-clipboard';
import { GetWxConfig } from '../api/apiFn';
import open from '../../common/api/open';
import API from '../../common/api/api';
import getUrlArgObject from '../../common/api/getUrlArgObject';
const getParams = getUrlArgObject();
const path = "regUser";

var headImg = API.imgPath + decodeURI(getParams.userPic);
var name = decodeURI(getParams.nickName);
var invitationCode = decodeURI(getParams.invitationCode);
var qrCodePic = API.imgPath + decodeURI(getParams.qrCodePic);

export default class InfoPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    isFc: false,
    data: [],
    imgHeight: 176,
  };

  copyUrl = () => {
    Toast.info('复制成功!', 1);
    var _this = this;
    copy(invitationCode, {
      debug: false,
      message: 'Press #{key} to copy',
    });
    console.log('复制成功，如果失败，请在输入框内手动复制.')
  };


  hideFcFn = () => {
    this.setState({
      isFc: false,
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillMount() {
    var _this = this;
    // var data = GetMyInfo(getParams.userId,getParams.optUserId ,getParams.tokenId ,function (data) {
    //   _this.setState({
    //     data:data.returnValue,
    //   })
    // })
  }

  componentDidMount() {
    //转发到朋友圈
    const debug = NODE_ENV == "development" ? 0 : 1;
    var data = GetWxConfig(debug, function (data) {
      console.log(data)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
        appId: data.returnValue.appId, // 必填，公众号的唯一标识
        timestamp: data.returnValue.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.returnValue.nonceStr, // 必填，生成签名的随机串
        signature: data.returnValue.signature,// 必填，签名，见附录1
        jsApiList: data.returnValue.jsApiList
      });
      wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
        //则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.onMenuShareTimeline({
          title: '好友邀请您开启jimigo之路',
          link: window.location.href,
          imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
          success: function () {
            console.log("分享成功")
          },
          cancel: function () {
            console.log("分享失败")
          }
        });
  
        //转发给朋友
        wx.onMenuShareAppMessage({
          title: '好友邀请您开启jimigo之路',
          desc: '好友' + getParams.nickName + '为您送来TA的专属邀请，品质生活，触手可及，尽在jimigo',
          link: window.location.href,
          imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
          type: 'link',
          dataUrl: '',
          success: function () {
            console.log("分享成功")
          },
          cancel: function () {
            console.log("分享失败")
          }
        });
      
      });

      // wx.onMenuShareTimeline({
      //   title: '好友邀请您开启jimigo之路',
      //   link: window.location.href,
      //   imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
      //   success: function () {
      //     console.log("分享成功")
      //   },
      //   cancel: function () {
      //     console.log("分享失败")
      //   }
      // });

      // //转发给朋友
      // wx.onMenuShareAppMessage({
      //   title: '好友邀请您开启jimigo之路',
      //   desc: '好友' + getParams.nickName + '为您送来TA的专属邀请，品质生活，触手可及，尽在jimigo',
      //   link: window.location.href,
      //   imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
      //   type: 'link',
      //   dataUrl: '',
      //   success: function () {
      //     console.log("分享成功")
      //   },
      //   cancel: function () {
      //     console.log("分享失败")
      //   }
      // });
    })





  }

  render() {
    return (
      <div className="invite-page">
        <div className="bg-box">
        {headImg?<img className="imgc" src={headImg} alt="" />:<img className="imgc" src={require("../../common/assets/img/de.jpg")} alt="" />}

          <span className="bgt">{name}</span>
          <span className="bgc">邀请您开启jimigo之路</span>
        </div>

        <div className="rwm-box">
          <img className="rwm-img" src={qrCodePic} alt="" />
          <span className="rwm-bar">
            长按识别二维码，轻松注册加入
            </span>
        </div>

        <div className="btn-box">
          <span className="btnt">
            或在注册时填入下方推荐码
            </span>
          <input className="btnr" type="text" defaultValue={invitationCode} />
          <div className={"redBtn"}>
            <button className="btncss am-button" onClick={this.copyUrl}>
              复制
            </button>

          </div>
        </div>

        <div className="bottom-logo">
          <img onClick={open.bind(this, path, getParams, this)} src={require("../assets/img/logo.png")} alt="" />
        </div>

        <div className="fc" style={{ display: this.state.isFc ? "block" : "none" }} onClick={this.hideFcFn}>
          <div className="text">
            <span>请点击右上角按钮，</span>
            <span>选择【在浏览器中打开】</span>
          </div>
          <img src={require("../assets/img/jt.png")} alt="" />
        </div>
      </div>
    );
  }
}

class ABC extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div>小阿拉啦1啦啦啦</div>;
  }
}
