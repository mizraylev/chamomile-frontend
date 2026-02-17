import BaseMessenger from '@/app/layouts/BaseMessenger.vue'
import ChatIsNotSelected from '@/chat/views/ChatIsNotSelected.vue'
import BaseChat from '@/chat/layouts/BaseChat.vue'

import type { RouteRecordRaw } from 'vue-router'

export const enum ChatRouteName {
  Chat = 'Chat',
  ChatWithId = 'ChatWithId',
}

const routes: RouteRecordRaw[] = [
  {
    path: '/chat',
    component: BaseMessenger,
    props: (to) => ({ chatList: to.meta.chatList }),
    children: [
      {
        path: '',
        name: ChatRouteName.Chat,
        component: ChatIsNotSelected,
      },
      {
        path: ':id',
        name: ChatRouteName.ChatWithId,
        component: BaseChat,
        props: true,
      },
    ],
  },
]

export default routes
