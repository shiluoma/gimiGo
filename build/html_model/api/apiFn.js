import API from './api';
import AXIOS from 'axios';


export const GetCardInfo = (app_version,app_system,id)=>{
    AXIOS.get(API.cardInfo,{
        params:{
            app_version: 1,
            app_system: 1,
            id: 51
        }
    }).then(function(res){
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })
}



const requestFn = () => {
    return;
    Axios.get(API.cardInfo, {
      params: {
        app_version: 1,
        app_system: 1,
        id: 51
      }
    })
      .then(function(res) {
        console.log(res);
  
        if (res.data.code == "0") {
          console.log(res.data.data);
        } else {
          console.log(res.datam.sg);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  