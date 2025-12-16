<template>
  <div class="sidebar">
    <div class="search">
      <ChatSearch />
    </div>

    <div class="chatList">
      <ChatCard
        id="1"
        title="Cat"
        time="22:37"
        message="Hi! How's it going?"
        :unreadCount="1"
      />
      <ChatCard id="2" title="Kitty" time="22:37" message="What's up?" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatCard from '../components/ChatCard.vue'
import ChatSearch from '../components/ChatSearch.vue'
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
}

.search {
  padding: var(--spacing-l);
}
</style>
