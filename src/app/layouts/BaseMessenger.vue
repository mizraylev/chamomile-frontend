<template>
  <div class="messengerLayout">
    <div class="panel">
      <RouterView name="panel" />
    </div>
    <div class="chats">
      <RouterView name="chats" />
    </div>
    <div class="chat">
      <RouterView name="chat" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.messengerLayout {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  max-height: 100vh;
  padding: var(--spacing-xl);
}

.messengerLayout > * {
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-l);
}

.panel {
  max-width: 70px;
  height: fit-content;
}

.chats {
  max-width: 540px;
  width: calc((1 / 4) * 100%);
}

.chat {
  max-width: 856px;
  width: calc((3 / 4) * 100%);
}
</style>
