<template>
  <div class="businessAnalysis">
    <div class="topPart">
        <div class="toolBar">
            <span>筛选</span>
            <img src="../../assets/images/selecta.png" />
        </div>
        <div class="toolBar">
            <span>邮支付</span>
            <img src="../../assets/images/select.png" />
        </div>
        <div class="toolBar">
            <span>降序</span>
            <img src="../../assets/images/sort.png" />
        </div>
    </div>
    <div style="padding: 0 20px;">
        <tab-nav :navList="navList"></tab-nav>
    </div>
    
  </div>
</template>

<script>
import tabNav from '../../components/tabNavCom.vue'

export default {
  name:'businessAnalysis',
  components:{
    tabNav
  },
  mounted(){

  },
  data(){
    return {
        navList: ['定期报告', '进件走势'],
    }
  }
}
</script>

<style scoped>
.businessAnalysis{}
.topPart{
    display:flex;  
    justify-content: space-between;
    align-items: center;
    height: 40px; 
    line-height: 40px;
    padding:0 20px;
 }
.toolBar{ color:#000; font-size: 12px; text-align:center;display: flex;align-items: center;}
.toolBar img {
    width: 10px;
    height: 10px;
    margin-left: 3px;
}
</style>