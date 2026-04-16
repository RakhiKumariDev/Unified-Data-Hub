import axios from 'axios'

import type { ApiError } from '@/domain/types/api'

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined

    return {
      message: data?.message ?? error.message ?? 'Something went wrong',
      statusCode: error.response?.status,
    }
  }

  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: 'Unexpected application error' }
}