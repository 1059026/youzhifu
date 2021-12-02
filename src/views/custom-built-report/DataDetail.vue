<template>
  <div :style="{marginTop:appMarginTop}">
    <div class="data-head">
      <router-link :to="{ name: 'customBuiltReport' }" >
        <img src="../../assets/images/left.png" class="icons-right"/>
      </router-link>
      <div class="data-head-title" v-if="reportType==='0'">
        <span style="color: #FFFFFF" >{{BaseData.simple_name}}</span>
      </div>
      <div class="data-head-title" v-if="reportType==='1'">
        <div @click.stop="orgObj.page = !orgObj.page">
          <span style="color: #FFFFFF">{{orgObj.simple_name}}</span>
          <img src="../../assets/images/select.png" class="icons-select"/>
        </div>
        <van-popup v-model="orgObj.page" position='bottom' :style="{height:'90%'}">
          <div style="height: 100%">
            <cTree :orgList="[{simple_name:orgPageData.simple_name,code:orgPageData.code,level:orgPageData.level,flag:orgPageData.flag,child:orgPageData.child}]" v-if="orgPageData.simple_name&&orgPageData.code"></cTree>
            <van-empty
                v-else
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="暂无数据"
            />
          </div>
        </van-popup>
      </div>
    </div>
    <div class="data-layout">
      <div class="data-message-transaction">
        <span v-for="(item,index) in selectList" :key="index"
              @click="select(item.name)" v-bind:class="{'data-message-select':item.name===optionName,'data-message-text':item.name!==optionName}">{{item.name}}排名</span>
      </div>
      <div style="display: flex">
        <div style="width: 122px;display:flex;justify-content: flex-end;margin-left: 5px">
          <time-select :time="time"></time-select>
        </div>
        <div class="data-detail-right">
          <div @click.stop="dataShow = !dataShow" style="display: flex;align-items: center">
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
      </div>
    </div>
    <div class="data-charts">
      <!-- 排行榜抬头 -->
      <div class="data-layout-list">
        <div class="data-list-head" style="font-size: 11px;line-height: 11px">
          <span style="width: 8%">排名</span>
          <span style="width: 40%">名称</span>
          <span style="width: 25%" v-if="optionName==='交易'">交易额{{tranRankingData.money_unit}}</span>
          <span style="width: 25%" v-if="optionName==='交易'">交易笔数{{tranRankingData.num_unit}}</span>
          <span style="width: 25%" v-if="optionName==='资产规模'">资产规模</span>
          <span style="width: 25%" v-if="optionName==='资产规模'">资产规模占比</span>
          <img src="../../assets/images/sort.png" class="data-icons-sort" @click.stop="sortShow = !sortShow"/>
          <sort-select v-if="sortShow&&optionName==='交易'" :sort="sortSelect1" :sortShow="sortShow" @sortShow='receive' class="data-sideNavigation1"></sort-select>
          <sort-select v-if="sortShow&&optionName==='资产规模'" :sort="sortSelect2" :sortShow="sortShow" @sortShow='receive' class="data-sideNavigation1"></sort-select>
        </div>
      </div>
      <van-list
          v-model="onloading"
          :finished="finished"
          @load="onLoad"
          offset="1"
          :immediate-check="false"
      >
        <div class="data-list-num" v-for="(item,index) in tranRankingDataList" :key="index">
          <div class="data-list-head">
            <span style="width: 8%">{{item.rank}}</span>
            <span style="width: 40%">{{item.name}}</span>
            <span style="width: 25%" v-if="optionName==='交易'">{{item.allmoney}}</span>
            <span style="width: 25%" v-if="optionName==='交易'">{{item.allnum}}</span>
            <span style="width: 25%" v-if="optionName==='资产规模'">{{item.assets}}</span>
            <span style="width: 25%" v-if="optionName==='资产规模'">{{item.assets_accounted}}</span>
            <span class="icons"></span>
          </div>
        </div>
      </van-list>
      <span v-if='isNull(tranRankingDataList)' class="layout-null">暂无数据</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import TimeSelect from "./TimeSelect";
