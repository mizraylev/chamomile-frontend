<template>
  <div class="chatInfoContainer">
    <BaseButton background="transparent" class="goBack" @click="openChats">
      <template #icon>
        <img src="../assets/images/icons/arrow-back.svg" alt="Open chats" />
      </template>
    </BaseButton>

    <div class="chatInfo">
      <div class="title">{{ currentChat?.companionNickname }}</div>
      <div class="status">
        <Transition name="fade" mode="out-in">
          <TypingActivity v-if="isTyping" />

          <div v-else-if="lastSeen" class="lastSeen">
            {{ lastSeen }}
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

import { computed, ref } from 'vue'
import { toFormattedLastSeen } from '@/app/utils/time'
import { socket } from '../services'
import { useRouter } from 'vue-router'
import { type Chat } from '@/chatList/utils/types'
import { type GetTypingStatus } from '../utils/types'
import { ChatRouteName } from '../router'

const props = defineProps<{
  currentChat?: Chat
}>()

const router = useRouter()

const isTyping = ref(false)

socket.on('typing', (typing: GetTypingStatus) => {
  if (typing.chatId === props.currentChat?.id) {
    isTyping.value = typing.isTyping
  }
})

const lastSeen = computed((): string => {
  const timestamp = props.currentChat?.companionLastSeen
  return timestamp ? toFormattedLastSeen(timestamp) : ''
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
