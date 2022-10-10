import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import QuotationsView from '../views/QuotationsView/QuotationsView.vue'
import MusicView from '../views/MusicView/MusicView.vue'
import DynamicView from '../views/DynamicView/DynamicView.vue'
import UserView from '../views/UserView/UserView.vue'

Vue.use(VueRouter)

const routes = [
    {
        // 使用动态路由获取当前日期
        path: '/home',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/quotations',
        name: 'quotations',
        component: QuotationsView
    },
    {
        path: '/music',
        name: 'music',
        component: MusicView
    },
    {
        path: '/dynamic',
        name: 'dynamic',
        component: DynamicView
    },
    {
        path: '/user',
        name: 'user',
        component: UserView
    }, 
    {
        path: '/',
        redirect: '/home'  //默认显示
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

/*
// 开启全局路由守卫,监听路由的每次跳转.防止在未登录的情况下访问需要登录的路由
// 需要登录的网址名单
const needLoginRoute = ['discover', 'serialize']
// 每次页面路由跳转,都查询是否已经登录,没登录的跳转至登录页面
router.beforeEach((to, f, next) => {
  // 已经登录所有页面都可以放访问
  if (localStorage.token) {
    next()
  } else {
    let index = needLoginRoute.findIndex(n => n == to.name)

    console.log(to.name);

    if (index != -1) { // 此路由需登录才可以访问
      // ...
      // 未登录 重定向到登录页面
      next({ path: '/login' })
    }

    console.log('可以访问');
    next()
  }
})
*/

export default router
