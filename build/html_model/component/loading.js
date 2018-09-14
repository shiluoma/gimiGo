import React from 'react';
import "../assets/css/loading.css"

const loadBox = {
    width:"100%",
    height:"100%",
    position:"absolute",
    left:"0px",
    right:"0px",
    zIndex:"99999",
}
export default class LoadingView extends React.Component{
    render(){
        return(
            <div style={{...loadBox}}>
                <div className="load8">
                    <div className="loader"></div>
                    <div className="loaderbg"></div>
                </div>
            </div>
        )
    }
}