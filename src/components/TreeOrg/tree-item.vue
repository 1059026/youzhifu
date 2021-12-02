<template>
  <li>
    <span v-if="hasChild">
      <van-icon @click="toggle(orgList)" class="icon" :name="orgList.openFlag?'arrow-down':'arrow'"/>
      <span v-if="item&&item.flag" @click="handleClick(item)">{{item.simple_name}}</span>
      <span v-else @click="handleClick(orgList)">{{ orgList.simple_name }}</span>
    </span>
    <div v-else class="title-name" @click="handleClick(orgList)">{{ orgList.simple_name }}</div>
    <ul v-show="orgList.openFlag" v-if="hasChild">
      <tree-item :item="item" v-for="(item, index) in orgList.child" :orgList="item" :key="index"></tree-item>
    </ul>
  </li>
</template>

<script>
import {Icon} from 'vant';
import Vue from "vue";

Vue.use(Icon);
export default {
  name: 'TreeItem',
  props: {
    orgList: [Object, Array],
    item:Object
  },
  data() {
    return {
      open:true
    }
  },
  computed: {

    hasChild() {
      return this.orgList.child && this.orgList.child.length > 0
    }
  },
  methods: {
    toggle(item) {
      this.$set(item,'openFlag',!item.openFlag)
      this.$forceUpdate();
    },
    handleClick(item){
      console.log(this.orgList.openFlag)
      this.$store.dispatch('setOrgListDo', {simple_name:item.simple_name,level:item.level,code:item.code,page:false});
    }
  }
}
</script>

<style>
ul {
  list-style: none;
  margin: 2px 0;
}

li {
  /*border-bottom: 1px solid #ebedf0;*/
  padding-left: 6px;
}

li > span {
  cursor: pointer;
  font-size: 14px;
  line-height: 14px;
}

li > span:visited {
  background: #fff;
}

.icon {
  display: inline-block;
  width: 2px; margin-left: -6px; padding-right: 14px;
  height: 14px;
  vertical-align: middle;
  font-size: 14px;
}

.title-name {
  padding-left: 20px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  /*border-bottom: 1px solid #ebedf0;*/
}

.tree-menu li {
  line-height: 14px;
}
</style>