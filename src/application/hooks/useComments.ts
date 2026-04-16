import { useQuery } from '@tanstack/react-query'

import { userService } from '@/infrastructure/services/userService'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useComments(postId: number | null) {
  return useQuery({
    queryKey: queryKeys.commentsByPost(postId),
    queryFn: ({ signal }) => userService.getCommentsByPost(postId as number, signal),
    enabled: postId !== null,
    staleTime: 60 * 1000,
  })
}