<template>
  <div class="chatInfoContainer">
    <BaseButton background="transparent">
      <template #icon>
        <img src="../assets/images/icons/paperclip.svg" alt="Add files" />
      </template>
    </BaseButton>

    <BaseInput
      placeholder="Message"
      :value="message"
      @input="onInput"
      @keyup.enter="send"
    />

    <div class="buttons">
      <BaseButton background="transparent">
        <template #icon>
          <img src="../assets/images/icons/smile.svg" alt="Select emoji" />
        </template>
      </BaseButton>

      <BaseButton background="transparent" @click="send">
        <template #icon>
          <img src="@/app/assets/images/icons/send.svg" alt="Send the message" />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/app/components/BaseButton.vue'
import BaseInput from '@/app/components/BaseInput.vue'

import { ref } from 'vue'
import { sendMessage, sendTypingStatus } from '../services'
import { debounce } from '@/app/utils/debounce'
import { MessageStatus, type LoadingMessage } from '../utils/types'
import { useAuthStore } from '@/auth/stores'
import { useChatStore } from '../stores'
import { storeToRefs } from 'pinia'

const emit = defineEmits<{
  addMessage: [message: LoadingMessage]
}>()

const authStore = useAuthStore()
const { currentChatId } = storeToRefs(useChatStore())

const counter = ref(0)
const message = ref('')
const isTyping = ref(false)

const setTyping = (value: boolean) => {
  isTyping.value = value
  sendTypingStatus(value, currentChatId.value)
}

const debouncedFinishTyping = debounce(() => setTyping(false), 1500)

const onInput = (value: string) => {
  message.value = value

  if (!isTyping.value) {
    setTyping(true)
  }

  debouncedFinishTyping()
}

const send = () => {
  const readyMessage = message.value.trim()
  if (readyMessage) {
    const messageKey = String(counter.value)

    emit('addMessage', {
      authorId: authStore.userId,
      messageKey,
      text: readyMessage,
      status: MessageStatus.Loading,
    })

    sendMessage(readyMessage, messageKey, currentChatId.value)

    counter.value++
    message.value = ''
  }
}
</script>

<style scoped>
.chatInfoContainer {
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: var(--spacing-m);
  align-items: center;
}

.chatInfo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
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
}
</style>
