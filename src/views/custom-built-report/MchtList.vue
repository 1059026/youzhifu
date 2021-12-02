<template>
  <div :style="{marginTop:appMarginTop}">
    <div class="mcht-data-head">
      <router-link :to="{ name: 'customBuiltReport' }" >
        <img src="../../assets/images/left.png" class="icons-right"/>
      </router-link>
      <div v-if="isCust===true" class="mcht-data-head-title">商户排名</div>
      <div v-else class="mcht-data-head-title">商户列表</div>
      <div class="mcht-asset-rank-show" @click="assets">资产评级说明</div>
    </div>
    <div class="data-layout">
      <div>
        <div @click.stop="selectShow = !selectShow">
          <span class="data-select">筛选</span>
          <img src="../../assets/images/selecta.png" class="icons-selecta"/>
        </div>
        <div v-if="selectShow">
          <div class="mcht-mask" @touchmove.stop.prevent="" :style="{marginTop:appMarginTop}"></div>
          <div class="pull-down-select" :style="{marginTop:appMarginTop}">
            <div>
              <input class="search" placeholder="请输入商户或商户名称" v-model="searchName"/>
            </div>
            <div class="search-date">
              <span :class="mchtDateShow1?'search-date-active':'search-date-none'" @click="handleSelect1">{{startTime}}</span>
              <span class="search-date-zhi">至</span>
              <span :class="mchtDateShow2?'search-date-active':'search-date-none'" @click="handleSelect2">{{endTime}}</span>
              <van-popup v-model="mchtDateShow"  position="bottom"  :style="{ height:'200px'}">
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :item-height=22
                    @cancel="cancel"
                    @confirm="confirm"
                />
              </van-popup>
            </div>
            <div class="search-date">
              <span class="mcht-reset" style="color: #303030" @click="resetData">重置</span>
              <span class="mcht-reset" style="color: #73b553;margin-left: 10px;" @click="search">搜索</span>
            </div>
          </div>
        </div>
      </div>
      <div class="data-right">
        <div @click.stop="dataSelect">
          <span class="data-select">{{dataName}}</span>
          <img src="../../assets/images/select.png" class="icons-select" />
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
      <div class="data-right">
        <div @click.stop="handleSort" style="width: 84px;">
          <span class="data-select">{{sortSelect.title}}</span>
          <img src="../../assets/images/sort.png" class="icons-sort" />
        </div>
        <sort-select v-if="sortShow" :sort="sort" :sortShow="sortShow" @sortShow='receive' class="sideNavigation"></sort-select>
      </div>
    </div>
    <van-list
        v-model="onloading"
        :finished="finished"
        @load="onLoad"
        offset="1"
        :immediate-check="false"
    >
      <div class="data-charts" v-for="(item,index) in listData" :key="index">
        <div class="mcht-detail" >
          <div class="mcht-name">
            <span class="mcht-name-detail">{{item.cusname}}</span>
            <div>
              <span class="mcht-num-text">资产评级</span>
              <span style="margin-left: 5px" :style="item.rating==='S'?'color:#947fdc':item.rating==='A'?'color:#ff5454':item.rating==='B'?'color:#ffb657':item.rating==='C'?'color:#73b553':'color:#373737' ">{{item.rating}}</span>
            </div>
          </div>
          <div class="mcht-num">
            <div>
              <span class="mcht-num-text">交易额</span>
              <span class="mcht-num-text-num">{{item.allmoney}}</span>
            </div>
            <div style="margin-left: 60px">
              <span class="mcht-num-text">交易笔数</span>
              <span class="mcht-num-text-num">{{item.allnum}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <span v-if='isNull(list.data)' class="layout-null">暂无数据</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import SortSelect from "./SortSelect";
import { Popup,DatetimePicker,Dialog,List} from 'vant';
import Vue from "vue";
import utils from "../../util";

Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Dialog);
Vue.use(List);

