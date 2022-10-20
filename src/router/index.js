import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import QuotationsView from '../views/QuotationsView/QuotationsView.vue'
import MusicView from '../views/MusicView/MusicView.vue'
import DynamicView from '../views/DynamicView/DynamicView.vue'
import UserView from '../views/UserView/UserView.vue'

Vue.use(VueRouter)

const routes = [
  // 自动重定向
  {
    path: '',
    redirect: "/home"
  },
  {
    path: '/',
    redirect: '/home'  //默认显示
  },
  {
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
    component: MusicView,
    children: [
      {
        path: 'musicradio',
        name: 'musicradio',
        component: () => import("../views/MusicView/MusicRadioView.vue"),
      },
      {
        path: 'readingtime',
        name: 'readingtime',
        component: () => import("../views/MusicView/ReadingTimeView.vue"),
        children: [
          {
            path: 'readingtimeItem',
            name: 'readingtimeItem',
            component: () => import("../views/MusicView/ReadingTimeItemView.vue"),
          }
        ]
      },
    ]
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: DynamicView,
    children: [
      {
        path: 'dynamicdetails',
        name: 'dynamicdetails',
        component: () => import("../views/DynamicView/DynamicDetailsView.vue"),
      },
      {
        path: 'dynamicmonologue',
        name: 'dynamicmonologue',
        component: () => import("../views/DynamicView/DynamicMonologueView.vue"),
      },
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    children: [
      {
        path: 'useragreement',
        name: 'useragreement',
        component: () => import("../views/UserView/UserAgreementView.vue"),
      },
      {
        path: 'userlogin',
        name: 'userlogin',
        component: () => import("../views/UserView/UserLoginView.vue"),
      },
    ]
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import("../views/HomeView/NotesView.vue"),
  },
  {
    path: '/mail',
    name: 'mail',
    component: () => import("../views/HomeView/MailView.vue"),
    children: [
      {
        path: 'creation',
        name: 'creation',
        component: () => import("../views/HomeView/CreationView.vue"),
      }
    ]
  },
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
