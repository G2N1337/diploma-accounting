import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'
import { AccountPosition } from '../schemas/account-position'

const fetchPositions = async (
  query?: string
): Promise<{
  data: AccountPosition[]
  success: boolean
}> => {
  const { data } = await axiosClient.get<{
    data: AccountPosition[]
    success: boolean
  }>(`/api/get-account-positions?${query}`)

  return { data: data.data.reverse(), success: data.success }
}

export const useUserAccountPositions = (query?: string) => {
  return useQuery<{
    data: AccountPosition[]
    success: boolean
  }>({
    queryKey: ['get-user-positions', query],
    initialData: { data: [], success: false },
    queryFn: () => fetchPositions(query),
  })
}
