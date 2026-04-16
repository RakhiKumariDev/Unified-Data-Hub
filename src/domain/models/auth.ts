export interface AuthCredentials {
  username: string
  password: string
}

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
  refreshToken?: string
}

export interface AuthSession {
  token: string
  user: Pick<AuthUser, 'id' | 'username' | 'email' | 'firstName' | 'lastName' | 'image'>
}