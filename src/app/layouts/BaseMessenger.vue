<template>
  <div
    class="messengerLayout"
    :class="{ chatIsSelected: route.name === ChatRouteName.ChatWithId }"
  >
    <div class="panel">
      <SidePanel />
    </div>
    <div class="chats">
      <ChatList :chats="chats" />
    </div>
    <div class="chat">
      <RouterView :chats="chats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatList from '@/chatList/views/ChatList.vue'
import SidePanel from '@/sidePanel/views/SidePanel.vue'

import { getChats } from '@/chatList/services'
import { ref, type PropType } from 'vue'
import { type Chat } from '@/chatList/utils/types'
import { connectSocket, socket } from '@/chat/services'
import { useRoute } from 'vue-router'
import { ChatRouteName } from '@/chat/router'
import type { GetTypingStatus, GetUserPresenceStatus } from '@/chat/utils/types'

const props = defineProps({
  chatList: {
    type: Object as PropType<Chat[]>,
    required: true,
    default: [] as Chat[],
  },
})

const route = useRoute()

const chats = ref<Chat[]>(props.chatList)

defineOptions({
  async beforeRouteEnter(to, from, next) {
    const chatList = await getChats()
    to.meta.chatList = chatList
    connectSocket()
    next()
  },
})

socket.on('typing', (typing: GetTypingStatus) => {
  const chat = chats.value.find((chat) => chat.id === typing.chatId)
  if (!chat) return

  chat.isTyping = typing.isTyping
})

socket.on('user:presence_changed', (presence: GetUserPresenceStatus) => {
  const chat = chats.value.find((chat) => chat.id === presence.chatId)
  if (!chat) return

  chat.isOnline = presence.isOnline
  if (presence.lastSeen) {
    chat.companionLastSeen = presence.lastSeen
  }
})
</script>

<style scoped lang="scss">
.messengerLayout {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  max-height: 100vh;
  max-height: 100dvh;
  padding: var(--spacing-xl);

  & > * {
    background-color: var(--color-background-secondary);
    border-radius: var(--border-radius-l);
  }
}

.panel {
  max-width: 70px;
  height: fit-content;
}

.chats {
  max-width: 540px;
  width: calc((1 / 4) * 100%);
}

.chat {
  max-width: 856px;
  width: calc((3 / 4) * 100%);
}

@media screen and (max-width: 800px) {
  .panel {
    display: none;
  }

  .messengerLayout {
    padding: 0;

    & > * {
      border-radius: 0;
    }

    &:not(.chatIsSelected) {
      & > .chat {
        display: none;
      }

      & > .chats {
        width: 100%;
        max-width: none;
      }
    }

    &.chatIsSelected {
      & > .chat {
        width: 100%;
      }

      & > .chats {
        display: none;
      }
    }
  }
}
</style>
