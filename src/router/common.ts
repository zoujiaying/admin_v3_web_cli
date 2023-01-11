import { RouteRecordRaw } from 'vue-router'

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Redirect',
    component: () => import('@/views/Redirect.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/403',
    component: () => import('@/views/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  },
]

export default commonRoutes
