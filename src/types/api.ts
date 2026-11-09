export interface ApiListResponse<T> {
  data: T[]
  meta: {
    isFirstPage: boolean
    isLastPage: boolean
    currentPage: number
    pageCount: number
    totalCount: number
  }
}

export interface ApiSingleResponse<T> {
  data: T
}
