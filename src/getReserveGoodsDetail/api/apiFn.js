import API from './api';
import AXIOS from 'axios';


export const getReserveGoodsDetail = (reserveId,userId,callback)=>{
    AXIOS.post(API.getReserveGoodsDetail,{
          "apiKey": API.apiKey,
          "timestamp": API.timestamp,
          "bizContent": {
            "reserveId": reserveId,
            "userId": userId
          },
          "sign": API.apiKey
    }).then(function(res){
        console.log(res)
        callback(res.data)
    }).catch(function(err){
        console.log(err)
    })
}


export const GetWxConfig = (debug,callback)=>{
    AXIOS.post(API.wxShare,{
          "apiKey": API.apiKey,
          "timestamp": API.timestamp,
          "bizContent": {
            "url": window.location.href,
            "debug": debug,
          },
          "sign": API.apiKey
    }).then(function(res){
        console.log(res)
        callback(res.data)
    }).catch(function(err){
        console.log(err)
    })
  }