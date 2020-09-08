import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/main.vue'),
    redirect: '/main/icon',
    children: [
      {
        path: '/main/icon',
        name: 'Icon',
        component: () => import(/* webpackChunkName: "button" */ '@/views/icon/icon.vue')
      },
      {
        path: '/main/button',
        name: 'Button',
        component: () => import(/* webpackChunkName: "button" */ '@/views/button/button.vue')
      },
      {
        path: '/main/radio',
        name: 'Radio',
        component: () => import(/* webpackChunkName: "radio" */ '@/views/radio/radio.vue')
      },
      {
        path: '/main/checkbox',
        name: 'Checkbox',
        component: () => import(/* webpackChunkName: "checkbox" */ '@/views/checkbox/checkbox.vue')
      },
      {
        path: '/main/input',
        name: 'Input',
        component: () => import(/* webpackChunkName: "input" */ '@/views/input/input.vue')
      },
      {
        path: '/main/switch',
        name: 'Switch',
        component: () => import(/* webpackChunkName: "switch" */ '@/views/switch/switch.vue')
      },
      {
        path: '/main/rate',
        name: 'Rate',
        component: () => import(/* webpackChunkName: "rate" */ '@/views/rate/rate.vue')
      },
      {
        path: '/main/badge',
        name: 'Badge',
        component: () => import(/* webpackChunkName: "badge" */ '@/views/badge/badge.vue')
      },
      {
        path: '/main/select',
        name: 'Select',
        component: () => import(/* webpackChunkName: "select" */ '@/views/select/select.vue')
      },
      {
        path: '/main/pagination',
        name: 'Pagination',
        component: () => import(/* webpackChunkName: "pagination" */ '@/views/pagination/pagination.vue')
      },
      {
        path: '/main/collapse',
        name: 'Collapse',
        component: () => import(/* webpackChunkName: "collapse" */ '@/views/collapse/collapse.vue')
      },
      {
        path: '/main/loading',
        name: 'Loading',
        component: () => import(/* webpackChunkName: "loading" */ '@/views/loading/loading.vue')
      },
      {
        path: '/main/message',
        name: 'Message',
        component: () => import(/* webpackChunkName: "message" */ '@/views/message/message.vue')
      },
      {
        path: '/main/confirm',
        name: 'Confirm',
        component: () => import(/* webpackChunkName: "confirm" */ '@/views/confirm/confirm.vue')
      },
      {
        path: '/main/dialog',
        name: 'Dialog',
        component: () => import(/* webpackChunkName: "dialog" */ '@/views/dialog/dialog.vue')
      },
      {
        path: '/main/popover',
        name: 'Popover',
        component: () => import(/* webpackChunkName: "popover" */ '@/views/popover/popover.vue')
      },
      {
        path: '/main/empty',
        name: 'Empty',
        component: () => import(/* webpackChunkName: "empty" */ '@/views/empty/empty.vue')
      },
      {
        path: '/main/backtop',
        name: 'Backtop',
        component: () => import(/* webpackChunkName: "backtop" */ '@/views/backtop/backtop.vue')
      },
    ]
  },
  // 匹配所以错误页面
  {
    path: '*',
    redirect: '/main/404',
    component: () => import(/* webpackChunkName: "error" */ '@/views/main/main.vue'),
    children: [
      {
        path: '/main/404',
        component: () => import(/* webpackChunkName: "error" */ '@/views/main/404.vue'),
      }
    ],
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
