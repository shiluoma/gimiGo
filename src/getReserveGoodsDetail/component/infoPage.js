import React from "react";
import { Route } from "react-router-dom";
import { Carousel, WingBlank, Icon, Button } from "antd-mobile";
import { getReserveGoodsDetail,GetWxConfig } from '../api/apiFn';
import API from '../../common/api/api';
import open from '../../common/api/open';
import getUrlArgObject from '../../common/api/getUrlArgObject';

const getParams = getUrlArgObject();
const path = "getReserve";

var oldTime = (new Date()).getTime();


export default class InfoPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    dataImg: [],
    infoImg: [],
    data: {},
    oldTime:"",
    sendTime:"",
    isOver: true,
    isFc: false,
    isScroll: false,
    imgHeight: 375
  };

  gotoTop=()=>{
    if(this.state.isScroll){
      window.scrollTo(0, 0);
    }
  }

  hideFcFn=()=>{
    this.setState({
      isFc:false,
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillMount() {
    var _this = this;

    function formatDuring (mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (mss % (1000 * 60)) / 1000;
        return days + "天" + hours + "时" + minutes + "分";
      }

      function getNowFormatDate1(a) {
        var date = new Date(a);
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }

    var data = getReserveGoodsDetail(getParams.reserveId,getParams.userId,function (data) {
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
      oldTime = formatDuring(data.returnValue.endDtm-oldTime);
      var sendTime = getNowFormatDate1(data.returnValue.endDtm).split(" ")[0];
      console.log("sendTime",sendTime)
      _this.setState({
        data: data.returnValue,
        infoImg: infoImgArr,
        dataImg: imgArr,
        oldTime:oldTime,
        sendTime:sendTime,
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
          title: _this.state.data.goodsFullName,
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
          title: _this.state.data.goodsFullName,
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
        window.isScrollFn = setTimeout(()=>{
          this.setState({
            isScroll: false
          })
        },2000)
      }
    })
  }

  render() {
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
            {this.state.dataImg.length>0&&this.state.dataImg.map(val => (
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
        <div className="orderPriceBox">
                <div className="priceLeft">
                  <span className="title">预付￥{this.state.data.reservePrice}</span>
                  <span className="con">尾款￥{this.state.data.finalPrice},立省￥{this.state.data.mPrice-this.state.data.reservePrice-this.state.data.finalPrice}，已订{this.state.data.saleNumber}件</span>
                </div>
                <div className="priceRight">
                  <span className="title">预定活动倒计时</span>
                  <span className="lTime">{this.state.oldTime}</span>
                </div>
            </div>
        <div className="infoBox">
          <div className="priceBox">
            <div className="jfBox">
              <span className="lh">
                赚{this.state.score}积分
              </span>
              <span className="rh">
                预计发货时间:{ this.state.sendTime}
              </span>
            </div>
          </div>
          <div className="infoContent">
            <span className="infoTitle">
            {this.state.data.goodsFullName}
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
     
        <div className="pageContent">
        {
            this.state.infoImg.map(function (val, index) {
              return (
                <img key={val} src={"//" + val} alt="" />
              )
            })
          }
        </div>
        <div className="pageFoot">
          <div className={this.state.data.statusCode!=0 ? "cantClickBtn" : "redBtn"}>
            <Button type="primary"  onClick={open.bind(this,path,getParams,this)} disabled={this.state.data.statusCode!=0 ? true : false} className="btncss">{this.state.data.statusCode!=0 ? "活动已结束" : "立即预定"}</Button>
          </div>
        </div>
        <div className={this.state.isScroll ? "gotoTop showView" : "gotoTop hiddenView"} onClick={this.gotoTop}>
          <img src={require("../assets/img/toTop.png")} alt="" />
        </div>
        <div className="fc" style={{display:this.state.isFc?"block":"none"}} onClick={this.hideFcFn}>
            <div className="text">
              <span>请点击右上角按钮，</span>
              <span>选择【在浏览器中打开】</span>
            </div>
            <img src={require("../assets/img/jt.png")} alt=""/>
        </div>
      </div>
    );
  }
}


