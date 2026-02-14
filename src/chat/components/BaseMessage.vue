<template>
  <div class="messageContainer" :class="{ mine: isMine }">
    <div class="message">
      <span class="text">{{ message.text }}</span>
      <div class="info">
        <span class="time">{{ time }}</span>
        <img v-if="isMine && statusSrc" alt="Status" class="status" :src="statusSrc" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MessageStatus, type Message } from '../utils/types'
import { isoToHhMm } from '../../app/utils/time'

const props = defineProps<{
  message: Message
  isMine: boolean
}>()

const STATUS_TO_ICON_NAME: Record<MessageStatus, string> = {
  [MessageStatus.Loading]: 'clock.svg',
  [MessageStatus.Unseen]: 'sent.svg',
  [MessageStatus.Seen]: 'seen.svg',
}

const time = computed(() => isoToHhMm(props.message.datetime))

const statusSrc = computed((): string | null => {
  const iconName = STATUS_TO_ICON_NAME[props.message.status]
  if (!iconName) return null

  return new URL(`../assets/images/icons/${iconName}`, import.meta.url).href
})
</script>

<style scoped>
.messageContainer {
  display: flex;
}

.mine {
  justify-content: flex-end;
}

.mine .message {
  background-color: #1d1a23;
  margin-left: var(--spacing-l);
}

.messageContainer:not(.mine) .message {
  background-color: #1e1c26;
  margin-right: var(--spacing-l);
}

.message {
  max-width: 360px;
  float: left;
  border-radius: var(--border-radius-m);
  padding: var(--spacing-s) var(--spacing-m);
  position: relative;
}

.text {
  line-height: var(--line-height-xl);
  word-wrap: break-word;
  white-space: pre-wrap;
}

.info {
  float: right;
  margin-left: var(--spacing-s);
  display: inline-flex;
  align-items: flex-end;
  gap: var(--spacing-xs);
  height: var(--line-height-xl);
}

.time {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.status {
  user-select: none;
  width: 16px;
  height: 16px;
}
</style>
