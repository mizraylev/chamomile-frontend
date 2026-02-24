<template>
  <div class="sidebar">
    <div class="search">
      <ChatSearch />
    </div>

    <TransitionGroup name="list" tag="div" class="chatList">
      <ChatCard
        v-for="chat in chatList"
        :key="chat.id"
        :id="chat.id"
        :title="chat.name"
        :time="chat.lastMessage.timestamp"
        :message="chat.lastMessage.content"
        :isOnline="isDirectChatListItem(chat) ? chat.isOnline : false"
        :isTyping="isDirectChatListItem(chat) ? chat.isTyping : false"
        :unreadCount="isDirectChatListItem(chat) ? chat.unreadCount : 0"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import ChatCard from '../components/ChatCard.vue'
import ChatSearch from '../components/ChatSearch.vue'

import { isDirectChatListItem } from '../utils/types'
import { useChatStore } from '@/chat/stores'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { chatList } = storeToRefs(chatStore)
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
}

.search {
  padding: var(--spacing-l);
}

.list-move {
  transition: transform 0.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  position: absolute;
}
</style>
