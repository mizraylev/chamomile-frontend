<template>
  <div class="chat">
    <ChatInfo />
    <MessageList />
    <MessageEditor @addMessage="addMessage" />
  </div>
</template>

<script setup lang="ts">
import ChatInfo from '../views/ChatInfo.vue'
import MessageEditor from '../views/MessageEditor.vue'
import MessageList from '../views/MessageList.vue'

import { useChatStore } from '../stores'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { addMessage, onChatOpened } = chatStore
const { currentChat } = storeToRefs(chatStore)

onMounted(() => {
  if (!currentChat.value?.wasHistoryFetched) {
    onChatOpened()
  }
})
</script>

<style scoped>
.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;
}
</style>
