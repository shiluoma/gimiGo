import API from './api';
import AXIOS from 'axios';


export const GetCardInfo = (goodsId, userId, goodsSkuId, callback) => {
    AXIOS.post(API.cardInfo, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "goodsId": goodsId,
            "userId": userId,
            "goodsSkuId": goodsSkuId
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}
export const GetWxConfig = (debug, callback) => {
    AXIOS.post(API.wxShare, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "url": window.location.href,
            "debug": debug,
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const getGrouponDetail = (goodsId, userId, activityId, callback) => {
    AXIOS.post(API.getGrouponDetail, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            goodsId: goodsId,
            userId: userId,
            activityId: activityId
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const getGrouponOpenDetail = (grouponId, orderNo, userId, callback) => {
    AXIOS.post(API.getGrouponOpenDetail, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "grouponId": grouponId,
            "orderNo": orderNo,
            "userId": userId
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const getReserveGoodsDetail = (reserveId, userId, callback) => {
    AXIOS.post(API.getReserveGoodsDetail, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "reserveId": reserveId,
            "userId": userId
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const getDiscoverDetail = (discoverId, userId, callback) => {
    AXIOS.post(API.getDiscoverDetail, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "discoverId": discoverId,
            "userId": userId
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}


export const getUserEnshrineList = (obj, callback) => {
    AXIOS.post(API.getUserEnshrineList, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            userId: obj.userId,
            supplierId: obj.supplierId,
            enshrineType: obj.enshrineType,
            pageNo: obj.pageNo,
            pageSize: obj.pageSize
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const GetMyInfo = (userId, optUserId, tokenId, callback) => {
    console.log("userId", userId)
    AXIOS.post(API.myIfno, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "optUserId": optUserId,
            "tokenId": tokenId,
            "userId": userId
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const GetDownLoadUrl = (clientNum, callback) => {
    AXIOS.post(API.downloadUrl, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "osType": clientNum,
            "appType": 0,
            "clientType": 0
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const sendMobileCode = (userMobile, callback) => {
    //发送验证码
    AXIOS.post(API.sendMobileCode, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "userMobile": userMobile,
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const regUser = (mobileCode, invitationCode, userMobile, callback) => {
    //注册
    AXIOS.post(API.regUser, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "userMobile": userMobile,
            "mobileCode": mobileCode,
            "invitationCode": invitationCode,
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const userLogin = (password, userName, callback) => {
    //登录
    AXIOS.post(API.userLogin, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "userName": userName,
            "loginType": 1,
            "password": password //验证码
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}



export const addInvitationCode = (userId, invitationCode, callback) => {
    //填写邀请码
    AXIOS.post(API.addInvitationCode, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "userId": userId,
	    	"invitationCode":invitationCode
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const getBaseUserById = (userId, tokenId, callback) => {
    //填写邀请码
    AXIOS.post(API.getBaseUserById, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "optUserId": userId,
            "userId": userId,
            "tokenId": tokenId,
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const directOrder = (number, goodsSkuId, goodsId, userId,callback) => {
    //选定SKU下单--普通商品
    AXIOS.post(API.directOrder, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "number": number,
            "goodsSkuId": goodsSkuId,
            "goodsId": goodsId,
            "userId": userId
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}

export const addUserAddress = (address, goodsSkuId, goodsId, userId,callback) => {
    //添加收货地址
    AXIOS.post(API.addUserAddress, {
        "apiKey": API.apiKey,
        "timestamp": API.timestamp,
        "bizContent": {
            "address": address,
            "area": "440306",
            "city": "440300",
            "userId": 1369,
            "adName": "罗文忠",
            "province": "440000",
            "isDefault": 1, // 是否默认 0不是  1是
            "strAddress": "广东省 深圳市 宝安区",
            "adPhone": "17722616996",
            "supplierId": 1155
        },
        "sign": API.apiKey
    }).then(function (res) {
        console.log(res)
        callback(res.data)
    }).catch(function (err) {
        console.log(err)
    })
}