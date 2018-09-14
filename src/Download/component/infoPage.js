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
      open( path, getParams, this)
  }

  render() {
    return (
      <div className="invite-page">
      
        <div className="bottom-logo">
          <img onClick={open.bind(this, path, getParams, this)} src={require("../assets/img/logo11.png")} alt="" />
        </div>
        <div className="cenboxc">
           <span style={{fontSize:"27px"}}>
          吉米优选
          </span>
          <span style={{fontSize:"17px",marginTop:"4px"}}>
            好生活.我来造
          </span>
        </div>
       

      

        <div  onClick={open.bind(this, path, getParams, this)} className="btnn">
          立即下载
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
