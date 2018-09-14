import React from "react";
import { Carousel, WingBlank, Icon, Button} from "antd-mobile";
import { GetCardInfo,GetWxConfig } from '../../common/api/apiFn';
import API from '../../common/api/api';
import open from '../../common/api/open';
import {  Route,Link } from "react-router-dom";

import getUrlArgObject from '../../common/api/getUrlArgObject';
import Sku from 'common/component/sku/sku'

const getParams = getUrlArgObject();
const path = "getGoodsDetail";


class asdasd extends React.Component{
  constructor() {
    super();
  }

  render(){
    return(
      <div>
        12321311111111111
      </div>
    )
  }
}

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
    imgHeight: 375,
    showSku:false,
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

  showSkuFn=()=>{
    this.setState({
      showSku:true
    })
  }

  closeSkuFn=()=>{
      // 关闭SKU盒子
      console.log(0)
    this.setState({
      showSku:false
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillMount() {
    var _this = this;
    var data = GetCardInfo(getParams.goodsId, getParams.userId, getParams.goodsSkuId,function (data) {
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
        window.isScrollFn = setTimeout(() => {
          this.setState({
            isScroll: false
          })
        }, 2000)
      }
    })


  }

  render() {
    console.log(this.props)
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
            <span className="rightPrice">￥{this.state.data.price}</span>
            <span className="oldPrice">￥{this.state.data.mPrice}</span>
            <span className="jfInfo">赚{this.state.data.score}积分</span>
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
          <div className={this.state.data.statusCode == 1 ?  "redBtn":"cantClickBtn"}>
            {/* <Button onClick={open.bind(this,path,getParams,this)}  type="primary" disabled={this.state.data.statusCode == 1 ?false: true } className="btncss">立即购买</Button> */}
            <Button type="primary" onClick={this.showSkuFn} disabled={this.state.data.statusCode == 1 ?false: true } className="btncss">立即购买</Button>
          </div>
        </div>
        <div className="toastBox" style={{display:this.state.data.statusCode == 2?"block":"none"}}>
          <span>来晚了，商品已经下架啦~</span>
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

        <Sku history={this.props.history} isShow={this.state.showSku} closeFn={this.closeSkuFn} skugoodsPic={this.state.data.goodsPic} skuName={this.state.data.goodsName} goodsSkuId={this.state.data.goodsSkuId} skuMap={this.state.data.skuMap} sku={this.state.data.sku}></Sku>
      </div>
    );
  }
}




// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx553c22c6bc573828&redirect_uri=http%3A%2F%2Fjm.jimigo.com.cn%3FAsdasdasd%3Daasdasd%26weq&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect