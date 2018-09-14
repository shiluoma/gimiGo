import React from "react";
import { Route } from "react-router-dom";
import { Carousel, WingBlank, Icon, Button } from "antd-mobile";
import API from '../../common/api/api';
import open from '../../common/api/open';
import getUrlArgObject from '../../common/api/getUrlArgObject';
import { getGrouponOpenDetail ,GetWxConfig} from '../api/apiFn';

const getParams = getUrlArgObject();
const path = "getGrouponOpenDetail";

export default class InfoPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    data: [],
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

 formatDuring=(mss)=> {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    if(mss>0){
      return days+"天"+hours+":" + minutes + "." + seconds + "后结束";
    }else{
      return "拼团时间已结束";
    }
}

  componentWillMount() {
    var _this = this;
    var data = getGrouponOpenDetail(getParams.grouponId, getParams.orderNo,getParams.userId,function (data) {
      console.log(data)

      _this.setState({
        data: data.returnValue,
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
          title: "开团活动",
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
          title: "开团活动",
          link: window.location.href,
          imgUrl: "http://jm.jimigo.com.cn/app/jimigo-logo.png",
          desc: '快来开团。',
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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
    return (
      <div className="card-page">
        <div className="activityImg">
          <img src={this.state.data.goodsPic?API.imgPath+this.state.data.goodsPic:""} alt="" />
        </div>
        <div className="infoBox">
          <div className="infoContent">
            <span className="infoTitle">
            {this.state.data.activityName}
              </span>
          </div>
          <div className="priceBox">
            <span className="rightPrice">￥{this.state.data.memberPrice}</span>
            <span className="oldPrice">￥{this.state.data.price}</span>
            <span className="ptnum">已拼{this.state.data.joinCount}件-{this.state.data.memberCount }人拼团</span>
          </div>

          <div className="labelBox">



            <span className="labelItem">
              <Icon type="check-circle-o" size={"xxs"} />
              <span>包邮</span>
            </span>
          </div>
        </div>
        <div className="ptInfo">
          <div className="ptText">
          <div className="limg">
          {this.state.data.grouponOpenItemList? <img src={API.imgPath+this.state.data.grouponOpenItemList[0].userPic} alt="" />:<img src={require("../assets/img/timg.jpg")} alt="" />}
           
          </div>
            <div className="rText">
            {this.state.data.expireDateTime-new Date().getTime()<0?
              <span className="title redT">拼团失败</span>
              :(this.state.data.statusCode==1?<span className="title">本团名额已满</span>:<span className="title">本团仅剩<span className="redT">{this.state.data.memberCount-this.state.data.joinCount}</span>个名额</span>)  }
              <span className="time">{this.formatDuring(this.state.data.expireDateTime-new Date().getTime())}</span>
            </div>
          </div>

          <div className={"redBtn dbtn"}>
            <Button type="primary" className="btncss" onClick={open.bind(this,path,getParams,this)}>
               {
                this.state.data.statusCode!=0?<span>查看更多拼团商品</span>:<span>参与拼团</span>
              }
            </Button>
          </div>
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


