import React from "react";
import { InputItem, List, Picker, Switch, Icon, Toast } from "antd-mobile";
import "./index.less";
import API from "common/api/api";
import { directOrder } from "common/api/apiFn";
import { options } from "./addressJson";

console.log("options", options);
export default class Address extends React.Component {
  constructor() {
    super();
  }

  state = {
    hasAddress: false,
    showAddBox: false,
    canSend:false,
    name: "",
    phoneNum: "",
    quyu: "",
    info: "",
    isDefault: "",
    data: [{ value: "asdasd", label: "asdasd" }]
  };

  addAddress=()=>{
      if(this.state.canSend){
        
      }
  }

  componentWillMount() {}
  componentDidMount() {
    document.title = "收货地址管理";
    document.getElementsByClassName("order_box")[0].style.overflow = "hidden";
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }

  render() {
    const { hasAddress, name, phoneNum, quyu,canSend, showAddBox, info } = this.state;
    return (
      <div className="address_box">
        {hasAddress ? (
          ""
        ) : (
          <div>
            <img
              className="noImg"
              src={require("common/assets/img/noadd.png")}
              alt=""
            />
            <span className="no">暂无收货地址</span>
          </div>
        )}

        <div
          className="redBtn"
          onClick={() => {
            this.setState({
              showAddBox: true
            });
          }}
        >
          新增地址
        </div>
        <div className="addallbox" style={{ display: showAddBox ? "block" : "none" }}>
          <div className="addBox">
            <List>
              <InputItem
                placeholder="请输入收货人姓名"
                ref={el => (this.labelFocusInst1 = el)}
                onChange={val => {
                  this.setState({
                    name: val
                  });
                }}
                value={name}
              >
                <div onClick={() => this.labelFocusInst1.focus()}>收货人</div>
              </InputItem>
              <InputItem
                placeholder="请输入手机号码"
                type="number"
                maxLength="11"
                ref={el => (this.labelFocusInst2 = el)}
                onChange={val => {
                  this.setState({
                    phoneNum: val
                  });
                }}
                value={phoneNum}
              >
                <div onClick={() => this.labelFocusInst2.focus()}>手机号码</div>
              </InputItem>

              <Picker
                extra="请选择"
                data={options}
                onChange={val => {
                  console.log(val);
                  this.setState({
                    quyu: val
                  });
                }}
                value={quyu}
                onOk={e => console.log("ok", e)}
                onDismiss={e => console.log("dismiss", e)}
              >
                <List.Item arrow="horizontal">收货地区</List.Item>
              </Picker>

              <InputItem
                placeholder="街道、楼牌号等"
                type="number"
                maxLength="11"
                ref={el => (this.labelFocusInst3 = el)}
                onChange={val => {
                  this.setState({
                    info: val
                  });
                }}
                value={info}
              >
                <div onClick={() => this.labelFocusInst3.focus()}>详细地址</div>
              </InputItem>
            </List>
          </div>
          <div className="huibox" />
          <div className="dizhibox">
            <List>
              <List.Item
                extra={
                  <Switch
                    onChange={() => {
                      this.setState({
                        isDefault: !this.state.isDefault
                      });
                    }}
                    checked={this.state.isDefault}
                    platform="ios"
                    color="#FF2738"
                  />
                }
              >
                设为默认地址
              </List.Item>
            </List>

            <div className={canSend?"redBtn mt_25":"redBtn mt_25 cantBtn"} onClick={this.addAddress}>确定</div>
          </div>
        </div>
      </div>
    );
  }
}
