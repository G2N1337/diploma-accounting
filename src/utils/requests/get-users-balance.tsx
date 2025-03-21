import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'
import { WalletType } from '../types/wallet'

export type UsersBalanceType = {
  wallets: WalletType[] | undefined
  totalBalance: number | undefined
  success: boolean
}

const fetchUserBalance = async (): Promise<UsersBalanceType> => {
  const { data } = await axiosClient.get<UsersBalanceType>(
    '/api/get-user-balance'
  )

  return data
}

export const useGetUserBalance = () => {
  return useQuery<UsersBalanceType>({
    queryKey: ['user-balance'],
    refetchOnMount: true,
    initialData: {
      totalBalance: undefined,
      wallets: undefined,
      success: true,
    },
    queryFn: fetchUserBalance,
  })
}
