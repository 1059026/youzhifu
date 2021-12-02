;(function () {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
  var html = document.getElementsByTagName('html')[0];
  var settingFs = parseInt(html.style.fontSize);
  var settedFs = settingFs;
  var whileCount = 0;
  while (true) {
    var realFs = parseInt(window.getComputedStyle(html).fontSize);
    var delta = realFs - settedFs;
    if (Math.abs(delta) >= 1) {
      if (delta > 0) settingFs--;
      else settingFs++;
      html.setAttribute('style', 'font-size:' + settingFs + 'px!important');
    } else
      break;
    if (whileCount++ > 100)
      break
  }
})();

import axios from "axios"
import qs from "qs";
import store from '@/store/index';

axios.interceptors.request.use(config => {
  store.commit('showLoading')
  config.baseURL = process.env.VUE_APP_DATA_URL
  //console.log(config)
  return config
}, err => {
  console.log('请求超时!')
  return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  store.commit('hideLoading')
  if (data.status && data.status == 200 && data.data.status == 'error') {
    console.log(data.data.msg)
    return;
  }
  if (data.data.errorCode != null && data.data.errorCode != "" && data.data.errorCode != undefined) {
    console.log(data.data.errorMsg)
    return;
  }
  return data;

}, err => {
  store.commit('hideLoading')
  console.log(err)
  if (err.response.status == 504 || err.response.status == 404) {
    console.log('交易超时，请重试')
  } else if (err.response.status == 403) {
    console.log('权限不足,请联系管理员!')
  } else if (err.response.status == 401) {
    console.log('未有token')
  } else {
    console.log('未知错误!')
  }
  return Promise.resolve(err);
})

