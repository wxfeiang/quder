import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      title: '主页',
    },
  },
  {
    path: '/Study',
    name: 'Study',
    component: () => import(/* webpackChunkName: "about" */ '../views/Study.vue'),
    meta: {
      title: '学习模式',
    },
  },
  {
    path: '/Answer',
    name: 'Answer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Answer.vue'),
    meta: {
      title: '答题模式',
    },
  },
  {
    path: '/StudyOver',
    name: 'StudyOver',
    component: () => import(/* webpackChunkName: "about" */ '../views/StudyOver.vue'),
    meta: {
      title: '答题结束',
    },
  },
]

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})
export default router