import SortSelect from "./SortSelect";
import utils from "../../util";
import cTree from '@/components/TreeOrg/tree';
import {Empty,List} from 'vant';
import Vue from "vue";

Vue.use(Empty);
Vue.use(List);


export default {
  components: {SortSelect, TimeSelect,cTree},
  data() {
    return{
      dataShow:false,
      showHidden:false,
      dataName:'邮支付',
      dataType:'1',
      code:'',
      level:'',
      page:1,
      pagesize:16,
      onloading: false,
      finished: false,
      statusBarHeight:'',
      pixelRatio:'',
      appMarginTop:'20px',
      orgPageData: {
        code: '',
        simple_name: '',//所属机构
        level:'',
        flag:'',
        child:[
          {code:'',simple_name:'',child:[]}
        ],//机构列表(所有数据)
      },
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
      sortShow:false,
      selectList:[
        {name:"资产规模"},
        {name:"交易"},
      ],
      optionName:"资产规模",
      sortSelect1:[
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
      sortSelect2:[
        {
          title:"资产规模降序",
          value:'5',
        },
        {
          title:"资产规模升序",
          value:'6',
        },
        // {
        //   title:"交易笔数降序",
        //   value:'3',
        // },
        // {
        //   title:"交易笔数升序",
        //   value:'4',
        // },
      ],
    }
  },
  watch: {
    dataType: {//对邮支付全量数据的选择进行深度监听，数据变化试调用接口
      handler() {
        this.page =1
        this.finished = false
        if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
          this.organRequest()
        }else if(this.reportType==='0'){
          this.custRequest()
        }
      },
      deep: true,
    },
    sort: {//对排序选择数据的选择进行深度监听，数据变化试调用接口
      handler() {
        this.page =1
        this.finished = false
        if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
          this.organRequest()
        }else if(this.reportType==='0'){
          this.custRequest()
        }
      },
      deep: true,
    },
    selectTime: {//对排序选择数据的选择进行深度监听，数据变化试调用接口
      handler() {
        this.page =1
        this.finished = false
        if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
          this.organRequest()
        }else if(this.reportType==='0'){
          this.custRequest()
        }
      },
      deep: true,
    },
    orgObj: {//对机构的选择进行深度监听，数据变化试调用接口
      handler(newobj,oldobj) {
        if(newobj&&oldobj&&newobj.code!=oldobj.code){
          this.page =1
          this.finished = false
          if(this.reportType==='1'&&this.orgObj.code&&this.orgObj.level){
            this.organRequest()
          }
        }
      },
      deep: true,
    },

  },
  computed:{
    ...mapGetters(
        {
          token:'get_token',
          BaseData:'getBaseData',
          tranRankingData:'getTranRankingData',
          sort:'getSortSelectValue',
          selectTime:'getSelectTime',
          tranRankingDataList:'getTranRankingDataList',
          orgObj: "getOrgList",
          reportType:"getReportType",
          loading:"getLoading",
        }
    )
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
    this.getDate()
    if(this.reportType==='1'){
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
          this.orgPageData.openFlag =true;
          this.orgPageData.flag = 'first';
          this.orgPageData.child = child;//机构列表(所有数据)
          this.$store.dispatch("setOrgListDo", {code,simple_name,level,page:false});
        }
      });//机构列表
      this.organRequest()
    }else if(this.reportType==='0'){
      this.custRequest()
    }
  },
  methods: {
    organRequest() {
      let formData = {
        token:this.token,
        type:this.dataType,
        start_time:this.selectTime.startTime,
        end_time:this.selectTime.endTime,
        code:this.orgObj.code,
        level:this.orgObj.level,
      };
      this.$store.dispatch('queryOrganBaseData',{...formData})
      this.$store.dispatch('queryOrganTranRanking',{...formData, sort:this.sort.value, page:this.page, pagesize:this.pagesize}).then(resp=>{
        if(resp.data.code==200){
          if(resp.data.data.dataend===true){
            this.finished = true
          }
          if(resp.data.data.dataend===false){
            this.onloading=false
          }
        }
      });//机构交易排名数据
    },
    custRequest() {
      let formData = {
        token:this.token,
        type:this.dataType,
        start_time:this.selectTime.startTime,
        end_time:this.selectTime.endTime,
      };
      this.$store.dispatch('queryCustBaseData',{...formData});//客户经理基础数据
      this.$store.dispatch('queryCustTranRankingData',{...formData, sort:this.sort.value, page:this.page, pagesize:this.pagesize}).then(resp=>{
        if(resp.data.code==200){
          if(resp.data.data.dataend===true){
            this.finished = true
          }
          if(resp.data.data.dataend===false){
            this.onloading=false
          }
        }
      });//机构交易排名数据
    },
    queryData() {
      if(this.reportType==='1'){
        let formData = {
          token:this.token,
          type:this.dataType,
          start_time:this.selectTime.startTime,
          end_time:this.selectTime.endTime,
          code:this.orgObj.code,
          level:this.orgObj.level,
          page:this.page,
          pagesize:this.pagesize,
          sort:this.sort.value,
        };
        utils.axiosPost('/v1/institutions/summary',{
          ...formData
        }).then(resp=>{
          if(resp.data.code==200){
            this.$store.commit('setTranRankingDataList',this.tranRankingDataList.concat(resp.data.data.summary));
            if(resp.data.data.dataend===true){
              this.finished = true;
            }
            if(resp.data.data.dataend===false){
              this.onloading=false
            }
          }
        })
      }else if(this.reportType==='0'){
        let formData = {
          token:this.token,
          type:this.dataType,
          start_time:this.selectTime.startTime,
          end_time:this.selectTime.endTime,
          page:this.page,
          pagesize:this.pagesize,
          sort:this.sort.value,
        };
        utils.axiosPost('/v1/manager/summary',{
          ...formData
        }).then(resp=>{
          if(resp.data.code==200){
            this.$store.commit('setTranRankingDataList',this.tranRankingDataList.concat(resp.data.data.summary));
            if(resp.data.data.dataend===true){
              this.finished = true;
            }
            if(resp.data.data.dataend===false){
              this.onloading=false
            }
          }
        })
      }
    },
    select(val) {
      this.optionName = val;
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
.data-head{
  height: 45px;
  background-color: #1a6347;
  display: flex;
  align-items: center;
}
.data-head-title{
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  width: 352px;
  display: flex;
  justify-content: center;
}
.data-layout{
  height: 35px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.data-message-transaction{
  /*margin: 15px 10px;*/
  height: 20px;
  display: flex;
}
.data-message-select{
  width: 80px;
  text-align: center;
  border-bottom: 3px solid #73b553;
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.data-message-text{
  width: 80px;
  text-align: center;
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.data-detail-right{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 51px;
}
.data-select{
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.icons-right{
  height: 17px;
  width: 8px;
  margin-left: 15px;
}
.data-icons-sort{
  height: 12px;
  width: 15px;
}
.data-sideNavigation1{
  position: absolute;
  z-index: 2;
  right:12px;
  top:96px;
  padding: 5px 15px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 5px 0px
  rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.icons-select{
  height: 8px;
  width: 10px;
  margin-left: 5px;
}
.popup{
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 16px;
}
.data-charts{
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
}
.data-layout-list{
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f1f1f1;
}
.data-list-head{
  display: flex;
  padding: 0 10px 0 5px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
}
.data-list-num{
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #eef1f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.layout-null{
  display: flex;
  color: #969696;
  line-height: 600px;
  font-size: 14px;
  justify-content: center;
}
</style>
