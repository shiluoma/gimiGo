import React from "react";
import { Route } from "react-router-dom";

import {GetCardInfo} from '../api/apiFn';

export default class InfoPage extends React.Component {
  constructor() {
    super();
    this.state={
     testText:"Hello!"
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentDidMount() {
    GetCardInfo(1,1,51)
  }

  render() {
    return (
      <div className="card-page">  
       <h1 style={{display:"block",textAlign:"center"}} className="animateBBB">{this.state.testText}</h1>
       <br/>
        <img style={{width:"375px"}} src={require("../assets/img/timg.jpg")} alt=""/>
      </div>
    );
  }
}
