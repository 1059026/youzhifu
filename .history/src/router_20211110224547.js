import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: "定制报表"
      },
      name: 'customBuiltReport',
      component: () => import('./views/custom-built-report/layout.vue')
    },
    {
      path: '/customBuiltReport',
      meta: {
        title: "定制报表"
      },
      name: 'customBuiltReport',
      component: () => import('./views/custom-built-report/layout.vue')
    },
    {
      path: '/dataDetail',
      meta: {
        title: "全量数据"
      },
      name: 'dataDetail',
      component: () => import('./views/custom-built-report/DataDetail.vue')
    },
    {
      path: '/mchtList',
      meta: {
        title: "商户列表"
      },
      name: 'mchtList',
      component: () => import('./views/custom-built-report/MchtList.vue')
    },
    {
      path: '/wisdom',
      component: () => import('./views/wisdom'),
      children: [
        {
          path: 'toExamineList',
          meta: {
            title: '项目审核'
          },
          name: 'toExamineList',
          component: () => import('./views/wisdom/to-examine-list')
        },
        {
          path: 'toExamineDetail',
          meta: {
            title: '项目审核'
          },
          name: 'toExamineDetail',
          component: () => import('./views/wisdom/to-examine-detail')
        },
        {
          path: 'projectStatistics',
          meta: {
            title: '项目统计'
          },
          name: 'projectStatostics',
          component: () => import('./views/wisdom/project-statistics')
        },
        {
          path: 'precipitationFund',
          meta: {
            title: '沉淀资金'
          },
          name: 'precipitationFund',
          component: () => import('./views/wisdom/precipitation-fund')
        },
        {
          path: 'peopleNum',
          meta: {
            title: '获客人数'
          },
          name: 'peopleNum',
          component: () => import('./views/wisdom/peopleNum')
        },
        {
          path: 'service-charge',
          meta: {
            title: '手续费收入'
          },
          name: 'service-charge',
          component: () => import('./views/wisdom/service-charge')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => { //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) { //判断是否有标题
    document.title = to.meta.title
  }
  next() //执行进入路由，如果不写就不会进入目标页
})

export default router
