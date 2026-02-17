import apiClient from '@/app/services'
import { io, Socket } from 'socket.io-client'
import {
  MessageStatus,
  type GetMessage,
  type Message,
  type NewMessage,
} from '../utils/types'

export let socket: Socket

export const connectSocket = () => {
  socket = io(`http://${window.location.hostname}:4000`, {
    withCredentials: true,
  })

  socket.on('connect', () => {
    console.log('Connected to server')
  })
}

export const sendMessage = (
  message: string,
  messageKey: string,
  chatId: string,
): void => {
  socket.emit('createMessage', {
    content: message,
    messageKey,
    chatId,
  })
}

export const sendReadMessagesIds = (chatId: string, ids: string[]) => {
  socket.emit('markAsRead', {
    idsOfMessages: ids,
    chatId,
  })
}

export const sendTypingStatus = (isTyping: boolean, chatId: string): void => {
  socket.emit('typing', {
    isTyping,
    chatId,
  })
}

export const subscribeToChat = (chatId: string): void => {
  socket.emit('joinChat', chatId)
}

export const getChatMessages = async (chatId: string): Promise<Message[] | null> => {
  try {
    const response = await apiClient.get<GetMessage[]>(`/messages/${chatId}`)

    if (response.status === 200) {
      return response.data.map(toClientMessage)
    }

    return null
  } catch {
    return null
  }
}

/** Maps a server-side message to the client-side message. */
export const toClientMessage = (message: NewMessage | GetMessage): Message => ({
  authorId: message.sender.id,
  messageId: message.id,
  text: message.content,
  datetime: message.timestamp,
  status: message.isRead ? MessageStatus.Seen : MessageStatus.Unseen,
})
