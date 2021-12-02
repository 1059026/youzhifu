<template>
  <div>
    <div class="cust-message-layout">
      <div class="message-transaction">
        <span v-for="(item,index) in selectList" :key="index"
              @click="select(item.name)" v-bind:class="{'message-select':item.name===optionName,'message-text':item.name!==optionName}">{{item.name}}排名</span>
      </div>
      <div class="message-right">
        <router-link :to="{ name: 'mchtList', params: {isCust:true}, }" >
          <span class="right-select">查看全部</span>
          <img src="../../assets/images/black.png" class="icons-black"/>
        </router-link>
      </div>
    </div>
    <div class="layout-charts">
      <!-- 排行榜抬头 -->
      <div class="layout-list">
        <div class="list-head">
          <span style="width: 8%">排名</span>
          <span style="width: 40%">名称</span>
          <span style="width: 25%" v-if="optionName==='交易额'">交易额{{tranRankingData.money_unit}}</span>
          <span style="width: 25%" v-if="optionName==='交易笔数'">交易笔数{{tranRankingData.num_unit}}</span>
          <span style="width: 25%">资产评级</span>
          <img src="../../assets/images/sort.png" class="icons-sort" @click.stop="sortShow = !sortShow"/>
          <sort-select v-if="sortShow" :sort="sort" :sortShow="sortShow" @sortShow='receive' class="cust-sideNavigation1"></sort-select>
        </div>
      </div>
      <div class="list-num" v-for="(item,index) in tranRankingData.summary" :key="index">
        <div class="list-head">
          <span  style="width: 8%">{{item.rank}}</span>
          <span  style="width: 40%">{{item.name}}</span>
          <span  style="width: 25%" v-if="optionName==='交易额'">{{item.allmoney}}</span>
          <span  style="width: 25%" v-if="optionName==='交易笔数'">{{item.allnum}}</span>
          <span style="width: 25%">{{item.rating}}</span>
          <span class="icons"></span>
        </div>
      </div>
      <span v-if='isNull(tranRankingData.summary)' class="rank-layout-null">暂无数据</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import SortSelect from "./SortSelect";
export default {
  components: {SortSelect},
  watch:{
  },
  data() {
    return{
      sortShow:false,
      selectList:[
        {name:"交易额"},
        {name:"交易笔数"},
      ],
      optionName:"交易额",
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
          tranRankingData:'getTranRankingData',
          reportType:"getReportType",
        })
  },
  methods: {
    select(val) {
      this.optionName = val;
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
    }
  },
}
</script>

<style>
.cust-message-layout{
  margin: 48px 0 0 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.message-transaction{
  margin: 15px 10px;
  height: 20px;
  display: flex;
}
.message-select{
  width: 85px;
  text-align: center;
  border-bottom: 3px solid #73b553;
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.message-text{
  width: 85px;
  text-align: center;
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.message-title{
  padding-left: 8px;
  box-sizing: border-box;
  border-left: 3px solid #73b553;
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.message-right{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.right-select{
  font-size: 10px;
  line-height: 10px;
  color: #707070;
}
.icons-black{
  height: 10px;
  width: 5px;
  margin-left: 4px;
}
.icons-sort{
  height: 12px;
  width: 15px;
}
.cust-sideNavigation1{
  position: absolute;
  z-index: 2;
  right:27px;
  top:352px;
  padding: 5px 15px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 5px 0px
  rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.layout-charts{
  width: 100%;
  /*height: 394px;*/
  background-color: #FFFFFF;
}
.layout-list{
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.list-head{
  display: flex;
  padding: 0 10px 0 5px;
  box-sizing: border-box;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
}
.list-num{
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #eef1f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rank-layout-null{
  display: flex;
  color: #969696;
  line-height: 394px;
  font-size: 14px;
  justify-content: center;
}
</style>
