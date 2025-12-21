<template>
  <div class="messageListWrapper" ref="messageList">
    <div class="messageList">
      <BaseMessage
        v-for="message in messages"
        environment="direct"
        :key="message.messageId"
        :isMine="message.authorId === authStore.userId"
        :message="message"
      />
    </div>
    <div class="bottom" ref="bottomLine"></div>
  </div>
</template>

<script setup lang="ts">
import BaseMessage from '../components/BaseMessage.vue'

import { ref, watch, type PropType, nextTick } from 'vue'
import { socket, toClientMessage } from '../services'
import { type Message, type NewMessage } from '../utils/types'
import { useAuthStore } from '@/auth/stores'

const props = defineProps({
  chatId: {
    type: String,
    required: true,
  },
  messageHistory: {
    type: Object as PropType<Message[]>,
    required: true,
  },
})

const authStore = useAuthStore()
const messages = ref<Message[]>([])
const messageList = ref<HTMLElement | null>(null)
const bottomLine = ref<HTMLElement | null>(null)

const isMessageListScrolledToBottom = (): boolean => {
  if (!messageList.value) {
    return false
  }

  return (
    Math.ceil(messageList.value.scrollHeight - messageList.value.scrollTop) ===
    messageList.value.clientHeight
  )
}

const scrollToBottom = (options?: ScrollIntoViewOptions) => {
  nextTick(() => {
    bottomLine.value?.scrollIntoView(options)
  })
}

socket.on('newMessage', (msg: NewMessage) => {
  if (msg.chat.id === props.chatId) {
    messages.value.push(toClientMessage(msg))

    if (isMessageListScrolledToBottom()) {
      scrollToBottom({ behavior: 'smooth' })
    }
  }
})

watch(
  () => props.messageHistory,
  (newMessageHistory) => {
    messages.value = newMessageHistory
    scrollToBottom()
  },
  { immediate: true },
)
</script>

<style scoped>
.messageListWrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-gutter: stable;
  display: grid;
  background-size: cover;
  background-position: center;
}

.messageList {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--spacing-s);
  padding: var(--spacing-xl) calc(var(--spacing-xl) - var(--scrollbar-width))
    var(--spacing-xl) var(--spacing-xl);
  height: 100%;
}
</style>
