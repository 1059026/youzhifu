<template>
  <van-collapse v-model="activeNames" @change="test(propsItem)">
    <van-list v-for="(item,index) in orgList" finished-text="没有更多了">
      <van-collapse-item :title="`${item.orgName}+${index}`" :name="index" icon="idcard" v-if="item.orgList&&item.orgList.length>0">
        <RecursiveOrgList :propsItem="item.orgList[index]" :orgIndex="index" :changeTabs="changeTabs" v-if="item.orgList&&item.orgList.length>0" :orgList="item.orgList"></RecursiveOrgList>
      </van-collapse-item>
      <van-cell v-else :title="item.orgName" @click="handleClick(item)" />
    </van-list>
  </van-collapse>
</template>
<script>
import RecursiveOrgList from "@/components/RecursiveOrgList";
import { Collapse, CollapseItem, List,Cell} from 'vant';
import Vue from "vue";

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(List);
Vue.use(Cell);
export default {
  data() {
    return {
      activeNames: [0]
    };
  },
  components: {RecursiveOrgList},
  name: 'RecursiveOrgList',
  props: {
    orgList:Array,
    changeTabs:{type:Function,default:null},
    propsItem:{},
    orgIndex:Number
  },
  methods: {
    handleClick(item){
      this.$store.dispatch('setOrgObjDo', {orgName:item.orgName,orgid:item.orgid,page:false});
      this.$nextTick(()=>{
        this.changeTabs();
      });
    },
    test(propsItem){
      console.log(this.orgList)
      console.log(propsItem)
      console.log(this.orgIndex)
    }
  },
  created() {
  }
}
</script>
<style scopd>
.van-collapse-item__content {
  padding-right: 0px!important;
  padding-top: 0px!important;
}
</style>