import React from "react";
import { Route } from "react-router-dom";
import { Carousel,PullToRefresh, WingBlank,Toast, Button } from "antd-mobile";
import { getUserEnshrineList, GetMyInfo,GetWxConfig } from '../api/apiFn';
import API from '../../common/api/api';
import getUrlArgObject from '../../common/api/getUrlArgObject';
const getParams = getUrlArgObject();
const path = "getUserEnshrineList";
import open from '../../common/api/open';


var headImg = API.imgPath+ decodeURI(getParams.userPic);
var name = decodeURI(getParams.nickName);

var pageNo = Number(getParams.pageNo);
var reData = "";

export default class InfoPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    data: [],
    userData: {},
    isFc: false,
    imgHeight: 176,
    down: false,
    height: document.documentElement.clientHeight,
  };



  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }


  componentWillMount() {
    var _this = this;
    var data = getUserEnshrineList(getParams, function (data) {
      _this.setState({
        data: data.returnValue,
      })
      console.log(data)
    })
    // var userData = GetMyInfo(getParams.userId, getParams.optUserId, getParams.tokenId, function (data) {
    //   _this.setState({
    //     userData: data.returnValue,
    //   })
    //   console.log(data)
    // })

  }

  componentDidMount() {
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
          title: getParams.nickName+':我在Jimigo里发现了一些优质商品。',
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
          title: getParams.nickName+':我在Jimigo里发现了一些优质商品。',
          desc: '进来看看吧~',
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

      
    })

  }

  hideFcFn = () => {
    this.setState({
      isFc: false,
    })
  }

  openUrl = (id)=>{
    var href = "//"+window.location.host+"/app/getGoodsDetail"+"?invitationCode="+getParams.invitationCode+"&userId="+getParams.userId+"&goodsId="+id
    window.location.href = href;
  }

  render() {
    return (
      <div className="invite-page">
       
        <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
          var _this=this;
          pageNo+=1;
          getParams.pageNo = pageNo;
          reData = getUserEnshrineList(getParams, function (data) {
            if(data.returnValue.length>0){
              _this.setState({
                data: _this.state.data.concat(data.returnValue),
              })
              Toast.success('加载成功!', 1);
            }else{
              Toast.fail('没有更多商品了!', 1);
            }
            

            console.log(data)
          })


        }}
      >
       <div className="bg-box">
        {headImg?<img className="imgc" src={headImg} alt="" />:<img className="imgc" src={require("../../common/assets/img/de.jpg")} alt="" />}
          <span className="bgt">{name}</span>
          <span className="bgc">我在吉米优选里发现了一些优质商品</span>
        </div>

        <div className="cards">

          {
            
            this.state.data.map((val, index) => {
              return (
                <div key={index} className="card-box" onClick={this.openUrl.bind(this,val.goodsId)} >
                  <img src={`${API.imgPath}${val.goodsPic}`} alt="" />
                  <span className="title">
                    {this.state.data.goodsFullName}
                  </span>
                  <div className="priceBox">
                    <span className="rightPrice">￥{val.price}</span>
                    <span className="oldPrice">￥{val.mPrice}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
<div className="bottom-logo">
          <img src={require("../assets/img/logo.png")} onClick={open.bind(this,path,getParams,this)}  alt="" />
        </div>

         <div className="fc" style={{display:this.state.isFc?"block":"none"}} onClick={this.hideFcFn}>
            <div className="text">
              <span>请点击右上角按钮，</span>
              <span>选择【在浏览器中打开】</span>
            </div>
            <img src={require("../assets/img/jt.png")} alt=""/>
        </div>
      </PullToRefresh>


        
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
