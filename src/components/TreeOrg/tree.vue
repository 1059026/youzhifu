<template>
  <div class="tree-menu">
    <ul v-for="item in orgList">
      <c-tree-item :orgList="item"></c-tree-item>
    </ul>
  </div>
</template>

<script>


import cTreeItem from './tree-item'

export default {
  props: {
    orgList: Array,
  },
  mounted() {
    console.log(this.orgList)
  },
  components: {
    cTreeItem
  }
}
</script>