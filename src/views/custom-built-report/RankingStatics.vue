<template>
  <div>
    <div class="rank-message-layout">
<!--      <span class="message-title">交易排名</span>-->
      <div class="rank-message-transaction">
        <span v-for="(item,index) in selectList" :key="index"
              @click="select(item.name)" v-bind:class="{'rank-message-select':item.name===optionName,'rank-message-text':item.name!==optionName}">{{item.name}}排名</span>
      </div>
      <div class="message-right">
        <router-link :to="{ name: 'dataDetail', params: {}, }" >
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
          <span style="width: 25%" v-if="optionName==='交易'">交易额{{tranRankingData.money_unit}}</span>
          <span style="width: 25%" v-if="optionName==='交易'">交易笔数{{tranRankingData.num_unit}}</span>
          <span style="width: 25%" v-if="optionName==='资产规模'">资产规模</span>
          <span style="width: 25%" v-if="optionName==='资产规模'">资产规模占比</span>
          <img src="../../assets/images/sort.png" class="icons-sort" @click.stop="sortShow = !sortShow"/>
          <sort-select v-if="sortShow&&optionName==='交易'" :sort="sort1" :sortShow="sortShow" @sortShow='receive' class="sideNavigation1"></sort-select>
          <sort-select v-if="sortShow&&optionName==='资产规模'" :sort="sort2" :sortShow="sortShow" @sortShow='receive' class="sideNavigation1"></sort-select>
        </div>
      </div>
      <div class="list-num" v-for="(item,index) in tranRankingData.summary" :key="index">
        <div class="list-head">
          <span  style="width: 8%">{{item.rank}}</span>
          <span  style="width: 40%">{{item.name}}</span>
          <span style="width: 25%" v-if="optionName==='交易'">{{item.allmoney}}</span>
          <span style="width: 25%" v-if="optionName==='交易'">{{item.allnum}}</span>
          <span style="width: 25%" v-if="optionName==='资产规模'">{{item.assets}}</span>
          <span style="width: 25%" v-if="optionName==='资产规模'">{{item.assets_accounted}}</span>
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
        {name:"资产规模"},
        {name:"交易"},
      ],
      optionName:"资产规模",
      sort1:[
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
      sort2:[
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
.rank-message-layout{
  margin: 0px 0 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rank-message-transaction{
  /*margin: 15px 10px;*/
  height: 20px;
  display: flex;
}
.rank-message-select{
  width: 80px;
  text-align: center;
  border-bottom: 3px solid #73b553;
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.rank-message-text{
  width: 80px;
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
.sideNavigation1{
  position: absolute;
  z-index: 2;
  right:24px;
  top:598px;
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
