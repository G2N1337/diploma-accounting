import { useQuery } from '@tanstack/react-query'

import { AccountChangeType } from '../schemas/account-change-type'
import axiosClient from './axios/client'

const fetchAccountChangeTypes = async (): Promise<{
  data: AccountChangeType[]
  success: boolean
}> => {
  const { data } = await axiosClient.get<{
    data: AccountChangeType[]
    success: boolean
  }>('/api/account-change-type')

  return data
}

export const useAccountChangeTypes = () => {
  return useQuery<{
    data: AccountChangeType[]
    success: boolean
  }>({
    queryKey: ['account-change-types'],
    initialData: { data: [], success: false },
    queryFn: fetchAccountChangeTypes,
  })
}
