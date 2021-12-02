<template>
  <div>
    <div class="message">
      <span class="message-title">交易走势图</span>
    </div>
    <div style="height: 236px">
<!--      <span v-if='isNull(data.charts)' class="trad-layout-null">暂无数据</span>-->
      <div id="myChart" :style="{width:'100%', height: '100%'}"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import utils from "../../util";
export default {
  data(){
    return{
      lineOption:{
        grid:{
          top:"5%",
          left:"5%",
          bottom:"10%",
          right:"5%",
          containLabel: true
        },
        legend: {
          icon: 'circle',
          itemHeight: 8,
          x: 'center',    //延Y轴居中
          y: 'bottom',//居右显示
          data: [{},{}]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data:[],
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          confine:true,
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
        },
        series: [
          {
            name:'',
            data:[],
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#73b553',
                lineStyle:{
                  width:2//设置线条粗细
                }
              }
            }
            // symbol: "none",
          },
          {
            name:'',
            data:[],
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#f6bb25',
                lineStyle:{
                  width:2//设置线条粗细
                }
              }
            }
            // symbol: "none",
          }
        ]
      }
    }
  },
  watch:{
    data: {//对排行进行深度监听，数据变化试调用接口
      handler() {
        this.dataHandle()
      },
      deep: true,
      immediate: true
    },
  },
  computed:{
    ...mapGetters(
        {
          data:'getTransTendencyData'
        }
    )
  },
  mounted() {
    this.tranReport();
    this.dataHandle();
  },
  methods: {
    dataHandle(){
      const list=this.data.charts;
      var x=[];
      var y1=[];
      var y2=[];
      var moneyUnit='';
      var numUnit='';
      if(utils.isValidate(list)){
        for(let i=0;i<list.length;i++){
          const el=list[i]
          x.push(el.paydate)
          y1.push(el.allmoney)
          y2.push(el.allnum)
        }
      }
      if(this.data.all_money_unit){
        moneyUnit=this.data.all_money_unit
      }
      if(this.data.all_num_unit){
        numUnit=this.data.all_num_unit
      }
      this.lineOption.xAxis.data=x;
      this.lineOption.series[0].data=y1;
      this.lineOption.series[0].name='交易额'+moneyUnit
      this.lineOption.legend.data[0]='交易额'+moneyUnit
      this.lineOption.series[1].data=y2;
      this.lineOption.series[1].name='交易笔数'+numUnit
      this.lineOption.legend.data[1]='交易笔数'+numUnit

      this.$nextTick(()=>{
        this.tranReport();
      })
    },
    tranReport(){
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.lineOption);
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
.message{
  margin: 15px 10px;
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
.trad-layout-null{
  display: flex;
  color: #969696;
  line-height: 236px;
  font-size: 14px;
  justify-content: center;
}
</style>