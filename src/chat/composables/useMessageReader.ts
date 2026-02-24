import { debounce } from '@/app/utils/debounce'
import { isLoadingMessage, MessageStatus, type Chat, type Message } from '../utils/types'
import { sendReadMessagesIds } from '../services'
import { toRef, toValue, type MaybeRefOrGetter, type Ref } from 'vue'
import { useAuthStore } from '@/auth/stores'

export default function useMessageReader(
  chatId: MaybeRefOrGetter<string>,
  messageArray: MaybeRefOrGetter<Message[] | undefined>,
  currentChat: Ref<Chat | undefined>,
) {
  const authStore = useAuthStore()

  const messages = toRef(messageArray)

  /** Temporarily stores IDs of other users' messages that have just been read by the current user.
   * The IDs are stored here until they are sent to the server to mark those messages as read. */
  let newlyReadMessagesIds: string[] = []

  /** Changes statuses of messages with provided IDs to Seen on the client side. */
  const markAsRead = (idsOfMessages: string[]) => {
    const ids = new Set(idsOfMessages)
    if (!ids.size || !messages.value) return

    for (const message of messages.value) {
      if (!isLoadingMessage(message) && ids.delete(message.messageId)) {
        message.status = MessageStatus.Seen
        if (!ids.size) return
      }
    }
  }

  const changeUnreadCount = (change: number) => {
    if (currentChat.value) {
      currentChat.value.unreadCount += change
    }
  }

  const debouncedRead = debounce(() => {
    markAsRead(newlyReadMessagesIds)
    sendReadMessagesIds(toValue(chatId), newlyReadMessagesIds)
    changeUnreadCount(-newlyReadMessagesIds.length)

    newlyReadMessagesIds = []
  }, 500)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const messageId = entry.target.getAttribute('id')?.slice(2) // Message elements' IDs start with "m-"
      if (!messageId) return

      newlyReadMessagesIds.push(messageId)
      observer.unobserve(entry.target)

      debouncedRead()
    })
  })

  /** Makes a message be watched for read event. */
  const observeMessage = (messageId: string) => {
    const messageElement = document.getElementById('m-' + messageId)
    if (!messageElement) return

    observer.observe(messageElement)
  }

  /** Makes unread messages of other users be watched for read event. */
  const observeUnreadMessages = () => {
    if (!messages.value) return

    messages.value.forEach((message) => {
      if (
        message.status !== MessageStatus.Unseen ||
        message.authorId === authStore.userId ||
        isLoadingMessage(message)
      )
        return

      observeMessage(message.messageId)
    })
  }

  return { observeUnreadMessages, observeMessage, markAsRead }
}
