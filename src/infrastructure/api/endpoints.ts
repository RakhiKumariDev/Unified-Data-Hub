export const endpoints = {
  auth: {
    login: '/auth/login',
  },
  jsonPlaceholder: {
    users: '/users',
    posts: '/posts',
    comments: '/comments',
  },
  coinGecko: {
    markets: '/coins/markets',
  },
  openMeteo: {
    forecast: '/forecast',
  },
} as const