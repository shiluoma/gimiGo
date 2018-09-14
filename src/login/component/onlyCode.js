import React from "react";
import { Route } from "react-router-dom";
import { Toast, List, InputItem } from "antd-mobile";
import { GetWxConfig,addInvitationCode } from "../../common/api/apiFn";
import open from "../../common/api/open";
import API from "../../common/api/api";
import getUrlArgObject from "../../common/api/getUrlArgObject";
const getParams = getUrlArgObject();
const path = "regUser";
import qs from "qs";


var redirect_uri = qs.parse(window.location.href.split("?")[1]);

var setIntervalCode = "";
var canSend = true;

export default class InfoPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    isFc: false,
    data: [],
    imgHeight: 176,
    active: 0,
    hasErrorPhone: false,
    InvitationCode: "",
    canSignUp: false,
    sendText: "获取验证码"
  };


  hideFcFn = () => {
    this.setState({
      isFc: false
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillMount() {
    var _this = this;
  }

  componentDidMount() {
    //转发到朋友圈
    document.title = "填写邀请码";
    const debug = NODE_ENV == "development" ? 0 : 1;
    var data = GetWxConfig(debug, function(data) {
      //
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
        appId: data.returnValue.appId, // 必填，公众号的唯一标识
        timestamp: data.returnValue.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.returnValue.nonceStr, // 必填，生成签名的随机串
        signature: data.returnValue.signature, // 必填，签名，见附录1
        jsApiList: data.returnValue.jsApiList
      });
      wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
        //则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.onMenuShareTimeline({
          title: "好友邀请您开启jimigo之路",
          link: window.location.href,
          imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
          success: function() {
            console.log("分享成功");
          },
          cancel: function() {
            console.log("分享失败");
          }
        });

        //转发给朋友
        wx.onMenuShareAppMessage({
          title: "好友邀请您开启jimigo之路",
          desc:
            "好友" +
            getParams.nickName +
            "为您送来TA的专属邀请，品质生活，触手可及，尽在jimigo",
          link: window.location.href,
          imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
          type: "link",
          dataUrl: "",
          success: function() {
            console.log("分享成功");
          },
          cancel: function() {
            console.log("分享失败");
          }
        });
      });
    });
  }

  tabClick = val => {
    this.setState({
      active: val
    });
  };

  sendYZM = () => {};

  onErrorClick = () => {
    if (this.state.hasErrorPhone) {
      Toast.info("手机号小于11位");
    } else if (this.state.hasErrorPhone) {
      Toast.info("手机号小于6位");
    }
  };
  onChange = (type, value) => {
    var {
      hasErrorPhone,
      InvitationCode
    } = this.state;
    switch (type) {
      case "phone":
        if (value.replace(/\s/g, "").length < 6) {
          this.setState({
            hasErrorPhone: true
          });
        } else {
          this.setState({
            hasErrorPhone: false
          });
        }
        this.setState(
          {
            InvitationCode : value
          },
          () => {
            this.canSignUpFn();
          }
        );
        break;
      default:
        break;
    }
  };

  canSignUpFn = () => {
    var {
      hasErrorPhone,
      InvitationCode ,
    } = this.state;

    if (
      !hasErrorPhone &&
      InvitationCode .length > 0 
    ) {
      //判定是否可以点击注册按钮
      this.setState({
        canSignUp: true
      });
    } else {
      this.setState({
        canSignUp: false
      });
    }
  };


  addInvitationCode = () => {
    //注册
    if (this.state.canSignUp) {
      this.setState({
        canSignUp: !this.state.canSignUp
      });
      addInvitationCode(window.localStorage.userId,this.state.InvitationCode ,(data)=>{
        if (data.errorCode == 0) {
          Toast.info("操作成功");
          setTimeout(()=>{
            window.location.href=redirect_uri
          },1000)
        } else {
          Toast.info(data.errorMsg);
        }
      })
      
    }
  };

  render() {
    return (
      <div className="invite-page">
        <div className="selectContent">
          <div className="regBox" style={{padding:"0px"}}>
            <List>
              <InputItem
                type="text"
                maxLength="6"
                placeholder="请输入推荐码"
                error={this.state.hasErrorPhone}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange.bind(this, "phone")}
                value={this.state.InvitationCode }
                style={{paddingLeft:"12px"}}
              >
              推荐码
              </InputItem>

            </List>

            <div className="redBtn" style={{ marginBottom: "43px" }}>
              <div
                className={
                  (!this.state.canSignUp ? "styleRedCant " : "") +
                  "styleRed m_25_17"
                }
                onClick={this.addInvitationCode}
              >
                确定
              </div>
            </div>
          </div>
        </div>

        <div
          className="fc"
          style={{ display: this.state.isFc ? "block" : "none" }}
          onClick={this.hideFcFn}
        >
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
