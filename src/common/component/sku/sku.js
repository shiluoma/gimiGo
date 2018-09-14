import React from "react";
import { Carousel, WingBlank, Icon, Toast } from "antd-mobile";
import "./Sku.less";
import API from "common/api/api";
import {Route} from "react-router-dom";

import Order from 'common/component/order/order';


export default class Sku extends React.Component {
  constructor() {
    super();
  }

  state = {
    skuImg: "",
    skuTitle: "",
    skuPrice: "",
    payPrice: "",
    skuType: {},
    skuNum: "",
    canClick: false,
    canSend: false,
    num: 1,
    skuIds: "",
    SelectIDs: [],
    skuObj: {},
    show: false,
    maxIndex: 0, //最大的层级
    skuMap: "", //反向的props.skuMap
    goodsSkuId: "", //最终SKUId
    goodsSkuFullName: "" //SKU商品名
  };
  closeFn = () => {
    document.body.style.overflow = "auto";
    this.props.closeFn();
  };

  componentDidMount() {
  }

  setNum = type => {
    if (type == "up") {
      this.setState({
        num: (this.state.num += 1),
        canClick: true
      });
    } else {
      if (this.state.num == 1) {
        this.setState({
          canClick: false
        });
        return;
      } else {
        this.setState({
          num: (this.state.num -= 1)
        });
      }
    }
  };

  choseSkuId = (index, id) => {
    var arr = this.state.SelectIDs;
    var newArr = [];
    var canSend = false;
    arr[index] = id;

    for (var i = 0; i <= index; i++) {
      newArr.push(arr[i]);
    }

    if (index == this.state.maxIndex - 1) {
      canSend = true;
    }

    this.setState({
      SelectIDs: newArr,
      goodsSkuId: this.state.skuObj[newArr].goodsSkuId,
      goodsSkuFullName: this.state.skuObj[newArr].goodsSkuFullName,
      canSend: canSend
    });
  };

  inputOrder = () => {
    //提交到订单
    if (!this.state.canSend) {
      return;
    }
    var objStr = {
      num:this.state.num,
      goodsSkuId:this.state.goodsSkuId,
      goodsId:this.props.skuMap[0].goodsId,
      userId:window.localStorage.userId
  }
    window.localStorage.orderParams=JSON.stringify(objStr)

    this.props.history.push({
      pathname : '/order'
    })

  };

  componentWillReceiveProps(nextProps) {
    if (this.props.sku != nextProps.sku) {
      //处理SKU对象
      var skuObj = {};
      var newSkuMap = {};
      var maxIndex = 0;
      nextProps.sku.map((val1, index) => {
        var valArr = val1.itemIds.split("-");
        if (valArr[0] == 107 && valArr[1] == 111) {
        } else {
          skuObj[valArr] = val1;
        }
        if (maxIndex < valArr.length) {
          maxIndex = valArr.length;
        }
        // skuObj[valArr] = val1;
      });
      newSkuMap = nextProps.skuMap.reverse();
      this.setState({
        skuObj: skuObj,
        skuMap: newSkuMap,
        maxIndex: maxIndex
      });
    }
    if (this.props.isShow != nextProps.isShow) {
      if (nextProps.isShow) {
        document.body.style.overflow = "hidden";
      }
      this.setState({
        show: nextProps.isShow
      });
    }
  }

  render() {
    const { show } = this.state;
    return (
      <div className="sku_page" style={{ display: show ? "block" : "none" }}>
        <div className="sku_box_bg" />
        <div className="sku_con_box">
          <div className="sku_title_box">
            <div className="close_btn" onClick={this.closeFn}>
              <Icon type="cross" />
            </div>
            <div className="cont">
              <img
                src={
                  this.props.skugoodsPic != ""
                    ? API.imgPath + this.props.skugoodsPic
                    : require("../../assets/img/de.jpg")
                }
                alt=""
              />
              <div className="text">
                <span className="blackPrice">￥288</span>
                <span className="redPrice">会员价￥258.99</span>
                <div className="info_text">
                  {this.state.goodsSkuFullName != ""
                    ? this.state.goodsSkuFullName
                    : this.props.skuName}
                </div>
              </div>
            </div>
          </div>
          <div className="sku_items">
            {this.state.skuMap &&
              this.state.skuMap.map((val, index) => {
                return (
                  <div className="sku_item" key={index}>
                    <div className="sku_item_title">{val.skuName}</div>
                    <div className="sku_item_select">
                      {val.goodsSkuMapItemResponse.map((ival, iIndex) => {
                        var classStr = "";
                        var canSelect = false;
                        var parentID = [];
                        this.state.SelectIDs.map(() => {});
                        if (this.state.SelectIDs.length < index) {
                          //如果当前层级大于已选层级，并且超过一层以上，则当前层级全部不可选
                          canSelect = false;
                        } else {
                          //如果当前层级小于已选层级，或者仅仅超过一层，则筛选可选ID,

                          for (var i = 0; i < index; i++) {
                            if (this.state.SelectIDs[i] != undefined) {
                              parentID.push(this.state.SelectIDs[i]);
                            }
                          }
                          parentID.push(ival.itemId);
                          if (this.state.skuObj[parentID] != undefined) {
                            canSelect = true;
                          }
                        }

                        return (
                          <span
                            key={iIndex}
                            className={
                              canSelect
                                ? this.state.SelectIDs[index] == ival.itemId
                                  ? "active"
                                  : ""
                                : "cantClick"
                            }
                            onClick={this.choseSkuId.bind(
                              this,
                              index,
                              ival.itemId
                            )}
                          >
                            {ival.itemName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="sku_bottom">
            <div className="select_num">
              <span className="select_title">数量</span>
              <div className="select_con">
                <span
                  className={this.state.canClick ? "jian" : "jian cant"}
                  onClick={this.setNum.bind(this, "down")}
                >
                  -
                </span>
                <span className="shu">{this.state.num}</span>
                <span className="jian" onClick={this.setNum.bind(this, "up")}>
                  +
                </span>
              </div>
            </div>

            <div
              className={this.state.canSend ? "redBtn" : "redBtn cantC"}
              onClick={this.inputOrder}
            >
              确定
            </div>
          </div>
        </div>
          <Route path="/order" component={Order}></Route>
      </div>
    );
  }
}
