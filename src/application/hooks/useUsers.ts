import { useQuery } from '@tanstack/react-query'

import { userService } from '@/infrastructure/services/userService'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: ({ signal }) => userService.getUsers(signal),
    staleTime: 5 * 60 * 1000,
  })
}