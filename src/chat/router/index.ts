import BaseMessenger from '@/app/layouts/BaseMessenger.vue'
import ChatIsNotSelected from '@/chat/views/ChatIsNotSelected.vue'
import SidePanel from '@/sidePanel/views/SidePanel.vue'
import ChatList from '@/chatList/views/ChatList.vue'
import BaseChat from '@/chat/layouts/BaseChat.vue'

import type { RouteRecordRaw } from 'vue-router'

export enum RouteName {
  Chat = 'Chat',
  ChatWithId = 'ChatWithId',
}

const routes: RouteRecordRaw[] = [
  {
    path: '/chat',
    component: BaseMessenger,
    props: true,
    children: [
      {
        path: '',
        name: RouteName.Chat,
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
]

export default routes
