import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const USER_ID_LS_KEY = 'userId'
  const userId = ref(localStorage.getItem(USER_ID_LS_KEY) || '')

  const setUserId = (id: string): void => {
    localStorage.setItem(USER_ID_LS_KEY, id)
    userId.value = id
  }

  return { userId, setUserId }
})
