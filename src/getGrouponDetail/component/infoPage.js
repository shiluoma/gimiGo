import React from "react";
import { Carousel, WingBlank, Icon, Button } from "antd-mobile";
import { getGrouponDetail,GetWxConfig} from '../api/apiFn';
import API from '../../common/api/api';
import open from '../../common/api/open';
import getUrlArgObject from '../../common/api/getUrlArgObject';
import {strTime} from "../../common/tool/tool"

const getParams = getUrlArgObject();
const path = "getGrouponDetail";

export default class InfoPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    dataImg: [],
    infoImg: [],
    data: {},
    isOver: true,
    isFc: false,
    isScroll: false,
    imgHeight: 375
  };

  gotoTop = () => {
    if (this.state.isScroll) {
      window.scrollTo(0, 0);
    }
  }

  hideFcFn = () => {
    this.setState({
      isFc: false,
    })
  }

  openFn = () => {
    open(path, getParams,this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillMount() {
    var _this = this;
    console.log(getParams.goodsId, getParams.userId, getParams.activityId)
    console.log(getParams)
    var data = getGrouponDetail(getParams.goodsId, getParams.userId, getParams.activityId, function (data) {
      console.log(data)
      var imgArr = [];
      var infoImgArr = [];
      data.returnValue.goodsFile.map(function (val, index) {
        if (val.goodsFileType == 0) {
          imgArr.push(API.imgPath + val.fileMd5)
        } else if (val.goodsFileType == 1) {
          infoImgArr.push(API.imgPath + val.fileMd5)
        }
      })
      _this.setState({
        data: data.returnValue,
        infoImg: infoImgArr,
        dataImg: imgArr,
      })

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
          title: _this.state.data.goodsName,
          link: window.location.href,
          imgUrl:"http:"+ _this.state.dataImg[0],
          success: function () {
            console.log("分享成功")
          },
          cancel: function () {
            console.log("分享失败")
          }
        });
  
        //转发给朋友
        wx.onMenuShareAppMessage({
          title: _this.state.data.goodsName,
          link: window.location.href,
          imgUrl:"http:"+ _this.state.dataImg[0],
          desc: '我在Jimigo发现一个很好的商品，您也来看看吧。',
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

      
    })



    })
  }
  componentDidMount() {
    var _this = this;
    window.addEventListener('scroll', () => {
      clearTimeout("isScrollFn")
      if (!this.state.isScroll) {
        this.setState({
          isScroll: true
        })
        window.isScrollFn = setTimeout(() => {
          this.setState({
            isScroll: false
          })
        }, 2000)
      }
    })
  }




  render() {
    var num = 0;
    var nowTime = true;
    var btn = "";
    if (this.state.data.grouponOpenDTOList != undefined) {
      this.state.data.grouponOpenDTOList.map(function (val, idnex) {
        num += val.joinCount;
      })
    }

    nowTime = this.state.data.endDtm > (new Date()).valueOf();
    if (nowTime) {
      btn = <div>
        <div className={"yewBtn"} onClick={this.openFn}>
          <Button type="primary" className="btncss">
            <span>￥{this.state.data.salePrice}</span>
            <span>直接购买</span>
          </Button>
        </div>
        <div className={"redBtn"} onClick={this.openFn}>
          <Button type="primary" className="btncss">
            <span>￥{this.state.data.memberPrice}</span>
            <span>发起拼团</span>
          </Button>
        </div>
      </div>
    } else {
      btn = <div>
        <div className={"cantClickBtn"}>
          <Button type="primary" disabled={true} className="btncss">活动已经结束</Button>
        </div>
      </div>
    }


    return (
      <div className="card-page">
        <WingBlank>
          <Carousel
            autoplay={false}
            infinite
            beforeChange={(from, to) =>
              console.log(`slide from ${from} to ${to}`)
            }
            afterChange={index => console.log("slide to", index)}
          >
            {this.state.dataImg.map(val => (
              <a
                key={val}
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%"
                }}
              >
                <img
                  src={`//${val}.png`}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
        <div className="infoBox">
          <div className="priceBox">
            <span className="rightPrice">￥{this.state.data.memberPrice}</span>
            <span className="oldPrice">￥{this.state.data.salePrice}</span>
            <span className="jfInfo">赚{this.state.data.score}积分</span>
            <span className="ptnum">已拼{this.state.data.saleNumber}件-{this.state.data.memberCount}人拼团</span>
          </div>
          <div className="infoContent">
            <span className="infoTitle">
              {this.state.data.goodsName}
            </span>
            <span className="infoC">
              {this.state.data.goodsDesc}
            </span>
          </div>
          <div className="labelBox">
            <div className="moreBox">
              {this.state.data.goodsSign && this.state.data.goodsSign.split(",").map(function (val, inedx) {
                return (
                  <span className="labelItem" key={val}>
                    <Icon type="check-circle-o" size={"xxs"} />
                    <span>{val}</span>
                  </span>
                )
              })
              }
            </div>
          </div>
        </div>
        <div className="orderBox">
          <div className="orderTitle" onClick={this.openFn}>
            <span className="titleText">{num}人正在拼团，可直接点击参与</span>
            <span className="more">查看更多></span>
          </div>
          <ul className="orderList">
            {
              this.state.data.grouponOpenDTOList && this.state.data.grouponOpenDTOList.map((val, index) =>{
                return (
                  <li key={index}>
                    <div className="lf">
                    {val.userPic?<img src={API.imgPath + val.userPic} alt="" />:<img src={require("../../common/assets/img/de.jpg")} alt="" />}
                      
                      <span className="name">{val.nickName}</span>
                    </div>
                    <div className="rbtn redBtn">
                      <Button type="primary" className="" onClick={this.openFn}>去拼团</Button>
                    </div>
                    <div className="rText">
                      <span className="title">还差{this.state.data.memberCount - val.joinCount}人拼成</span>
                      <span className="time">剩余{val.serverDateTime?strTime(val.serverDateTime - val.expireDateTime):""}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="pageContent">
          {
            this.state.infoImg.map(function (val, index) {
              return (
                <img key={val} src={"//" + val} alt="" />
              )
            })
          }

        </div>
        <div className="pageFoot sBtn">
          {btn}
        </div>

        <div className={this.state.isScroll ? "gotoTop showView" : "gotoTop hiddenView"} onClick={this.gotoTop}>
          <img src={require("../assets/img/toTop.png")} alt="" />
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


