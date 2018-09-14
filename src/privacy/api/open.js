
var Navigator = navigator.userAgent;
var ifChrome = Navigator.match(/Chrome/i) != null && Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ? true : false;
var ifAndroid = (Navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
var ifiPad = (Navigator.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
var ifiPhone = (!ifiPad && Navigator.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
var ifSafari = (ifiPhone || ifiPad) && Navigator.match(/Safari/);
var version = 0;
ifSafari && (version = Navigator.match(/Version\/([\d\.]+)/));

version = parseFloat(version[1], 10);
// 是否从微信打开
var ifWeixin = navigator.userAgent.indexOf("MicroMessenger") >= 0; // weixin

var url = {
    weixin:"jimigoapp://jm.jimgo.com.cn:8089",
    ios:"jimigoapp://jm.jimgo.com.cn:8089",
    android:"jimigoapp://jm.jimgo.com.cn:8089",
    iosDownLoad:"https://www.pgyer.com/9ACs",
    androidDownLoad:" https://www.pgyer.com/53Gy",
    yybUrl:"http://www.baidu.com"
}

var time=3000;

function downLoad(url){
    setTimeout(function () {
        location.href = url;
    }, time)
}

function openApp(path,params,_this) { // openApp
    var paramsStr="";
    var pathStr ="";
    if(params){
        Object.keys(params).map(function(val,index){
            if(index==0){
                if(path){
                    pathStr ="/" + path;
                }
                paramsStr=pathStr + paramsStr+"?"+val+"="+params[val]
            }else{
                paramsStr=paramsStr+"&"+val+"="+params[val]
            }
        })
    }
    if (ifWeixin) { // 如果是微信端
        //location.href = url.weixin+paramsStr; // 直接使用location.href打开，注意如果是不在微信白名单无法打开
        //downLoad(yybUrl);
        _this.setState({
            isFc:true
        })
        return
    }else{
        location.href = url.weixin+paramsStr;
        console.log("非微信浏览器打开尝试吊起应用")
    }
    if (ifiPad) { // 如果是ipad
        location.href = url.ios+paramsStr; // 直接使用location.href打开
        downLoad(url.iosDownLoad);
        return
    } else if (ifiPhone){
            location.href = url.ios+paramsStr; // 直接使用location.href打开
        downLoad(url.iosDownLoad);
            return
    }else{
        //安卓普通浏览器
        location.href = url.ios+paramsStr; // 直接使用location.href打开
        downLoad(url.androidDownLoad);
        return
    }
}

export default openApp