let utils = {
  postRequest(url, params) {
    return axios({
      method: 'post',
      url: url,
      data: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  axiosPost(url, data) {
    axios.create({ headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    data = qs.stringify(data);
    return axios.post(url, data);
  },
  getRequest(url, params) {
    return axios({
      method: 'get',
      params: params,
      url: url
    });
  },
  getUpload(url, params) {
    return axios({
      method: 'get',
      params: params,
      responseType: 'arraybuffer',
      url: url
    }); 
  },
  //判断非空
  isValidate(obj) {
    return obj != null && obj != "" && obj != undefined;
  },
  //将url里的参数解析成json对象
  convertUrlToJSON(urlData) {
    let field = urlData.split('&');

    let res = {};
    for (let i = 0, len = field.length; i < len; i++) {
      let temp = field[i].split('=');
      res[temp[0]] = temp[1];
    }
    return res;
  },
  //
  getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  // 今天，明天，昨天的日期 昨天： getDateStr(-1); 今天： getDateStr(0);
  getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var year = dd.getFullYear();
    var mon = dd.getMonth() + 1 <= 9 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期
    var day = dd.getDate() <= 9 ? "0" + dd.getDate() : dd.getDate();
    return year + "-" + mon + "-" + day;
  },
  //获取当月第一天
  getDateCurrentMonth() {
    var dd = new Date();
    dd.setDate(dd.getDate()); //获取AddDayCount天后的日期
    var year = dd.getFullYear();
    var mon = dd.getMonth() + 1 <= 9 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期
    var day = "01";
    return year + "-" + mon + "-" + day;
  },
  getDateCurrentYear() {
    var dd = new Date();
    dd.setDate(dd.getDate()); //获取AddDayCount天后的日期
    var year = dd.getFullYear();
    var mon = '01'; //获取当前月份的日期
    var day = "01";
    return year + "-" + mon + "-" + day;
  },
  // 获取上月最后一天和第一天的日期
  getDateLastMonth(num) {
    var nowdays = new Date();
    var year = nowdays.getFullYear();
    var month = nowdays.getMonth();
    if (month == 0)
       {
         month = 12;
         year = year - 1;
      }
    if (month < 10) {
       month = "0" + month;
    }
    var firstDay = year + "" + month + "" + "01"; //上个月的第一天
    var myDate = new Date(year, month, 0);
    var lastDay = year + "" + month + "" + myDate.getDate(); //上个月的最后一天
    if (num == 'f') {
      return firstDay;
    }
    else if (num == 'l'){
      return lastDay;
    }
  },
  //分转元
  getAmount(num){
    if(null == num){
      return "0.00";
    }
    return num/100;
  },
  /* 解决js浮点运算，精度丢失问题 */
  floatConvert: {
    isInteger(obj) {
      return Math.floor(obj) === obj;
    },
    toInteger(floatNum) {
      var ret = {times: 1, num: 0};
      var isNegative = floatNum < 0;
      if (this.isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
      }
      var strfi = floatNum + '';
      var dotPos = strfi.indexOf('.');
      var len = strfi.substr(dotPos + 1).length;
      var times = Math.pow(10, len);
      var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
      ret.times = times;
      if (isNegative) {
        intNum = -intNum;
      }
      ret.num = intNum;
      return ret;
    },
    operation(a, b, digits, op) {
      var o1 = this.toInteger(a);
      var o2 = this.toInteger(b);
      var n1 = o1.num;
      var n2 = o2.num;
      var t1 = o1.times;
      var t2 = o2.times;
      var max = t1 > t2 ? t1 : t2;
      var result = null;

      switch (op) {
        case 'add':
          if (t1 === t2) {
            result = n1 + n2;
          } else if (t1 > t2) {
            result = n1 + n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) + n2;
          }
          return result / max;
        case 'subtract':
          if (t1 === t2) {
            result = n1 - n2;
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) - n2;
          }
          return result / max;
        case 'multiply':
          result = (n1 * n2) / (t1 * t2);
          return result;
        case 'divide':
          result = (n1 / n2) * (t2 / t1);
          return result;
        default:
          break;
      }
    },
    add(a, b, digits) {
      a = Number(a);
      b = Number(b);
      return this.operation(a, b, digits, 'add');
    },
    subtract(a, b, digits) {
      a = Number(a);
      b = Number(b);
      return this.operation(a, b, digits, 'subtract');
    },
    multiply(a, b, digits) {
      a = Number(a);
      b = Number(b);
      return this.operation(a, b, digits, 'multiply');
    },
    divide(a, b, digits) {
      a = Number(a);
      b = Number(b);
      return this.operation(a, b, digits, 'divide');
    }
  },

  //获取token
  getToken() {
    return new Promise((resolve, reject) => {
        var url = window.location.href
        var cs = url.split('?')[1];
        var cs_arr = cs.split('&');
        var ms={};
        var that = this;
        for(var i=0;i<cs_arr.length;i++){
            ms[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
        }
        // alert(window.location.href)
        store.commit('setReportType',ms.reportType)
        this.axiosPost('/v1/user/getSign',{
            appId:ms.appid,
            timestamp:ms.timestamp,
            signType:ms.signType,
            sign:ms.sign,
            custId:ms.custId,
        }).then(resp => {
            if(resp.data.code===200){
                let data=resp.data.data;
                if(window&&window.tl){
                    if(window.tl.getCustInfo){
                        // alert('调方法')
                        window.tl.getCustInfo({
                            appId:data.appId,
                            timestamp:data.timestamp,
                            infoContent:data.infoContent,
                            signType:data.signType,
                            sign:data.sign,
                            success:function (res) {
                                that.axiosPost('/v1/user/getUserInfo',{
                                    custType:'U',
                                    custId:ms.custId,
                                    token:res.token
                                }).then(re=>{
                                    if(re.data.code===200){
                                        store.commit('set_token',re.data.data.token)
                                        resolve();
                                    }
                                })
                            },
                            fail:function (code,msg) {
                                reject(msg);
                                alert(code)
                                alert(msg)
                            }
                        })
                    }
                }
            }
        })
    })
  }

};
export default utils
