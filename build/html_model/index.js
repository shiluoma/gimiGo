import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import loadable from "react-loadable";//按需加载库
import LoadView from "./component/loading"//loading图像组件
import 'amfe-flexible'//淘宝媒体查询，自动设置根节点字号，还有viewport设置
import './assets/css/index.less';//默认css

//loading组件，用于按需加载缓冲动画
const loadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
        <LoadView/>
    );
  }
  // Handle the error state
  else if (error) {
    return (<div>呃，正在升级.</div>);
  } else {
    return null;
  }
};


//按需加载例子
const InfoPage = loadable({
  loader: () => import("./component/infoPage"),
  loading:loadingComponent
});

class APP extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={InfoPage} />
        </div>
      </Router>
    );
  }
}


ReactDOM.render(<APP />, document.getElementById("app"));
