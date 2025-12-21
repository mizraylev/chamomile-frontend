<template>
  <div class="chatInfoContainer">
    <div class="chatInfo">
      <div class="title">{{ currentChat?.companionNickname }}</div>
      <div class="status" v-if="currentChat?.companionLastSeen">
        {{ lastSeen }}
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

import { computed, type PropType } from 'vue'
import { toFormattedLastSeen } from '@/app/utils/time'
import { type Chat } from '@/chatList/utils/types'

const props = defineProps({
  currentChat: {
    type: Object as PropType<Chat>,
  },
})

const lastSeen = computed((): string => {
  const timestamp = props.currentChat?.companionLastSeen
  return timestamp ? toFormattedLastSeen(timestamp) : ''
})
</script>

<style scoped>
.chatInfoContainer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-s);
  padding: var(--spacing-l) var(--spacing-m) var(--spacing-l) var(--spacing-xl);
}

.chatInfo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  justify-content: center;
}

.title {
  color: var(--color-text-primary);
}

.status {
  font-size: var(--font-size-s);
  color: var(--color-text-secondary);
}

.buttons {
  display: flex;
  gap: var(--spacing-s);
  align-items: center;
}
</style>
