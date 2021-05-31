import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      title: 'REITs快速入门经典50题',
    },
  },
  {
    path: '/Study',
    name: 'Study',
    component: () => import(/* webpackChunkName: "about" */ '../views/Study.vue'),
    meta: {
      title: 'REITs快速入门经典50题',
    },
  },
  {
    path: '/Answer',
    name: 'Answer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Answer.vue'),
    meta: {
      title: 'REITs快速入门经典50题',
    },
  },
  {
    path: '/StudyOver',
    name: 'StudyOver',
    component: () => import(/* webpackChunkName: "about" */ '../views/StudyOver.vue'),
    meta: {
      title: 'REITs快速入门经典50题',
    },
  },
  {
    path: '/AnswerOver',
    name: 'AnswerOver',
    component: () => import(/* webpackChunkName: "about" */ '../views/AnswerOver.vue'),
    meta: {
      title: 'REITs快速入门经典50题',
    },
  },
]

const router = new VueRouter({
  // mode: 'history', //去掉url中的#
  routes,
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'REITs快速入门经典50题'
  }

  next()
})
export default router
