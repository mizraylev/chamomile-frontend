<template>
  <div class="chat">
    <ChatInfo :currentChat="currentChat" />
    <MessageList :messages="messages" ref="messageList" />
    <MessageEditor :chatId="id" @addMessage="onNewMessage" />
  </div>
</template>

<script setup lang="ts">
import ChatInfo from '../views/ChatInfo.vue'
import MessageEditor from '../views/MessageEditor.vue'
import MessageList from '../views/MessageList.vue'

import router from '@/app/router'
import { ChatRouteName } from '../router'
import { computed, nextTick, onBeforeMount, ref } from 'vue'
import {
  getChatMessages,
  socket,
  subscribeToChat,
  toClientMessage,
} from '@/chat/services'
import { onBeforeRouteUpdate } from 'vue-router'
import {
  isLoadingMessage,
  MessageStatus,
  type LoadingMessage,
  type Message,
  type MessageWasSent,
  type NewMessage,
} from '../utils/types'
import { type Chat } from '@/chatList/utils/types'
import useMessageReader from '../composables/useMessageReader'

const props = defineProps<{
  id: string
  chats: Chat[]
}>()

const messages = ref<(Message | LoadingMessage)[]>([])
const messageList = ref<typeof MessageList | null>(null)

const { observeMessage, observeUnreadMessages } = useMessageReader(
  () => props.id,
  messages,
)

const currentChat = computed((): Chat | undefined => {
  const chat = props.chats.find((chat) => chat.id === props.id)

  if (chat) {
    return chat
  }

  router.replace({
    name: ChatRouteName.Chat,
  })

  return undefined
})

const fetchMessageHistory = async (chatId: string) => {
  const chatMessages = await getChatMessages(chatId)

  if (chatMessages) {
    messages.value = chatMessages
    messageList.value?.scrollToBottom()
  }
}

const initChat = async (chatId: string): Promise<void> => {
  subscribeToChat(chatId)
  await fetchMessageHistory(chatId)
  observeUnreadMessages()
}

const onNewMessage = (msg: Message | LoadingMessage) => {
  messages.value.push(msg)
  messageList.value?.handleNewMessageScroll()
}

const changeLoadingToSent = (ack: MessageWasSent) => {
  for (const [index, message] of messages.value.entries()) {
    if (isLoadingMessage(message) && message.messageKey === ack.messageKey) {
      const enrichedMessage: Message = {
        authorId: message.authorId,
        messageId: ack.messageId,
        text: message.text,
        datetime: ack.datetime,
        status: MessageStatus.Unseen,
      }
      messages.value.splice(index, 1, enrichedMessage)
      break
    }
  }
}

onBeforeMount(async () => {
  await initChat(props.id)
})

onBeforeRouteUpdate(async (to, from, next) => {
  const newChatId = to.params.id as string
  await initChat(newChatId)
  next()
})

socket.on('newMessage', (msg: NewMessage) => {
  if (msg.chat.id !== props.id) return

  onNewMessage(toClientMessage(msg))

  nextTick(() => {
    observeMessage(msg.id)
  })
})

socket.on('messageWasSent', async (ack: MessageWasSent) => {
  if (ack.chatId !== props.id) return

  changeLoadingToSent(ack)
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
