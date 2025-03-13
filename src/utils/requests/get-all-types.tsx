import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'
import { AccountChangeInterface } from '../schemas/account-change-type'

const fetchAccountChangeTypes = async (): Promise<{
  data: AccountChangeInterface[]
  success: boolean
}> => {
  const { data } = await axiosClient.get<{
    data: AccountChangeInterface[]
    success: boolean
  }>('/api/account-change-type')

  return data
}

export const useAccountChangeTypes = () => {
  return useQuery<{
    data: AccountChangeInterface[]
    success: boolean
  }>({
    queryKey: ['account-change-types'],
    initialData: { data: [], success: false },
    queryFn: fetchAccountChangeTypes,
  })
}
