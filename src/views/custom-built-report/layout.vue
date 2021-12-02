<template>
  <div style="height:100%;background-color: #FFFFFF;" :style="{marginTop:appMarginTop}" v-if="flag===true">
    <div class="nav" :style="reportType==='0'?{height:'234px'}:{height:'284px'}">
      <div class="title" v-if="reportType==='1'">
        <div @click.stop="orgObj.page = !orgObj.page" style="display: flex">
          <span style="color: #FFFFFF" >{{orgObj.simple_name}}</span>
          <img src="../../assets/images/right.png" class="icons-right"/>
        </div>
        <van-popup v-model="orgObj.page" position='bottom' :style="{height:'90%'}">
          <div style="height: 100%">
            <cTree :orgList="[{simple_name:orgPageData.simple_name,code:orgPageData.code,level:orgPageData.level,flag:orgPageData.flag,openFlag:orgPageData.openFlag,child:orgPageData.child}]" v-if="orgObj.simple_name&&orgObj.code"></cTree>
            <van-empty
                v-else
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无数据"
            />
          </div>
        </van-popup>
      </div>
      <div class="title" v-if="reportType==='0'">
        <span style="color: #FFFFFF" >{{BaseData.simple_name}}</span>
      </div>
      <div class="data">
        <div>
          <div @click.stop="dataShow = !dataShow">
            <span class="font">{{dataName}}</span>
            <img src="../../assets/images/select.png" class="icons-select"/>
          </div>
          <van-popup v-model="dataShow"  position="bottom"  :style="{ height:'157px'}">
            <div>
              <span class="popup" style="color: #373737;border-bottom: 1px solid #e8e8e8;" @click.stop="dataSelect1">全量数据</span>
              <span class="popup" style="color:#73b553 " @click.stop="dataSelect2">邮支付</span>
              <div style="height: 10px;background-color: #f8f8f8"></div>
              <span class="popup" style="color:#b8b8b8" @click.stop="dataShow = !dataShow">取消</span>
            </div>
          </van-popup>
        </div>
        <time-select :time="time" :style1="true"></time-select>
      </div>
      <div class="data" style="padding-right: 20px;height: 90px;">
        <router-link :to="{ name: 'mchtList', params: {}, }" >
          <div class="join">
            <span class="text">昨日进件</span>
            <span class="num">{{BaseData.before_num}}</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'mchtList', params: {}, }" >
          <div class="join">
            <span class="text">当月进件</span>
            <span class="num">{{BaseData.month_num}}</span>
          </div>
        </router-link>
      <router-link :to="{ name: 'mchtList', params: {}, }" >
        <div class="join">
          <span class="text">总进件</span>
          <span class="num">{{BaseData.year_num}}</span>
        </div>
      </router-link>
      </div>
      <div style="height: 60px" v-if="reportType==='0'">
        <div class="card0">
          <div class="message">
            <span class="message-title">数据汇总</span>
          </div>
          <div class="data" style="padding: 0 46px">
            <div class="data-content">
              <span class="num" style="color: #373737">{{BaseData.all_num}}</span>
              <span class="charge-text">交易数{{BaseData.all_num_unit}}</span>
            </div>
            <div class="data-content">
              <span class="num" style="color: #373737">{{BaseData.all_money}}</span>
              <span class="charge-text">交易额{{BaseData.all_money_unit}}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 60px" v-if="reportType==='1'">
        <div class="card1">
          <div class="message">
            <span class="message-title">数据汇总</span>
          </div>
          <div class="data" style="padding: 0 46px">
            <div>
              <div class="data-content">
                <span class="num" style="color: #373737">{{BaseData.assets}}</span>
                <span class="charge-text">资产规模{{BaseData.assets_unit}}</span>
              </div>
              <div class="data-content" style="margin-top: 10px">
                <span class="num" style="color: #373737">{{BaseData.all_money}}</span>
                <span class="charge-text">交易额{{BaseData.all_money_unit}}</span>
              </div>
            </div>
            <div>
              <div class="data-content">
                <span class="num" style="color: #373737">{{BaseData.all_num}}</span>
                <span class="charge-text">交易笔数{{BaseData.all_num_unit}}</span>
              </div>
              <div class="data-content" style="margin-top: 10px">
                <span class="num" style="color: #373737">{{BaseData.assets_accounted}}</span>
                <span class="charge-text">资产规模占比</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table" v-if="reportType==='1'">
      <Zichanfenxi/>
    </div>
    <div class="table" v-if="reportType==='1'">
      <RankingStatics/>
    </div>
    <div class="table" v-if="reportType==='0'">
      <CustRankingStatics/>
    </div>
    <div class="table" v-if="reportType==='1'">
      <TransactionProportionReport/>
    </div>
    <div class="table">
      <TradingTrendReport/>
    </div>
  </div>
  <div v-else>
    <div style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;">
      <img src="../../assets/images/no-data.png" style="height: 50%;width: 50%;margin-top: 50%"/>
      <span style="font-size: 15px;color: #707070;text-align: center">此账号权限不足</span>
    </div>
  </div>

