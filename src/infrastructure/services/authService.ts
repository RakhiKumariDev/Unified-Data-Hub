import type { AuthCredentials, AuthSession, AuthUser } from '@/domain/models/auth'
import { authApi } from '@/infrastructure/api/axiosInstance'
import { endpoints } from '@/infrastructure/api/endpoints'

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    const response = await authApi.post<AuthUser>(endpoints.auth.login, credentials)
    const user = response.data

    return {
      token: user.accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
    }
  },
}