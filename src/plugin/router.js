import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/user/reg'
  },
  {
    path: '/area', name: 'area',
    component: () => import(/* webpackChunkName: "area" */ '../components/area')
  },
  {
    path: '/user/reg', name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user')
  },
  {
    path: '/user/chats', name: 'chatsuser',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/chats')
  },
  {
    path: '/download', name: 'download',
    component: () => import(/* webpackChunkName: "download" */ '../views/download')
  },
  {
    path: '/chats', name: 'chats',
    component: () => import(/* webpackChunkName: "download" */ '../views/chats')
  },
  {
    path: '*', name: '404', redirect: '/user/reg',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
