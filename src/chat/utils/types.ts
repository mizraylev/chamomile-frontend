export enum MessageStatus {
  Seen = 'seen',
  Unseen = 'unseen',
  Loading = 'loading',
}

export type Message = {
  authorId: string
  messageId: string
  text: string
  datetime: string
  status: MessageStatus
}

export type GetMessage = {
  id: string
  content: string
  sender: {
    id: string
    nickname: string
  }
  timestamp: string
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
}
