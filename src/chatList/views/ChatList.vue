<template>
  <div class="sidebar">
    <div class="search">
      <ChatSearch />
    </div>

    <div class="chatList">
      <ChatCard
        v-for="chat in chats"
        :key="chat.id"
        :id="chat.id"
        :title="chat.companionNickname"
        :time="chat.lastMessageTimestamp"
        :message="chat.lastMessageContent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatCard from '../components/ChatCard.vue'
import ChatSearch from '../components/ChatSearch.vue'

import { type PropType } from 'vue'
import { type Chat } from '../utils/types'

defineProps({
  chats: {
    type: Object as PropType<Chat[]>,
    required: true,
  },
})
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
}

.search {
  padding: var(--spacing-l);
}
</style>
