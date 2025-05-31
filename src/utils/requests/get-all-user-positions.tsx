import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'
import { AccountPosition } from '../schemas/account-position'

const fetchPositions = async (
  query?: string
): Promise<{
  data: AccountPosition[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  success: boolean
}> => {
  const { data } = await axiosClient.get<{
    data: AccountPosition[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
    success: boolean
  }>(`/api/get-account-positions?${query}`)

  return {
    data: data.data,
    success: data.success,
    pagination: data.pagination,
  }
}

export const useUserAccountPositions = (query?: string) => {
  return useQuery<{
    data: AccountPosition[]
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
    success: boolean
  }>({
    queryKey: ['get-user-positions', query],
    initialData: {
      data: [],
      success: false,
      pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    },
    queryFn: () => fetchPositions(query),
  })
}
