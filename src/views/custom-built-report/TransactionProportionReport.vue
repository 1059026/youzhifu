<template>
  <div>
    <div class="message-transaction">
      <span v-for="(item,index) in selectList" :key="index"
            @click="select(item.name)" v-bind:class="{'message-select':item.name===optionName,'message-text':item.name!==optionName}">{{item.name}}占比</span>
    </div>
    <div style="height: 225px;display: flex">
      <div style="width: 200px">
        <div  id="myPieChart" :style="{width:'100%', height: '100%'}"></div>
      </div>
      <div style="width: 155px;display: flex;flex-direction:column;align-items: flex-start;justify-content: center;font-size: 12px;line-height: 25px">
        <div v-for="(item,index) in data.proportion" :key="index">
          <span v-if="index<=2&&optionName==='交易额'">{{item.name}} {{item.money_cent}}</span>
          <span v-if="(item.num_rank===1||item.num_rank===2||item.num_rank===3)&&optionName==='交易笔数'">{{item.name}} {{item.num_cent}}</span>
          <span v-if="(item.assets_rank===1||item.assets_rank===2||item.assets_rank===3)&&optionName==='资产规模'">{{item.name}} {{item.assets_accounted}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import utils from "../../util";

export default {
  data() {
    return {
      pieData:{
        name:'',
        value:'',
      },
      color:['#3f7def','#877dd4','#f06a7e','#ffbe62','#ffdd75','#d1ba8c','#9a9d83','#abd3ba',
      '#cee9ec','#6ddeea','#5ba2db','#cbb6f1','#eac0cb','#f5b6a1','#f1e4a7','#bcc6c5','#9ebbdc'
      ],
      selectList:[
        {name:"资产规模"},
        {name:"交易额"},
        {name:"交易笔数"},
      ],
      optionName:"资产规模",
      pieOption:{
        tooltip: {
          confine:true,
          trigger: 'item',
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],//设置饼图位置,第一个左右第二个上下
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '11',
              }
            },
            labelLine: {
              show: true
            },
            data: []
          }
        ]
      }
    }
  },
  computed:{
    ...mapGetters(
        {
          data:'getTransShareData'
        }
    )
  },
  watch:{
    data: {//对排行进行深度监听，数据变化试调用接口
      handler() {
        this.dataHandle()
      },
      deep: true,
      immediate: true
    },
    optionName:{
      handler() {
        this.dataHandle()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.tranReport();
    this.dataHandle();
    // console.log(this.data)
  },
  methods: {
    select(val) {
      this.optionName = val;
    },
    dataHandle(){
      const list=this.data.proportion;
      var pieData_array = new  Array();
      if(utils.isValidate(list)){
        for(let i=0;i<list.length;i++){
          const el=list[i]
          this.pieData={};
          this.pieData.name=el.name
          if (this.optionName==='交易额'){
            this.pieData.value=el.allmoney
          }else if(this.optionName==='交易笔数'){
            this.pieData.value=el.allnum
          }else{
            this.pieData.value=el.assets
          }
          pieData_array[i]=this.pieData;
        }
      }
      this.pieOption.series[0].data=pieData_array;
      if (this.optionName==='交易额'){
        this.pieOption.series[0].name=this.optionName.concat(' : '+this.data.all_money_unit);
      }else if(this.optionName==='交易笔数'){
        this.pieOption.series[0].name=this.optionName.concat(' : '+this.data.all_num_unit);
      }else{
        this.pieOption.series[0].name=this.optionName.concat(' : '+this.data.assets_unit);
      }
      this.$nextTick(()=>{
        this.tranReport();
      })
    },
    tranReport(){
      let myPieChart = this.$echarts.init(document.getElementById('myPieChart'))
      myPieChart.setOption (this.pieOption);
    },
    isNull(obj){//判断是否为空
      if(obj==null||obj==''){
        return true;
      }else{
        return false
      }
    }
  }
}
</script>

<style>
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
.tran-layout-null{
  display: flex;
  color: #969696;
  line-height: 225px;
  font-size: 14px;
  justify-content: center;
}
</style>