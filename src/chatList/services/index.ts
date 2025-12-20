import apiClient from '@/app/services'
import { type Chat } from '../utils/types'

export const getChats = async (): Promise<Chat[]> => {
  try {
    const response = await apiClient.get<Chat[]>('/chats')
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
