import router from '../router'
import {setToken,getToken} from '@/utils/cookie'
import utils from '../util';
import store from '@/store/index';
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);

router.beforeEach((to,from,next)=>{

    //var url = window.location.href
    //web端临时处理
    var url = window.location.href+'?reportType=1'
    var cs = url.split('?')[1];
    var cs_arr = cs.split('&');
    var ms={};
    for(var i=0;i<cs_arr.length;i++){
      ms[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
    }
    if(ms.reportType==='0'||ms.reportType==='1'){
      store.commit('setReportType',ms.reportType)
      utils.axiosPost('/v1/user/getSign',{
        appId:ms.appid,
        timestamp:ms.timestamp,
        signType:ms.signType,
        sign:ms.sign,
        custId:ms.custId,
      }).then(resp => {
        if(resp.data.code===200){
          let data=resp.data.data;
          
          utils.axiosPost('/v1/user/getUserInfo',{
            custType: 'U',
            custId: '210326551198922',
            token: 'PwHiQragLjuMIstPSAZoBj1TgqkXW46IjFxmFAec3L0qg7pge9HU1A7ea1A1'
            // custId:ms.custId,
            // token:res.token
          }).then(re=>{console.log(re)
            if(re.data.code===200){
              store.commit('set_token',re.data.data.token)
              //cookie存储防止页面刷新token失效
              setToken(re.data.data.token)
              next()
            }
          })
        }
      })
    }else{
      _this.flag=false
    }
})

