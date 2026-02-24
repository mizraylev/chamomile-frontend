export type GetChat = {
  id: string
  name: string
  creationTime: string
  companionNickname: string
  companionLastSeen: string
  lastMessageContent: string
  lastMessageSenderId: string
  lastMessageId: string
  lastMessageTimestamp: string
  lastMessageIsRead: string
  isOnline: boolean
  unreadCount: number
}

export type DirectChatListItem = {
  id: string
  name: string
  lastMessage: {
    content: string
    timestamp: string
  }
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
}

export type GroupChatListItem = {
  id: string
  name: string
  lastMessage: {
    content: string
    timestamp: string
    user: {
      id: string
      name: string
    }
  }
  typingUsers: {
    id: string
    name: string
  }[]
}

export type ChatListItem = DirectChatListItem | GroupChatListItem

export function isDirectChatListItem(
  chatListItem: ChatListItem,
): chatListItem is DirectChatListItem {
  return 'isOnline' in chatListItem
}