</template>

<script>
import RankingStatics from "./RankingStatics";
import TransactionProportionReport from "./TransactionProportionReport";
import TradingTrendReport from "./TradingTrendReport";
import { Popup,DatetimePicker,Empty } from 'vant';
import Vue from "vue";
import TimeSelect from "./TimeSelect";
import {mapGetters} from 'vuex';
import cTree from '@/components/TreeOrg/tree'
import CustRankingStatics from "./CustRankingStatics";
import Zichanfenxi from "./Zichanfenxi";
import utils from '../../util';


Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Empty);


export default {
  components: {
    Zichanfenxi, CustRankingStatics, TimeSelect, TradingTrendReport, TransactionProportionReport, RankingStatics,cTree},
  data() {
    return {
      dataShow:false,
      showHidden:false,
      flag:true,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      dataName:'邮支付',
      dataType:'1',
      code:'',
      level:'',
      statusBarHeight:'',
      pixelRatio:'',
      appMarginTop:'20px',
      time:[
        {
          title: "昨日",
          startTime:'',
          endTime:''
        },
        {
          title: "近七天",
          startTime:'',
          endTime:''
        },
        {
          title: "当月",
          startTime:'',
          endTime:''

        },
        {
          title: "当年",
          startTime:'',
          endTime:''
        },
      ],
      orgPageData: {
        code: '',
        simple_name: '',//所属机构
        level:'',
        flag:'',
        openFlag:'',
        child:[
          {code:'',simple_name:'',child:[]}
        ],//机构列表(所有数据)
      },
    }
  },
  computed:{
    ...mapGetters(
        {
          token:'get_token',
          BaseData:'getBaseData',
          tranRankingData:'getTranRankingData',
          sort:'getSortSelectValue',
          selectTime:'getSelectTime',
          orgObj: "getOrgList",
          reportType:"getReportType",
        }
    )
  },
  watch: {
    dataType: {//对邮支付全量数据的选择进行深度监听，数据变化试调用接口
      handler() {
        if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
          this.organRequest1()
        }else if(this.reportType==='0'){
          this.custRequest()
        }
      },
      deep: true,
    },
    sort: {//对排序进行深度监听，数据变化试调用接口
      handler() {
        if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
          let formData = {
            token:this.token,
            type:this.dataType,
            start_time:this.selectTime.startTime,
            end_time:this.selectTime.endTime,
            code:this.orgObj.code,
            level:this.orgObj.level,
          };
          this.$store.dispatch('queryOrganTranRanking',{...formData, sort:this.sort.value, page:'1', pagesize:'10',});//机构交易排名数据
        }else if(this.reportType==='0'){
          let formData = {
            token:this.token,
            type:this.dataType,
            start_time:this.selectTime.startTime,
            end_time:this.selectTime.endTime,
          };
          this.$store.dispatch('queryCustTranRankingData',{...formData, sort:this.sort.value, page:'1', pagesize:'10',});//机构交易排名数据
        }
      },
      deep: true,
      // immediate: true
    },
    orgObj: {//对机构的选择进行深度监听，数据变化试调用接口
      handler(newobj,oldobj) {
        if(newobj&&oldobj&&newobj.code!=oldobj.code){
          if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
            this.organRequest1()
          }
        }
      },
      deep: true,
    },
    selectTime: {//对排序选择数据的选择进行深度监听，数据变化试调用接口
      handler() {
        if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
          this.organRequest1()
        }else if(this.reportType==='0'){
          this.custRequest()
        }
      },
      deep: true,
    },
  },
  created() {
    let _this = this;
    _this.getDate()
    if(window&&window.tl){console.log(window)
      if(window.tl.setNavigationBarHidden){
        window.tl.setNavigationBarHidden({
          hidden: true
        });
      }
      if(window.tl.getSystemInfo){
        window.tl.getSystemInfo({
          success (res) {
            _this.appMarginTop = utils.floatConvert.divide(res.statusBarHeight,res.pixelRatio)+'px';
            _this.statusBarHeight = res.statusBarHeight+'px';
            _this.pixelRatio = res.pixelRatio+'px';
          }
        })
      }
    }
    if(this.token===''){
      console.log(window.location.href)
      var url = window.location.href
      var cs = url.split('?')[1];
      var cs_arr = cs.split('&');
      var ms={};
      for(var i=0;i<cs_arr.length;i++){
        ms[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
      }
      if(ms.reportType==='0'||ms.reportType==='1'){
        this.$store.commit('setReportType',ms.reportType)
        utils.axiosPost('/v1/user/getSign',{
          appId:ms.appid,
          timestamp:ms.timestamp,
          signType:ms.signType,
          sign:ms.sign,
          custId:ms.custId,
        }).then(resp => {
          if(resp.data.code===200){
            let data=resp.data.data;
            // if(window&&window.tl){
            //   if(window.tl.getCustInfo){
            //     // alert('调方法')
            //     window.tl.getCustInfo({
            //       appId:data.appId,
            //       timestamp:data.timestamp,
            //       infoContent:data.infoContent,
            //       signType:data.signType,
            //       sign:data.sign,
            //       success:function (res) {
                    utils.axiosPost('/v1/user/getUserInfo',{
                      custType: 'U',
                      custId: '210326551198922',
                      token: 'PwHiQragLjuMIstPSAZoBj1TgqkXW46IjFxmFAec3L0qg7pge9HU1A7ea1A1'
                      // custId:ms.custId,
                      // token:res.token
                    }).then(re=>{console.log(re)
                      if(re.data.code===200){
                        _this.$store.commit('set_token',re.data.data.token)
                        if(ms.reportType==='1'){
                          let formData1 = {
                            token:re.data.data.token,
                            type:_this.dataType,
                          };
                          _this.$store.dispatch('queryOrganList',{...formData1}).then(resp1=>{
                            if(resp1.data.code===200){
                              let {code, simple_name,child,level} = resp1.data.data[0];
                              _this.orgPageData.code = code;
                              _this.orgPageData.simple_name = simple_name;
                              _this.orgPageData.level =level;
                              _this.orgPageData.openFlag =true;
                              _this.orgPageData.flag = 'first';
                              _this.orgPageData.child = child;//机构列表(所有数据)
                              _this.$store.dispatch("setOrgListDo", {code,level,simple_name,page:false});
                            }
                          });//机构列表
                          let formData = {
                            token:re.data.data.token,
                            type:_this.dataType,
                            start_time:_this.selectTime.startTime,
                            end_time:_this.selectTime.endTime,
                            code:_this.code,
                            level:_this.level,
                          };
                          _this.$store.dispatch('queryOrganBaseData',{...formData});//机构基础数据
                          _this.$store.dispatch('queryOrganTranRanking',{...formData, sort:_this.sort.value, page:'1', pagesize:'10',});//机构交易排名数据
                          _this.$store.dispatch('queryOrganTranTendency',{...formData});//机构交易走势数据
                          _this.$store.dispatch('queryOrganTransShareData',{...formData});//机构交易占比数据
                        }else if(ms.reportType==='0'){
                          let formData = {
                            token:re.data.data.token,
                            type:_this.dataType,
                            start_time:_this.selectTime.startTime,
                            end_time:_this.selectTime.endTime,
                          };
                          _this.$store.dispatch('queryCustBaseData',{...formData});//客户经理基础数据
                          _this.$store.dispatch('queryCustTranRankingData',{...formData, sort:_this.sort.value, page:'1', pagesize:'10',});//机构交易排名数据
                          _this.$store.dispatch('queryCustTransTendencyData',{...formData});//机构交易走势数据
                        }
                      }else if(re.data.code===400){
                        _this.flag=false
                      }
                    })
              //     },
              //     fail:function (code,msg) {
              //       alert(code)
              //       alert(msg)
              //     }
              //   })
              // }
            // }
          }
        })
      }else{
        _this.flag=false
      }
    }else if(this.token!=''){
      this.getDate()
      if(this.reportType==='1'){
        this.organRequest()
      }else if(this.reportType==='0'){
        this.custRequest()
      }
    }
  },
  methods: {
    recursion(val){
      val.forEach((item,index)=>{
        item.openFlag = false;
        if(item.child && item.child.length > 0){
          return  this.recursion(item.child)
        }
      })
    },
    organRequest(){
      let formData1 = {
        token:this.token,
        type:this.dataType,
      };
      this.$store.dispatch('queryOrganList',{...formData1}).then(resp=>{
        if(resp.data.code===200){
          let {code, simple_name,child,level} = resp.data.data[0];
          this.orgPageData.code = code;
          this.orgPageData.simple_name = simple_name;
          this.orgPageData.level =level;
          this.orgPageData.flag = 'first';
          this.orgPageData.openFlag = true;
          this.recursion(child)
          this.orgPageData.child = child;//机构列表(所有数据)
          this.$store.dispatch("setOrgListDo", {code,level,simple_name,page:false});
        }
      });//机构列表
      let formData = {
        token:this.token,
        type:this.dataType,
        start_time:this.selectTime.startTime,
        end_time:this.selectTime.endTime,
        code:this.orgObj.code,
        level:this.orgObj.level,
      };
      this.$store.dispatch('queryOrganBaseData',{...formData});//机构基础数据
      this.$store.dispatch('queryAssetsData',{...formData});//资产分析数据
      this.$store.dispatch('queryOrganTranRanking',{...formData, sort:this.sort.value, page:'1', pagesize:'10',});//机构交易排名数据
      this.$store.dispatch('queryOrganTranTendency',{...formData});//机构交易走势数据
      this.$store.dispatch('queryOrganTransShareData',{...formData});//机构交易占比数据
    },
    organRequest1(){
      let formData = {
        token:this.token,
        type:this.dataType,
        start_time:this.selectTime.startTime,
        end_time:this.selectTime.endTime,
        code:this.orgObj.code,
        level:this.orgObj.level,
      };
      this.$store.dispatch('queryOrganBaseData',{...formData});//机构基础数据
      this.$store.dispatch('queryAssetsData',{...formData});//资产分析数据
      this.$store.dispatch('queryOrganTranRanking',{...formData, sort:this.sort.value, page:'1', pagesize:'10',});//机构交易排名数据
      this.$store.dispatch('queryOrganTranTendency',{...formData});//机构交易走势数据
      this.$store.dispatch('queryOrganTransShareData',{...formData});//机构交易占比数据
    },
    custRequest(){
      let formData = {
        token:this.token,
        type:this.dataType,
        start_time:this.selectTime.startTime,
        end_time:this.selectTime.endTime,
      };
      this.$store.dispatch('queryCustBaseData',{...formData});//客户经理基础数据
      this.$store.dispatch('queryCustTranRankingData',{...formData, sort:this.sort.value, page:'1', pagesize:'10',});//机构交易排名数据
      this.$store.dispatch('queryCustTransTendencyData',{...formData});//机构交易走势数据
    },
    dataSelect1(){
      this.dataName='全量数据';
      this.dataType='2';
      this.dataShow=!this.dataShow;
    },
    dataSelect2(){
      this.dataName='邮支付';
      this.dataType='1';
      this.dataShow=!this.dataShow;
    },
    getDate(){
      this.time[0].startTime=utils.getDateStr(-1);
      this.time[0].endTime=utils.getDateStr(-1);
      this.time[1].startTime=utils.getDateStr(-7);
      this.time[1].endTime=utils.getDateStr(0);
      this.time[2].startTime=utils.getDateCurrentMonth();
      this.time[2].endTime=utils.getDateStr(0);
      this.time[3].startTime=utils.getDateCurrentYear();
      this.time[3].endTime=utils.getDateStr(0);
      this.$store.commit('setSelectTime',this.time[0])
    },
    isNull(obj){//判断是否为空
      if(obj==null||obj==''){
        return true;
      }else{
        return false
      }
    }
  },
}
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  width: 100%;
  /*height: 284px;*/
  background-color: #1a6347;
  padding: 30px 0 0 20px;
  box-sizing: border-box;
}
.title{
  padding: 0 20px 25px 0;
  box-sizing: border-box;
  font-size: 17px;
  line-height: 17px;
  color: #ffffff;
  display: flex;
  align-items: center;
}
.icons-right{
  height: 17px;
  width: 8px;
  margin-left: 5px;
}
.icons-select{
  height: 8px;
  width: 10px;
  margin-left: 5px;
}
.data{
  padding: 0 10px 0 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.font{
  font-size: 12px;
  line-height: 12px;
  color: #ffffff;
}
.layout-zhi{
  font-size: 10px;
  line-height: 10px;
  color: #dbf38e;
  margin:0 5px;
}
.popup{
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
}
.join{
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.text{
  font-size: 10px;
  line-height: 10px;
  color: #dbf38e;
}
.num{
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
}
.card0{
  height: 90px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 0px
  rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 10px 0 -10px;
  display: flex;
  flex-direction: column;
}
.card1{
  height: 140px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 0px
  rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 10px 0 -10px;
  display: flex;
  flex-direction: column;
}
.message{
  margin: 12px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.message-title{
  padding-left: 8px;
  box-sizing: border-box;
  border-left: 3px solid #73b553;
  font-size: 12px;
  line-height: 12px;
  text-align: left;
  color: #373737;
}
.data-content{
  height: 39px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.charge-text{
  font-size: 10px;
  line-height: 10px;
  color: #707070;
}
.table{
  margin-bottom: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: solid 1px #DCDCDC;
}
.table-layout{
  height: 394px;
}

</style>
