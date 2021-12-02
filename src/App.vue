<template>
  <div id="app">
    <loading v-show="loading"></loading>
    <router-view/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Loading from './views/custom-built-report/loading.vue'
export default {
  computed:{
    ...mapGetters(
        {
          loading:'getLoading',
        }
    )
  },
  name: 'App',
  components: {Loading},
}
</script>
<style>
#app {
  height: 100%;
}
</style>
