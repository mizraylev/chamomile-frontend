<template>
  <div class="chat">
    <ChatInfo />
    <MessageList />
    <MessageEditor />
  </div>
</template>

<script setup lang="ts">
import ChatInfo from '../views/ChatInfo.vue'
import MessageEditor from '../views/MessageEditor.vue'
import MessageList from '../views/MessageList.vue'
</script>

<style scoped>
.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;
}
</style>