export default {
  components: {SortSelect},
  props:["rankingList"],
  watch:{
    dataType: {//对邮支付全量数据的选择进行深度监听，数据变化试调用接口
      handler() {
        this.page=1
        this.finished = false
        this.watchQueryData()
      },
      deep: true,
    },
    sortSelect: {//对选择进行深度监听，数据变化试调用接口
      handler() {
        this.page=1
        this.finished = false
        this.watchQueryData()
      },
      deep: true,
    },
  },
  data() {
    return{
      selectShow:false,
      mchtDateShow:false,
      mchtDateShow1:false,
      mchtDateShow2:false,
      dataShow:false,
      sortShow:false,
      assetsShow:false,
      isCust:this.$route.params.isCust,
      dataName:'邮支付',
      dataType:'1',
      startTime:'开始时间',
      endTime:'结束时间',
      code:'',
      level:'',
      searchName:'',
      statusBarHeight:'',
      pixelRatio:'',
      appMarginTop:'20px',
      page:1,
      pagesize:10,
      onloading: false,
      finished: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date((new Date)-24*60*60*1000),
      currentDate: new Date((new Date)-24*60*60*1000),
      time: {
        startTime:'',
        endTime:'',
      },
      sort:[
        {
          title:"交易额降序",
          value:'1',
        },
        {
          title:"交易额升序",
          value:'2',
        },
        {
          title:"交易笔数降序",
          value:'3',
        },
        {
          title:"交易笔数升序",
          value:'4',
        },
      ],
    }
  },
  computed:{
    ...mapGetters(
        {
          token:'get_token',
          sortSelect:'getSortSelectValue',
          list:'getMchtList',
          selectTime:'getSelectTime',
          listData:'getMchtListData',
          reportType:"getReportType",
          loading:"getLoading",
        })
  },
  created() {
    let _this = this;
    if(window&&window.tl){
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
    this.getDate();
    if(this.reportType==='0'||this.reportType==='1'){
      let formData = {
        token:this.token,
        type:this.dataType,
        sort:this.sortSelect.value,
        start_time:this.selectTime.startTime,
        end_time:this.selectTime.endTime,
        page:this.page,
        pagesize:this.pagesize,
      };
      this.$store.dispatch('queryMchtList',{...formData}).then(resp=>{
        if(resp.data.code==200){
          if(this.list.dataend===true){
            this.finished=true
          }
          if(resp.data.data.dataend===false){
            this.onloading=false
          }
        }
      });
    }
  },
  methods: {
    watchQueryData(){
      if(this.reportType==='0'||this.reportType==='1'){
        if(this.startTime==='开始时间'||this.endTime==='结束时间'||this.startTime===''||this.endTime==='') {
          let formData = {
            token:this.token,
            type:this.dataType,
            start_time:this.selectTime.startTime,
            end_time:this.selectTime.endTime,
            sort:this.sortSelect.value,
            page:this.page,
            pagesize:this.pagesize,
          };
          this.$store.dispatch('queryMchtList',{...formData}).then(resp=>{
            if(resp.data.code==200){
              if(this.list.dataend===true){
                this.finished=true
              }
              if(resp.data.data.dataend===false){
                this.onloading=false
              }
            }
          });
        }else {
          let formData = {
            token:this.token,
            type:this.dataType,
            start_time:this.startTime,
            end_time:this.endTime,
            sort:this.sortSelect.value,
            page:this.page,
            pagesize:this.pagesize,
            cusname:this.searchName,
          };
          this.$store.dispatch('queryMchtList',{...formData}).then(resp=>{
            if(resp.data.code==200){
              if(this.list.dataend===true){
                this.finished=true
              }
              if(resp.data.data.dataend===false){
                this.onloading=false
              }
            }
          });
        }
      }
    },
    queryData(){
      if(this.reportType==='0'||this.reportType==='1'){
        if(this.startTime==='开始时间'||this.endTime==='结束时间'||this.startTime===''||this.endTime==='') {
          let formData = {
            token:this.token,
            type:this.dataType,
            start_time:this.selectTime.startTime,
            end_time:this.selectTime.endTime,
            sort:this.sortSelect.value,
            page:this.page,
            pagesize:this.pagesize,
          };
          utils.axiosPost('/v1/institutions/merchants',{
            ...formData
          }).then(resp=>{
            if(resp.data.code==200){
              this.$store.commit('setMchtListData',this.listData.concat(resp.data.data.data));
              if(resp.data.data.dataend===true){
                this.finished = true;
              }
              if(resp.data.data.dataend===false){
                this.onloading=false
              }
            }
          })
        }else {
          let formData = {
            token:this.token,
            type:this.dataType,
            start_time:this.startTime,
            end_time:this.endTime,
            sort:this.sortSelect.value,
            page:this.page,
            pagesize:this.pagesize,
            cusname:this.searchName,
          };
          utils.axiosPost('/v1/institutions/merchants',{
            ...formData
          }).then(resp=>{
            if(resp.data.code==200){
              this.$store.commit('setMchtListData',this.listData.concat(resp.data.data.data));
              if(resp.data.data.dataend===true){
                this.finished = true;
              }
              if(resp.data.data.dataend===false){
                this.onloading=false
              }
            }
          })
        }
      }
    },
    assets(){
      this.assetsShow=true;
      if(this.assetsShow){
        Dialog({ message: this.list.note });
      }
    },
    handleSelect(){
      if(this.dataShow){
        this.dataShow=false
      }else if(this.sortShow){
        this.sortShow=false
      }
      this.selectShow=!this.selectShow;
    },
    handleSelect1(){
      this.mchtDateShow1=!this.mchtDateShow1
      if(this.mchtDateShow2){
        this.mchtDateShow2=!this.mchtDateShow2
      }
      if(this.mchtDateShow1){
        this.mchtDateShow=this.mchtDateShow1
      }else if(!this.mchtDateShow1){
        this.mchtDateShow=false
      }
    },
    handleSelect2(){
      this.mchtDateShow2=!this.mchtDateShow2
      if(this.mchtDateShow1){
        this.mchtDateShow1=!this.mchtDateShow1
      }
      if(this.mchtDateShow2){
        this.mchtDateShow=this.mchtDateShow2
      }else if(!this.mchtDateShow2){
        this.mchtDateShow=false
      }
    },
    cancel(){
      if(this.mchtDateShow1){
        this.mchtDateShow=false
        this.mchtDateShow1=false
      }else if(this.mchtDateShow2){
        this.mchtDateShow=false
        this.mchtDateShow2=false
      }
    },
    confirm(val){
      let year = val.getFullYear()//年
      let month = val.getMonth() + 1//月
      let day = val.getDate()//日
      let hour = val.getHours()//时
      let minute = val.getMinutes()//分
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      if(this.mchtDateShow1){
        this.startTime=`${year}-${month}-${day}`
        this.mchtDateShow=false
        this.mchtDateShow1=false
      }else if(this.mchtDateShow2){
        this.endTime=`${year}-${month}-${day}`
        this.mchtDateShow=false
        this.mchtDateShow2=false
      }
    },
    resetData(){
      this.searchName=''
      this.startTime='开始时间'
      this.endTime='结束时间'
    },
    search(){
      if(this.startTime==='开始时间'||this.endTime==='结束时间'||this.startTime===''||this.endTime===''){
        Dialog({ message: '开始或结束时间不能为空' });
      }else{
        if(this.reportType==='0'||this.reportType==='1'){
          this.finished = false
          this.page =1
          let formData = {
            token:this.token,
            type:this.dataType,
            sort:this.sortSelect.value,
            start_time:this.startTime,
            end_time:this.endTime,
            page:this.page,
            pagesize:this.pagesize,
            cusname:this.searchName,
          };
          this.$store.dispatch('queryMchtList',{...formData}).then(resp=>{
            if(resp.data.code==200){
              if(this.list.dataend===true){
                this.finished=true
              }
              if(resp.data.data.dataend===false){
                this.onloading=false
              }
            }
          });
        }
      }
      this.selectShow=false
    },
    dataSelect(){
      if(this.selectShow){
        this.selectShow=false
      }else if(this.sortShow){
        this.sortShow=false
      }
      this.dataShow=!this.dataShow;
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
    handleSort(){
      if(this.dataShow){
        this.dataShow=false
      }else if(this.selectShow){
        this.selectShow=false
      }
      this.sortShow=!this.sortShow;
    },
    receive(data){
      this.sortShow=data
    },
    isNull(obj){//判断是否为空
      if(obj==null||obj==''){
        return true;
      }else{
        return false
      }
    },
    getDate(){
      this.time.startTime=utils.getDateStr(-1);
      this.time.endTime=utils.getDateStr(-1);
      this.$store.commit('setSelectTime',this.time)
    },
    onLoad() {
      if(this.loading===false){
        this.page++
        this.queryData()
      }else if(this.loading===true){
        this.onloading=false
      }
    },
  },
}
</script>

<style>
.mcht-data-head{
  height: 45px;
  background-color: #1a6347;
  display: flex;
  align-items: center;
}
.icons-right{
  margin-left:15px;
  height: 17px;
  width: 8px;
}
.mcht-data-head-title{
  /*width: 352px;*/
  /*width: 100%;*/
  /*text-align: center;*/
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  margin-left: 129px;
}
.mcht-asset-rank-show{
  color: #73b553;
  font-size: 12px;
  margin-left: 63px;
}
.data-layout{
  height: 35px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.data-time{
  font-size: 14px;
  line-height: 14px;
  color: #373737;
}
.data-right{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.data-select{
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.icons-select{
  height: 8px;
  width: 10px;
  margin-left: 5px;
}
.icons-selecta{
  height: 10px;
  width: 12px;
  margin-left: 5px;
}
.mcht-mask{
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.pull-down-select{
  position: absolute;
  z-index: 2;
  top:80px;
  left: 0;
  height: 155px;
  width: 100%;
  background-color: #FFFFFF;
  padding:10px 18px 15px 18px;
  box-sizing: border-box;
}
.search{
  width: 340px;
  height: 34px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #e8e8e8;
}
.search-date{
  margin-top: 10px;
  width: 100%;
  height: 35px;
  display: flex;
}
.search-date-active{
  width: 150px;
  border-bottom: solid 1px #73b553;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
  color: #73b553;
}
.search-date-zhi{
  font-size: 13px;
  line-height: 35px;
  color: #707070;
}
.search-date-none{
  width: 150px;
  border-bottom: solid 1px #e8e8e8;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
  color: #373737;
}
.mcht-reset{
  width: 165px;
  height: 35px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #e8e8e8;
  font-size: 15px;
  line-height: 35px;
  text-align: center;
}
.popup{
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
}
.icons-sort{
  height: 10px;
  width: 12px;
}
.sideNavigation{
  position: absolute;
  z-index: 2;
  right:24px;
  top:69px;
  padding: 5px 15px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 5px 0px
  rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.data-charts{
  width: 100%;
  height: 100%;
  margin-top: 12px;
  background-color: #FFFFFF;
}
.mcht-detail{
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-bottom:1px solid #e9e9e9;
}
.mcht-name{
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.mcht-num{
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.mcht-num-text{
  font-size: 14px;
  color: #707070;
}
.mcht-num-text-num{
  font-size: 14px;
  color: #373737;
  margin-left: 10px
}
.mcht-name-detail{
  font-size: 16px;
  line-height: 16px;
  color: #373737;
}
.layout-null{
  display: flex;
  color: #969696;
  line-height: 600px;
  font-size: 14px;
  justify-content: center;
}
</style>
