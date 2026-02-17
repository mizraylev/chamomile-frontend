import BaseAuth from '../layouts/BaseAuth.vue'

import type { RouteRecordRaw } from 'vue-router'

export const enum AuthRouteName {
  Login = 'Login',
}

const routes: RouteRecordRaw[] = [
  {
    name: AuthRouteName.Login,
    path: '/login',
    component: BaseAuth,
  },
]

export default routes
