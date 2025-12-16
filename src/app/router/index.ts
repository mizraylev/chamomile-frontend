import { createRouter, createWebHistory } from 'vue-router'

import BaseMessenger from '@/app/layouts/BaseMessenger.vue'
import ChatIsNotSelected from '@/chat/views/ChatIsNotSelected.vue'
import SidePanel from '@/sidePanel/views/SidePanel.vue'
import ChatList from '@/chatList/views/ChatList.vue'
import BaseChat from '@/chat/layouts/BaseChat.vue'

export enum RouteName {
  ChatWithId = 'ChatWithId',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: HomePage,
    // },
    {
      path: '/chat',
      component: BaseMessenger,
      props: true,
      children: [
        {
          path: '',
          components: {
            panel: SidePanel,
            chats: ChatList,
            chat: ChatIsNotSelected,
          },
        },
        {
          path: ':id',
          name: RouteName.ChatWithId,
          components: {
            panel: SidePanel,
            chats: ChatList,
            chat: BaseChat,
          },
        },
      ],
    },
  ],
})

export default router
