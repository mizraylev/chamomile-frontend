<template>
  <div class="chat">
    <ChatInfo :currentChat="currentChat" />
    <MessageList :chatId="id" :messageHistory="messages" />
    <MessageEditor :chatId="id" />
  </div>
</template>

<script setup lang="ts">
import ChatInfo from '../views/ChatInfo.vue'
import MessageEditor from '../views/MessageEditor.vue'
import MessageList from '../views/MessageList.vue'

import router from '@/app/router'
import { RouteName } from '../router'
import { computed, onBeforeMount, ref, type PropType } from 'vue'
import { getChatMessages, subscribeToChat } from '@/chat/services'
import { onBeforeRouteUpdate } from 'vue-router'
import { type Message } from '../utils/types'
import { type Chat } from '@/chatList/utils/types'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  chats: {
    type: Object as PropType<Chat[]>,
    required: true,
  },
})

const messages = ref<Message[]>([])

const currentChat = computed((): Chat | undefined => {
  const chat = props.chats.find((chat) => chat.id === props.id)

  if (chat) {
    return chat
  }

  router.replace({
    name: RouteName.Chat,
  })

  return undefined
})

const fetchMessageHistory = async (chatId: string) => {
  const chatMessages = await getChatMessages(chatId)

  if (chatMessages) {
    messages.value = chatMessages
  }
}

const initChat = async (chatId: string): Promise<void> => {
  subscribeToChat(chatId)
  await fetchMessageHistory(chatId)
}

onBeforeMount(async () => {
  await initChat(props.id)
})

onBeforeRouteUpdate(async (to, from, next) => {
  const newChatId = to.params.id as string
  await initChat(newChatId)
  next()
})
</script>

<style scoped>
.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;
}
</style>
