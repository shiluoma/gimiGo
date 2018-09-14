import 'babel-polyfill';//兼容部分手机原生浏览器
import React from "react";
import ReactDOM from "react-dom";
import loadable from "react-loadable";
import LoadView from "./component/loading"
import 'amfe-flexible'

import './assets/css/index.less';
// import './assets/css/index.css';

import InfoPage from "./component/infoPage";
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

// const InfoPage = loadable({
//   loader: () => import("./component/infoPage"),
//   loading:loadingComponent
// });

class APP extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <InfoPage/>      
    );
  }
}


ReactDOM.render(<APP />, document.getElementById("app"));
