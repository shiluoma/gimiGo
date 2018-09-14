import API from './api';
import AXIOS from 'axios';


export const getUserEnshrineList = (obj,callback)=>{
  AXIOS.post(API.getUserEnshrineList,{
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
          userId:obj.userId,
          supplierId:obj.supplierId,
          enshrineType:obj.enshrineType,
          pageNo:obj.pageNo,
          pageSize:obj.pageSize
        },
        "sign": API.apiKey
  }).then(function(res){
      console.log(res)
      callback(res.data)
  }).catch(function(err){
      console.log(err)
  })
}

export const GetMyInfo = (userId,optUserId,tokenId,callback)=>{
  console.log("userId",userId)
  AXIOS.post(API.myIfno,{
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
          "optUserId": optUserId,
          "tokenId": tokenId,
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


  