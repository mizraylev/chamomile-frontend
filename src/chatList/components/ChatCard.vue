<template>
  <RouterLink :to="chatRoute">
    <div class="chatCard">
      <img v-if="avatarSrc" :src="avatarSrc" alt="Avatar" class="avatar" />

      <div class="avatar initials">
        {{ avatarInitials }}
      </div>

      <div class="cardInfo">
        <div class="row">
          <div class="title">{{ title }}</div>
          <div class="time">{{ lastMessageTime }}</div>
        </div>

        <div class="row">
          <div class="message">{{ message }}</div>
          <BaseChip v-if="unreadCount" :text="String(unreadCount)" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import BaseChip from '@/app/components/BaseChip.vue'

import { computed } from 'vue'
import { RouteName } from '@/chat/router/index'
import { isoToHhMm } from '@/app/utils/time'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  avatarSrc: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  /** Indicates when the last message in the chat was sent in timestamptz format. */
  time: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  unreadCount: {
    type: Number,
    default: 0,
  },
})

const lastMessageTime = computed((): string => {
  if (!props.time) {
    return ''
  }
  return isoToHhMm(props.time)
})

const chatRoute = computed(() => ({
  name: RouteName.ChatWithId,
  params: {
    id: props.id,
  },
}))

const avatarInitials = computed((): string => {
  return props.title
    .split(' ')
    .splice(0, 2) // 2 letters max
    .map((word) => word[0])
    .join('')
})
</script>

<style scoped>
.chatCard {
  padding: var(--spacing-l);
  display: grid;
  gap: var(--spacing-l);
  grid-template-columns: auto 1fr;
  align-items: center;
  user-select: none;
}

.chatCard:hover {
  cursor: pointer;
  background-color: var(--color-background-hover);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.initials {
  background-color: var(--color-background-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardInfo {
  display: flex;
  gap: var(--spacing-xs);
  flex-direction: column;
  overflow: hidden;
}

.row {
  display: flex;
  gap: var(--spacing-s);
}

.title,
.message {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}

.time,
.message {
  color: var(--color-text-secondary);
}
</style>
