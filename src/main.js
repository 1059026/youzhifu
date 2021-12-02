import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/base.css';
import '@/assets/css/global.css';
import '@/assets/css/hairline.css';
import '@/assets/css/animate.css';
import '@/assets/css/buttons.css';
import util from './util'
import VueJsonp from 'vue-jsonp'
import * as echarts from 'echarts';
import store from '@/store/index';
// 使用vant UI组件 （按需加载）（移动端）
import 'vant/lib/index.css';
import { Button } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';

/* 路由拦截 */
import '@/utils/web_permission.js'
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.config.productionTip = false
Vue.prototype.$util = util
Vue.prototype.$dataUrl = process.env.VUE_APP_DATA_URL
Vue.prototype.$echarts = echarts
Vue.use(VueJsonp)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
