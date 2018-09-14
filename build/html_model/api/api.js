
console.log("编译环境:",NODE_ENV)
const URL = {
    dev:"/api",
    prod:"www.jd.com"
}
const APIURL = NODE_ENV=="development"?URL.dev:URL.prod;
console.log("接口地址：",APIURL)

const API = {
    //GET卡券详情
    cardInfo:APIURL+"/crm/vouchers/detail"
}
console.log("接口列表：",API)

export default API;