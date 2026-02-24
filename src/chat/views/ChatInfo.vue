<template>
  <div class="chatInfoContainer">
    <BaseButton background="transparent" class="goBack" @click="openChats">
      <template #icon>
        <img src="../assets/images/icons/arrow-back.svg" alt="Open chats" />
      </template>
    </BaseButton>

    <div class="chatInfo">
      <div class="title">{{ currentChat?.name }}</div>
      <div class="status">
        <Transition name="fade" mode="out-in">
          <TypingActivity v-if="isTyping" />

          <div v-else-if="isOnline">Online</div>

          <div v-else-if="lastSeenLabel" class="lastSeen">
            {{ lastSeenLabel }}
          </div>
        </Transition>
      </div>
    </div>

    <div class="buttons">
      <BaseButton background="transparent">
        <template #icon>
          <img src="../assets/images/icons/phone.svg" alt="Call" />
        </template>
      </BaseButton>

      <BaseButton background="transparent">
        <template #icon>
          <img src="../assets/images/icons/more-vertical.svg" alt="More" />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/app/components/BaseButton.vue'
import TypingActivity from '../components/TypingActivity.vue'

import useTimeAgo from '../composables/useTimeAgo'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChatRouteName } from '../router'
import { useChatStore } from '../stores'
import { storeToRefs } from 'pinia'
import { isDirectChat } from '../utils/types'

const router = useRouter()

const { currentChat } = storeToRefs(useChatStore())

const { timeAgoLabel: lastSeenLabel } = useTimeAgo(
  () => (isDirectChat(currentChat.value) ? currentChat.value?.lastSeen : ''),
  'en',
  (timeAgo: string) => 'Last seen ' + timeAgo,
)

const isTyping = computed((): boolean => {
  return isDirectChat(currentChat.value) ? currentChat.value.isTyping : false
})

const isOnline = computed((): boolean => {
  return isDirectChat(currentChat.value) ? currentChat.value.isOnline : false
})

const openChats = () => {
  router.push({
    name: ChatRouteName.Chat,
  })
}
</script>

<style scoped lang="scss">
.chatInfoContainer {
  display: flex;
  gap: var(--spacing-s);
  padding: var(--spacing-l) var(--spacing-m) var(--spacing-l) var(--spacing-xl);
  min-width: 0;
}

.chatInfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  justify-content: center;
  min-width: 0;
}

.title {
  color: var(--color-text-primary);
}

.status {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
  height: 1rem;
}

.title,
.lastSeen {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.buttons {
  display: flex;
  gap: var(--spacing-s);
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.goBack {
  display: none;
}

@media screen and (max-width: 800px) {
  .goBack {
    display: block;
  }

  .chatInfoContainer {
    padding-left: var(--spacing-m);
  }
}
</style>
