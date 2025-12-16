export enum MessageStatus {
  Seen = 'seen',
  Unseen = 'unseen',
  Loading = 'loading',
  Live = 'live',
}

export type Message = {
  authorId: string
  messageId: string
  text: string
  datetime: string
  status: MessageStatus
}
