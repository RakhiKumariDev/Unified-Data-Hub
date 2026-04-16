export const queryKeys = {
  users: ['users'] as const,
  postsByUser: (userId: number | null) => ['posts', userId] as const,
  commentsByPost: (postId: number | null) => ['comments', postId] as const,
  cryptoMarkets: ['crypto-markets'] as const,
  weather: (latitude: number, longitude: number) => ['weather', latitude, longitude] as const,
} as const