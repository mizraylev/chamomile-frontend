export enum MessageStatus {
  Seen = 'seen',
  Unseen = 'unseen',
  Loading = 'loading',
}

export type LoadingMessage = {
  authorId: string
  text: string
  status: MessageStatus
  messageKey: string
}

export type Message = {
  authorId: string
  messageId: string
  text: string
  datetime: string
  status: MessageStatus
}

export function isLoadingMessage(msg: Message | LoadingMessage): msg is LoadingMessage {
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
