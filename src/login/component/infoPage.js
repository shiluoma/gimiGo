import React from "react";
import { Route } from "react-router-dom";
import { Toast, List, InputItem } from "antd-mobile";
import {
  GetWxConfig,
  sendMobileCode,
  regUser,
  userLogin,
  getBaseUserById
} from "../../common/api/apiFn";
import open from "../../common/api/open";
import API from "../../common/api/api";
import getUrlArgObject from "../../common/api/getUrlArgObject";
import qs from "qs";

const getParams = getUrlArgObject();
const path = "regUser";
var invitationCode = decodeURI(getParams.invitationCode);

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
    hasErrorYZM: false,
    hasErrorYQM: false,
    phone: "",
    YZM: "",
    YQM: "",
    canSignUp: false,
    sendText: "获取验证码"
  };

  copyUrl = () => {
    Toast.info("复制成功!", 1);
    var _this = this;
    copy(invitationCode, {
      debug: false,
      message: "Press #{key} to copy"
    });
    console.log("复制成功，如果失败，请在输入框内手动复制.");
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
    console.log(this.props.match.params.type);
    if (this.props.match.params.type == "signIn") {
      this.setState({
        active: 1
      });
    } else if (this.props.match.params.type != "signUp") {
      this.setState({
        YQM: this.props.match.params.type
      });
    }
  }

  componentDidMount() {
    //转发到朋友圈
    document.title = "注册";
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
      hasErrorYZM,
      hasErrorYQM,
      phone,
      YZM,
      YQM
    } = this.state;
    switch (type) {
      case "phone":
        if (value.replace(/\s/g, "").length < 11) {
          this.setState({
            hasErrorPhone: true
          });
        } else {
          this.setState({
            hasErrorPhone: false
          });
        }
        console.log(value.replace(/(^\s*)|(\s*$)/g, ""));

        this.setState(
          {
            phone: value.replace(/(^\s*)|(\s*$)/g, "")
          },
          () => {
            this.canSignUpFn();
          }
        );
        break;
      case "YZM":
        if (value.replace(/\s/g, "").length < 6) {
          this.setState({
            hasErrorYZM: true
          });
        } else {
          this.setState({
            hasErrorYZM: false
          });
        }
        this.setState(
          {
            YZM: value
          },
          () => {
            this.canSignUpFn();
          }
        );
        break;
      case "YQM":
        this.setState({
          hasErrorYQM: false
        });
        this.setState(
          {
            YQM: value
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
      hasErrorYZM,
      hasErrorYQM,
      phone,
      YZM,
      YQM
    } = this.state;

    if (
      !hasErrorPhone &&
      !hasErrorYZM &&
      !hasErrorYQM &&
      phone.length > 0 &&
      YZM.length > 0
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

  getCode = async () => {
    //发送验证码
    if (canSend) {
      canSend = false;
      var num = 59;
      this.setState(
        {
          sendText: 60 + "s"
        },
        () => {
          setIntervalCode = setInterval(() => {
            if (num == 0) {
              this.setState({
                sendText: "获取验证码"
              });
              canSend = true;
              clearInterval(setIntervalCode);
            } else {
              this.setState({
                sendText: (num -= 1) + "s"
              });
            }
          }, 1000);
        }
      );

      sendMobileCode(this.state.phone, data => {
        if (data.errorCode == 0) {
          Toast.info("发送成功");
        }
      });
    }
  };

  signUp = () => {
    //注册
    if (this.state.canSignUp) {
      this.setState({
        canSignUp: !this.state.canSignUp
      });

      regUser(this.state.YZM, this.state.YQM, this.state.phone, data => {
        if (data.errorCode == 0) {
          Toast.info("注册成功");
        } else {
          Toast.info(data.errorMsg);
          this.setState({
            YZM: ""
          });
        }
      });
    }
  };

  signIn = () => {
    //登录
    var redirect_uri = qs.parse(window.location.href.split("?")[1]);
    if (this.state.canSignUp) {
      this.setState({
        canSignUp: !this.state.canSignUp
      });
      Toast.info("提示演示");
      userLogin(this.state.YZM, this.state.phone, data => {
        if (data.errorCode == 0) {
          Toast.info("登录成功");
          window.localStorage["userId"] = data.returnValue.userId;
          window.localStorage["tokenId"] = data.returnValue.tokenId;
          window.localStorage["nickName"] = data.returnValue.nickName;
          window.localStorage["userPic"] = data.returnValue.userPic;
          window.localStorage["userMobile"] = data.returnValue.userMobile;

          getBaseUserById(
            data.returnValue.userId,
            data.returnValue.tokenId,
            data => {
              console.log(data);
              if (data.errorCode == 0) {
                window.localStorage["invitationCode"] =
                  data.returnValue.invitationCode;
                window.localStorage["myInvitationCode"] =
                  data.returnValue.myInvitationCode;


                  if (
                    (this.props.match.params.type == "signUp" ||
                      this.props.match.params.type == "signIn") &&
                    this.state.active == 1&&
                    data.returnValue.invitationCode==""
                  ) {
                    setTimeout(() => {
                      this.props.history.push(
                        "/onlyCode" + "?redirect_uri=" + redirect_uri
                      );
                    }, 500);
                  }else{
                    window.location.href=redirect_uri
                  }

              } else {
                Toast.info(data.errorMsg);
              }

              
            }
          );
        } else {
          Toast.info(data.errorMsg);
          this.setState({
            YZM: ""
          });
        }
      });
    }
  };

  render() {
    return (
      <div className="invite-page">
        {this.props.match.params.type != "signUp" &&
        this.props.match.params.type != "signIn" ? (
          <img
            className="w_100"
            src={require("../../common/assets/img/loginBg.png")}
            alt=""
          />
        ) : (
          ""
        )}

        <span className="red_title">欢迎加入Jimigo</span>

        <div className="selectTabsBox">
          <p onClick={this.tabClick.bind(this, 0)}>
            <span className={this.state.active == 0 ? "active" : ""}>注册</span>
          </p>
          <p onClick={this.tabClick.bind(this, 1)}>
            <span className={this.state.active == 1 ? "active" : ""}>登录</span>
          </p>
        </div>
        <div className="selectContent">
          <div className="regBox">
            <List>
              <InputItem
                type="num"
                maxLength="11"
                placeholder="请输入手机号码"
                error={this.state.hasErrorPhone}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange.bind(this, "phone")}
                value={this.state.phone}
              >
                +86
              </InputItem>
            </List>
            <List>
              <InputItem
                type="number"
                className="yzmInput"
                maxLength="6"
                placeholder="请输入验证码"
                error={this.state.hasErrorYZM}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange.bind(this, "YZM")}
                value={this.state.YZM}
              />
              <div
                className={
                  this.state.sendText == "获取验证码"
                    ? "getYZM "
                    : "getYZM cantGet"
                }
                onClick={this.getCode}
              >
                {this.state.sendText}
              </div>
            </List>

            {this.state.active == 0 ? (
              <div>
                <List>
                  <InputItem
                    type="text"
                    placeholder="请输入推荐码"
                    error={this.state.hasErrorYQM}
                    onErrorClick={this.onErrorClick}
                    onChange={this.onChange.bind(this, "YQM")}
                    value={this.state.YQM}
                  />
                </List>
                <div className="redBtn">
                  <div
                    className={
                      (!this.state.canSignUp ? "styleRedCant " : "") +
                      "styleRed m_25_17"
                    }
                    onClick={this.signUp}
                  >
                    注册
                  </div>
                </div>
                <div className="readMe">
                  点击注册代表您已阅读并同意
                  <span>《用户使用协议》</span>
                </div>
              </div>
            ) : (
              <div className="redBtn" style={{ marginBottom: "43px" }}>
                <div
                  className={
                    (!this.state.canSignUp ? "styleRedCant " : "") +
                    "styleRed m_25_17"
                  }
                  onClick={this.signIn}
                >
                  登录
                </div>
              </div>
            )}
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
