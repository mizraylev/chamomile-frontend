import axios from 'axios'
import router from '../router'

const API_BASE_URL = `http://${window.location.hostname}:4000`

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default apiClient
