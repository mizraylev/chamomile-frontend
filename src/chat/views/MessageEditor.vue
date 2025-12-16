<template>
  <div class="chatInfoContainer">
    <BaseButton background="transparent">
      <template #icon>
        <img src="../assets/images/icons/paperclip.svg" alt="Call" />
      </template>
    </BaseButton>

    <BaseInput placeholder="Message" />

    <div class="buttons">
      <BaseButton background="transparent">
        <template #icon>
          <img src="../assets/images/icons/smile.svg" alt="Call" />
        </template>
      </BaseButton>

      <BaseButton background="transparent">
        <template #icon>
          <img src="@/app/assets/images/icons/send.svg" alt="More" />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/app/components/BaseButton.vue'
import BaseInput from '@/app/components/BaseInput.vue'
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
