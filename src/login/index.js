import "babel-polyfill"; //兼容部分手机原生浏览器
import React from "react";
import ReactDOM from "react-dom";
import loadable from "react-loadable";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import LoadView from "./component/loading";
import "amfe-flexible";

import "./assets/css/index.less";

const loadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <LoadView />;
  }
  // Handle the error state
  else if (error) {
    return <div>呃，正在升级.</div>;
  } else {
    return null;
  }
};

const InfoPage = loadable({
  loader: () => import("./component/infoPage"),
  loading: loadingComponent
});

const onlyCode = loadable({
  loader: () => import("./component/onlyCode"),
  loading: loadingComponent
});

const jkList = loadable({
  loader: () => import("./component/jkList"),
  loading: loadingComponent
});

class APP extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div style={{width:"100%",height:"100%"}}>
          <Route path="/sign/:type" component={InfoPage} />
          <Route path="/onlyCode" component={onlyCode} />
          <Route path="/jkList" component={jkList} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<APP />, document.getElementById("app"));
