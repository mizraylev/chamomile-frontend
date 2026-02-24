import { computed, nextTick, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
  isDirectChat,
  isLoadingMessage,
  MessageStatus,
  type Chat,
  type ChatsById,
  type GetTypingStatus,
  type GetUserPresenceStatus,
  type LoadingMessage,
  type Message,
  type MessageWasSent,
  type NewMessage,
} from '../utils/types'
import { getChats, toChatsById } from '@/chatList/services'
import { useRoute } from 'vue-router'
import type { ChatListItem } from '@/chatList/utils/types'
import { getChatMessages, socket, toClientMessage } from '../services'
import useMessageReader from '../composables/useMessageReader'

export const useChatStore = defineStore('chat', () => {
  const route = useRoute()

  const chatsById = ref<ChatsById>({})
  /** An array of chat IDs in their display order. */
  const chatsOrder = ref<string[]>([])

  const currentChatId = computed((): string => {
    const chatIdParam = route.params.id
    if (!chatIdParam) return ''

    return Array.isArray(chatIdParam) ? chatIdParam[0] || '' : chatIdParam
  })

  const currentChat = computed((): Chat | undefined => {
    return getChatById(currentChatId.value)
  })

  const currentMessages = computed(() => currentChat.value?.messages || [])

  const { observeMessage, observeUnreadMessages, markAsRead } = useMessageReader(
    currentChatId,
    currentMessages,
    currentChat,
  )

  const chatList = computed((): ChatListItem[] => {
    const chats = chatsById.value
    return chatsOrder.value
      .map((chatId) => {
        const chat = chats[chatId]
        if (!chat || !isDirectChat(chat)) return

        const lastMessage = chat.messages[chat.messages.length - 1]

        return {
          id: chatId,
          name: chat.name,
          lastMessage: {
            content: lastMessage?.text || '',
            timestamp:
              lastMessage && !isLoadingMessage(lastMessage) ? lastMessage?.datetime : '',
          },
          unreadCount: chat.unreadCount,
          isOnline: chat.isOnline,
          isTyping: chat.isTyping,
        }
      })
      .filter((item) => !!item)
  })

  const loadChats = async (): Promise<void> => {
    const chats = await getChats()
    chatsOrder.value = chats.map((chat) => chat.id)
    chatsById.value = toChatsById(chats)
  }

  const getChatById = (chatId: string | undefined): Chat | undefined => {
    const chats = chatsById.value
    if (!chatId || !(chatId in chats)) return

    return chats[chatId]
  }

  const onTypingChanged = (typing: GetTypingStatus) => {
    const chat = getChatById(typing.chatId)
    if (chat && isDirectChat(chat)) {
      chat.isTyping = typing.isTyping
    }
  }

  const onPresenceChanged = (presence: GetUserPresenceStatus) => {
    const chat = getChatById(presence.chatId)
    if (chat && isDirectChat(chat)) {
      chat.isOnline = presence.isOnline
      if (presence.lastSeen) {
        chat.lastSeen = presence.lastSeen
      }
    }
  }

  const raiseChat = (chatId: string) => {
    if (chatsOrder.value[0] === chatId) return

    chatsOrder.value = [chatId, ...chatsOrder.value.filter((id) => id !== chatId)]
  }

  const onNewMessage = (message: NewMessage) => {
    const chat = getChatById(message.chat.id)
    if (chat && isDirectChat(chat)) {
      chat.messages.push(toClientMessage(message))
      chat.unreadCount++
    }

    if (message.chat.id === currentChatId.value) {
      nextTick(() => {
        observeMessage(message.id)
      })
    }

    raiseChat(message.chat.id)
  }

  const addMessage = (message: LoadingMessage) => {
    const chat = getChatById(currentChatId.value)
    chat?.messages.push(message)
    raiseChat(currentChatId.value)
  }

  const fetchMessageHistory = async () => {
    const chatMessages = await getChatMessages(currentChatId.value)

    if (chatMessages && currentChat.value?.messages) {
      currentChat.value.messages = chatMessages
      currentChat.value.wasHistoryFetched = true
    }
  }

  const onChatOpened = async (): Promise<void> => {
    if (currentChatId.value && !currentChat.value?.wasHistoryFetched) {
      await fetchMessageHistory()
    }

    nextTick(() => {
      observeUnreadMessages()
    })
  }

  const onNewlyReadMessages = (ids: string[]) => {
    markAsRead(ids)
  }

  const changeLoadingToSent = (ack: MessageWasSent) => {
    const chat = getChatById(currentChatId.value)
    const messages = chat?.messages
    if (!messages) return

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i]

      if (message && isLoadingMessage(message) && message.messageKey === ack.messageKey) {
        const enrichedMessage: Message = {
          authorId: message.authorId,
          messageId: ack.messageId,
          text: message.text,
          datetime: ack.datetime,
          status: MessageStatus.Unseen,
        }
        messages.splice(i, 1, enrichedMessage)
        break
      }
    }
  }

  watch(currentChatId, onChatOpened)

  socket.on('typing', onTypingChanged)
  socket.on('user:presence_changed', onPresenceChanged)
  socket.on('newMessage', onNewMessage)
  socket.on('messageWasSent', changeLoadingToSent)
  socket.on('newlyReadMessages', onNewlyReadMessages)

  return {
    chatsById,
    currentChatId,
    currentChat,
    chatList,
    currentMessages,
    loadChats,
    getChatById,
    onTypingChanged,
    onPresenceChanged,
    onNewMessage,
    addMessage,
    onChatOpened,
    changeLoadingToSent,
    onNewlyReadMessages,
  }
})
