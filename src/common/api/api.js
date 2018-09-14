
console.log("编译环境:",NODE_ENV)
const URL = {
    dev:"/api",
    prod:"/api",devImgPathUrl:"//jimigooss.suermen.com/",prodImgPath:"//joss.jimigo.com.cn/"
}
const APIURL = (NODE_ENV=="development"?URL.dev:(NODE_ENV=="development_test"?URL.dev:URL.prod));
const IMGURL = (NODE_ENV=="development"||NODE_ENV=="development_test"?URL.devImgPathUrl:URL.prodImgPath);
console.log("接口地址：",APIURL)

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

var time = getNowFormatDate().split(" ")[0];

const API = {
    apiKey:"3A87E38D08DBD775AF34D96923679AEB",wxShare:APIURL+"/rest/v1/myInfo/getWeChatSign",
    timestamp:time,
    imgPath:IMGURL,
    cardInfo:APIURL+"/rest/v1/classify/getGoodsDetail",
    getGrouponDetail:APIURL+"/rest/v1/groupon/getGrouponDetail",
    getGrouponOpenDetail:APIURL+"/rest/v1/groupon/getGrouponOpenDetail",
    getReserveGoodsDetail:APIURL+"/rest/v1/classify/getReserveGoodsDetail",
    getUserEnshrineList:APIURL+"/rest/v1/userEnshrine/getUserEnshrineList",
    getDiscoverDetail:APIURL+"/rest/v1/discover/getDiscoverDetail",
    sendMobileCode:APIURL+"/rest/v1/userRest/sendMobileCode",
    regUser:APIURL+"/rest/v1/userRest/regUser",
    userLogin:APIURL+"/rest/v1/userRest/userLogin",
    addInvitationCode:APIURL+"/rest/v1/userRest/addInvitationCode",
    getBaseUserById:APIURL+"/rest/v1/userRest/getBaseUserById",
    directOrder:APIURL+"/rest/v1/order/directOrder",//选定SKU下单
    addUserAddress:APIURL+"/rest/v1/order/addUserAddress",//添加收货地址
    myIfno:APIURL+"/rest/v1/userRest/getBaseUserById",
    downloadUrl:APIURL+"/rest/v1/app/getLastAppVersion",
}
console.log("接口列表：",API)

export default API;