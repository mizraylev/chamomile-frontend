import BaseAuth from '../layouts/BaseAuth.vue'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: BaseAuth,
  },
]

export default routes
