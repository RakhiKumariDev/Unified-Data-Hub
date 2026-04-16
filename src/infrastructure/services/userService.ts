import type { Comment } from '@/domain/models/comment'
import type { Post } from '@/domain/models/post'
import type { User } from '@/domain/models/user'
import { contentApi } from '@/infrastructure/api/axiosInstance'
import { endpoints } from '@/infrastructure/api/endpoints'

export const userService = {
  async getUsers(signal?: AbortSignal): Promise<User[]> {
    const response = await contentApi.get<User[]>(endpoints.jsonPlaceholder.users, { signal })

    return response.data
  },

  async getPostsByUser(userId: number, signal?: AbortSignal): Promise<Post[]> {
    const response = await contentApi.get<Post[]>(endpoints.jsonPlaceholder.posts, {
      params: { userId },
      signal,
    })

    return response.data
  },

  async getCommentsByPost(postId: number, signal?: AbortSignal): Promise<Comment[]> {
    const response = await contentApi.get<Comment[]>(endpoints.jsonPlaceholder.comments, {
      params: { postId },
      signal,
    })

    return response.data
  },
}