export interface ApiError {
  message: string
  statusCode?: number
}

export interface Option<T> {
  label: string
  value: T
}