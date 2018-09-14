
export const strTime = (mss,noS)=> {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    if(noS){
        return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    }else{
        return days + "天" + hours + "小时" + minutes + "分钟";
    }
  }

export const getUrlParams = (url)=>{  
    var pairs;
    var args=new Object();  
    if(url){
        pairs=url.split("?")[1].split("&");
    }else{
        var query=location.search.substring(1);query=decodeURI(query)//获取查询串 
        pairs=query.split("&");//在逗号处断开  
    }
    for(var i=0;i<pairs.length;i++){  
        var pos=pairs[i].indexOf('=');//查找name=value  
        if(pos==-1){//如果没有找到就跳过  
            continue;  
        }  
        var argname=pairs[i].substring(0,pos);//提取name  
        var value=pairs[i].substring(pos+1);//提取value  
        args[argname]=unescape(value);//存为属性  
    }  
    return args;//返回对象  
}  
