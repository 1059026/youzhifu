<template>
  <div>
    <div class="message-layout">
      <span class="message-title">资产分析</span>
      <div class="zc-asset-rank-show" @click="assets">资产评级说明</div>
    </div>
    <div class="layout-charts">
      <!-- 排行榜抬头 -->
      <div class="layout-list">
        <div class="list-head">
          <span style="width: 15%">资产评级</span>
          <span style="width: 60%">户数</span>
          <span style="width: 25%">资产规模</span>
        </div>
      </div>
      <div class="list-num" v-for="(item,index) in assetsData.assets" :key="index">
        <div class="list-head">
          <span  style="width: 15%">{{item.rating}}</span>
          <span  style="width: 60%">{{item.num}}</span>
          <span  style="width: 25%">{{item.assets}}</span>
        </div>
      </div>
      <span v-if='isNull(assetsData)' class="rank-layout-null">暂无数据</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import SortSelect from "./SortSelect";
import {Dialog} from "vant";
export default {
  components: {SortSelect},
  watch:{
  },
  data() {
    return{
      assetsShow:false,
    }
  },
  computed:{
    ...mapGetters(
        {
          assetsData:'getAssetsData',
          reportType:"getReportType",
        })
  },
  methods: {
    assets(){
      this.assetsShow=true;
      if(this.assetsShow){
        Dialog({ message: this.assetsData.note });
      }
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
.message-layout{
  margin: 48px 0 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.message-title{
  padding-left: 8px;
  box-sizing: border-box;
  border-left: 3px solid #73b553;
  font-size: 12px;
  line-height: 12px;
  color: #373737;
}
.zc-asset-rank-show{
  color: #73b553;
  font-size: 12px;
  margin-right: 4px;
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
