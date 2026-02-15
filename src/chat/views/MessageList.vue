<template>
  <div class="messageListWrapper" ref="messageList">
    <div class="messageList">
      <BaseMessage
        v-for="message in messages"
        environment="direct"
        :key="isLoadingMessage(message) ? message.messageKey : message.messageId"
        :isMine="message.authorId === authStore.userId"
        :message="message"
      />
    </div>
    <div class="bottom" ref="bottomLine"></div>
  </div>
</template>

<script setup lang="ts">
import BaseMessage from '../components/BaseMessage.vue'

import { ref, nextTick } from 'vue'
import { isLoadingMessage, type LoadingMessage, type Message } from '../utils/types'
import { useAuthStore } from '@/auth/stores'

defineProps<{
  messages: (Message | LoadingMessage)[]
}>()

const authStore = useAuthStore()

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

/** Scrolls to the bottom of the new message if the scrollbar was at the bottom of the message list just before it was added. */
const handleNewMessageScroll = () => {
  if (isMessageListScrolledToBottom()) {
    scrollToBottom({ behavior: 'smooth' })
  }
}

defineExpose({
  scrollToBottom,
  handleNewMessageScroll,
})
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
