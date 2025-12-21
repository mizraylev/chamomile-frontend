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
import { sendMessage } from '../services'

const props = defineProps({
  chatId: {
    type: String,
    required: true,
  },
})

const message = ref('')

const onInput = (value: string) => {
  message.value = value
}

const send = () => {
  const readyMessage = message.value.trim()
  if (readyMessage) {
    sendMessage(readyMessage, props.chatId)
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
