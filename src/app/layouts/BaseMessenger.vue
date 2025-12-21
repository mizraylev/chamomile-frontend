<template>
  <div class="messengerLayout">
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
import { connectSocket } from '@/chat/services'

const props = defineProps({
  chatList: {
    type: Object as PropType<Chat[]>,
    required: true,
    default: [] as Chat[],
  },
})

const chats = ref<Chat[]>(props.chatList)

defineOptions({
  async beforeRouteEnter(to, from, next) {
    const chatList = await getChats()
    to.meta.chatList = chatList
    connectSocket()
    next()
  },
})
</script>

<style scoped>
.messengerLayout {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  max-height: 100vh;
  padding: var(--spacing-xl);
}

.messengerLayout > * {
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-l);
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
</style>
