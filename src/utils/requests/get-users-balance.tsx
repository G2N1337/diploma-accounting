import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'

export type TodaysSpendingsType = {
  balance: number | undefined
  success: boolean
}

const fetchUserBalance = async (): Promise<TodaysSpendingsType> => {
  const { data } = await axiosClient.get<TodaysSpendingsType>(
    '/api/get-user-balance'
  )

  return data
}

export const useGetUserBalance = () => {
  return useQuery<TodaysSpendingsType>({
    queryKey: ['user-balance'],
    initialData: { balance: undefined, success: false },
    queryFn: fetchUserBalance,
  })
}
