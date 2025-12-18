import { createRouter, createWebHistory } from 'vue-router'

import chatRoutes from '@/chat/router'
import authRoutes from '@/auth/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...chatRoutes, ...authRoutes],
})

export default router
