import apiClient from '@/app/services'
import { type GetChat } from '../utils/types'
import { MessageStatus, type ChatsById } from '@/chat/utils/types'

export const getChats = async (): Promise<GetChat[]> => {
  try {
    const response = await apiClient.get<GetChat[]>('/chats')
    return response.data
  } catch {
    return []
  }
}

export const getUsers = async (): Promise<string[] | null> => {
  try {
    const response = await apiClient.get<string[]>('/users')
    return response.data
  } catch {
    return null
  }
}

export const toChatsById = (chats: GetChat[]): ChatsById => {
  const chatsById: ChatsById = {}

  chats.forEach((chat) => {
    chatsById[chat.id] = {
      name: chat.companionNickname,
      lastSeen: chat.companionLastSeen,
      isOnline: chat.isOnline,
      isTyping: false,
      wasHistoryFetched: false,
      unreadCount: chat.unreadCount,
      messages: [
        {
          authorId: chat.lastMessageSenderId,
          messageId: chat.lastMessageId,
          text: chat.lastMessageContent,
          datetime: chat.lastMessageTimestamp,
          status: chat.lastMessageIsRead ? MessageStatus.Seen : MessageStatus.Unseen,
        },
      ],
    }
  })

  return chatsById
}
