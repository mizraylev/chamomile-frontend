import axios from 'axios'
import router from '../router'
import { socket } from '@/chat/services'
import { AuthRouteName } from '@/auth/router'

const API_BASE_URL = `http://${window.location.hostname}:4000`

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      socket?.close()
      router.push({
        name: AuthRouteName.Login,
      })
    }
    return Promise.reject(error)
  },
)

export default apiClient
