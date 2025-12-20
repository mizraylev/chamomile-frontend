import apiClient from '@/app/services'

export const doesEmailExist = async (email: string): Promise<boolean | null> => {
  try {
    const response = await apiClient.get<boolean>(`/users/doesEmailExist/${email}`)
    return response.data
  } catch {
    return null
  }
}

/** Returns userId if credentials are correct. */
export const areCredentialsCorrect = async (
  email: string,
  password: string,
): Promise<string | null> => {
  try {
    const response = await apiClient.post<string>('/auth/login', {
      email,
      password,
    })
    return response.data
  } catch {
    return null
  }
}
