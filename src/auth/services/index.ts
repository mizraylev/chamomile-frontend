import { API_BASE_URL } from '@/app/services'
import axios from 'axios'

export const doesEmailExist = async (email: string): Promise<boolean | null> => {
  try {
    const response = await axios.get<boolean>(
      `${API_BASE_URL}/users/doesEmailExist/${email}`,
    )
    return response.data
  } catch {
    return null
  }
}

type AuthResponse = {
  access_token: string
}

export const areCredentialsCorrect = async (
  email: string,
  password: string,
): Promise<AuthResponse | null> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    })
    return response.data
  } catch {
    return null
  }
}
