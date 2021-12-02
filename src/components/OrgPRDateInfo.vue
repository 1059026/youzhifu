<template>
  <div class="org-data-info">
    <span class="org-data-title">{{orgDatePR.date}}</span>
    <ul v-if="orgDatePR">
      <li class="org-data-container">
        <div class="org-data-item">
          <span>新增商户</span>
          <span>{{orgDatePR.mchtNo}}</span>
        </div>
        <!--分日数据不隐，其它两个tab隐藏-->
        <div class="org-data-item" :style="isShow?{}:{visibility: 'hidden'}">
          <span>有交易商户</span>
          <span>{{orgDatePR.transMchtNo}}</span>
        </div>
      </li>
      <li class="org-data-container">
        <div class="org-data-item">
          <span>交易笔数</span>
          <span>{{orgDatePR.transNo}}</span>
        </div>
        <div class="org-data-item">
          <span>交易金额</span>
          <span>{{orgDatePR.transAmt | formatAccout}}</span>
        </div>
      </li>
      <li class="org-data-container">
        <div class="org-data-item">
          <span>负向交易笔数</span>
          <span>{{orgDatePR.reverseTransNo}}</span>
        </div>
        <div class="org-data-item">
          <span>负向交易金额</span>
          <span>{{orgDatePR.reverseTransAmt | formatAccout}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from "@/util";

export default {
  data() {
    return {};
  },
  props: {
    orgDatePR: Object,
    isShow:Boolean
  },
  filters:{
    formatAccout:(val,pattern)=>{
      let fenToYuan = utils.floatConvert.divide(val,'100');//分转元
      return fenToYuan > 100000 ? `${(fenToYuan/10000).toFixed(2)}万` : fenToYuan;
    }
  },
  components: {},
  methods: {},
  created() {
  }
};
</script>
<style scoped>
/*这里没装less，就不嵌套使用了*/
/*org-data-info  begin*/
.org-data-info {
  display: flex; justify-content:center;
  flex-direction: column;
  font-size: .25rem; background-color: white;
  border-bottom: 1px solid #e0e0e0; padding: .25rem .5rem;
}
/*org-data-info  end*/
/*org-data-container begin*/
.org-data-title{
  margin-bottom: .25rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #373737;
}
.org-data-container{
  display: flex;
}
.org-data-item{
  width: 49%; display: flex; justify-content: space-between; padding-right: .5rem; line-height: 20px;
  color: #6c6c6c; font-size: 12px; margin-bottom: 6px;
}
.org-data-item :last-child{
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  letter-spacing: 0px;
  color: #373737;
}
/*org-data-container end*/
</style>