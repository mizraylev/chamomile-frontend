<template>
  <div class="messageListWrapper">
    <div class="messageList">
      <BaseMessage
        v-for="message in messages"
        environment="direct"
        :key="message.messageId"
        :isMine="message.authorId === MOCK_USER_ID"
        :message="message"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseMessage from '../components/BaseMessage.vue'

import { ref } from 'vue'
import { exampleMessages } from '../utils/mock'

const MOCK_USER_ID = 'me'
const messages = ref(exampleMessages)
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
