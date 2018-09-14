import React from "react";
import { Switch, List, Icon, Toast } from "antd-mobile";
import "./card.less";
import API from "common/api/api";
import { directOrder } from "common/api/apiFn";


export default class Roder extends React.Component {
  constructor() {
    super();
  }

  state = {
    show: false,
  };

  componentWillMount() {
  }
  componentDidMount() {
    document.title = "优惠券";
    document.getElementsByClassName("order_box")[0].style.overflow = "hidden";
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }

  render() {
    const { show, hasAddress } = this.state;
    const Item = List.Item;
    const Brief = Item.Brief;

    return (
      <div className="card_box">
          
          <div className="item">
              <div className="right_sj"></div>
              <div className="left_sj"></div>
              <div className="over_box">
                    <div className="left_box">
                      <div className="price_box">
                        <span className="icon">￥</span>
                        <span className="price">25</span>
                      </div>
                      <div className="text_box">
                        满400可用
                      </div>
                    </div>
                    <div className="right_box">
                        <span className="title">
                        母婴儿童类商品可用母婴儿童类商品可用母婴儿童类商品可用母婴儿童类商品可用
                        </span>
                        <span className="time">
                        2018.05.01-2018.05.31
                        </span>
                    </div>
              </div>
          </div>

      </div>
    );
  }
}
