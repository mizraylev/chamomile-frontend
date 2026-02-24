export enum MessageStatus {
  Seen = 'seen',
  Unseen = 'unseen',
  Loading = 'loading',
}

export type LoadingMessage = {
  authorId: string
  text: string
  messageKey: string
  status: MessageStatus.Loading
}

export type UnseenMessage = {
  authorId: string
  messageId: string
  text: string
  datetime: string
  status: MessageStatus.Unseen
}

export type SeenMessage = {
  authorId: string
  messageId: string
  text: string
  datetime: string
  status: MessageStatus.Seen
}

export type Message = LoadingMessage | UnseenMessage | SeenMessage

export function isLoadingMessage(msg: Message): msg is LoadingMessage {
  return 'messageKey' in msg
}

export type GetMessage = {
  id: string
  content: string
  sender: {
    id: string
    nickname: string
  }
  timestamp: string
  isRead: boolean
}

export type NewMessage = {
  chat: {
    id: string
  }
  content: string
  id: string
  sender: {
    id: string
  }
  timestamp: string
  isRead: boolean
}

export type MessageWasSent = {
  messageKey: string
  messageId: string
  datetime: string
  chatId: string
}

export type GetTypingStatus = {
  chatId: string
  isTyping: boolean
  senderId: string
}

export type GetUserPresenceStatus = {
  chatId: string
  userId: string
  isOnline: boolean
  lastSeen?: string // Last Seen is provided only if the user went offline.
}

export type GroupChat = {
  name: string
  typingUsers: { id: string; name: string }[]
  messages: Message[]
  wasHistoryFetched: boolean
  unreadCount: number
}

export type DirectChat = {
  name: string
  lastSeen: string
  isOnline: boolean
  isTyping: boolean
  messages: Message[]
  wasHistoryFetched: boolean
  unreadCount: number
}

export type Chat = DirectChat | GroupChat

export function isDirectChat(chat: Chat | undefined): chat is DirectChat {
  return !!chat && 'isOnline' in chat
}

export type ChatsById = Record<string, Chat>
