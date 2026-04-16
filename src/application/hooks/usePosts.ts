import { useQuery } from '@tanstack/react-query'

import { userService } from '@/infrastructure/services/userService'
import { queryKeys } from '@/shared/constants/queryKeys'

export function usePosts(userId: number | null) {
  return useQuery({
    queryKey: queryKeys.postsByUser(userId),
    queryFn: ({ signal }) => userService.getPostsByUser(userId as number, signal),
    enabled: userId !== null,
    staleTime: 2 * 60 * 1000,
  })
}