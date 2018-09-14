import React from "react";
import { Carousel, WingBlank, Icon, Button } from "antd-mobile";
import { GetWxConfig, getDiscoverDetail } from "../../common/api/apiFn";
import API from "../../common/api/api";
import open from "../../common/api/open";
import getUrlArgObject from "../../common/api/getUrlArgObject";

const getParams = getUrlArgObject();
const path = "getPostDetail";

export default class InfoPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    dataImg: [],
    infoImg: [],
    data: {},
    msg: "",
    isOver: true,
    isFc: false,
    isScroll: false,
    imgHeight: 375
  };

  gotoTop = () => {
    if (this.state.isScroll) {
      window.scrollTo(0, 0);
    }
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
    var data = getDiscoverDetail(getParams.discoverId, 0, function(data) {
      _this.setState({
        data: data.returnValue,
        msg: data.errorMsg
      });
      console.log("getDiscoverDetail", data);
      if (data.returnValue == null) {
        return;
      }

      const debug = NODE_ENV == "development" ? 0 : 1;

      var data = GetWxConfig(debug, function(data) {
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
            title: "发现",
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
            title: "发现",
            link: window.location.href,
            imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
            desc: "发现更多商品",
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
    });
  }

  componentDidMount() {
    var _this = this;
    console.log(API)
    window.addEventListener("scroll", () => {
      clearTimeout("isScrollFn");
      if (!this.state.isScroll) {
        this.setState({
          isScroll: true
        });
        window.isScrollFn = setTimeout(() => {
          this.setState({
            isScroll: false
          });
        }, 2000);
      }
    });
  }

  render() {
    if (this.state.data == null) {
      return this.state.msg;
    }
    return (
      <div className="card-page">
        <div className="pageContent">
          {Object.keys(this.state.data).length > 0 ? (
            <video
              controls
              src={API.imgPath + this.state.data.discoverVideo}
              poster={API.imgPath + this.state.data.discoverPic}
              className="cantsee"
              style={{
                display: this.state.data.discoverVideo != "" ? "block" : "none"
              }}
            />
          ) : (
            ""
          )}

          <div className="textC">
            <div className="title">{this.state.data.title}</div>
            <div className="title-info">
              <img
                src={
                  this.state.data.userPic
                    ? API.imgPath + this.state.data.userPic
                    : require("../../common/assets/img/de.jpg")
                }
                alt=""
              />
              <span className="user-name">{this.state.data.nickName}</span>
              <span className="see-num">
                {this.state.data.visitNumber}
                次浏览
              </span>
            </div>
            <div className="editC">
              <div
                dangerouslySetInnerHTML={{ __html: this.state.data.content }}
              />
            </div>
          </div>
        </div>

        <div className="items-info">
          <div className="title">相关商品</div>
          {this.state.data.goodsList
            ? this.state.data.goodsList.map((val, index) => {
                return (
                  <div className="item-info" key={index}>
                    <img src={API.imgPath + val.goodsPic} alt="" />
                    <div className="info-text">
                      <span className="title-t">{val.goodsName}</span>
                      <div className="infoBox">
                        <div className="priceBox">
                          <span className="rightPrice">￥{val.price}</span>
                          <span className="oldPrice">￥{val.mprice}</span>
                        </div>
                      </div>

                      <div className={"redBtn"}>
                        <Button
                          type="primary"
                          className="btncss"
                          onClick={open.bind(this, path, getParams, this)}
                        >
                          <img
                            src={require("../../common/assets/img/carIcon.png")}
                            alt=""
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
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
