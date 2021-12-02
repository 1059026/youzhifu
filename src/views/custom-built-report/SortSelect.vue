<!-- 下拉 -->
<template>
  <div :style="{marginTop:appMarginTop}">
    <div class="mask" @touchmove.stop.prevent=""></div>
      <div>
        <div class="liBottomBorder" v-for="(item,index) in sort" :key="index">
          <span class="selectText" @click="selectSubmit(item)">{{item.title}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import utils from "../../util";

export default {
  props:['sort','sortShow'],
  data(){
    return{
      statusBarHeight:'',
      pixelRatio:'',
      appMarginTop:'20px',
    }
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
  },
  methods: {
    selectSubmit(val) {
      this.$emit('sortShow',!this.sortShow);
      this.$store.commit('setSortSelectValue',val)
    },
  },
}
</script>

<style>
.mask{
  position: fixed;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: transparent;
  z-index: 0;
}
  .liBottomBorder{
    height: 35px;
    border-bottom: 1px solid #eef1f4;
    display: flex;
    justify-content: center;
    z-index: 1;
  }
  .selectText{
    padding:0px 10px;
    font-size: 12px;
    line-height: 35px;
    color:#707070;
    z-index: 1;
  }
</style>