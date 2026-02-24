<template>
  <div
    class="messengerLayout"
    :class="{ chatIsSelected: route.name === ChatRouteName.ChatWithId }"
  >
    <div class="panel">
      <SidePanel />
    </div>
    <div class="chats">
      <ChatList />
    </div>
    <div class="chat">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatList from '@/chatList/views/ChatList.vue'
import SidePanel from '@/sidePanel/views/SidePanel.vue'

import { connectSocket } from '@/chat/services'
import { useRoute } from 'vue-router'
import { ChatRouteName } from '@/chat/router'
import { useChatStore } from '@/chat/stores'

connectSocket()

const route = useRoute()

const { loadChats } = useChatStore()
loadChats()
</script>

<style scoped lang="scss">
.messengerLayout {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  max-height: 100vh;
  max-height: 100dvh;
  padding: var(--spacing-xl);

  & > * {
    background-color: var(--color-background-secondary);
    border-radius: var(--border-radius-l);
  }
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

@media screen and (max-width: 800px) {
  .panel {
    display: none;
  }

  .messengerLayout {
    padding: 0;

    & > * {
      border-radius: 0;
    }

    &:not(.chatIsSelected) {
      & > .chat {
        display: none;
      }

      & > .chats {
        width: 100%;
        max-width: none;
      }
    }

    &.chatIsSelected {
      & > .chat {
        width: 100%;
      }

      & > .chats {
        display: none;
      }
    }
  }
}
</style>
